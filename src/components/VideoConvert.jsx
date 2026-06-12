import React, { useMemo, useRef, useState } from 'react';
import { Icon } from './Icons';

const CORE_BASE = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
const FFMPEG_WORKER_URL = '/ffmpeg-worker.js';
const FFMPEG_LOAD_TIMEOUT = 90000;
const FFMPEG_DOWNLOAD_SIZE = '~31 MB';

const OPERATIONS = [
    { id: 'convert', icon: 'Repeat2', title: 'Convert', desc: 'Change video format' },
    { id: 'compress', icon: 'Archive', title: 'Compress', desc: 'Resize and reduce size' },
    { id: 'gif', icon: 'Clapperboard', title: 'GIF', desc: 'Create animated GIF', badge: '🔥' },
    { id: 'speed', icon: 'Zap', title: 'Speed', desc: 'Change playback speed' },
    { id: 'rotate', icon: 'RotateCw', title: 'Rotate', desc: 'Rotate or flip video' },
    { id: 'crop', icon: 'Crop', title: 'Crop', desc: 'Crop video frame' },
    { id: 'audio', icon: 'Music2', title: 'Audio', desc: 'Extract soundtrack' },
    { id: 'mute', icon: 'VolumeX', title: 'Mute', desc: 'Remove audio track' },
    { id: 'thumbnail', icon: 'Image', title: 'Frame', desc: 'Export one image' },
    { id: 'reverse', icon: 'Rewind', title: 'Reverse', desc: 'Reverse video' },
    { id: 'fade', icon: 'CircleDashed', title: 'Fade', desc: 'Fade in and out' },
    { id: 'adjust', icon: 'SlidersHorizontal', title: 'Adjust', desc: 'Color adjustments' },
    { id: 'metadata', icon: 'Ban', title: 'Metadata', desc: 'Strip metadata' },
    { id: 'volume', icon: 'Volume2', title: 'Volume', desc: 'Change audio volume' },
    { id: 'loop', icon: 'Repeat', title: 'Loop', desc: 'Repeat the clip' },
    { id: 'pad', icon: 'PanelTop', title: 'Pad', desc: 'Pad or letterbox' },
    { id: 'normalize', icon: 'AudioLines', title: 'Normalize', desc: 'Normalize loudness' },
    { id: 'denoise', icon: 'Brush', title: 'Denoise', desc: 'Reduce video noise' },
    { id: 'sharpen', icon: 'Eye', title: 'Sharpen', desc: 'Sharpen or blur' },
    { id: 'raw', icon: 'TerminalSquare', title: 'Raw', desc: 'Custom ffmpeg args' },
];

function videoCodecArgs(preset = 'ultrafast') {
    return ['-threads', '1', '-c:v', 'libx264', '-preset', preset, '-pix_fmt', 'yuv420p'];
}

function decimal(value, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? number : fallback;
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function atempoChain(multiplier) {
    let value = clamp(decimal(multiplier, 1), 0.25, 4);
    const filters = [];
    while (value > 2) {
        filters.push('atempo=2');
        value /= 2;
    }
    while (value < 0.5) {
        filters.push('atempo=0.5');
        value /= 0.5;
    }
    filters.push(`atempo=${value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}`);
    return filters.join(',');
}

function ratioExpression(ratio) {
    return {
        '16:9': { w: 16, h: 9 },
        '9:16': { w: 9, h: 16 },
        '1:1': { w: 1, h: 1 },
        '4:3': { w: 4, h: 3 },
        '4:5': { w: 4, h: 5 },
        '21:9': { w: 21, h: 9 },
    }[ratio] || { w: 16, h: 9 };
}

function normalizeTarget(value) {
    return ['-14', '-16', '-23'].includes(String(value)) ? String(value) : '-14';
}

const RAW_EXAMPLES = [
    { label: 'Lossless remux', args: '-c copy', ext: 'mp4' },
    { label: 'Scale to 1280px', args: '-threads 1 -vf scale=1280:-2 -c:v libx264 -crf 23 -preset ultrafast -pix_fmt yuv420p -c:a aac', ext: 'mp4' },
    { label: 'Grayscale', args: '-threads 1 -vf format=gray -c:v libx264 -crf 23 -preset ultrafast -pix_fmt yuv420p -c:a copy', ext: 'mp4' },
    { label: 'Extract first frame', args: '-vframes 1', ext: 'png' },
    { label: 'Normalize audio', args: '-af loudnorm -c:v copy', ext: 'mp4' },
];

const MIME = {
    mp4: 'video/mp4',
    webm: 'video/webm',
    mkv: 'video/x-matroska',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    gif: 'image/gif',
    mp3: 'audio/mpeg',
    aac: 'audio/aac',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    flac: 'audio/flac',
    jpg: 'image/jpeg',
    png: 'image/png',
};

function formatBytes(bytes) {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, index)).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00.0';
    const minutes = Math.floor(seconds / 60);
    const rest = (seconds % 60).toFixed(1).padStart(4, '0');
    return `${minutes}:${rest}`;
}

function parseShellArgs(value) {
    const result = [];
    let current = '';
    let quote = '';
    for (const char of value) {
        if (quote) {
            if (char === quote) quote = '';
            else current += char;
        } else if (char === '"' || char === "'") {
            quote = char;
        } else if (/\s/.test(char)) {
            if (current) {
                result.push(current);
                current = '';
            }
        } else {
            current += char;
        }
    }
    if (current) result.push(current);
    return result;
}

function getExtension(file) {
    return file?.name?.split('.').pop()?.toLowerCase() || 'mp4';
}

function withTimeout(promise, timeout, message) {
    let timer;
    const timeoutPromise = new Promise((_, reject) => {
        timer = window.setTimeout(() => reject(new Error(message)), timeout);
    });
    return Promise.race([promise, timeoutPromise]).finally(() => window.clearTimeout(timer));
}

async function imageDataToJpegBlob(data) {
    const pngBlob = new Blob([data], { type: 'image/png' });
    const pngUrl = URL.createObjectURL(pngBlob);
    try {
        const image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Could not load generated thumbnail.'));
            img.src = pngUrl;
        });
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Could not create image conversion canvas.');
        context.drawImage(image, 0, 0);
        return await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Could not encode thumbnail as JPEG.'));
            }, 'image/jpeg', 0.92);
        });
    } finally {
        URL.revokeObjectURL(pngUrl);
    }
}

function buildArgs({
    operation,
    inputName,
    duration,
    trim,
    convertFormat,
    compress,
    gif,
    audioFormat,
    thumbnail,
    speed,
    rotate,
    crop,
    fade,
    adjust,
    reverse,
    volume,
    loop,
    pad,
    normalize,
    denoise,
    sharpen,
    raw,
}) {
    const args = [];
    const hasTrim = !['thumbnail', 'loop'].includes(operation) && !raw.bypassTrim && duration > 0 &&
        (trim.start > 0 || trim.end < duration - 0.05);

    if (hasTrim) {
        args.push('-ss', trim.start.toFixed(3), '-t', Math.max(0.1, trim.end - trim.start).toFixed(3));
    }
    args.push('-i', inputName);

    let outputExt = 'mp4';

    if (operation === 'convert') {
        outputExt = convertFormat;
        if (['mp4', 'mkv', 'mov'].includes(convertFormat)) {
            args.push(...videoCodecArgs(), '-c:a', 'aac');
        } else if (convertFormat === 'webm') {
            args.push('-threads', '1', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '30', '-c:a', 'libopus');
        } else {
            args.push('-c:v', 'copy', '-c:a', 'copy');
        }
    }

    if (operation === 'compress') {
        const width = compress.width ? String(Math.max(2, Math.round(Number(compress.width) / 2) * 2)) : '-2';
        const height = compress.height ? String(Math.max(2, Math.round(Number(compress.height) / 2) * 2)) : '-2';
        outputExt = compress.format;
        args.push(
            '-vf', `scale=${width}:${height}`,
            ...videoCodecArgs(compress.preset),
            '-crf', String(compress.crf),
            '-c:a', 'aac',
            '-b:a', '128k'
        );
    }

    if (operation === 'gif') {
        outputExt = 'gif';
        args.push(
            '-filter_complex',
            `[0:v]fps=${gif.fps},scale=${gif.width}:-2:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse`
        );
    }

    if (operation === 'audio') {
        outputExt = audioFormat;
        args.push('-vn');
        if (audioFormat === 'mp3') args.push('-c:a', 'libmp3lame', '-q:a', '2');
        if (audioFormat === 'aac') args.push('-c:a', 'aac');
        if (audioFormat === 'wav') args.push('-c:a', 'pcm_s16le');
        if (audioFormat === 'ogg') args.push('-c:a', 'libvorbis');
        if (audioFormat === 'flac') args.push('-c:a', 'flac');
    }

    if (operation === 'mute') {
        outputExt = 'mp4';
        args.push('-an', ...videoCodecArgs());
    }

    if (operation === 'speed') {
        outputExt = 'mp4';
        const multiplier = clamp(decimal(speed.multiplier, 1), 0.25, 4);
        if (speed.keepAudio) {
            args.push(
                '-map', '0:v:0',
                '-map', '0:a?',
                '-vf', `setpts=${(1 / multiplier).toFixed(4)}*PTS`,
                '-af', atempoChain(multiplier),
                ...videoCodecArgs(),
                '-c:a', 'aac',
                '-b:a', '128k'
            );
        } else {
            args.push('-vf', `setpts=${(1 / multiplier).toFixed(4)}*PTS`, '-an', ...videoCodecArgs());
        }
    }

    if (operation === 'rotate') {
        outputExt = 'mp4';
        const filters = {
            cw: 'transpose=1',
            ccw: 'transpose=2',
            rotate180: 'transpose=1,transpose=1',
            hflip: 'hflip',
            vflip: 'vflip',
            both: 'hflip,vflip',
        };
        args.push('-vf', filters[rotate.mode] || filters.cw, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'crop') {
        outputExt = 'mp4';
        const width = Math.max(2, Math.round(decimal(crop.width, 0) / 2) * 2);
        const height = Math.max(2, Math.round(decimal(crop.height, 0) / 2) * 2);
        const x = Math.max(0, Math.round(decimal(crop.x, 0)));
        const y = Math.max(0, Math.round(decimal(crop.y, 0)));
        args.push('-vf', `crop=${width}:${height}:${x}:${y}`, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'reverse') {
        outputExt = 'mp4';
        if (reverse.keepAudio) {
            args.push('-map', '0:v:0', '-map', '0:a?', '-vf', 'reverse', '-af', 'areverse', ...videoCodecArgs(), '-c:a', 'aac');
        } else {
            args.push('-vf', 'reverse', '-an', ...videoCodecArgs());
        }
    }

    if (operation === 'fade') {
        outputExt = 'mp4';
        const fadeDuration = Math.max(0.1, decimal(fade.duration, 1));
        const selectedDuration = Math.max(0.1, hasTrim ? trim.end - trim.start : duration || fadeDuration * 2);
        const outStart = Math.max(0, selectedDuration - fadeDuration);
        const filters = [];
        if (fade.mode === 'in' || fade.mode === 'both') filters.push(`fade=t=in:st=0:d=${fadeDuration}`);
        if (fade.mode === 'out' || fade.mode === 'both') filters.push(`fade=t=out:st=${outStart.toFixed(3)}:d=${fadeDuration}`);
        args.push('-vf', filters.join(','), ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'adjust') {
        outputExt = 'mp4';
        const brightness = clamp(decimal(adjust.brightness, 0), -1, 1);
        const contrast = clamp(decimal(adjust.contrast, 1), 0, 2);
        const saturation = adjust.grayscale ? 0 : clamp(decimal(adjust.saturation, 1), 0, 3);
        args.push('-vf', `eq=brightness=${brightness}:contrast=${contrast}:saturation=${saturation}`, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'metadata') {
        outputExt = 'mp4';
        args.push('-map_metadata', '-1', '-c', 'copy');
    }

    if (operation === 'volume') {
        outputExt = 'mp4';
        args.push('-af', `volume=${clamp(decimal(volume.multiplier, 1), 0, 4)}`, '-c:v', 'copy', '-c:a', 'aac');
    }

    if (operation === 'loop') {
        outputExt = 'mp4';
        args.length = 0;
        args.push('-stream_loop', String(Math.max(1, Math.round(decimal(loop.count, 2)) - 1)), '-i', inputName, '-c', 'copy');
    }

    if (operation === 'pad') {
        outputExt = 'mp4';
        const ratio = ratioExpression(pad.ratio);
        const color = pad.color || 'black';
        const filter = `scale=w=if(gt(a\\,${ratio.w}/${ratio.h})\\,iw\\,-2):h=if(gt(a\\,${ratio.w}/${ratio.h})\\,-2\\,ih),pad=ceil(max(iw\\,ih*${ratio.w}/${ratio.h})/2)*2:ceil(max(ih\\,iw*${ratio.h}/${ratio.w})/2)*2:(ow-iw)/2:(oh-ih)/2:${color}`;
        args.push('-vf', filter, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'normalize') {
        outputExt = 'mp4';
        args.push('-af', `loudnorm=I=${normalizeTarget(normalize.target)}:TP=-1.5:LRA=11`, '-c:v', 'copy', '-c:a', 'aac');
    }

    if (operation === 'denoise') {
        outputExt = 'mp4';
        const presets = { light: '2:2:3:3', medium: '4:4:6:6', heavy: '10:10:15:15' };
        args.push('-vf', `hqdn3d=${presets[denoise.preset] || presets.medium}`, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'sharpen') {
        outputExt = 'mp4';
        const filter = sharpen.mode === 'blur' ? 'boxblur=2:1' : 'unsharp=5:5:1.0:5:5:0.0';
        args.push('-vf', filter, ...videoCodecArgs(), '-c:a', 'copy');
    }

    if (operation === 'thumbnail') {
        outputExt = thumbnail.format;
        args.length = 0;
        args.push('-ss', String(thumbnail.time || 0), '-i', inputName, '-frames:v', '1');
    }

    if (operation === 'raw') {
        outputExt = raw.ext.replace(/^\./, '') || 'mp4';
        if (raw.bypassTrim) {
            args.length = 0;
            args.push('-i', inputName);
        }
        args.push(...parseShellArgs(raw.args));
    }

    const ffmpegOutputExt = operation === 'thumbnail' && outputExt === 'jpg' ? 'png' : outputExt;
    args.push('-y', `output.${ffmpegOutputExt}`);
    return { args, outputExt, ffmpegOutputExt };
}

export default function VideoConvert({ copy = {} }) {
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const ffmpegRef = useRef(null);
    const fetchFileRef = useRef(null);
    const outputUrlRef = useRef('');

    const [file, setFile] = useState(null);
    const [inputUrl, setInputUrl] = useState('');
    const [meta, setMeta] = useState({ duration: 0, width: 0, height: 0 });
    const [operation, setOperation] = useState('convert');
    const [status, setStatus] = useState('idle');
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState(['Ready. Choose a video or audio file to begin.']);
    const [output, setOutput] = useState(null);
    const [convertFormat, setConvertFormat] = useState('mp4');
    const [audioFormat, setAudioFormat] = useState('mp3');
    const [compress, setCompress] = useState({ width: '', height: '', crf: 28, preset: 'ultrafast', format: 'mp4' });
    const [gif, setGif] = useState({ fps: 10, width: 480 });
    const [thumbnail, setThumbnail] = useState({ time: 0, format: 'jpg' });
    const [speed, setSpeed] = useState({ multiplier: 2, keepAudio: true });
    const [rotate, setRotate] = useState({ mode: 'cw' });
    const [crop, setCrop] = useState({ x: 0, y: 0, width: '', height: '' });
    const [fade, setFade] = useState({ mode: 'both', duration: 1 });
    const [adjust, setAdjust] = useState({ brightness: 0, contrast: 1, saturation: 1, grayscale: false });
    const [reverse, setReverse] = useState({ keepAudio: true });
    const [volume, setVolume] = useState({ multiplier: 1.5 });
    const [loop, setLoop] = useState({ count: 2 });
    const [pad, setPad] = useState({ ratio: '16:9', color: 'black' });
    const [normalize, setNormalize] = useState({ target: '-14' });
    const [denoise, setDenoise] = useState({ preset: 'medium' });
    const [sharpen, setSharpen] = useState({ mode: 'sharpen' });
    const [raw, setRaw] = useState({ args: '-threads 1 -vf scale=1280:-2 -c:v libx264 -crf 23 -preset ultrafast -pix_fmt yuv420p -c:a aac', ext: 'mp4', bypassTrim: false });
    const [trim, setTrim] = useState({ start: 0, end: 0 });

    const t = {
        upload: 'Click or drag media here',
        uploadHint: 'Video and audio stay in your browser. Nothing is uploaded.',
        process: 'Process Video',
        loading: 'Loading ffmpeg',
        loadFfmpeg: 'Load ffmpeg',
        ffmpegNotLoaded: 'ffmpeg not loaded - click "Load ffmpeg" to begin',
        ffmpegLoading: 'ffmpeg core is loading',
        ffmpegReady: 'ffmpeg ready - conversions will start faster',
        ffmpegProcessing: 'ffmpeg processing media',
        ffmpegError: 'ffmpeg needs attention - check the log below',
        processing: 'Processing',
        download: 'Download',
        ...copy,
    };

    const addLog = (message) => {
        setLogs((items) => [...items.slice(-80), message]);
    };

    const command = useMemo(() => {
        if (!file) return 'ffmpeg -i input.mp4 output.mp4';
        const inputName = `input.${getExtension(file)}`;
        const { args } = buildArgs({
            operation,
            inputName,
            duration: meta.duration,
            trim,
            convertFormat,
            compress,
            gif,
            audioFormat,
            thumbnail,
            speed,
            rotate,
            crop,
            fade,
            adjust,
            reverse,
            volume,
            loop,
            pad,
            normalize,
            denoise,
            sharpen,
            raw,
        });
        return `ffmpeg ${args.join(' ')}`;
    }, [adjust, audioFormat, compress, convertFormat, crop, denoise, fade, file, gif, loop, meta.duration, normalize, operation, pad, raw, reverse, rotate, sharpen, speed, thumbnail, trim, volume]);

    const estimate = useMemo(() => {
        if (!file || !meta.duration) return '';
        const selectedDuration = Math.max(0.1, (trim.end || meta.duration) - trim.start);
        let bytes = file.size * (selectedDuration / meta.duration);
        if (operation === 'compress') {
            const sourcePixels = Math.max(1, meta.width * meta.height);
            const targetPixels = (Number(compress.width) || meta.width || 1920) * (Number(compress.height) || meta.height || 1080);
            bytes = bytes * Math.min(1.2, Math.max(0.08, targetPixels / sourcePixels)) * Math.pow(2, (23 - Number(compress.crf)) / 6);
        }
        if (operation === 'gif') {
            const height = Math.max(1, Math.round(Number(gif.width) * (meta.height || 1080) / (meta.width || 1920)));
            bytes = Number(gif.width) * height * Number(gif.fps) * selectedDuration * 0.35;
        }
        if (operation === 'audio') {
            const rates = { mp3: 16000, aac: 16000, wav: 176400, ogg: 16000, flac: 88200 };
            bytes = (rates[audioFormat] || 16000) * selectedDuration;
        }
        if (operation === 'raw' || operation === 'thumbnail') return '';
        return formatBytes(Math.max(1, bytes));
    }, [audioFormat, compress, file, gif, meta, operation, trim]);

    const onFile = async (selected) => {
        if (!selected) return;
        if (inputUrl) URL.revokeObjectURL(inputUrl);
        if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
        const url = URL.createObjectURL(selected);
        const ext = getExtension(selected);
        setFile(selected);
        setInputUrl(url);
        setOutput(null);
        setLogs([`Loaded ${selected.name} (${formatBytes(selected.size)})`]);
        setTrim({ start: 0, end: 0 });
        setThumbnail((value) => ({ ...value, time: 0 }));
        if (['mp3', 'aac', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) {
            setOperation('audio');
        }
    };

    const loadFFmpeg = async () => {
        if (ffmpegRef.current?.loaded) {
            setFfmpegLoaded(true);
            return true;
        }
        setStatus('loading');
        setProgress(0);
        addLog('Starting same-origin ffmpeg worker...');
        const [{ FFmpeg }, { fetchFile }] = await Promise.all([
            import('@ffmpeg/ffmpeg'),
            import('@ffmpeg/util'),
        ]);
        const ffmpeg = new FFmpeg();
        ffmpeg.on('log', ({ message }) => {
            if (message) addLog(message);
        });
        ffmpeg.on('progress', ({ progress }) => {
            setProgress(Math.min(100, Math.max(0, Math.round(progress * 100))));
        });
        addLog('Downloading ffmpeg-core WebAssembly...');
        await withTimeout(
            ffmpeg.load({
                classWorkerURL: FFMPEG_WORKER_URL,
                coreURL: `${CORE_BASE}/ffmpeg-core.js`,
                wasmURL: `${CORE_BASE}/ffmpeg-core.wasm`,
            }),
            FFMPEG_LOAD_TIMEOUT,
            'ffmpeg load timed out. Please check your network and try again.'
        );
        ffmpegRef.current = ffmpeg;
        fetchFileRef.current = fetchFile;
        setFfmpegLoaded(true);
        setStatus('ready');
        setProgress(100);
        addLog('ffmpeg loaded.');
        return true;
    };

    const process = async () => {
        if (!file) return;
        try {
            await loadFFmpeg();
            setStatus('processing');
            setProgress(0);
            setOutput(null);
            const ffmpeg = ffmpegRef.current;
            const fetchFile = fetchFileRef.current;
            const inputName = `input.${getExtension(file)}`;
            const { args, outputExt, ffmpegOutputExt } = buildArgs({
                operation,
                inputName,
                duration: meta.duration,
                trim,
                convertFormat,
                compress,
                gif,
                audioFormat,
                thumbnail,
                speed,
                rotate,
                crop,
                fade,
                adjust,
                reverse,
                volume,
                loop,
                pad,
                normalize,
                denoise,
                sharpen,
                raw,
            });
            addLog('Writing input file...');
            await ffmpeg.writeFile(inputName, await fetchFile(file));
            addLog(`ffmpeg ${args.join(' ')}`);
            const exitCode = await ffmpeg.exec(args);
            if (exitCode !== 0) throw new Error(`ffmpeg exited with code ${exitCode}`);
            const outputName = `output.${ffmpegOutputExt}`;
            const data = await ffmpeg.readFile(outputName);
            if (operation === 'thumbnail' && outputExt === 'jpg') addLog('Converting generated PNG frame to JPEG...');
            const blob = operation === 'thumbnail' && outputExt === 'jpg'
                ? await imageDataToJpegBlob(data)
                : new Blob([data], { type: MIME[outputExt] || 'application/octet-stream' });
            if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
            const url = URL.createObjectURL(blob);
            outputUrlRef.current = url;
            setOutput({ blob, url, ext: outputExt, size: blob.size });
            addLog(`Done. Output size: ${formatBytes(blob.size)}.`);
            await ffmpeg.deleteFile(inputName).catch(() => {});
            await ffmpeg.deleteFile(outputName).catch(() => {});
            setStatus('ready');
            setProgress(100);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            addLog(`Error: ${message}`);
            if (/memory access out of bounds|RuntimeError/i.test(message)) {
                ffmpegRef.current?.terminate?.();
                ffmpegRef.current = null;
                fetchFileRef.current = null;
                setFfmpegLoaded(false);
                addLog('ffmpeg worker reset after a WebAssembly runtime error.');
            }
            setStatus('error');
        }
    };

    const preloadFFmpeg = async () => {
        try {
            await loadFFmpeg();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            addLog(`Error: ${message}`);
            setStatus('error');
            setFfmpegLoaded(false);
        }
    };

    const download = () => {
        if (!output) return;
        const anchor = document.createElement('a');
        anchor.href = output.url;
        anchor.download = `shoteasy-output.${output.ext}`;
        anchor.click();
    };

    const clearMedia = () => {
        if (inputUrl) URL.revokeObjectURL(inputUrl);
        if (outputUrlRef.current) URL.revokeObjectURL(outputUrlRef.current);
        outputUrlRef.current = '';
        if (fileInputRef.current) fileInputRef.current.value = '';
        setFile(null);
        setInputUrl('');
        setMeta({ duration: 0, width: 0, height: 0 });
        setTrim({ start: 0, end: 0 });
        setOutput(null);
        setLogs(['Ready. Choose a video or audio file to begin.']);
    };

    const onMetadata = (event) => {
        const media = event?.currentTarget || videoRef.current;
        if (!media) return;
        const duration = Number.isFinite(media.duration) ? media.duration : 0;
        const width = media.videoWidth || 0;
        const height = media.videoHeight || 0;
        setMeta({ duration, width, height });
        setTrim({ start: 0, end: duration });
        setCompress((value) => ({ ...value, width: width || '', height: height || '' }));
        setCrop((value) => ({ ...value, width: width || '', height: height || '' }));
        setThumbnail((value) => ({ ...value, time: duration ? Number((duration / 2).toFixed(1)) : 0 }));
    };

    const renderSettings = () => {
        if (operation === 'convert') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Output format
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={convertFormat} onChange={(event) => setConvertFormat(event.target.value)}>
                        <option value="mp4">MP4 (H.264 + AAC)</option>
                        <option value="webm">WebM (VP9 + Opus)</option>
                        <option value="mkv">MKV</option>
                        <option value="mov">MOV</option>
                        <option value="avi">AVI (copy)</option>
                    </select>
                </label>
            );
        }
        if (operation === 'compress') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Field label="Width" value={compress.width} onChange={(width) => setCompress((value) => ({ ...value, width }))} />
                    <Field label="Height" value={compress.height} onChange={(height) => setCompress((value) => ({ ...value, height }))} />
                    <Range label={`CRF ${compress.crf}`} min="18" max="40" value={compress.crf} onChange={(crf) => setCompress((value) => ({ ...value, crf }))} />
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Preset
                        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={compress.preset} onChange={(event) => setCompress((value) => ({ ...value, preset: event.target.value }))}>
                            <option value="ultrafast">ultrafast</option>
                            <option value="fast">fast</option>
                            <option value="medium">medium</option>
                            <option value="slow">slow</option>
                            <option value="veryslow">veryslow</option>
                        </select>
                    </label>
                </div>
            );
        }
        if (operation === 'gif') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Field label="Width" value={gif.width} onChange={(width) => setGif((value) => ({ ...value, width }))} />
                    <Range label={`FPS ${gif.fps}`} min="4" max="24" value={gif.fps} onChange={(fps) => setGif((value) => ({ ...value, fps }))} />
                </div>
            );
        }
        if (operation === 'speed') {
            return (
                <div className="space-y-3">
                    <Range label={`Multiplier ${speed.multiplier}x`} min="0.25" max="4" step="0.25" value={speed.multiplier} onChange={(multiplier) => setSpeed((value) => ({ ...value, multiplier }))} />
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <input type="checkbox" checked={speed.keepAudio} onChange={(event) => setSpeed((value) => ({ ...value, keepAudio: event.target.checked }))} />
                        Preserve and retime audio
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {[0.5, 1, 1.5, 2].map((item) => (
                            <button key={item} type="button" className="rounded-md border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-600 hover:border-blue-300 hover:bg-blue-50" onClick={() => setSpeed((value) => ({ ...value, multiplier: item }))}>{item}x</button>
                        ))}
                    </div>
                </div>
            );
        }
        if (operation === 'rotate') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Transform
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={rotate.mode} onChange={(event) => setRotate({ mode: event.target.value })}>
                        <option value="cw">Rotate 90 clockwise</option>
                        <option value="ccw">Rotate 90 counter-clockwise</option>
                        <option value="rotate180">Rotate 180</option>
                        <option value="hflip">Flip horizontal</option>
                        <option value="vflip">Flip vertical</option>
                        <option value="both">Flip both axes</option>
                    </select>
                </label>
            );
        }
        if (operation === 'crop') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Field label="X" value={crop.x} onChange={(x) => setCrop((value) => ({ ...value, x }))} />
                    <Field label="Y" value={crop.y} onChange={(y) => setCrop((value) => ({ ...value, y }))} />
                    <Field label="Width" value={crop.width} onChange={(width) => setCrop((value) => ({ ...value, width }))} />
                    <Field label="Height" value={crop.height} onChange={(height) => setCrop((value) => ({ ...value, height }))} />
                </div>
            );
        }
        if (operation === 'audio') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Audio format
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={audioFormat} onChange={(event) => setAudioFormat(event.target.value)}>
                        <option value="mp3">MP3</option>
                        <option value="aac">AAC</option>
                        <option value="wav">WAV</option>
                        <option value="ogg">OGG</option>
                        <option value="flac">FLAC</option>
                    </select>
                </label>
            );
        }
        if (operation === 'thumbnail') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Field label="Timestamp seconds" value={thumbnail.time} onChange={(time) => setThumbnail((value) => ({ ...value, time }))} />
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Image format
                        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={thumbnail.format} onChange={(event) => setThumbnail((value) => ({ ...value, format: event.target.value }))}>
                            <option value="jpg">JPEG</option>
                            <option value="png">PNG</option>
                        </select>
                    </label>
                </div>
            );
        }
        if (operation === 'reverse') {
            return (
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <input type="checkbox" checked={reverse.keepAudio} onChange={(event) => setReverse({ keepAudio: event.target.checked })} />
                    Reverse audio too
                </label>
            );
        }
        if (operation === 'fade') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Fade mode
                        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={fade.mode} onChange={(event) => setFade((value) => ({ ...value, mode: event.target.value }))}>
                            <option value="both">Fade in and out</option>
                            <option value="in">Fade in only</option>
                            <option value="out">Fade out only</option>
                        </select>
                    </label>
                    <Field label="Duration seconds" value={fade.duration} onChange={(duration) => setFade((value) => ({ ...value, duration }))} />
                </div>
            );
        }
        if (operation === 'adjust') {
            return (
                <div className="space-y-3">
                    <Range label={`Brightness ${adjust.brightness}`} min="-1" max="1" step="0.1" value={adjust.brightness} onChange={(brightness) => setAdjust((value) => ({ ...value, brightness }))} />
                    <Range label={`Contrast ${adjust.contrast}`} min="0" max="2" step="0.1" value={adjust.contrast} onChange={(contrast) => setAdjust((value) => ({ ...value, contrast }))} />
                    <Range label={`Saturation ${adjust.grayscale ? 0 : adjust.saturation}`} min="0" max="3" step="0.1" value={adjust.saturation} onChange={(saturation) => setAdjust((value) => ({ ...value, saturation }))} />
                    <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <input type="checkbox" checked={adjust.grayscale} onChange={(event) => setAdjust((value) => ({ ...value, grayscale: event.target.checked }))} />
                        Grayscale
                    </label>
                </div>
            );
        }
        if (operation === 'metadata') {
            return <p className="text-sm text-slate-500">Removes embedded metadata while stream-copying video and audio when possible.</p>;
        }
        if (operation === 'volume') {
            return <Range label={`Volume ${volume.multiplier}x`} min="0" max="4" step="0.1" value={volume.multiplier} onChange={(multiplier) => setVolume({ multiplier })} />;
        }
        if (operation === 'loop') {
            return <Range label={`Total plays ${loop.count}`} min="2" max="20" step="1" value={loop.count} onChange={(count) => setLoop({ count })} />;
        }
        if (operation === 'pad') {
            return (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Target ratio
                        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={pad.ratio} onChange={(event) => setPad((value) => ({ ...value, ratio: event.target.value }))}>
                            <option value="16:9">16:9</option>
                            <option value="9:16">9:16</option>
                            <option value="1:1">1:1</option>
                            <option value="4:3">4:3</option>
                            <option value="4:5">4:5</option>
                            <option value="21:9">21:9</option>
                        </select>
                    </label>
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Pad color
                        <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={pad.color} onChange={(event) => setPad((value) => ({ ...value, color: event.target.value }))}>
                            <option value="black">Black</option>
                            <option value="white">White</option>
                            <option value="gray">Gray</option>
                        </select>
                    </label>
                </div>
            );
        }
        if (operation === 'normalize') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Target loudness
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={normalize.target} onChange={(event) => setNormalize({ target: event.target.value })}>
                        <option value="-14">-14 LUFS (YouTube / Spotify)</option>
                        <option value="-16">-16 LUFS (Podcast)</option>
                        <option value="-23">-23 LUFS (Broadcast)</option>
                    </select>
                </label>
            );
        }
        if (operation === 'denoise') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Strength
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={denoise.preset} onChange={(event) => setDenoise({ preset: event.target.value })}>
                        <option value="light">Light</option>
                        <option value="medium">Medium</option>
                        <option value="heavy">Heavy</option>
                    </select>
                </label>
            );
        }
        if (operation === 'sharpen') {
            return (
                <label className="space-y-1 text-xs font-semibold text-slate-500">
                    Effect
                    <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={sharpen.mode} onChange={(event) => setSharpen({ mode: event.target.value })}>
                        <option value="sharpen">Sharpen</option>
                        <option value="blur">Blur</option>
                    </select>
                </label>
            );
        }
        if (operation === 'raw') {
            return (
                <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        {RAW_EXAMPLES.map((example) => (
                            <button
                                key={example.label}
                                className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                                type="button"
                                onClick={() => setRaw((value) => ({ ...value, args: example.args, ext: example.ext }))}
                            >
                                <span className="block font-bold text-slate-700">{example.label}</span>
                                <code className="line-clamp-1 text-[11px] text-slate-400">{example.args}</code>
                            </button>
                        ))}
                    </div>
                    <label className="space-y-1 text-xs font-semibold text-slate-500">
                        Arguments after input
                        <textarea className="min-h-24 w-full rounded-md border border-slate-200 bg-white p-3 font-mono text-xs text-slate-700" value={raw.args} onChange={(event) => setRaw((value) => ({ ...value, args: event.target.value }))} />
                    </label>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <Field label="Output extension" value={raw.ext} onChange={(ext) => setRaw((value) => ({ ...value, ext }))} />
                        <label className="flex items-center gap-2 pt-6 text-xs font-semibold text-slate-500">
                            <input type="checkbox" checked={raw.bypassTrim} onChange={(event) => setRaw((value) => ({ ...value, bypassTrim: event.target.checked }))} />
                            Bypass trim
                        </label>
                    </div>
                </div>
            );
        }
        return <p className="text-sm text-slate-500">The output keeps the video track and removes the audio stream.</p>;
    };

    const audioOutput = output && ['mp3', 'aac', 'wav', 'ogg', 'flac'].includes(output.ext);
    const imageOutput = output && ['gif', 'jpg', 'png'].includes(output.ext);
    const ffmpegStatus = getFFmpegStatus({ status, ffmpegLoaded, progress, copy: t });
    const isAudioInput = file?.type?.startsWith('audio/');

    return (
        <div className="rounded-md border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_390px]">
                <div className="space-y-4">
                    <div className="flex flex-col gap-2 rounded-md border border-slate-100 bg-white px-3 py-2 text-slate-500 shadow-sm md:flex-row md:items-center md:justify-between">
                        <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2 text-xs font-semibold">
                                <span className={`h-2 w-2 shrink-0 rounded-full ${ffmpegStatus.dotClass}`} />
                                <span className="truncate">{ffmpegStatus.label}</span>
                            </div>
                            {(status === 'loading' || status === 'processing') && (
                                <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-100">
                                    <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${progress}%` }} />
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            disabled={status === 'loading' || status === 'processing' || ffmpegLoaded}
                            onClick={preloadFFmpeg}
                            className="inline-flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-md bg-blue-600 px-2.5 text-xs font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                        >
                            <Icon name={status === 'loading' ? 'Loader2' : ffmpegLoaded ? 'CheckCircle2' : 'Play'} size={13} className={status === 'loading' ? 'animate-spin' : ''} />
                            {ffmpegStatus.button}
                        </button>
                    </div>

                    <div
                        className={`rounded-md border ${file ? 'border-slate-200 bg-slate-950 p-3' : 'cursor-pointer border-dashed border-blue-200 bg-sky-50/70 p-6 text-center transition hover:border-blue-400 hover:bg-sky-50'}`}
                        onClick={() => {
                            if (!file) fileInputRef.current?.click();
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => {
                            event.preventDefault();
                            onFile(event.dataTransfer.files?.[0]);
                        }}
                    >
                        <input ref={fileInputRef} className="hidden" type="file" accept="video/*,audio/*,.mkv,.mov,.avi,.webm,.mp4,.mp3,.wav,.flac,.ogg,.aac" onChange={(event) => onFile(event.target.files?.[0])} />
                        {file ? (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="min-w-0 text-xs font-semibold text-slate-400">
                                        <span className="block truncate text-slate-200">{file.name}</span>
                                        <span>{formatBytes(file.size)}</span>
                                    </div>
                                    <button type="button" onClick={clearMedia} className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-white/10 px-2.5 text-xs font-bold text-slate-200 hover:bg-white/10">
                                        <Icon name="X" size={14} />
                                        Clear
                                    </button>
                                </div>
                                {isAudioInput ? (
                                    <div className="flex min-h-[260px] items-center rounded bg-slate-900 p-6">
                                        <audio src={inputUrl} controls className="w-full" onLoadedMetadata={onMetadata} />
                                    </div>
                                ) : (
                                    <video ref={videoRef} src={inputUrl} controls className="max-h-[430px] w-full rounded bg-black" onLoadedMetadata={onMetadata} />
                                )}
                            </div>
                        ) : (
                            <div className="flex min-h-[320px] flex-col items-center justify-center">
                                <Icon name="UploadCloud" size={34} className="mb-2 inline-flex text-blue-600" />
                                <p className="text-sm font-bold text-slate-700">{t.upload}</p>
                                <p className="mt-1 text-xs text-slate-400">{t.uploadHint}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 md:grid-cols-4">
                        <Info label="File" value={file?.name || '-'} />
                        <Info label="Size" value={file ? formatBytes(file.size) : '-'} />
                        <Info label="Duration" value={formatTime(meta.duration)} />
                        <Info label="Resolution" value={meta.width ? `${meta.width} x ${meta.height}` : '-'} />
                    </div>

                    {file && meta.duration > 0 && operation !== 'thumbnail' && (
                        <div className="rounded-md bg-slate-50 p-3">
                            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                                <span>Trim</span>
                                <span>{formatTime(trim.start)} - {formatTime(trim.end || meta.duration)}</span>
                            </div>
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                <Range label="Start" min="0" max={meta.duration} step="0.1" value={trim.start} onChange={(start) => setTrim((value) => ({ ...value, start: Math.min(Number(start), value.end - 0.1) }))} />
                                <Range label="End" min="0" max={meta.duration} step="0.1" value={trim.end || meta.duration} onChange={(end) => setTrim((value) => ({ ...value, end: Math.max(Number(end), value.start + 0.1) }))} />
                            </div>
                        </div>
                    )}

                    <div className="rounded-md bg-slate-950 p-3 font-mono text-xs text-slate-300">
                        <div className="mb-2 flex items-center gap-2 text-slate-500"><Icon name="TerminalSquare" /> Command preview</div>
                        <div className="break-all">{command}</div>
                    </div>

                    <div className="rounded-md bg-slate-950 p-3">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-500">
                            <span>FFmpeg Log</span>
                            <button type="button" className="text-slate-300 hover:text-white" onClick={() => setLogs([])}>Clear</button>
                        </div>
                        <div className="max-h-48 overflow-auto font-mono text-[11px] leading-5 text-slate-300">
                            {logs.map((item, index) => <div key={`${item}-${index}`}>{item}</div>)}
                        </div>
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="grid grid-cols-2 gap-1.5">
                        {OPERATIONS.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setOperation(item.id)}
                                className={`rounded-md border px-2.5 py-2 text-left transition ${operation === item.id ? 'border-blue-500 bg-blue-600 text-white shadow-sm shadow-blue-100' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50'}`}
                            >
                                <span className="flex min-w-0 items-center gap-1.5">
                                    <Icon name={item.icon} size={14} className="shrink-0" />
                                    <span className="truncate text-sm font-bold leading-5">{item.title}</span>
                                    {item.badge && <span className="shrink-0 text-xs leading-none" aria-label="Popular">{item.badge}</span>}
                                </span>
                                <span className={`mt-0.5 block truncate text-[11px] leading-4 ${operation === item.id ? 'text-blue-100' : 'text-slate-400'}`}>{item.desc}</span>
                            </button>
                        ))}
                    </div>

                    <div className="rounded-md border border-slate-100 bg-white p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-extrabold text-slate-700">Settings</h3>
                        {renderSettings()}
                        {estimate && <div className="mt-3 rounded-md bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">Estimated output: {estimate}</div>}
                    </div>

                    <button
                        type="button"
                        disabled={!file || status === 'loading' || status === 'processing'}
                        onClick={process}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        <Icon name={status === 'processing' ? 'Loader2' : 'Cog'} className={status === 'processing' ? 'animate-spin' : ''} />
                        {status === 'processing' ? t.processing : t.process}
                    </button>

                    <div className="rounded-md border border-slate-100 bg-white p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-extrabold text-slate-700">Output</h3>
                        {!output && <div className="rounded-md bg-slate-50 p-4 text-center text-xs text-slate-400">Process a file to preview the result.</div>}
                        {output && (
                            <div className="space-y-3">
                                {audioOutput && <audio src={output.url} controls className="w-full" />}
                                {imageOutput && <img src={output.url} className="max-h-52 w-full rounded-md object-contain" alt="Converted output preview" />}
                                {!audioOutput && !imageOutput && <video src={output.url} controls className="w-full rounded-md bg-black" />}
                                <button type="button" onClick={download} className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500">
                                    <Icon name="Download" />
                                    {t.download} ({formatBytes(output.size)})
                                </button>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

function Field({ label, value, onChange }) {
    return (
        <label className="space-y-1 text-xs font-semibold text-slate-500">
            {label}
            <input className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700" value={value} onChange={(event) => onChange(event.target.value)} />
        </label>
    );
}

function Range({ label, value, onChange, ...props }) {
    return (
        <label className="space-y-1 text-xs font-semibold text-slate-500">
            {label}
            <input className="h-10 w-full accent-blue-600" type="range" value={value} onChange={(event) => onChange(event.target.value)} {...props} />
        </label>
    );
}

function getFFmpegStatus({ status, ffmpegLoaded, progress, copy }) {
    if (status === 'loading') {
        return {
            dotClass: 'bg-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.18)]',
            label: `${copy.ffmpegLoading} (${progress}%)`,
            button: `${copy.loading} ${progress}%`,
        };
    }
    if (status === 'processing') {
        return {
            dotClass: 'bg-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.18)]',
            label: copy.ffmpegProcessing,
            button: copy.processing,
        };
    }
    if (ffmpegLoaded) {
        return {
            dotClass: 'bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.18)]',
            label: copy.ffmpegReady,
            button: 'ffmpeg ready',
        };
    }
    if (status === 'error') {
        return {
            dotClass: 'bg-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.18)]',
            label: copy.ffmpegError,
            button: `${copy.loadFfmpeg} (${FFMPEG_DOWNLOAD_SIZE})`,
        };
    }
    return {
        dotClass: 'bg-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.18)]',
        label: copy.ffmpegNotLoaded,
        button: `${copy.loadFfmpeg} (${FFMPEG_DOWNLOAD_SIZE})`,
    };
}

function Info({ label, value }) {
    return (
        <div className="min-w-0 rounded-md bg-white/80 p-3 shadow-sm">
            <div className="mb-1 text-[11px] font-bold uppercase text-slate-400">{label}</div>
            <div className="truncate text-sm font-semibold text-slate-700" title={value}>{value}</div>
        </div>
    );
}
