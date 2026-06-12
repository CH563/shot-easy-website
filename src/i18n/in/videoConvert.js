import en from '../en/videoConvert';

export default {
    ...en,
    title: 'GIF Maker, Video to GIF & MP4 to GIF Converter | ShotEasy',
    description: 'Free online GIF maker and video to GIF converter for India. Convert MP4 to GIF, compress video, change speed, extract audio, crop, trim, and run FFmpeg in your browser.',
    keywords: 'gif maker, video to gif, mp4 to gif, online gif maker India, convert video to gif, mp4 gif converter, video converter, ffmpeg wasm, compress video, trim video, extract audio from video',
    h1: 'GIF Maker and Video to GIF Converter',
    tip: 'Convert MP4 to GIF, make GIFs from video, compress clips, and edit media locally with ffmpeg.wasm. No upload, no sign-up, no server queue.',
    seoIntro: 'ShotEasy Video Convert is a local-first GIF maker, video to GIF converter, and MP4 to GIF tool powered by ffmpeg.wasm. It supports common creator and product-video workflows while keeping files inside your browser.',
    tool: {
        ...en.tool,
        upload: 'Click or drag video/audio here',
        uploadHint: 'Your media stays in this browser. Nothing is uploaded.',
        process: 'Process Video',
        loading: 'Loading ffmpeg',
        loadFfmpeg: 'Load ffmpeg',
        ffmpegNotLoaded: 'ffmpeg not loaded - click "Load ffmpeg" to begin',
        ffmpegLoading: 'ffmpeg core is loading',
        ffmpegReady: 'ffmpeg ready - conversions will start faster',
        ffmpegProcessing: 'ffmpeg is processing media',
        ffmpegError: 'ffmpeg needs attention - check the log below',
        processing: 'Processing',
        download: 'Download',
        ui: {
            ...en.tool.ui,
            preserveAudio: 'Preserve and retime audio',
            metadataHelp: 'Removes embedded metadata while stream-copying video and audio wherever possible.',
            colors: {
                black: 'Black',
                white: 'White',
                gray: 'Grey'
            },
            strengthOptions: {
                light: 'Light',
                medium: 'Medium',
                heavy: 'Heavy'
            },
            effectOptions: {
                sharpen: 'Sharpen',
                blur: 'Blur'
            }
        },
        operations: {
            convert: { title: 'Convert', desc: 'Change video format' },
            compress: { title: 'Compress', desc: 'Resize and reduce size' },
            gif: { title: 'GIF', desc: 'Create animated GIF' },
            speed: { title: 'Speed', desc: 'Change playback speed' },
            rotate: { title: 'Rotate', desc: 'Rotate or flip video' },
            crop: { title: 'Crop', desc: 'Crop video frame' },
            audio: { title: 'Audio', desc: 'Extract soundtrack' },
            mute: { title: 'Mute', desc: 'Remove audio track' },
            thumbnail: { title: 'Frame', desc: 'Export one image' },
            reverse: { title: 'Reverse', desc: 'Reverse video' },
            fade: { title: 'Fade', desc: 'Fade in and out' },
            adjust: { title: 'Adjust', desc: 'Colour adjustments' },
            metadata: { title: 'Metadata', desc: 'Strip metadata' },
            volume: { title: 'Volume', desc: 'Change audio volume' },
            loop: { title: 'Loop', desc: 'Repeat the clip' },
            pad: { title: 'Pad', desc: 'Pad or letterbox' },
            normalize: { title: 'Normalise', desc: 'Normalise loudness' },
            denoise: { title: 'Denoise', desc: 'Reduce video noise' },
            sharpen: { title: 'Sharpen', desc: 'Sharpen or blur' },
            raw: { title: 'Raw', desc: 'Custom FFmpeg args' }
        }
    }
}
