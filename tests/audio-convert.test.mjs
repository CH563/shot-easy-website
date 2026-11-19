import test from 'node:test';
import assert from 'node:assert/strict';
import {
    AUDIO_CONVERSION_PAIRS,
    AUDIO_INPUT_EXTENSIONS,
    AUDIO_OUTPUT_FORMATS,
    audioCodecArgs,
    isAudioExtension,
    isSupportedAudioPair,
} from '../src/lib/audioConvert.js';

test('audio inputs cover every format on the metric-converter page', () => {
    for (const ext of ['mp3', 'aac', 'wav', 'ogg', 'flac', 'm4a', 'aiff', 'wma']) {
        assert.ok(AUDIO_INPUT_EXTENSIONS.includes(ext), `missing input ${ext}`);
    }
    assert.ok(isAudioExtension('WAV'));
    assert.ok(isAudioExtension('aif'));
    assert.ok(!isAudioExtension('mp4'));
    assert.ok(!isAudioExtension(''));
});

test('audio outputs cover every target on the metric-converter page', () => {
    assert.deepEqual(AUDIO_OUTPUT_FORMATS, ['mp3', 'aac', 'wav', 'ogg', 'flac', 'm4a']);
});

test('every output format has ffmpeg codec args', () => {
    assert.deepEqual(audioCodecArgs('mp3'), ['-c:a', 'libmp3lame', '-q:a', '2']);
    assert.deepEqual(audioCodecArgs('aac'), ['-c:a', 'aac']);
    assert.deepEqual(audioCodecArgs('wav'), ['-c:a', 'pcm_s16le']);
    assert.deepEqual(audioCodecArgs('ogg'), ['-c:a', 'libvorbis']);
    assert.deepEqual(audioCodecArgs('flac'), ['-c:a', 'flac']);
    assert.deepEqual(audioCodecArgs('m4a'), ['-c:a', 'aac']);
    assert.equal(audioCodecArgs('wma'), null);
    assert.equal(audioCodecArgs('opus'), null);
});

test('all 14 metric-converter audio pairs are supported', () => {
    assert.equal(AUDIO_CONVERSION_PAIRS.length, 14);
    for (const [from, to] of AUDIO_CONVERSION_PAIRS) {
        assert.ok(isSupportedAudioPair(from, to), `unsupported pair ${from} -> ${to}`);
    }
    assert.ok(!isSupportedAudioPair('wma', 'wma'));
    assert.ok(!isSupportedAudioPair('mp4', 'mp3'));
});
