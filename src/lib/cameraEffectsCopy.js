const en = {
  title: 'Camera Effects — Virtual Background, Blur & Beautify',
  description: 'Add a virtual background, blur, beautify or auto-framing to your camera in the browser. The effect runs on your device with WebGPU or WebGL2 — your video is never uploaded.',
  keywords: 'camera effects online, virtual background, blur background camera, beautify camera, auto framing, webcam effects, local video effects',
  badge: 'longpipe · Local processing',
  tip: 'Virtual background, blur, beautify and auto-framing — right in your browser',
  cards: [
    ['🔒', 'No video uploads', 'Your camera stream is processed on your device. The browser only downloads the effect model files from ShotEasy.'],
    ['🎥', 'Virtual background & blur', 'Replace your background with a blur, a solid color or your own image — or keep the original scene.'],
    ['✨', 'Beautify & auto-framing', 'Smooth your skin tone and let the camera follow you as you move. Take a photo or record a clip anytime.'],
  ],
  introTitle: 'Camera effects powered by longpipe',
  intro: 'This tool uses the open-source longpipe SDK to run real-time video effects on your device. The segmentation model separates you from your background, then applies blur, a color, an image — or a beautify and auto-framing pass — before the frame reaches the preview. It prefers WebGPU and falls back to WebGL2.',
  techTitle: 'How local camera effects work',
  tech: [
    ['On-device segmentation', 'A small neural network (about 7 MB) finds the person in each frame and builds a matte. The model runs in your browser — no frame is sent to a server.'],
    ['WebGPU first, WebGL2 fallback', 'The SDK uses WebGPU when your browser and GPU support it, and WebGL2 otherwise. If neither is available, the tool shows your original camera feed.'],
    ['Self-hosted models', 'The effect weights are served from shoteasy.fun itself, not a third-party CDN. They download once (about 9 MB on first use) and can be cached by the browser.'],
    ['Private video workflow', 'The camera stream, photos and recordings stay on your device. Only the public model files are downloaded.'],
  ],
  howTitle: 'Use camera effects in four steps',
  steps: [
    ['1', 'Start the camera', 'Allow camera access in your browser. The model downloads on first use.'],
    ['2', 'Pick a background', 'Choose blur, a solid color, your own image — or keep the original background.'],
    ['3', 'Tune the look', 'Turn on beautify and auto-framing, and pick a quality preset that fits your device.'],
    ['4', 'Capture or record', 'Take a PNG photo or record a WebM clip of the processed video.'],
  ],
  faqTitle: 'Camera effects FAQ',
  faqs: [
    ['Does ShotEasy upload my video?', 'No. The camera stream is processed locally in your browser. Only the effect model files are downloaded from ShotEasy; your video never leaves the device.'],
    ['Why is the first start slower?', 'The first run downloads the effect model (about 7 MB) plus face-landmark files (about 1.5 MB). The browser can cache them, so later starts are usually faster.'],
    ['What if my browser has no WebGPU?', 'The tool falls back to WebGL2, which most modern browsers support. If neither is available, it shows your original camera feed and tells you.'],
    ['Does recording include audio?', 'Yes, the camera microphone track is recorded as-is. Noise reduction is not part of this version.'],
  ],
};

const zh = {
  title: '摄像头特效 — 虚拟背景、模糊与美颜',
  description: '在浏览器中为摄像头添加虚拟背景、模糊、美颜或自动取景。特效通过 WebGPU 或 WebGL2 在设备本地运行，视频不会被上传。',
  keywords: '摄像头特效, 虚拟背景, 摄像头背景模糊, 美颜, 自动取景, 在线摄像头特效',
  badge: 'longpipe · 本地处理',
  tip: '虚拟背景、模糊、美颜、自动取景，全部在浏览器中完成',
  cards: [
    ['🔒', '视频不上传', '摄像头画面在设备本地处理，浏览器只从 ShotEasy 下载特效模型文件。'],
    ['🎥', '虚拟背景与模糊', '把背景换成模糊、纯色或你自己的图片，也可以保留原始场景。'],
    ['✨', '美颜与自动取景', '平滑肤色，镜头还会跟随你移动，随时拍照或录制片段。'],
  ],
  introTitle: '由 longpipe 驱动的摄像头特效',
  intro: '本工具使用开源 longpipe SDK，在设备上实时处理视频特效。分割模型先把人物从背景中分离出来，再对画面做模糊、换色、换图，或叠加美颜与自动取景，最后才进入预览。优先使用 WebGPU，不支持时回退到 WebGL2。',
  techTitle: '本地摄像头特效如何工作',
  tech: [
    ['设备端分割', '一个约 7 MB 的小型神经网络在每帧中找出人物并生成遮罩，模型在浏览器中运行，不会把画面发送到服务器。'],
    ['WebGPU 优先，WebGL2 兜底', '浏览器与显卡支持时使用 WebGPU，否则使用 WebGL2。如果两者都没有，工具会显示原始摄像头画面并提示你。'],
    ['模型自托管', '特效权重文件由 shoteasy.fun 自己提供，不走第三方 CDN。首次使用下载约 9 MB，浏览器可缓存。'],
    ['隐私视频流程', '摄像头画面、照片和录制内容都留在设备上，只下载公开的模型文件。'],
  ],
  howTitle: '四步用好摄像头特效',
  steps: [
    ['1', '开启摄像头', '在浏览器中允许访问摄像头，首次使用会下载模型。'],
    ['2', '选择背景', '选择模糊、纯色、自己的图片，或保留原始背景。'],
    ['3', '调整效果', '开启美颜和自动取景，再选一个适合设备的画质档位。'],
    ['4', '拍照或录制', '拍摄 PNG 照片，或录制处理后的 WebM 视频片段。'],
  ],
  faqTitle: '摄像头特效常见问题',
  faqs: [
    ['ShotEasy 会上传我的视频吗？', '不会。摄像头画面在浏览器本地处理，只从 ShotEasy 下载特效模型文件，视频不会离开设备。'],
    ['为什么第一次启动比较慢？', '首次运行需要下载特效模型（约 7 MB）及面部关键点文件（约 1.5 MB），浏览器缓存后再次启动通常更快。'],
    ['浏览器没有 WebGPU 怎么办？', '工具会回退到 WebGL2，绝大多数现代浏览器都支持。如果两者都没有，会显示原始摄像头画面并提示。'],
    ['录制包含声音吗？', '包含，摄像头麦克风音轨会原样录制。本版本不提供降噪功能。'],
  ],
};

const ru = {
  title: 'Эффекты для камеры онлайн — виртуальный фон, размытие и ретушь',
  description: 'Добавьте виртуальный фон, размытие, ретушь или авто-кадрирование к камере прямо в браузере. Эффекты работают на вашем устройстве через WebGPU или WebGL2 — видео никуда не загружается.',
  keywords: 'эффекты для камеры онлайн, виртуальный фон, размытие фона камеры, ретушь камеры, авто кадрирование, эффекты веб-камеры',
  badge: 'longpipe · Локальная обработка',
  tip: 'Виртуальный фон, размытие, ретушь и авто-кадрирование — прямо в браузере',
  cards: [
    ['🔒', 'Видео не загружается', 'Поток с камеры обрабатывается на вашем устройстве. Браузер скачивает только файлы модели эффектов с ShotEasy.'],
    ['🎥', 'Виртуальный фон и размытие', 'Замените фон размытием, сплошным цветом или своим изображением — или оставьте исходную сцену.'],
    ['✨', 'Ретушь и авто-кадрирование', 'Сгладьте тон кожи, а камера будет следовать за вами. Сделайте фото или запишите клип в любой момент.'],
  ],
  introTitle: 'Эффекты для камеры на базе longpipe',
  intro: 'Инструмент использует открытый SDK longpipe для эффектов видео в реальном времени на вашем устройстве. Модель сегментации отделяет вас от фона, затем применяет размытие, цвет, изображение — или ретушь и авто-кадрирование — до того, как кадр попадёт в предпросмотр. Приоритет — WebGPU, при его отсутствии используется WebGL2.',
  techTitle: 'Как работают локальные эффекты камеры',
  tech: [
    ['Сегментация на устройстве', 'Небольшая нейросеть (около 7 МБ) находит человека в каждом кадре и строит маску. Модель работает в браузере — кадры не отправляются на сервер.'],
    ['Сначала WebGPU, иначе WebGL2', 'SDK использует WebGPU, если браузер и видеокарта его поддерживают, иначе — WebGL2. Если нет ни того, ни другого, инструмент показывает исходное видео с камеры.'],
    ['Модели на нашем сервере', 'Веса эффектов отдаются с shoteasy.fun, а не со стороннего CDN. Они скачиваются один раз (около 9 МБ при первом запуске) и могут кэшироваться браузером.'],
    ['Приватная работа с видео', 'Поток с камеры, фото и записи остаются на вашем устройстве. Скачиваются только публичные файлы модели.'],
  ],
  howTitle: 'Эффекты для камеры за четыре шага',
  steps: [
    ['1', 'Включите камеру', 'Разрешите доступ к камере в браузере. При первом запуске скачивается модель.'],
    ['2', 'Выберите фон', 'Размытие, сплошной цвет, своё изображение — или исходный фон.'],
    ['3', 'Настройте вид', 'Включите ретушь и авто-кадрирование и выберите качество под своё устройство.'],
    ['4', 'Снимите фото или видео', 'Сохраните фото в PNG или запишите обработанное видео в WebM.'],
  ],
  faqTitle: 'Вопросы об эффектах для камеры',
  faqs: [
    ['Загружает ли ShotEasy моё видео?', 'Нет. Поток с камеры обрабатывается локально в браузере. С ShotEasy скачиваются только файлы модели эффектов, видео не покидает устройство.'],
    ['Почему первый запуск медленнее?', 'При первом запуске скачиваются модель эффектов (около 7 МБ) и файлы ключевых точек лица (около 1,5 МБ). Браузер может их кэшировать, поэтому следующие запуски обычно быстрее.'],
    ['Что делать, если в браузере нет WebGPU?', 'Инструмент перейдёт на WebGL2, который поддерживают почти все современные браузеры. Если нет и его, будет показано исходное видео с камеры.'],
    ['Записывается ли звук?', 'Да, звук с микрофона камеры записывается как есть. Шумоподавления в этой версии нет.'],
  ],
};

const uk = {
  title: 'Ефекти для камери онлайн — віртуальний фон, розмиття та ретуш',
  description: 'Додайте віртуальний фон, розмиття, ретуш або авто-кадрування до камери просто в браузері. Ефекти працюють на вашому пристрої через WebGPU або WebGL2 — відео нікуди не завантажується.',
  keywords: 'ефекти для камери онлайн, віртуальний фон, розмиття фону камери, ретуш камери, авто кадрування, ефекти веб-камери',
  badge: 'longpipe · Локальна обробка',
  tip: 'Віртуальний фон, розмиття, ретуш і авто-кадрування — просто в браузері',
  cards: [
    ['🔒', 'Відео не завантажується', 'Потік із камери обробляється на вашому пристрої. Браузер завантажує лише файли моделі ефектів із ShotEasy.'],
    ['🎥', 'Віртуальний фон і розмиття', 'Замініть фон розмиттям, суцільним кольором або власним зображенням — або залиште початкову сцену.'],
    ['✨', 'Ретуш і авто-кадрування', 'Згладьте тон шкіри, а камера стежитиме за вами. Зробіть фото або запишіть кліп у будь-який момент.'],
  ],
  introTitle: 'Ефекти для камери на базі longpipe',
  intro: 'Інструмент використовує відкритий SDK longpipe для ефектів відео в реальному часі на вашому пристрої. Модель сегментації відокремлює вас від фону, а потім застосовує розмиття, колір, зображення — або ретуш і авто-кадрування — до того, як кадр потрапить у попередній перегляд. Пріоритет — WebGPU, за його відсутності використовується WebGL2.',
  techTitle: 'Як працюють локальні ефекти камери',
  tech: [
    ['Сегментація на пристрої', 'Невелика нейромережа (близько 7 МБ) знаходить людину в кожному кадрі й будує маску. Модель працює в браузері — кадри не надсилаються на сервер.'],
    ['Спочатку WebGPU, інакше WebGL2', 'SDK використовує WebGPU, якщо браузер і відеокарта його підтримують, інакше — WebGL2. Якщо немає ні того, ні іншого, інструмент показує початкове відео з камери.'],
    ['Моделі на нашому сервері', 'Ваги ефектів віддаються з shoteasy.fun, а не зі стороннього CDN. Вони завантажуються один раз (близько 9 МБ під час першого запуску) і можуть кешуватися браузером.'],
    ['Приватна робота з відео', 'Потік із камери, фото й записи залишаються на вашому пристрої. Завантажуються лише публічні файли моделі.'],
  ],
  howTitle: 'Ефекти для камери за чотири кроки',
  steps: [
    ['1', 'Увімкніть камеру', 'Дозвольте доступ до камери в браузері. Під час першого запуску завантажується модель.'],
    ['2', 'Виберіть фон', 'Розмиття, суцільний колір, власне зображення — або початковий фон.'],
    ['3', 'Налаштуйте вигляд', 'Увімкніть ретуш і авто-кадрування та виберіть якість під свій пристрій.'],
    ['4', 'Зробіть фото або відео', 'Збережіть фото у PNG або запишіть оброблене відео у WebM.'],
  ],
  faqTitle: 'Питання про ефекти для камери',
  faqs: [
    ['Чи завантажує ShotEasy моє відео?', 'Ні. Потік із камери обробляється локально в браузері. Із ShotEasy завантажуються лише файли моделі ефектів, відео не покидає пристрій.'],
    ['Чому перший запуск повільніший?', 'Під час першого запуску завантажуються модель ефектів (близько 7 МБ) і файли ключових точок обличчя (близько 1,5 МБ). Браузер може їх кешувати, тому наступні запуски зазвичай швидші.'],
    ['Що робити, якщо в браузері немає WebGPU?', 'Інструмент перейде на WebGL2, який підтримують майже всі сучасні браузери. Якщо немає і його, буде показано початкове відео з камери.'],
    ['Чи записується звук?', 'Так, звук із мікрофона камери записується як є. Шумозаглушення в цій версії немає.'],
  ],
};

const fr = {
  title: 'Effets caméra en ligne — arrière-plan virtuel, flou et retouche',
  description: 'Ajoutez un arrière-plan virtuel, un flou, une retouche ou un recadrage automatique à votre caméra dans le navigateur. Les effets tournent sur votre appareil avec WebGPU ou WebGL2 — votre vidéo n’est jamais envoyée.',
  keywords: 'effets caméra en ligne, arrière-plan virtuel, flouter arrière-plan caméra, retouche caméra, recadrage automatique, effets webcam',
  badge: 'longpipe · Traitement local',
  tip: 'Arrière-plan virtuel, flou, retouche et recadrage automatique — dans votre navigateur',
  cards: [
    ['🔒', 'Aucune vidéo envoyée', 'Le flux de votre caméra est traité sur votre appareil. Le navigateur ne télécharge que les fichiers du modèle d’effets depuis ShotEasy.'],
    ['🎥', 'Arrière-plan virtuel et flou', 'Remplacez votre arrière-plan par un flou, une couleur unie ou votre propre image — ou gardez la scène d’origine.'],
    ['✨', 'Retouche et recadrage auto', 'Lissez le teint de votre peau et laissez la caméra vous suivre. Prenez une photo ou enregistrez un clip à tout moment.'],
  ],
  introTitle: 'Effets caméra propulsés par longpipe',
  intro: 'Cet outil utilise le SDK open source longpipe pour appliquer des effets vidéo en temps réel sur votre appareil. Le modèle de segmentation vous sépare de votre arrière-plan, puis applique un flou, une couleur, une image — ou une retouche et un recadrage automatique — avant que l’image n’atteigne l’aperçu. WebGPU est prioritaire, WebGL2 prend le relais sinon.',
  techTitle: 'Comment fonctionnent les effets caméra locaux',
  tech: [
    ['Segmentation sur l’appareil', 'Un petit réseau de neurones (environ 7 Mo) repère la personne dans chaque image et construit un masque. Le modèle tourne dans le navigateur — aucune image n’est envoyée à un serveur.'],
    ['WebGPU d’abord, WebGL2 sinon', 'Le SDK utilise WebGPU quand votre navigateur et votre GPU le permettent, sinon WebGL2. Si aucun des deux n’est disponible, l’outil affiche votre vidéo d’origine.'],
    ['Modèles auto-hébergés', 'Les poids des effets sont servis par shoteasy.fun lui-même, pas par un CDN tiers. Ils se téléchargent une fois (environ 9 Mo au premier usage) et peuvent être mis en cache par le navigateur.'],
    ['Flux vidéo privé', 'Le flux de la caméra, les photos et les enregistrements restent sur votre appareil. Seuls les fichiers publics du modèle sont téléchargés.'],
  ],
  howTitle: 'Utiliser les effets caméra en quatre étapes',
  steps: [
    ['1', 'Démarrez la caméra', 'Autorisez l’accès à la caméra dans votre navigateur. Le modèle se télécharge au premier usage.'],
    ['2', 'Choisissez un arrière-plan', 'Flou, couleur unie, votre propre image — ou l’arrière-plan d’origine.'],
    ['3', 'Ajustez le rendu', 'Activez la retouche et le recadrage automatique, puis choisissez un préréglage de qualité adapté à votre appareil.'],
    ['4', 'Capturez ou enregistrez', 'Prenez une photo PNG ou enregistrez un clip WebM de la vidéo traitée.'],
  ],
  faqTitle: 'Questions sur les effets caméra',
  faqs: [
    ['ShotEasy envoie-t-il ma vidéo ?', 'Non. Le flux de la caméra est traité localement dans votre navigateur. Seuls les fichiers du modèle d’effets sont téléchargés depuis ShotEasy ; votre vidéo ne quitte pas l’appareil.'],
    ['Pourquoi le premier démarrage est-il plus lent ?', 'Le premier lancement télécharge le modèle d’effets (environ 7 Mo) et les fichiers de points de repère du visage (environ 1,5 Mo). Le navigateur peut les mettre en cache, donc les démarrages suivants sont généralement plus rapides.'],
    ['Que se passe-t-il sans WebGPU ?', 'L’outil bascule sur WebGL2, pris en charge par la plupart des navigateurs modernes. Si aucun des deux n’est disponible, il affiche votre vidéo d’origine.'],
    ['L’enregistrement inclut-il le son ?', 'Oui, la piste du microphone de la caméra est enregistrée telle quelle. La réduction de bruit ne fait pas partie de cette version.'],
  ],
};

const copies = { en, 'zh-CN': zh, ru, uk, fr, 'en-in': { ...en } };

export function getCameraEffectsCopy(locale) {
  return copies[locale] || copies.en;
}
