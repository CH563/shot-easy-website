// Pure-frontend audio format conversion helpers for the ffmpeg.wasm video tool.
// ffmpeg.wasm decodes all of these inputs (including WMA via wmav2 and AIFF via PCM)
// and encodes all of these outputs locally in the browser; nothing is uploaded.

export const AUDIO_INPUT_EXTENSIONS = ['mp3', 'aac', 'wav', 'ogg', 'flac', 'm4a', 'aiff', 'aif', 'wma'];

export const AUDIO_OUTPUT_FORMATS = ['mp3', 'aac', 'wav', 'ogg', 'flac', 'm4a'];

export const AUDIO_CODEC_ARGS = {
    mp3: ['-c:a', 'libmp3lame', '-q:a', '2'],
    aac: ['-c:a', 'aac'],
    wav: ['-c:a', 'pcm_s16le'],
    ogg: ['-c:a', 'libvorbis'],
    flac: ['-c:a', 'flac'],
    m4a: ['-c:a', 'aac'],
};

// The 14 audio-to-audio pairs listed on metric-converter.com/convert.
export const AUDIO_CONVERSION_PAIRS = [
    ['wav', 'mp3'], ['mp3', 'wav'], ['m4a', 'mp3'], ['flac', 'mp3'], ['ogg', 'mp3'],
    ['wav', 'ogg'], ['mp3', 'ogg'], ['wav', 'flac'], ['mp3', 'aac'], ['aac', 'mp3'],
    ['aiff', 'mp3'], ['wma', 'mp3'], ['mp3', 'm4a'], ['flac', 'wav'],
];

export const isAudioExtension = (extension) => AUDIO_INPUT_EXTENSIONS.includes((extension || '').toLowerCase());

export const audioCodecArgs = (format) => AUDIO_CODEC_ARGS[format] || null;

export const isSupportedAudioPair = (from, to) => isAudioExtension(from) && AUDIO_OUTPUT_FORMATS.includes(to);
