import en from '../en/videoConvert';

export default {
    ...en,
    title: 'Tạo GIF, Video to GIF và MP4 to GIF | ShotEasy',
    description: 'Công cụ tạo GIF miễn phí và chuyển video sang GIF. Chuyển MP4 sang GIF, nén video, đổi tốc độ, trích xuất âm thanh, cắt khung và chạy FFmpeg trong trình duyệt.',
    keywords: 'gif maker, tạo gif, video to gif, video sang gif, mp4 to gif, mp4 sang gif, chuyển đổi video, ffmpeg wasm, nén video, cắt video, trích xuất âm thanh từ video',
    h1: 'Công cụ tạo GIF và chuyển video sang GIF',
    tip: 'Chuyển MP4 sang GIF, tạo GIF từ video, nén clip và chỉnh sửa media cục bộ bằng ffmpeg.wasm. Không tải lên, không đăng ký, không xếp hàng.',
    localTitle: 'Chuyển đổi video cục bộ',
    localCont1: 'Video Convert chạy FFmpeg trực tiếp trong trình duyệt bằng WebAssembly, vì vậy media vẫn ở trên thiết bị của bạn.',
    localCont2: 'Dùng cho MP4, WebM, MOV, MKV, GIF, trích xuất âm thanh, ảnh đại diện và các thiết lập nén nhanh.',
    workflowTitle: 'ffmpeg.wasm làm gì',
    workflowCont1: 'ffmpeg.wasm đưa FFmpeg vào trình duyệt thông qua WebAssembly, giúp xử lý video và âm thanh mà không cần máy chủ chuyển đổi.',
    workflowCont2: 'Nó hỗ trợ chuyển định dạng, nén, cắt thời lượng, tạo GIF, trích xuất âm thanh, chụp khung hình và lệnh FFmpeg tuỳ chỉnh trong trình duyệt.',
    privacyTitle: 'Riêng tư theo mặc định',
    privacyCont1: 'Tệp chỉ được ghi vào hệ thống tệp ảo FFmpeg trong trình duyệt khi xử lý.',
    privacyCont2: 'Video lớn có thể mất thời gian vì mọi xử lý diễn ra trên máy của bạn thay vì máy chủ từ xa.',
    seoTitle: 'Công cụ tạo GIF và chuyển đổi video miễn phí trong trình duyệt',
    seoIntro: 'ShotEasy Video Convert là công cụ gif maker, video to GIF và MP4 to GIF ưu tiên xử lý cục bộ, chạy bằng ffmpeg.wasm. Công cụ hỗ trợ các quy trình giống ffmpeg-webCLI và giữ tệp trong trình duyệt.',
    featureSections: [
        {
            title: 'Tạo GIF từ MP4, MOV, WebM và các video khác',
            body: 'Dùng chức năng GIF để chuyển một đoạn video ngắn thành GIF động. Bạn có thể đặt chiều rộng, FPS và để FFmpeg tạo bảng màu chất lượng hơn.'
        },
        {
            title: 'Chuyển đổi định dạng video cục bộ',
            body: 'Chuyển hoặc remux video sang MP4, WebM, MKV, MOV hoặc AVI. MP4 dùng H.264 và AAC để tương thích rộng, còn WebM phù hợp cho web.'
        },
        {
            title: 'Nén, đổi kích thước, cắt khung và cắt thời lượng',
            body: 'Giảm dung lượng bằng CRF, đổi kích thước đầu ra, cắt vùng khung hình hoặc chọn khoảng thời gian trước khi xử lý.'
        },
        {
            title: 'Đổi tốc độ, đảo ngược, lặp và thêm hiệu ứng mờ dần',
            body: 'Tăng hoặc giảm tốc từ 0.25x đến 4x, đảo ngược video và âm thanh, lặp clip hoặc thêm fade in/fade out.'
        },
        {
            title: 'Trích xuất, tắt tiếng, chuẩn hoá và chỉnh âm thanh',
            body: 'Xuất âm thanh thành MP3, AAC, WAV, OGG hoặc FLAC; xoá âm thanh; đổi âm lượng; hoặc chuẩn hoá độ lớn bằng loudnorm.'
        },
        {
            title: 'Chụp khung hình, xoá metadata và dùng Raw FFmpeg',
            body: 'Xuất một khung hình JPEG hoặc PNG, xoá metadata, thêm viền, giảm nhiễu, làm nét hoặc làm mờ, và chạy tham số Raw FFmpeg.'
        }
    ],
    faqTitle: 'Câu hỏi về video to GIF và FFmpeg',
    faqs: [
        {
            question: 'Làm sao chuyển MP4 sang GIF online?',
            answer: 'Tải lên hoặc kéo thả MP4, chọn GIF, đặt chiều rộng và FPS, cắt đoạn nếu cần, rồi xử lý và tải GIF xuống.'
        },
        {
            question: 'Công cụ tạo GIF này có riêng tư không?',
            answer: 'Có. Tệp được xử lý cục bộ trong trình duyệt bằng ffmpeg.wasm. ShotEasy không tải video của bạn lên máy chủ chuyển đổi.'
        },
        {
            question: 'Có thể dùng như công cụ chuyển đổi video thông thường không?',
            answer: 'Có. Ngoài video to GIF và MP4 to GIF, trang còn hỗ trợ chuyển định dạng, nén, cắt, xoay, đổi tốc độ, đảo ngược, âm thanh, ảnh khung hình và lệnh FFmpeg.'
        },
        {
            question: 'Vì sao xử lý có thể mất thời gian?',
            answer: 'Trình duyệt đang chạy FFmpeg trên thiết bị của bạn bằng WebAssembly. Video lớn, tạo GIF, đảo ngược và giảm nhiễu có thể lâu hơn.'
        }
    ],
    tool: {
        ...en.tool,
        upload: 'Nhấp hoặc kéo thả video/âm thanh vào đây',
        uploadHint: 'Media của bạn ở lại trong trình duyệt này. Không có gì được tải lên.',
        process: 'Xử lý video',
        loading: 'Đang tải ffmpeg',
        loadFfmpeg: 'Tải ffmpeg',
        ffmpegNotLoaded: 'ffmpeg chưa được tải - nhấp "Tải ffmpeg" để bắt đầu',
        ffmpegLoading: 'lõi ffmpeg đang tải',
        ffmpegReady: 'ffmpeg đã sẵn sàng - chuyển đổi sẽ bắt đầu nhanh hơn',
        ffmpegProcessing: 'ffmpeg đang xử lý media',
        ffmpegError: 'ffmpeg cần chú ý - xem nhật ký bên dưới',
        processing: 'Đang xử lý',
        download: 'Tải xuống',
        ui: {
            outputFormat: 'Định dạng xuất',
            width: 'Chiều rộng',
            height: 'Chiều cao',
            preset: 'Preset',
            multiplier: 'Hệ số',
            preserveAudio: 'Giữ và chỉnh thời gian âm thanh',
            transform: 'Biến đổi',
            audioFormat: 'Định dạng âm thanh',
            timestampSeconds: 'Mốc thời gian (giây)',
            imageFormat: 'Định dạng ảnh',
            reverseAudio: 'Đảo ngược cả âm thanh',
            fadeMode: 'Chế độ mờ dần',
            durationSeconds: 'Thời lượng (giây)',
            brightness: 'Độ sáng',
            contrast: 'Độ tương phản',
            saturation: 'Độ bão hoà',
            grayscale: 'Thang xám',
            metadataHelp: 'Xoá metadata nhúng và cố gắng sao chép trực tiếp luồng video, âm thanh khi có thể.',
            volume: 'Âm lượng',
            totalPlays: 'Tổng lượt phát',
            targetRatio: 'Tỷ lệ mục tiêu',
            padColor: 'Màu viền',
            targetLoudness: 'Độ lớn mục tiêu',
            strength: 'Cường độ',
            effect: 'Hiệu ứng',
            argumentsAfterInput: 'Tham số sau tệp đầu vào',
            outputExtension: 'Phần mở rộng xuất',
            bypassTrim: 'Bỏ qua cắt thời lượng',
            muteHelp: 'Đầu ra giữ lại track video và xoá luồng âm thanh.',
            clear: 'Xoá',
            file: 'Tệp',
            size: 'Kích thước',
            duration: 'Thời lượng',
            resolution: 'Độ phân giải',
            trim: 'Cắt thời lượng',
            start: 'Bắt đầu',
            end: 'Kết thúc',
            commandPreview: 'Xem trước lệnh',
            ffmpegLog: 'Nhật ký FFmpeg',
            settings: 'Thiết lập',
            estimatedOutput: 'Dung lượng ước tính',
            output: 'Đầu ra',
            outputEmpty: 'Xử lý một tệp để xem trước kết quả.',
            outputPreviewAlt: 'Xem trước kết quả đã chuyển đổi',
            rotateOptions: {
                cw: 'Xoay 90 độ theo chiều kim đồng hồ',
                ccw: 'Xoay 90 độ ngược chiều kim đồng hồ',
                rotate180: 'Xoay 180 độ',
                hflip: 'Lật ngang',
                vflip: 'Lật dọc',
                both: 'Lật cả hai trục'
            },
            fadeOptions: {
                both: 'Mờ vào và mờ ra',
                in: 'Chỉ mờ vào',
                out: 'Chỉ mờ ra'
            },
            colors: {
                black: 'Đen',
                white: 'Trắng',
                gray: 'Xám'
            },
            strengthOptions: {
                light: 'Nhẹ',
                medium: 'Vừa',
                heavy: 'Mạnh'
            },
            effectOptions: {
                sharpen: 'Làm nét',
                blur: 'Làm mờ'
            }
        },
        operations: {
            convert: { title: 'Đổi định dạng', desc: 'Đổi định dạng video' },
            compress: { title: 'Nén', desc: 'Giảm kích thước' },
            gif: { title: 'GIF', desc: 'Tạo GIF động' },
            speed: { title: 'Tốc độ', desc: 'Đổi tốc độ phát' },
            rotate: { title: 'Xoay', desc: 'Xoay hoặc lật video' },
            crop: { title: 'Cắt khung', desc: 'Cắt khung video' },
            audio: { title: 'Âm thanh', desc: 'Trích xuất âm thanh' },
            mute: { title: 'Tắt tiếng', desc: 'Xoá track âm thanh' },
            thumbnail: { title: 'Khung hình', desc: 'Xuất một ảnh' },
            reverse: { title: 'Đảo ngược', desc: 'Phát video ngược' },
            fade: { title: 'Mờ dần', desc: 'Thêm fade in/out' },
            adjust: { title: 'Điều chỉnh', desc: 'Chỉnh màu video' },
            metadata: { title: 'Metadata', desc: 'Xoá metadata' },
            volume: { title: 'Âm lượng', desc: 'Đổi âm lượng' },
            loop: { title: 'Lặp', desc: 'Lặp lại clip' },
            pad: { title: 'Thêm viền', desc: 'Thêm viền/letterbox' },
            normalize: { title: 'Chuẩn hoá', desc: 'Chuẩn hoá độ lớn' },
            denoise: { title: 'Giảm nhiễu', desc: 'Giảm nhiễu video' },
            sharpen: { title: 'Làm nét', desc: 'Làm nét hoặc làm mờ' },
            raw: { title: 'Raw', desc: 'Tham số FFmpeg' }
        }
    }
}
