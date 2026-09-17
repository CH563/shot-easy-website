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
    }
  }
};

export const getViewerLandingContent = (locale, alias) => content[locale]?.[alias];
