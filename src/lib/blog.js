import { Octokit } from 'octokit';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const token = import.meta.env.GITHUB_CLIENT_SECRET;
const owner = import.meta.env.GITHUB_OWNER;
const repo = import.meta.env.GITHUB_REPO;

dayjs.extend(relativeTime);

const md = markdownit({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
        try {
            return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
        } catch (__) {}
        }

        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

const octokit = new Octokit({
    auth: token,
});

async function requestRetry(route, parameters) {
    try {
        const response = await octokit.request(route, parameters);
        return response;
    } catch (error) {
        if (
            error.response &&
            error.status === 403 &&
            error.response.headers['x-ratelimit-remaining'] === '0'
        ) {
            const resetTimeEpochSeconds =
                error.response.headers['x-ratelimit-reset'];
            const currentTimeEpochSeconds = Math.floor(Date.now() / 1000);
            const secondsToWait =
                resetTimeEpochSeconds - currentTimeEpochSeconds;
            console.log(
                `You have exceeded your rate limit. Retrying in ${secondsToWait} seconds.`
            );
            setTimeout(requestRetry, secondsToWait * 1000, route, parameters);
        } else {
            console.error(error);
        }
    }
}

const getCover = (body, number) => {
    let coverImg = '';
    let pathUrl = '';
    let description = '';
    const desMatch = body?.match(/\r\n\>\s.*\r\n/);
    if (desMatch && desMatch.length) {
        const temp = desMatch[0] || '';
        description = temp.replaceAll('\r\n', '').substring(2);
    }
    const imgs = body?.match(/\!\[.*\]\(.+\)/);
    if (imgs && imgs.length) {
        const temp = imgs[0] || '';
        const key = temp.match(/\!\[.*\]\(/);
        if (key && key.length && key[0]) {
            pathUrl = key[0].substring(2, key[0].length - 2) + `-${number}`;
            coverImg = temp.substring(key[0].length, temp.length - 1);
        }
    }
    return {
        coverImg,
        pathUrl,
        description
    }
}

export const getPostLists = async (page) => {
    const response = await requestRetry(`GET /repos/${owner}/${repo}/issues`, {
        owner,
        repo,
        per_page: 10,
        page,
        labels: 'blog',
        state: 'all',
        sort: 'created',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    if (response?.data?.length) {
        const list = [];
        for (const item of response.data) {
            const { number, title, user, created_at, updated_at, html_url, body } = item;
            const { coverImg, pathUrl, description } = getCover(body, number);
            list.push({
                number,
                cover_img: coverImg,
                path_url: pathUrl,
                title,
                description,
                user,
                created_at,
                updated_at,
                format_time: dayjs(created_at).fromNow(),
                html_url,
                body
            });
        }
        return list;
    }
    return [];
};

export const getPost = async (issue_number) => {
    if (!issue_number) return null;
    const response = await requestRetry(`GET /repos/${ owner }/${ repo }/issues/${ issue_number }`, {
        owner,
        repo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
    if (response?.data && response.data?.labels?.some(e => e.name = 'blog')) {
        const { number, title, user, created_at, updated_at, html_url, body } = response.data;
        const { coverImg, description } = getCover(body, number);
        return {
            number,
            title,
            description,
            user,
            cover_img: coverImg,
            created_at,
            updated_at,
            format_time: dayjs(created_at).fromNow(),
            html_url,
            body: md.render(body)
        }
    };
    return null;
};
