import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const textAt = path => readFile(new URL(path, root), 'utf8');

test('local and deployment configuration agree on Node 24', async () => {
    const pkg = JSON.parse(await textAt('package.json'));
    assert.equal(pkg.engines.node, '24.x');
    assert.equal((await textAt('.nvmrc')).trim(), '24');
    assert.equal((await textAt('.node-version')).trim(), '24');
    assert.equal(process.versions.node.split('.')[0], '24', 'Run this suite using Node 24');
});

test('Astro uses the Node-24-capable Vercel adapter and explicit Analytics integration', async () => {
    const adapter = JSON.parse(await textAt('node_modules/@astrojs/vercel/package.json'));
    assert.equal(adapter.version.split('.')[0], '9');
    const config = await textAt('astro.config.mjs');
    assert.match(config, /from ['"]@astrojs\/vercel['"]/);
    assert.doesNotMatch(config, /webAnalytics|@astrojs\/vercel\/serverless/);
    const layout = await textAt('src/layouts/Layout.astro');
    assert.match(layout, /from ['"]@vercel\/analytics\/astro['"]/);
    assert.match(layout, /<Analytics\s*\/>/);
});

const checkBuild = Boolean(process.env.RUNTIME_CHECK_BUILD);

test('every generated Vercel Node function targets nodejs24.x', { skip: !checkBuild }, async () => {
    const directory = new URL('.vercel/output/functions/', root);
    const files = await readdir(directory, { recursive: true });
    const configs = files.filter(path => path.endsWith('.vc-config.json'));
    assert.ok(configs.length, 'Build before running the deployment checks');
    let nodeFunctions = 0;
    for (const path of configs) {
        const config = JSON.parse(await readFile(new URL(path, directory), 'utf8'));
        if (config.runtime?.startsWith('nodejs')) {
            nodeFunctions++;
            assert.equal(config.runtime, 'nodejs24.x', path);
        }
    }
    assert.ok(nodeFunctions > 0, 'At least one Node SSR function must be generated');
});

test('the content-loader migration preserves all published blog URLs and rendered articles', { skip: !checkBuild }, async () => {
    const articles = (await readdir(new URL('src/content/blog/', root))).filter(path => path.endsWith('.md'));
    assert.ok(articles.length);
    for (const article of articles) {
        const source = await textAt(`src/content/blog/${article}`);
        if (/^draft:\s*true\s*$/m.test(source)) continue;
        const id = article.slice(0, -3);
        const html = await textAt(`.vercel/output/static/blog/${id}/index.html`);
        assert.equal((html.match(/<h1\b/g) || []).length, 1, id);
        assert.ok(html.includes(`https://shoteasy.fun/blog/${id}/`), id);
        assert.ok(html.includes('"@type":"Article"'), id);
        assert.ok(html.includes('datePublished'), id);
        assert.match(html, /<article\b[^>]*class="prose\b/, id);
    }
});

test('production HTML initializes Vercel Web Analytics', { skip: !checkBuild }, async () => {
    const html = await textAt('.vercel/output/static/about/index.html');
    assert.match(html, /<vercel-analytics\b/);
    assert.ok(html.includes('/_vercel/insights/script.js'));
    assert.ok(html.includes('customElements.define("vercel-analytics"'));
});

const baseUrl = process.env.RUNTIME_BASE_URL;
test('the SSR blog index still links to every published article', { skip: !baseUrl }, async () => {
    const response = await fetch(new URL('/blog/', baseUrl), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const article of await readdir(new URL('src/content/blog/', root))) {
        if (!article.endsWith('.md')) continue;
        const source = await textAt(`src/content/blog/${article}`);
        if (/^draft:\s*true\s*$/m.test(source)) continue;
        assert.ok(html.includes(`/blog/${article.slice(0, -3)}/`), article);
    }
});
