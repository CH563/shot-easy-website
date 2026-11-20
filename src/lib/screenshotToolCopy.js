const en = {
  capture: 'Screenshot',
  captureHint: 'If a window is missing, maximize it and retry. You can also take a system screenshot and paste it here.',
  openImage: 'Open / Paste image',
  pasteHint: 'Paste with Ctrl+V or Command+V. The image is processed locally.',
  preview: 'Screenshot preview',
  crop: 'Crop image', grid: 'Grid', clear: 'Clear screenshot',
  zoomOut: 'Zoom out', zoomIn: 'Zoom in', rotateLeft: 'Rotate 90°',
  rotation: 'Rotation', aspect: 'Aspect ratio', landscape: 'Landscape', portrait: 'Portrait',
  cancel: 'Cancel crop', apply: 'Apply crop', download: 'Save PNG', copy: 'Copy image',
  downloadSuccess: 'PNG saved.', downloadFailed: 'Could not save the image. Please retry.',
  copySuccess: 'Image copied.', copyFailed: 'Could not copy the image. Save the PNG instead.',
  cropFailed: 'Could not crop the image. Select an area and retry.',
  imageFailed: 'Could not open this image. Try a PNG or JPEG file.',
  loadFailed: 'Could not load the screenshot editor. Reload the page to retry.',
  captureUnsupported: 'This browser cannot capture the screen. Take a system screenshot, then open or paste the image here.',
  captureDenied: 'Screen capture was cancelled or permission was denied. Retry and allow sharing, or open/paste a system screenshot.',
  captureFailed: 'Could not capture the screen. Check browser and system permissions, or open/paste a system screenshot.',
  urlTitle: 'Screenshot a website by URL',
  urlPlaceholder: 'https://example.com',
  urlCapture: 'Capture URL',
  urlHint: 'Up to 5 URL screenshots every 10 minutes. The page is rendered on the server and opens in the editor below.',
  urlInvalid: 'Enter a valid http(s) URL, for example https://example.com.',
  urlRateLimited: 'Too many URL screenshots. Try again in {s} seconds.',
  urlFailed: 'Could not capture this page. Check the URL and retry.',
  urlUnavailable: 'URL screenshots are not available right now. Try again later.',
  urlCooldown: 'Wait {s}s'
};

const ru = {
  capture: 'Скриншот',
  captureHint: 'Если нужного окна нет в списке, разверните его и повторите попытку. Можно также сделать системный скриншот и вставить его сюда.',
  openImage: 'Открыть / вставить изображение',
  pasteHint: 'Вставьте через Ctrl+V или Command+V. Изображение обрабатывается локально.',
  preview: 'Предпросмотр скриншота',
  crop: 'Обрезать', grid: 'Сетка', clear: 'Очистить скриншот',
  zoomOut: 'Уменьшить', zoomIn: 'Увеличить', rotateLeft: 'Повернуть на 90°',
  rotation: 'Поворот', aspect: 'Пропорции', landscape: 'Альбомные', portrait: 'Портретные',
  cancel: 'Отменить обрезку', apply: 'Применить обрезку', download: 'Сохранить PNG', copy: 'Копировать изображение',
  downloadSuccess: 'PNG сохранён.', downloadFailed: 'Не удалось сохранить изображение. Повторите попытку.',
  copySuccess: 'Изображение скопировано.', copyFailed: 'Не удалось скопировать изображение. Сохраните PNG.',
  cropFailed: 'Не удалось обрезать изображение. Выберите область и повторите попытку.',
  imageFailed: 'Не удалось открыть изображение. Попробуйте файл PNG или JPEG.',
  loadFailed: 'Не удалось загрузить редактор скриншотов. Обновите страницу.',
  captureUnsupported: 'В этом браузере захват экрана недоступен. Сделайте системный скриншот, затем откройте или вставьте изображение сюда.',
  captureDenied: 'Захват отменён или доступ не разрешён. Повторите попытку и разрешите захват либо откройте или вставьте системный скриншот.',
  captureFailed: 'Не удалось захватить экран. Проверьте разрешения браузера и системы либо откройте или вставьте системный скриншот.',
  urlTitle: 'Скриншот сайта по ссылке',
  urlPlaceholder: 'https://example.com',
  urlCapture: 'Сделать скриншот',
  urlHint: 'Не более 5 скриншотов по ссылке за 10 минут. Страница рендерится на сервере и откроется в редакторе ниже.',
  urlInvalid: 'Введите корректную ссылку http(s), например https://example.com.',
  urlRateLimited: 'Слишком много запросов. Повторите попытку через {s} сек.',
  urlFailed: 'Не удалось сделать скриншот страницы. Проверьте ссылку и повторите попытку.',
  urlUnavailable: 'Скриншоты по ссылке сейчас недоступны. Повторите попытку позже.',
  urlCooldown: 'Подождите {s} сек'
};

const uk = {
  capture: 'Скріншот',
  captureHint: 'Якщо потрібного вікна немає у списку, розгорніть його й повторіть спробу. Можна також зробити системний скріншот і вставити його сюди.',
  openImage: 'Відкрити / вставити зображення',
  pasteHint: 'Вставте через Ctrl+V або Command+V. Зображення обробляється локально.',
  preview: 'Попередній перегляд скріншота',
  crop: 'Обрізати', grid: 'Сітка', clear: 'Очистити скріншот',
  zoomOut: 'Зменшити', zoomIn: 'Збільшити', rotateLeft: 'Повернути на 90°',
  rotation: 'Поворот', aspect: 'Пропорції', landscape: 'Альбомні', portrait: 'Портретні',
  cancel: 'Скасувати обрізання', apply: 'Застосувати обрізання', download: 'Зберегти PNG', copy: 'Копіювати зображення',
  downloadSuccess: 'PNG збережено.', downloadFailed: 'Не вдалося зберегти зображення. Повторіть спробу.',
  copySuccess: 'Зображення скопійовано.', copyFailed: 'Не вдалося скопіювати зображення. Збережіть PNG.',
  cropFailed: 'Не вдалося обрізати зображення. Виберіть область і повторіть спробу.',
  imageFailed: 'Не вдалося відкрити зображення. Спробуйте файл PNG або JPEG.',
  loadFailed: 'Не вдалося завантажити редактор скріншотів. Оновіть сторінку.',
  captureUnsupported: 'У цьому браузері захоплення екрана недоступне. Зробіть системний скріншот, а потім відкрийте або вставте зображення сюди.',
  captureDenied: 'Захоплення скасовано або доступ не дозволено. Повторіть спробу й дозвольте захоплення або відкрийте чи вставте системний скріншот.',
  captureFailed: 'Не вдалося захопити екран. Перевірте дозволи браузера й системи або відкрийте чи вставте системний скріншот.',
  urlTitle: 'Скріншот сайту за посиланням',
  urlPlaceholder: 'https://example.com',
  urlCapture: 'Зробити скріншот',
  urlHint: 'Не більше 5 скріншотів за посиланням за 10 хвилин. Сторінка рендериться на сервері й відкриється в редакторі нижче.',
  urlInvalid: 'Введіть коректне посилання http(s), наприклад https://example.com.',
  urlRateLimited: 'Забагато запитів. Повторіть спробу через {s} сек.',
  urlFailed: 'Не вдалося зробити скріншот сторінки. Перевірте посилання й повторіть спробу.',
  urlUnavailable: 'Скріншоти за посиланням зараз недоступні. Повторіть спробу пізніше.',
  urlCooldown: 'Зачекайте {s} сек'
};

export const getScreenshotToolCopy = (locale = 'en') => ({ en, ru, uk }[locale] || en);

export const getCaptureErrorKey = error => {
  if (error?.name === 'NotAllowedError') return 'captureDenied';
  if (error?.name === 'NotSupportedError') return 'captureUnsupported';
  return 'captureFailed';
};
