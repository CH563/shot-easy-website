import test from 'node:test';
import assert from 'node:assert/strict';
import {
    extensionForMime,
    getImageExtension,
    imageExtensions,
    isHeicFile,
    isIcoFile,
    mimeForImageExtension,
} from '../src/lib/imageConvert.js';

const file = (name, type) => ({ name, type });

test('HEIC/ICO detection works with missing or wrong MIME types', () => {
    assert.ok(isHeicFile(file('photo.heic', 'image/heic')));
    assert.ok(isHeicFile(file('photo.heic', '')));
    assert.ok(isHeicFile(file('photo.HEIF', 'application/octet-stream')));
    assert.ok(!isHeicFile(file('photo.jpg', 'image/jpeg')));
    assert.ok(isIcoFile(file('favicon.ico', 'image/x-icon')));
    assert.ok(isIcoFile(file('favicon.ico', 'image/vnd.microsoft.icon')));
    assert.ok(isIcoFile(file('favicon.ico', '')));
    assert.ok(!isIcoFile(file('favicon.png', 'image/png')));
});

test('extension helpers cover every image input', () => {
    for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif', 'bmp', 'avif', 'tiff', 'heic', 'heif', 'ico']) {
        assert.ok(imageExtensions.includes(ext), `missing extension ${ext}`);
        assert.ok(mimeForImageExtension(ext).startsWith('image/'), `missing mime for ${ext}`);
    }
    assert.equal(getImageExtension(file('photo.HEIC', '')), 'heic');
    assert.equal(mimeForImageExtension('heic'), 'image/heic');
    assert.equal(mimeForImageExtension('ico'), 'image/x-icon');
    assert.equal(mimeForImageExtension('zip'), '');
    assert.equal(extensionForMime('image/heic'), 'heic');
    assert.equal(extensionForMime('image/vnd.microsoft.icon'), 'ico');
    assert.equal(extensionForMime('image/x-icon'), 'ico');
});
