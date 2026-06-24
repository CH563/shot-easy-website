import en from '../en/videoConvert';

export default {
    ...en,
    title: 'GIF Maker і конвертер відео в GIF онлайн | ShotEasy',
    description: 'Безкоштовний GIF maker і конвертер відео: MP4 у GIF, стиснення відео, зміна швидкості, обрізка, аудіо та FFmpeg локально в браузері без завантаження.',
    keywords: 'gif maker, відео в gif, mp4 у gif, конвертер відео онлайн, стиснути відео, обрізати відео, ffmpeg wasm, video to gif Україна',
    h1: 'GIF Maker і конвертер відео в GIF',
    tip: 'Конвертуйте MP4 у GIF, стискайте кліпи і редагуйте медіа локально з ffmpeg.wasm. Без завантаження, реєстрації і черг.',
    localTitle: 'Локальна конвертація відео',
    localCont1: 'Video Convert запускає FFmpeg прямо у браузері через WebAssembly, тому медіафайли залишаються на вашому пристрої.',
    localCont2: 'Підтримуються MP4, WebM, MOV, MKV, GIF, витяг аудіо, кадри-превʼю і швидкі пресети стиснення.',
    workflowTitle: 'Що робить ffmpeg.wasm',
    workflowCont1: 'ffmpeg.wasm переносить FFmpeg у браузер і дозволяє обробляти відео та аудіо без серверного конвертера.',
    workflowCont2: 'Він підтримує зміну формату, стиснення, обрізку за часом, створення GIF, витяг аудіо, експорт кадрів і власні команди FFmpeg.',
    privacyTitle: 'Приватність за замовчуванням',
    privacyCont1: 'Під час обробки файли записуються тільки у віртуальну файлову систему FFmpeg у браузері.',
    privacyCont2: 'Великі відео можуть оброблятися довше, бо вся робота виконується на вашому компʼютері.',
    seoTitle: 'Безкоштовний GIF maker і відеоконвертер у браузері',
    seoIntro: 'ShotEasy Video Convert - локальний інструмент для video to GIF, MP4 у GIF і базової відеообробки на ffmpeg.wasm.',
    faqTitle: 'Питання про video to GIF і FFmpeg',
    faqs: [
        {
            question: 'Як конвертувати MP4 у GIF онлайн?',
            answer: 'Додайте MP4, виберіть операцію GIF, налаштуйте ширину і FPS, за потреби обріжте фрагмент і скачайте GIF.'
        },
        {
            question: 'Чи приватний цей GIF maker?',
            answer: 'Так. Файл обробляється локально у браузері з ffmpeg.wasm і не надсилається на сервер конвертації.'
        }
    ],
    tool: {
        ...en.tool,
        upload: 'Натисніть або перетягніть відео/аудіо сюди',
        uploadHint: 'Медіа залишається у цьому браузері. Нічого не завантажується на сервер.',
        process: 'Обробити відео',
        loading: 'Завантаження ffmpeg',
        loadFfmpeg: 'Завантажити ffmpeg',
        ffmpegNotLoaded: 'ffmpeg не завантажено - натисніть «Завантажити ffmpeg»',
        ffmpegLoading: 'ядро ffmpeg завантажується',
        ffmpegReady: 'ffmpeg готовий',
        ffmpegProcessing: 'ffmpeg обробляє медіа',
        ffmpegError: 'перевірте журнал ffmpeg',
        processing: 'Обробка',
        download: 'Скачати'
    }
};
