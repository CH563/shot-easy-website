export default {
    title: 'GIF Maker、Video to GIF、MP4 to GIF 在线转换 | ShotEasy',
    description: '免费在线 GIF maker 和 video to gif 转换工具，支持 MP4 to GIF、视频压缩、变速、裁剪、提取音频和 FFmpeg 本地处理。',
    keywords: 'gif maker, video to gif, mp4 to gif, 在线 GIF 制作, 视频转 GIF, MP4 转 GIF, 视频转换, ffmpeg wasm, 浏览器视频编辑, 视频压缩, 视频裁剪, 提取视频音频',
    h1: 'GIF Maker 和 Video to GIF 在线转换',
    tip: '使用 ffmpeg.wasm 在浏览器本地完成 MP4 to GIF、video to gif、视频压缩和音频处理。无需上传、无需注册、无需排队。',
    localTitle: '本地视频转换',
    localCont1: 'Video Convert 直接在浏览器中通过 WebAssembly 运行 FFmpeg，媒体文件保留在你的设备上。',
    localCont2: '支持 MP4、WebM、MOV、MKV、GIF、音频提取、缩略图和常用压缩参数。',
    workflowTitle: 'ffmpeg.wasm 的作用',
    workflowCont1: 'ffmpeg.wasm 通过 WebAssembly 将 FFmpeg 带到浏览器中，让视频和音频处理无需依赖后端转换服务。',
    workflowCont2: '它负责格式转换、压缩、裁剪、GIF 制作、音频提取、画面截图和自定义 FFmpeg 命令，同时让文件保留在本地。',
    privacyTitle: '默认保护隐私',
    privacyCont1: '转换时文件只会写入浏览器里的 FFmpeg 虚拟文件系统。',
    privacyCont2: '因为所有处理都在本机完成，大视频可能需要更长时间。',
    seoTitle: '免费的浏览器 GIF maker 和视频转换工具',
    seoIntro: 'ShotEasy Video Convert 是基于 ffmpeg.wasm 的本地优先 gif maker、video to gif 和 MP4 to GIF 工具。它参考 ffmpeg-webCLI 的工作流，覆盖常见视频处理场景，同时让文件保留在当前浏览器中。',
    featureSections: [
        {
            title: '把 MP4、MOV、WebM 等视频制作成 GIF',
            body: '选择 GIF 功能即可把短视频片段转换成动图。你可以设置输出宽度和 FPS，也可以先裁剪时间范围，再生成更适合社交媒体、产品演示或表情包的 GIF。这是 video to gif、mp4 to gif 和在线 GIF maker 的核心流程。'
        },
        {
            title: '在浏览器本地转换视频格式',
            body: '支持转换到 MP4、WebM、MKV、MOV、AVI 等格式。MP4 使用 H.264 和 AAC，兼容性更好；WebM 更适合网页发布。所有转换都在浏览器中运行，不需要上传到云端队列。'
        },
        {
            title: '压缩、缩放、裁剪和截取视频',
            body: '通过 CRF 控制压缩质量，调整输出尺寸，裁剪画面区域，或在处理前用 Trim 选择开始和结束时间。Trim 可以和 GIF 制作、压缩、变速、滤镜等多数功能组合使用。'
        },
        {
            title: '调整速度、反转、循环和淡入淡出',
            body: '支持 0.25x 到 4x 的播放速度调整，可以反转视频和音频，循环重复片段，或添加淡入淡出效果，适合制作发布预告、演示短片、循环视频和社交素材。'
        },
        {
            title: '提取、静音、标准化和调整音频',
            body: '可以把视频音轨提取成 MP3、AAC、WAV、OGG、FLAC，也可以移除音频、调整音量，或用 loudnorm 按 YouTube、播客和广播标准做响度标准化。'
        },
        {
            title: '截图、移除元数据、补边、降噪、锐化和 Raw FFmpeg',
            body: '支持导出 JPEG 或 PNG 单帧、移除嵌入元数据、添加 letterbox/pillarbox 补边、降噪、锐化或模糊；需要更高级处理时，也可以直接运行 Raw FFmpeg 参数。'
        }
    ],
    faqTitle: 'Video to GIF 和 FFmpeg 常见问题',
    faqs: [
        {
            question: '如何在线把 MP4 转 GIF？',
            answer: '上传或拖入 MP4 文件，选择 GIF 功能，设置 GIF 宽度和 FPS，必要时先裁剪片段，然后点击处理并下载生成的 GIF。'
        },
        {
            question: '这个 GIF maker 会上传我的视频吗？',
            answer: '不会。ShotEasy 使用 ffmpeg.wasm 在浏览器本地处理文件，视频不会上传到转换服务器。'
        },
        {
            question: '它只能做 video to gif 吗？',
            answer: '不只如此。除了 video to gif 和 mp4 to gif，还支持视频格式转换、压缩、裁剪、旋转、变速、反转、提取音频、静音、音频标准化、导出单帧和 Raw FFmpeg 命令。'
        },
        {
            question: '为什么处理大视频会比较慢？',
            answer: '因为 FFmpeg 通过 WebAssembly 在你的设备上运行。高分辨率视频、GIF 生成、反转和降噪等操作会更耗时，但文件可以保持本地处理。'
        }
    ],
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
        download: '下载',
        ui: {
            outputFormat: '输出格式',
            width: '宽度',
            height: '高度',
            preset: '预设',
            multiplier: '倍速',
            preserveAudio: '保留并同步调整音频',
            transform: '变换方式',
            audioFormat: '音频格式',
            timestampSeconds: '时间点（秒）',
            imageFormat: '图片格式',
            reverseAudio: '同时反转音频',
            fadeMode: '淡入淡出模式',
            durationSeconds: '持续时间（秒）',
            brightness: '亮度',
            contrast: '对比度',
            saturation: '饱和度',
            grayscale: '灰度',
            metadataHelp: '在尽可能直接复制视频和音频流的同时，移除嵌入的元数据。',
            volume: '音量',
            totalPlays: '总播放次数',
            targetRatio: '目标比例',
            padColor: '补边颜色',
            targetLoudness: '目标响度',
            strength: '强度',
            effect: '效果',
            argumentsAfterInput: '输入文件后的参数',
            outputExtension: '输出扩展名',
            bypassTrim: '跳过裁剪时间',
            muteHelp: '输出会保留视频轨道，并移除音频流。',
            clear: '清除',
            file: '文件',
            size: '大小',
            duration: '时长',
            resolution: '分辨率',
            trim: '裁剪时长',
            start: '开始',
            end: '结束',
            commandPreview: '命令预览',
            ffmpegLog: 'FFmpeg 日志',
            settings: '设置',
            estimatedOutput: '预计输出',
            output: '输出',
            outputEmpty: '处理文件后可预览结果。',
            outputPreviewAlt: '转换结果预览',
            rotateOptions: {
                cw: '顺时针旋转 90 度',
                ccw: '逆时针旋转 90 度',
                rotate180: '旋转 180 度',
                hflip: '水平翻转',
                vflip: '垂直翻转',
                both: '水平和垂直翻转'
            },
            fadeOptions: {
                both: '淡入并淡出',
                in: '仅淡入',
                out: '仅淡出'
            },
            colors: {
                black: '黑色',
                white: '白色',
                gray: '灰色'
            },
            strengthOptions: {
                light: '轻度',
                medium: '中等',
                heavy: '强力'
            },
            effectOptions: {
                sharpen: '锐化',
                blur: '模糊'
            }
        },
        operations: {
            convert: { title: '转换', desc: '更改视频格式' },
            compress: { title: '压缩', desc: '调整尺寸并减小体积' },
            gif: { title: 'GIF', desc: '制作动态 GIF' },
            speed: { title: '变速', desc: '调整播放速度' },
            rotate: { title: '旋转', desc: '旋转或翻转视频' },
            crop: { title: '裁剪', desc: '裁剪视频画面' },
            audio: { title: '音频', desc: '提取视频音轨' },
            mute: { title: '静音', desc: '移除音频轨道' },
            thumbnail: { title: '单帧', desc: '导出一张图片' },
            reverse: { title: '反转', desc: '倒放视频' },
            fade: { title: '淡入淡出', desc: '添加淡入和淡出' },
            adjust: { title: '调色', desc: '调整画面颜色' },
            metadata: { title: '元数据', desc: '移除嵌入信息' },
            volume: { title: '音量', desc: '调整音频音量' },
            loop: { title: '循环', desc: '重复播放片段' },
            pad: { title: '补边', desc: '添加留白或黑边' },
            normalize: { title: '响度标准化', desc: '标准化音频响度' },
            denoise: { title: '降噪', desc: '降低视频噪点' },
            sharpen: { title: '锐化', desc: '锐化或模糊画面' },
            raw: { title: 'Raw', desc: '自定义 FFmpeg 参数' }
        }
    }
}
