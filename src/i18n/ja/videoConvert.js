import en from '../en/videoConvert';

export default {
    ...en,
    title: 'GIF Maker・Video to GIF・MP4 to GIF 変換 | ShotEasy',
    description: '無料の GIF maker と video to GIF 変換ツール。MP4 to GIF、動画圧縮、速度変更、音声抽出、切り抜き、FFmpeg 処理をブラウザで実行できます。',
    keywords: 'gif maker, GIF作成, video to gif, 動画をGIFに変換, mp4 to gif, MP4をGIFに変換, 動画変換, ffmpeg wasm, 動画圧縮, 動画切り抜き, 音声抽出',
    h1: 'GIF Maker と Video to GIF 変換',
    tip: 'MP4 to GIF、動画から GIF 作成、動画圧縮、メディア編集を ffmpeg.wasm でブラウザ内に完結。アップロード不要、登録不要、待ち行列なし。',
    localTitle: 'ローカル動画変換',
    localCont1: 'Video Convert は WebAssembly で FFmpeg をブラウザ内で直接実行するため、メディアは端末上に残ります。',
    localCont2: 'MP4、WebM、MOV、MKV、GIF、音声抽出、サムネイル、簡単な圧縮プリセットに対応します。',
    workflowTitle: 'ffmpeg.wasm の役割',
    workflowCont1: 'ffmpeg.wasm は FFmpeg を WebAssembly 経由でブラウザに持ち込み、バックエンドなしで動画と音声を処理します。',
    workflowCont2: '形式変換、圧縮、トリミング、GIF 作成、音声抽出、フレーム書き出し、カスタム FFmpeg コマンドをローカルで実行します。',
    privacyTitle: '標準でプライベート',
    privacyCont1: '変換中のファイルはブラウザ内の FFmpeg 仮想ファイルシステムにのみ書き込まれます。',
    privacyCont2: 'すべて端末上で処理するため、大きな動画は時間がかかることがあります。',
    seoTitle: 'ブラウザで使える無料 GIF maker と動画変換',
    seoIntro: 'ShotEasy Video Convert は ffmpeg.wasm を使ったローカル優先の gif maker、video to GIF 変換、MP4 to GIF ツールです。ffmpeg-webCLI に近いワークフローをブラウザ内で提供します。',
    featureSections: [
        {
            title: 'MP4、MOV、WebM などから GIF を作成',
            body: 'GIF 機能で短い動画クリップをアニメーション GIF に変換できます。幅と FPS を設定し、FFmpeg のパレット生成で色をなめらかにします。'
        },
        {
            title: '動画形式をローカルで変換',
            body: 'MP4、WebM、MKV、MOV、AVI へ再エンコードまたはリマックスできます。MP4 は H.264 と AAC で互換性が高く、WebM はウェブ公開向けです。'
        },
        {
            title: '圧縮、リサイズ、切り抜き、トリミング',
            body: 'CRF 圧縮で容量を減らし、出力サイズを調整し、画面を切り抜き、処理前に開始と終了の範囲を指定できます。'
        },
        {
            title: '速度変更、逆再生、ループ、フェード',
            body: '0.25x から 4x まで速度を変更し、動画と音声を逆再生し、クリップを繰り返し、フェードインとフェードアウトを追加できます。'
        },
        {
            title: '音声の抽出、ミュート、正規化、調整',
            body: '音声を MP3、AAC、WAV、OGG、FLAC として抽出し、音声削除、音量変更、loudnorm によるラウドネス正規化を行えます。'
        },
        {
            title: 'フレーム書き出し、メタデータ削除、Raw FFmpeg',
            body: 'JPEG または PNG の単一フレーム、メタデータ削除、余白追加、ノイズ軽減、シャープ化やぼかし、Raw FFmpeg 引数に対応します。'
        }
    ],
    faqTitle: 'Video to GIF と FFmpeg のよくある質問',
    faqs: [
        {
            question: 'オンラインで MP4 を GIF に変換するには？',
            answer: 'MP4 をアップロードまたはドラッグし、GIF 機能を選択します。幅と FPS を設定し、必要なら範囲をトリミングして処理し、GIF をダウンロードします。'
        },
        {
            question: 'この GIF maker はプライベートですか？',
            answer: 'はい。ファイルは ffmpeg.wasm によりブラウザ内でローカル処理されます。ShotEasy は動画を変換サーバーへアップロードしません。'
        },
        {
            question: '一般的な動画変換にも使えますか？',
            answer: 'はい。video to GIF、MP4 to GIF 以外にも、形式変換、圧縮、切り抜き、回転、速度変更、逆再生、音声抽出、ミュート、正規化、フレーム書き出し、Raw FFmpeg に対応します。'
        },
        {
            question: '処理に時間がかかるのはなぜですか？',
            answer: 'ブラウザが WebAssembly で FFmpeg を端末上で実行するためです。大きな動画、GIF 生成、逆再生、ノイズ軽減は時間がかかる場合があります。'
        }
    ],
    tool: {
        ...en.tool,
        upload: '動画/音声をクリックまたはドラッグ',
        uploadHint: 'メディアはこのブラウザ内に残り、アップロードされません。',
        process: '動画を処理',
        loading: 'ffmpeg を読み込み中',
        loadFfmpeg: 'ffmpeg を読み込む',
        ffmpegNotLoaded: 'ffmpeg は未読み込みです - 「ffmpeg を読み込む」をクリックして開始',
        ffmpegLoading: 'ffmpeg コアを読み込み中',
        ffmpegReady: 'ffmpeg の準備完了 - 変換をすぐ開始できます',
        ffmpegProcessing: 'ffmpeg がメディアを処理中',
        ffmpegError: 'ffmpeg の確認が必要です - ログを確認してください',
        processing: '処理中',
        download: 'ダウンロード',
        ui: {
            outputFormat: '出力形式',
            width: '幅',
            height: '高さ',
            preset: 'プリセット',
            multiplier: '倍率',
            preserveAudio: '音声を保持して同期調整',
            transform: '変換方法',
            audioFormat: '音声形式',
            timestampSeconds: 'タイムスタンプ（秒）',
            imageFormat: '画像形式',
            reverseAudio: '音声も逆再生',
            fadeMode: 'フェードモード',
            durationSeconds: '時間（秒）',
            brightness: '明るさ',
            contrast: 'コントラスト',
            saturation: '彩度',
            grayscale: 'グレースケール',
            metadataHelp: '可能な場合は動画と音声をストリームコピーしながら、埋め込みメタデータを削除します。',
            volume: '音量',
            totalPlays: '総再生回数',
            targetRatio: '目標比率',
            padColor: '余白の色',
            targetLoudness: '目標ラウドネス',
            strength: '強度',
            effect: '効果',
            argumentsAfterInput: '入力後の引数',
            outputExtension: '出力拡張子',
            bypassTrim: 'トリミングを無視',
            muteHelp: '出力は動画トラックを保持し、音声ストリームを削除します。',
            clear: 'クリア',
            file: 'ファイル',
            size: 'サイズ',
            duration: '長さ',
            resolution: '解像度',
            trim: 'トリミング',
            start: '開始',
            end: '終了',
            commandPreview: 'コマンドプレビュー',
            ffmpegLog: 'FFmpeg ログ',
            settings: '設定',
            estimatedOutput: '推定出力',
            output: '出力',
            outputEmpty: 'ファイルを処理すると結果をプレビューできます。',
            outputPreviewAlt: '変換結果のプレビュー',
            rotateOptions: {
                cw: '時計回りに 90 度回転',
                ccw: '反時計回りに 90 度回転',
                rotate180: '180 度回転',
                hflip: '左右反転',
                vflip: '上下反転',
                both: '左右上下を反転'
            },
            fadeOptions: {
                both: 'フェードイン・アウト',
                in: 'フェードインのみ',
                out: 'フェードアウトのみ'
            },
            colors: {
                black: '黒',
                white: '白',
                gray: 'グレー'
            },
            strengthOptions: {
                light: '弱',
                medium: '中',
                heavy: '強'
            },
            effectOptions: {
                sharpen: 'シャープ化',
                blur: 'ぼかし'
            }
        },
        operations: {
            convert: { title: '変換', desc: '形式を変更' },
            compress: { title: '圧縮', desc: 'サイズを削減' },
            gif: { title: 'GIF', desc: 'アニメ GIF 作成' },
            speed: { title: '速度', desc: '再生速度を変更' },
            rotate: { title: '回転', desc: '回転または反転' },
            crop: { title: '切り抜き', desc: '画面を切り抜く' },
            audio: { title: '音声', desc: '音声を抽出' },
            mute: { title: 'ミュート', desc: '音声を削除' },
            thumbnail: { title: 'フレーム', desc: '画像を書き出し' },
            reverse: { title: '逆再生', desc: '動画を反転再生' },
            fade: { title: 'フェード', desc: '入出フェード' },
            adjust: { title: '調整', desc: '色を調整' },
            metadata: { title: 'メタ情報', desc: 'メタデータ削除' },
            volume: { title: '音量', desc: '音量を変更' },
            loop: { title: 'ループ', desc: 'クリップを繰返し' },
            pad: { title: '余白', desc: '余白や黒帯を追加' },
            normalize: { title: '正規化', desc: '音量を整える' },
            denoise: { title: 'ノイズ除去', desc: 'ノイズを低減' },
            sharpen: { title: 'シャープ', desc: '強調またはぼかし' },
            raw: { title: 'Raw', desc: 'FFmpeg 引数' }
        }
    }
}
