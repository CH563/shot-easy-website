// Focused landing copy for the pages with existing Search Console impressions.
// Keep these routes stable; do not claim editing or legacy Office support.
const content = {
  ru: {
    'doc-viewer': {
      title: 'Открыть DOCX онлайн бесплатно, без Word | ShotEasy',
      h1: 'Открыть DOCX онлайн',
      description: 'Откройте файл DOCX онлайн без установки Word. Бесплатный просмотр страниц в браузере: документ обрабатывается локально и не отправляется на сервер ShotEasy.',
      intro: 'Выберите документ DOCX или перетащите его в поле ниже. ShotEasy покажет страницы прямо в браузере — без установки Word и отправки документа на сервер ShotEasy.',
      keywords: 'открыть docx онлайн, открыть файл docx, просмотр docx онлайн',
      tool: { emptyTitle: 'Выберите или перетащите файл DOCX', emptyHint: 'Просмотр .docx в браузере. Старый формат .doc не поддерживается.' },
      stepsTitle: 'Как открыть файл DOCX без Word?',
      steps: ['Выберите файл с расширением .docx на устройстве или перетащите его в поле просмотра.', 'Дождитесь загрузки предпросмотра. При первом открытии браузер загружает необходимые компоненты.', 'Переключайте страницы, увеличивайте документ или откройте полноэкранный режим. Можно скачать исходный файл или PNG текущей страницы.'],
      limitsTitle: 'Что поддерживается и какие есть ограничения?',
      limits: ['Это просмотрщик, а не редактор Word: изменить текст и сохранить правки нельзя.', 'Поддерживается DOCX. Старые файлы DOC нужно сначала преобразовать в DOCX в Word или LibreOffice.', 'Шрифты, сложная верстка и отдельные элементы могут отображаться иначе, чем в Word. Если важно точное оформление, проверьте документ в исходной программе.', 'Для больших документов требуется больше памяти. Если предпросмотр не открывается, попробуйте актуальный настольный браузер.'],
      faqTitle: 'Вопросы о просмотре DOCX онлайн',
      faqs: [
        { question: 'Можно ли открыть DOCX онлайн бесплатно?', answer: 'Да. Выберите DOCX в поле выше, чтобы просмотреть страницы без установки Word.' },
        { question: 'Отправляется ли документ на сервер?', answer: 'Нет. Файл DOCX обрабатывается локально в браузере. Загрузка компонентов сайта и запросы аналитики или рекламы отдельно от этого могут использовать сеть.' },
        { question: 'Можно ли открыть старый файл DOC?', answer: 'Нет. Этот просмотрщик поддерживает DOCX, но не старый бинарный формат DOC. Сначала сохраните документ как DOCX в совместимой программе.' },
        { question: 'Можно ли редактировать текст документа?', answer: 'Нет. ShotEasy предназначен для просмотра. Для редактирования используйте Word, LibreOffice или другой редактор документов.' }
      ],
      relatedTitle: 'Другие форматы файлов',
      featureList: ['Локальный просмотр DOCX', 'Переключение страниц', 'Полноэкранный просмотр', 'Скачивание исходного файла и PNG страницы']
    },
    'ppt-viewer': {
      title: 'Открыть PPTX онлайн бесплатно, без PowerPoint | ShotEasy',
      h1: 'Открыть презентацию PPTX онлайн',
      description: 'Откройте презентацию PPTX онлайн без установки PowerPoint. Бесплатно просматривайте слайды в браузере: файл обрабатывается локально и не отправляется на сервер ShotEasy.',
      intro: 'Выберите презентацию PPTX или перетащите её в поле ниже. ShotEasy покажет слайды прямо в браузере — без установки PowerPoint и отправки файла на сервер ShotEasy.',
      keywords: 'открыть pptx онлайн, открыть презентацию онлайн, просмотр слайдов pptx',
      tool: { emptyTitle: 'Выберите или перетащите презентацию PPTX', emptyHint: 'Просмотр .pptx в браузере. Старый формат .ppt не поддерживается.' },
      stepsTitle: 'Как открыть презентацию без PowerPoint?',
      steps: ['Выберите файл с расширением .pptx на устройстве или перетащите его в поле просмотра.', 'Дождитесь загрузки предпросмотра. При первом открытии браузер загружает необходимые компоненты.', 'Переключайте слайды с помощью миниатюр или кнопок. Можно открыть полноэкранный режим или скачать текущий слайд как PNG.'],
      limitsTitle: 'Что можно просмотреть в PPTX?',
      limits: ['Это просмотрщик слайдов, а не редактор презентаций: изменить текст и сохранить правки нельзя.', 'Поддерживается PPTX. Старые файлы PPT нужно сначала преобразовать в PPTX в PowerPoint или LibreOffice.', 'Просмотр не заменяет показ презентации: анимация, переходы и встроенные медиа могут не воспроизводиться.', 'Шрифты и сложное оформление могут отличаться от PowerPoint. Для больших презентаций требуется больше памяти.'],
      faqTitle: 'Вопросы о просмотре PPTX онлайн',
      faqs: [
        { question: 'Можно ли открыть PPTX онлайн бесплатно?', answer: 'Да. Выберите PPTX в поле выше, чтобы просмотреть слайды без установки PowerPoint.' },
        { question: 'Отправляется ли презентация на сервер?', answer: 'Нет. Файл PPTX обрабатывается локально в браузере. Загрузка компонентов сайта и запросы аналитики или рекламы отдельно от этого могут использовать сеть.' },
        { question: 'Можно ли открыть старый файл PPT?', answer: 'Нет. Этот просмотрщик поддерживает PPTX, но не старый бинарный формат PPT. Сначала сохраните презентацию как PPTX в совместимой программе.' },
        { question: 'Можно ли редактировать слайды или воспроизводить анимацию?', answer: 'Нет. ShotEasy предназначен для просмотра слайдов, а не для редактирования или полноценного показа с анимацией. Для этого используйте программу для презентаций.' }
      ],
      relatedTitle: 'Другие форматы файлов',
      featureList: ['Локальный просмотр PPTX', 'Миниатюры слайдов', 'Полноэкранный просмотр', 'Сохранение слайда как PNG']
    },
    'excel-viewer': {
      title: 'Открыть XLSX онлайн бесплатно, без Excel | ShotEasy',
      h1: 'Открыть таблицу XLSX онлайн',
      description: 'Откройте таблицу XLSX онлайн без установки Excel. Бесплатно просматривайте листы в браузере: файл обрабатывается локально и не отправляется на сервер ShotEasy.',
      intro: 'Выберите таблицу XLSX или перетащите её в поле ниже. ShotEasy покажет листы прямо в браузере — без установки Excel и отправки файла на сервер ShotEasy.',
      keywords: 'открыть xlsx онлайн, открыть таблицу excel онлайн, просмотр xlsx онлайн',
      tool: { emptyTitle: 'Выберите или перетащите таблицу XLSX', emptyHint: 'Просмотр .xlsx в браузере. Старый формат .xls не поддерживается.' },
      stepsTitle: 'Как открыть таблицу без Excel?',
      steps: ['Выберите файл с расширением .xlsx на устройстве или перетащите его в поле просмотра.', 'Дождитесь загрузки предпросмотра. При первом открытии браузер загружает необходимые компоненты.', 'Переключайте листы, откройте полноэкранный режим или скачайте исходный файл.'],
      limitsTitle: 'Что позволяет этот просмотрщик Excel?',
      limits: ['Это просмотрщик, а не редактор таблиц: изменить ячейки и сохранить правки нельзя.', 'Поддерживается XLSX. Старые файлы XLS нужно сначала преобразовать в XLSX в Excel или LibreOffice.', 'Просмотр не заменяет Excel для пересчёта формул, выполнения макросов или проверки финансовой модели.', 'Шрифты и сложное форматирование могут отличаться от Excel. Для больших книг требуется больше памяти.'],
      faqTitle: 'Вопросы о просмотре XLSX онлайн',
      faqs: [
        { question: 'Можно ли открыть XLSX онлайн бесплатно?', answer: 'Да. Выберите XLSX в поле выше, чтобы просмотреть листы без установки Excel.' },
        { question: 'Отправляется ли таблица на сервер?', answer: 'Нет. Файл XLSX обрабатывается локально в браузере. Загрузка компонентов сайта и запросы аналитики или рекламы отдельно от этого могут использовать сеть.' },
        { question: 'Можно ли открыть старый файл XLS?', answer: 'Нет. Этот просмотрщик поддерживает XLSX, но не старый бинарный формат XLS. Сначала сохраните таблицу как XLSX в совместимой программе.' },
        { question: 'Можно ли изменить ячейки или пересчитать формулы?', answer: 'Нет. ShotEasy предназначен для просмотра. Для изменения ячеек, пересчёта формул или макросов используйте программу для работы с таблицами.' }
      ],
      relatedTitle: 'Другие форматы файлов',
      featureList: ['Локальный просмотр XLSX', 'Навигация по листам', 'Полноэкранный просмотр', 'Скачивание исходного файла']
    }
  },
  uk: {
    'ppt-viewer': {
      title: 'Відкрити PPTX онлайн без PowerPoint — безкоштовно | ShotEasy',
      h1: 'Відкрити презентацію PPTX онлайн',
      description: 'Відкрийте презентацію PPTX онлайн без встановлення PowerPoint. Безкоштовно переглядайте слайди у браузері: файл обробляється локально на вашому пристрої.',
      intro: 'Виберіть презентацію PPTX або перетягніть її в поле нижче. ShotEasy відобразить слайди у браузері без встановлення PowerPoint і надсилання файлу на сервер ShotEasy.',
      keywords: 'відкрити pptx онлайн, відкрити презентацію онлайн, перегляд слайдів pptx',
      tool: { emptyTitle: 'Виберіть або перетягніть презентацію PPTX', emptyHint: 'Перегляд .pptx у браузері. Старий формат .ppt не підтримується.' },
      stepsTitle: 'Як відкрити презентацію без PowerPoint?',
      steps: ['Виберіть файл .pptx на пристрої або перетягніть його в поле перегляду.', 'Дочекайтеся відображення слайдів. Для першого перегляду браузер завантажує потрібні компоненти.', 'Переходьте між слайдами за допомогою мініатюр або кнопок. За потреби увімкніть повноекранний режим чи збережіть поточний слайд як PNG.'],
      limitsTitle: 'Що можна переглянути у PPTX?',
      limits: ['Це перегляд слайдів, а не редактор презентацій. Змінювати текст і зберігати правки не можна.', 'Підтримується PPTX, але не старий формат PPT. Спочатку збережіть такий файл як PPTX у PowerPoint або LibreOffice.', 'Перегляд не замінює показ презентації: анімація, переходи та вбудовані медіа можуть не відтворюватися.', 'Шрифти й складне оформлення можуть відрізнятися від PowerPoint. Великі презентації потребують більше пам’яті пристрою.'],
      faqTitle: 'Питання про перегляд PPTX онлайн',
      faqs: [
        { question: 'Чи потрібен PowerPoint для перегляду PPTX?', answer: 'Ні. Виберіть файл PPTX у браузері та дочекайтеся відображення слайдів.' },
        { question: 'Чи надсилається презентація на сервер?', answer: 'Ні. PPTX обробляється локально у браузері. Компоненти сайту, аналітика та реклама можуть окремо використовувати мережу.' },
        { question: 'Чи можна відкрити файл PPT?', answer: 'Ні. Старий формат PPT не підтримується. Перетворіть презентацію на PPTX у сумісній програмі.' },
        { question: 'Чи можна редагувати або відтворювати анімацію?', answer: 'Цей інструмент призначений для перегляду слайдів, а не редагування чи повноцінного показу з анімацією. Для цього скористайтеся програмою для презентацій.' }
      ],
      relatedTitle: 'Перегляд інших форматів',
      featureList: ['Локальний перегляд PPTX', 'Мініатюри слайдів', 'Повноекранний перегляд', 'Збереження слайда як PNG']
    },
    'doc-viewer': {
      title: 'Відкрити DOCX онлайн безкоштовно, без Word | ShotEasy',
      h1: 'Відкрити DOCX онлайн',
      description: 'Відкрийте файл DOCX онлайн без встановлення Word. Безкоштовно переглядайте сторінки у браузері: файл обробляється локально і не надсилається на сервер ShotEasy.',
      intro: 'Виберіть документ DOCX або перетягніть його в поле нижче. ShotEasy покаже сторінки прямо у браузері — без встановлення Word і надсилання документа на сервер ShotEasy.',
      keywords: 'відкрити docx онлайн, відкрити файл docx, перегляд docx онлайн',
      tool: { emptyTitle: 'Виберіть або перетягніть файл DOCX', emptyHint: 'Перегляд .docx у браузері. Старий формат .doc не підтримується.' },
      stepsTitle: 'Як відкрити файл DOCX без Word?',
      steps: ['Виберіть файл з розширенням .docx на пристрої або перетягніть його в поле перегляду.', 'Дочекайтеся завантаження перегляду. Під час першого відкриття браузер завантажує необхідні компоненти.', 'Перемикайте сторінки, збільшуйте документ або відкрийте повноекранний режим. Можна завантажити вихідний файл або PNG поточної сторінки.'],
      limitsTitle: 'Що підтримується і які є обмеження?',
      limits: ['Це переглядач, а не редактор Word: змінити текст і зберегти правки не можна.', 'Підтримується DOCX. Старі файли DOC потрібно спочатку перетворити на DOCX у Word або LibreOffice.', 'Шрифти, складне верстання та окремі елементи можуть відображатися інакше, ніж у Word. Якщо важливе точне оформлення, перевірте документ у вихідній програмі.', 'Для великих документів потрібно більше пам’яті. Якщо перегляд не відкривається, спробуйте актуальний настільний браузер.'],
      faqTitle: 'Питання про перегляд DOCX онлайн',
      faqs: [
        { question: 'Чи можна відкрити DOCX онлайн безкоштовно?', answer: 'Так. Виберіть DOCX у полі вище, щоб переглянути сторінки без встановлення Word.' },
        { question: 'Чи надсилається документ на сервер?', answer: 'Ні. Файл DOCX обробляється локально у браузері. Завантаження компонентів сайту та запити аналітики або реклами окремо від цього можуть використовувати мережу.' },
        { question: 'Чи можна відкрити старий файл DOC?', answer: 'Ні. Цей переглядач підтримує DOCX, але не старий бінарний формат DOC. Спочатку збережіть документ як DOCX у сумісній програмі.' },
        { question: 'Чи можна редагувати текст документа?', answer: 'Ні. ShotEasy призначений для перегляду. Для редагування використовуйте Word, LibreOffice або інший редактор документів.' }
      ],
      relatedTitle: 'Перегляд інших форматів',
      featureList: ['Локальний перегляд DOCX', 'Перемикання сторінок', 'Повноекранний перегляд', 'Завантаження вихідного файлу та PNG сторінки']
    },
    'excel-viewer': {
      title: 'Відкрити XLSX онлайн безкоштовно, без Excel | ShotEasy',
      h1: 'Відкрити таблицю XLSX онлайн',
      description: 'Відкрийте таблицю XLSX онлайн без встановлення Excel. Безкоштовно переглядайте аркуші у браузері: файл обробляється локально і не надсилається на сервер ShotEasy.',
      intro: 'Виберіть таблицю XLSX або перетягніть її в поле нижче. ShotEasy покаже аркуші прямо у браузері — без встановлення Excel і надсилання файлу на сервер ShotEasy.',
      keywords: 'відкрити xlsx онлайн, відкрити таблицю excel онлайн, перегляд xlsx онлайн',
      tool: { emptyTitle: 'Виберіть або перетягніть таблицю XLSX', emptyHint: 'Перегляд .xlsx у браузері. Старий формат .xls не підтримується.' },
      stepsTitle: 'Як відкрити таблицю без Excel?',
      steps: ['Виберіть файл з розширенням .xlsx на пристрої або перетягніть його в поле перегляду.', 'Дочекайтеся завантаження перегляду. Під час першого відкриття браузер завантажує необхідні компоненти.', 'Перемикайте аркуші, відкрийте повноекранний режим або завантажте вихідний файл.'],
      limitsTitle: 'Що дозволяє цей переглядач Excel?',
      limits: ['Це переглядач, а не редактор таблиць: змінити комірки і зберегти правки не можна.', 'Підтримується XLSX. Старі файли XLS потрібно спочатку перетворити на XLSX у Excel або LibreOffice.', 'Перегляд не замінює Excel для перерахунку формул, виконання макросів або перевірки фінансової моделі.', 'Шрифти і складне форматування можуть відрізнятися від Excel. Для великих книг потрібно більше пам’яті.'],
      faqTitle: 'Питання про перегляд XLSX онлайн',
      faqs: [
        { question: 'Чи можна відкрити XLSX онлайн безкоштовно?', answer: 'Так. Виберіть XLSX у полі вище, щоб переглянути аркуші без встановлення Excel.' },
        { question: 'Чи надсилається таблиця на сервер?', answer: 'Ні. Файл XLSX обробляється локально у браузері. Завантаження компонентів сайту та запити аналітики або реклами окремо від цього можуть використовувати мережу.' },
        { question: 'Чи можна відкрити старий файл XLS?', answer: 'Ні. Цей переглядач підтримує XLSX, але не старий бінарний формат XLS. Спочатку збережіть таблицю як XLSX у сумісній програмі.' },
        { question: 'Чи можна змінити комірки або перерахувати формули?', answer: 'Ні. ShotEasy призначений для перегляду. Для зміни комірок, перерахунку формул або макросів використовуйте програму для роботи з таблицями.' }
      ],
      relatedTitle: 'Перегляд інших форматів',
      featureList: ['Локальний перегляд XLSX', 'Навігація між аркушами', 'Повноекранний перегляд', 'Завантаження вихідного файлу']
    }
  },
  fr: {
    'excel-viewer': {
      title: 'Ouvrir un fichier Excel XLSX en ligne gratuitement | ShotEasy',
      h1: 'Ouvrir un fichier Excel XLSX en ligne',
      description: 'Ouvrez un fichier Excel XLSX en ligne sans installer Excel. Consultez les feuilles gratuitement dans votre navigateur, avec un traitement local du fichier.',
      intro: 'Sélectionnez un classeur XLSX ou déposez-le ci-dessous pour consulter ses feuilles sans installer Excel. Le fichier est traité dans votre navigateur, sans être envoyé au serveur ShotEasy.',
      keywords: 'ouvrir excel en ligne, ouvrir xlsx en ligne, visionneuse excel en ligne',
      tool: { emptyTitle: 'Sélectionnez ou déposez un fichier Excel XLSX', emptyHint: 'Aperçu des fichiers .xlsx. Le format ancien .xls n’est pas pris en charge.' },
      stepsTitle: 'Comment ouvrir un fichier XLSX sans Excel ?',
      steps: ['Sélectionnez un fichier .xlsx sur votre appareil ou déposez-le dans la zone de consultation.', 'Attendez le chargement de l’aperçu. Lors de la première ouverture, le navigateur télécharge les composants nécessaires.', 'Parcourez les feuilles avec les commandes de navigation. Vous pouvez passer en plein écran ou télécharger le fichier original.'],
      limitsTitle: 'Que permet cette visionneuse Excel ?',
      limits: ['Elle permet de consulter un classeur, pas de modifier des cellules ou d’enregistrer des changements.', 'Le format XLSX est pris en charge, contrairement au format ancien XLS. Convertissez celui-ci en XLSX avec Excel ou LibreOffice.', 'Cet aperçu ne remplace pas Excel pour recalculer des formules, exécuter des macros ou vérifier un modèle financier.', 'Les polices et les mises en forme complexes peuvent différer d’Excel. Les gros classeurs demandent davantage de mémoire.'],
      faqTitle: 'Questions sur les fichiers Excel en ligne',
      faqs: [
        { question: 'Peut-on ouvrir un fichier Excel en ligne gratuitement ?', answer: 'Oui. Sélectionnez un fichier XLSX pour consulter ses feuilles directement dans votre navigateur, sans installer Excel.' },
        { question: 'Mon classeur est-il envoyé sur un serveur ?', answer: 'Non. Le fichier XLSX est traité localement dans votre navigateur. Le chargement des composants du site, les services de mesure d’audience et la publicité peuvent séparément utiliser le réseau.' },
        { question: 'Les fichiers XLS sont-ils compatibles ?', answer: 'Non. Cette visionneuse prend en charge XLSX, pas XLS. Enregistrez votre ancien fichier au format XLSX dans une application compatible.' },
        { question: 'Puis-je modifier les cellules ou recalculer les formules ?', answer: 'Cet outil est destiné à la consultation. Pour modifier les cellules, recalculer des formules ou exécuter des macros, utilisez une application de tableur.' }
      ],
      relatedTitle: 'Consulter d’autres formats',
      featureList: ['Consultation locale de fichiers XLSX', 'Navigation entre les feuilles', 'Affichage plein écran', 'Téléchargement du fichier original']
    },
    'doc-viewer': {
      title: 'Ouvrir un fichier Word DOCX en ligne gratuitement | ShotEasy',
      h1: 'Ouvrir un fichier Word DOCX en ligne',
      description: 'Ouvrez un fichier Word DOCX en ligne sans installer Word. Consultez les pages gratuitement dans votre navigateur, avec un traitement local du fichier.',
      intro: 'Sélectionnez un document DOCX ou déposez-le ci-dessous pour consulter ses pages sans installer Word. Le fichier est traité dans votre navigateur, sans être envoyé au serveur ShotEasy.',
      keywords: 'ouvrir docx en ligne, ouvrir fichier word en ligne, visionneuse docx en ligne',
      tool: { emptyTitle: 'Sélectionnez ou déposez un fichier Word DOCX', emptyHint: 'Aperçu des fichiers .docx. Le format ancien .doc n’est pas pris en charge.' },
      stepsTitle: 'Comment ouvrir un fichier DOCX sans Word ?',
      steps: ['Sélectionnez un fichier .docx sur votre appareil ou déposez-le dans la zone de consultation.', 'Attendez le chargement de l’aperçu. Lors de la première ouverture, le navigateur télécharge les composants nécessaires.', 'Parcourez les pages, agrandissez le document ou passez en plein écran. Vous pouvez télécharger le fichier original ou la page actuelle en PNG.'],
      limitsTitle: 'Que permet cette visionneuse DOCX ?',
      limits: ['Elle permet de consulter un document, pas de modifier du texte ou d’enregistrer des changements.', 'Le format DOCX est pris en charge, contrairement au format ancien DOC. Convertissez celui-ci en DOCX avec Word ou LibreOffice.', 'Les polices et les mises en forme complexes peuvent différer de Word. Pour une mise en forme exacte, vérifiez le document dans son application d’origine.', 'Les gros documents demandent davantage de mémoire. Si l’aperçu ne s’ouvre pas, essayez un navigateur de bureau récent.'],
      faqTitle: 'Questions sur les fichiers DOCX en ligne',
      faqs: [
        { question: 'Peut-on ouvrir un fichier DOCX en ligne gratuitement ?', answer: 'Oui. Sélectionnez un fichier DOCX pour consulter ses pages directement dans votre navigateur, sans installer Word.' },
        { question: 'Mon document est-il envoyé sur un serveur ?', answer: 'Non. Le fichier DOCX est traité localement dans votre navigateur. Le chargement des composants du site, les services de mesure d’audience et la publicité peuvent séparément utiliser le réseau.' },
        { question: 'Les fichiers DOC sont-ils compatibles ?', answer: 'Non. Cette visionneuse prend en charge DOCX, pas DOC. Enregistrez votre ancien fichier au format DOCX dans une application compatible.' },
        { question: 'Puis-je modifier le texte du document ?', answer: 'Cet outil est destiné à la consultation. Pour modifier du texte, utilisez Word, LibreOffice ou un autre éditeur de documents.' }
      ],
      relatedTitle: 'Consulter d’autres formats',
      featureList: ['Consultation locale de fichiers DOCX', 'Navigation entre les pages', 'Affichage plein écran', 'Téléchargement du fichier original et de la page en PNG']
    },
    'ppt-viewer': {
      title: 'Ouvrir une présentation PPTX en ligne gratuitement | ShotEasy',
      h1: 'Ouvrir une présentation PPTX en ligne',
      description: 'Ouvrez une présentation PPTX en ligne sans installer PowerPoint. Consultez les diapositives gratuitement dans votre navigateur, avec un traitement local du fichier.',
      intro: 'Sélectionnez une présentation PPTX ou déposez-la ci-dessous pour consulter ses diapositives sans installer PowerPoint. Le fichier est traité dans votre navigateur, sans être envoyé au serveur ShotEasy.',
      keywords: 'ouvrir pptx en ligne, ouvrir présentation powerpoint en ligne, visionneuse pptx en ligne',
      tool: { emptyTitle: 'Sélectionnez ou déposez une présentation PPTX', emptyHint: 'Aperçu des fichiers .pptx. Le format ancien .ppt n’est pas pris en charge.' },
      stepsTitle: 'Comment ouvrir une présentation sans PowerPoint ?',
      steps: ['Sélectionnez un fichier .pptx sur votre appareil ou déposez-le dans la zone de consultation.', 'Attendez le chargement de l’aperçu. Lors de la première ouverture, le navigateur télécharge les composants nécessaires.', 'Parcourez les diapositives avec les miniatures ou les boutons. Vous pouvez passer en plein écran ou enregistrer la diapositive actuelle en PNG.'],
      limitsTitle: 'Que permet cette visionneuse PPTX ?',
      limits: ['Elle permet de consulter des diapositives, pas de modifier du texte ou d’enregistrer des changements.', 'Le format PPTX est pris en charge, contrairement au format ancien PPT. Convertissez celui-ci en PPTX avec PowerPoint ou LibreOffice.', 'Cet aperçu ne remplace pas un diaporama : les animations, les transitions et les médias intégrés peuvent ne pas être lus.', 'Les polices et les mises en forme complexes peuvent différer de PowerPoint. Les grosses présentations demandent davantage de mémoire.'],
      faqTitle: 'Questions sur les présentations PPTX en ligne',
      faqs: [
        { question: 'Peut-on ouvrir une présentation PPTX en ligne gratuitement ?', answer: 'Oui. Sélectionnez un fichier PPTX pour consulter ses diapositives directement dans votre navigateur, sans installer PowerPoint.' },
        { question: 'Ma présentation est-elle envoyée sur un serveur ?', answer: 'Non. Le fichier PPTX est traité localement dans votre navigateur. Le chargement des composants du site, les services de mesure d’audience et la publicité peuvent séparément utiliser le réseau.' },
        { question: 'Les fichiers PPT sont-ils compatibles ?', answer: 'Non. Cette visionneuse prend en charge PPTX, pas PPT. Enregistrez votre ancienne présentation au format PPTX dans une application compatible.' },
        { question: 'Puis-je modifier les diapositives ou lire les animations ?', answer: 'Cet outil est destiné à la consultation. Pour modifier des diapositives ou lire les animations, utilisez une application de présentation.' }
      ],
      relatedTitle: 'Consulter d’autres formats',
      featureList: ['Consultation locale de fichiers PPTX', 'Miniatures des diapositives', 'Affichage plein écran', 'Enregistrement de la diapositive en PNG']
    }
  }
};

export const getViewerLandingContent = (locale, alias) => content[locale]?.[alias];
