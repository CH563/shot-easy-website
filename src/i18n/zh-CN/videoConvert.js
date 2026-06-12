export default {
    title: '在线视频转换',
    description: '免费在浏览器本地转换、压缩、裁剪视频，提取音频，制作 GIF，并运行 FFmpeg 命令。',
    tip: '使用 ffmpeg.wasm 在浏览器本地转换和压缩视频。无需上传、无需注册、无需排队。',
    localTitle: '本地视频转换',
    localCont1: 'Video Convert 直接在浏览器中通过 WebAssembly 运行 FFmpeg，媒体文件保留在你的设备上。',
    localCont2: '支持 MP4、WebM、MOV、MKV、GIF、音频提取、缩略图和常用压缩参数。',
    workflowTitle: 'ffmpeg.wasm 的作用',
    workflowCont1: 'ffmpeg.wasm 通过 WebAssembly 将 FFmpeg 带到浏览器中，让视频和音频处理无需依赖后端转换服务。',
    workflowCont2: '它负责格式转换、压缩、裁剪、GIF 制作、音频提取、画面截图和自定义 FFmpeg 命令，同时让文件保留在本地。',
    privacyTitle: '默认保护隐私',
    privacyCont1: '转换时文件只会写入浏览器里的 FFmpeg 虚拟文件系统。',
    privacyCont2: '因为所有处理都在本机完成，大视频可能需要更长时间。',
    tool: {
        upload: '点击或拖放视频/音频到这里',
        uploadHint: '媒体文件只保留在当前浏览器，不会上传。',
        process: '处理视频',
        loading: '加载 ffmpeg',
        loadFfmpeg: '加载 ffmpeg',
        ffmpegNotLoaded: 'ffmpeg 尚未加载 - 点击“加载 ffmpeg”开始',
        ffmpegLoading: 'ffmpeg 核心正在加载',
        ffmpegReady: 'ffmpeg 已就绪 - 接下来的转换会更快',
        ffmpegProcessing: 'ffmpeg 正在处理媒体',
        ffmpegError: 'ffmpeg 需要处理 - 请查看下方日志',
        processing: '处理中',
        download: '下载'
    }
}
