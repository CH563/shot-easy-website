import React, { useEffect, useMemo, useRef, useState } from 'react';
import { message } from 'antd';
import { Icon } from './Icons';

// Camera video effects powered by longpipe (MIT), running fully in the
// browser: virtual background / blur, beautify, auto-framing. The model
// weights are self-hosted under /longpipe-models/ — no third-party CDN is
// involved after the page loads, and the camera stream never leaves the
// device. Denoise is intentionally not offered: its DFN weights (~8 MB)
// are not self-hosted, so audio stays passthrough.
// Presets are capped at medium: large/xl need f32 weights that are not
// self-hosted, and adaptive switching is off so the SDK never tries to
// fetch them at runtime.

const WEIGHTS_URL = '/longpipe-models/';
const PRESETS = ['fast', 'small', 'balanced'];
const BG_COLORS = ['#00b050', '#2563eb', '#db2777', '#111827'];

export default function CameraEffects({ lang = 'en' }) {
  const zh = lang === 'zh-CN';
  const t = useMemo(() => zh ? {
    start: '开启摄像头', startTip: '虚拟背景、模糊、美颜和自动取景全部在浏览器本地运行，画面不会离开这台设备。',
    privacy: '本地处理 · 视频不上传', model: '特效模型（约 7 MB）首次使用需下载，之后浏览器会缓存',
    startingCamera: '正在启动摄像头…', loadingModel: '正在加载特效模型…', ready: '已就绪', passthrough: '特效未生效，显示原始画面',
    cameraDenied: '摄像头权限被拒绝，请在浏览器中允许访问摄像头后重试。', noCamera: '这台设备上没有找到摄像头。',
    loadFailed: '特效模型加载失败，请检查网络后重试。', stop: '停止', photo: '拍照', record: '录制', recording: '录制中…',
    effects: '特效', background: '背景', bgBlur: '模糊', bgNone: '原始', bgColor: '纯色', bgImage: '图片',
    blurStrength: '模糊强度', uploadBg: '上传背景图片', touchup: '美颜', touchupStrength: '强度', touchupAmount: '程度',
    reframe: '自动取景', preset: '画质', presetFast: '快速', presetLight: '轻量', presetBalanced: '均衡',
    stats: '性能', backend: '后端', latency: '延迟', photoSaved: '照片已保存', videoSaved: '录制已保存',
  } : {
    start: 'Start camera', startTip: 'Virtual background, blur, beautify and auto-framing run entirely in your browser. Your video never leaves this device.',
    privacy: 'Local processing · no video upload', model: 'The effect model (~7 MB) downloads once and is cached by your browser',
    startingCamera: 'Starting camera…', loadingModel: 'Loading effect model…', ready: 'Ready', passthrough: 'Effects off — showing original video',
    cameraDenied: 'Camera access was denied. Allow camera access in your browser and try again.', noCamera: 'No camera was found on this device.',
    loadFailed: 'Could not load the effect model. Check your connection and try again.', stop: 'Stop', photo: 'Take photo', record: 'Record', recording: 'Recording…',
    effects: 'Effects', background: 'Background', bgBlur: 'Blur', bgNone: 'Original', bgColor: 'Color', bgImage: 'Image',
    blurStrength: 'Blur strength', uploadBg: 'Upload background image', touchup: 'Beautify', touchupStrength: 'Strength', touchupAmount: 'Amount',
    reframe: 'Auto-framing', preset: 'Quality', presetFast: 'Fast', presetLight: 'Light', presetBalanced: 'Balanced',
    stats: 'Performance', backend: 'Backend', latency: 'Latency', photoSaved: 'Photo saved', videoSaved: 'Recording saved',
  }, [zh]);

  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const pipeRef = useRef(null);
  const streamRef = useRef(null);
  const bgBitmapRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const statsTimerRef = useRef(null);

  const [status, setStatus] = useState('idle');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [modelLoading, setModelLoading] = useState(false);
  const [backend, setBackend] = useState('');
  const [preset, setPreset] = useState('balanced');
  const [bgKind, setBgKind] = useState('blur');
  const [blurSigma, setBlurSigma] = useState(8);
  const [bgColor, setBgColor] = useState(BG_COLORS[0]);
  const [bgImageName, setBgImageName] = useState('');
  const [touchupOn, setTouchupOn] = useState(false);
  const [touchupStrength, setTouchupStrength] = useState(0.6);
  const [touchupAmount, setTouchupAmount] = useState(8);
  const [reframeOn, setReframeOn] = useState(false);
  const [effectsOn, setEffectsOn] = useState(true);
  const [stats, setStats] = useState(null);
  const [recording, setRecording] = useState(false);

  useEffect(() => () => {
    if (statsTimerRef.current) window.clearInterval(statsTimerRef.current);
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    pipeRef.current?.destroy?.();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    bgBitmapRef.current?.close?.();
  }, []);

  const currentBackground = () => {
    if (bgKind === 'blur') return { blur: { sigma: blurSigma } };
    if (bgKind === 'none') return 'none';
    if (bgKind === 'color') return { color: bgColor };
    if (bgKind === 'image') return bgBitmapRef.current || { blur: { sigma: blurSigma } };
    return 'blur';
  };

  const startStats = () => {
    if (statsTimerRef.current) window.clearInterval(statsTimerRef.current);
    statsTimerRef.current = window.setInterval(async () => {
      try {
        const s = await pipeRef.current?.getStats?.();
        if (s) setStats({ fps: Math.round(s.fps || 0), backend: s.backend, latencyMs: Math.round(s.latencyMs || 0), preset: s.preset, status: s.status });
      } catch { /* stats are best-effort */ }
    }, 1000);
  };

  const stopStats = () => {
    if (statsTimerRef.current) { window.clearInterval(statsTimerRef.current); statsTimerRef.current = null; }
    setStats(null);
  };

  const start = async () => {
    if (busy || (status !== 'idle' && status !== 'error')) return;
    setBusy(true); setError(''); setModelLoading(false); setBackend('');
    setStatus('starting'); setProgress(t.startingCamera);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      const { EffectsPipeline } = await import('longpipe');
      setProgress(t.loadingModel); setModelLoading(true);
      const pipeline = new EffectsPipeline(stream, {
        background: currentBackground(),
        preset,
        weightsBaseUrl: WEIGHTS_URL,
        audio: 'passthrough',
        adaptive: false,
        touchup: touchupOn ? { style: 'freq-sep', strength: touchupStrength, amount: touchupAmount } : undefined,
        reframe: reframeOn ? true : undefined,
        onReady: (info) => { setBackend(info.backend || ''); setModelLoading(false); },
        onError: (err) => {
          if (err?.fatal) { setError(err.message || t.loadFailed); setModelLoading(false); setStatus('error'); }
          else if (err?.message) message.warning(err.message);
        },
      });
      pipeRef.current = pipeline;
      if (videoRef.current) videoRef.current.srcObject = pipeline.stream;
      // The stream is live immediately; the model loads in the background
      // and the SDK passes the original video through until it is ready.
      pipeline.ready.then((info) => setBackend(info.backend || '')).catch(() => {});
      setStatus('ready');
      startStats();
    } catch (err) {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (err?.name === 'NotAllowedError') setError(t.cameraDenied);
      else if (err?.name === 'NotFoundError' || err?.name === 'OverconstrainedError') setError(t.noCamera);
      else setError(err?.message || t.loadFailed);
      setStatus('error');
    } finally { setBusy(false); setProgress(''); }
  };

  const stop = () => {
    stopStats();
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    pipeRef.current?.destroy?.(); pipeRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setStatus('idle'); setError(''); setModelLoading(false); setBackend(''); setRecording(false);
  };

  useEffect(() => {
    if (status !== 'ready' || !pipeRef.current) return;
    pipeRef.current.setBackground(currentBackground()).catch((err) => message.warning(err.message || 'Background change failed'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgKind, blurSigma, bgColor, bgImageName, status]);

  useEffect(() => {
    if (status !== 'ready' || !pipeRef.current) return;
    pipeRef.current.setTouchup(touchupOn ? { style: 'freq-sep', strength: touchupStrength, amount: touchupAmount } : null).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touchupOn, touchupStrength, touchupAmount, status]);

  useEffect(() => {
    if (status !== 'ready' || !pipeRef.current) return;
    pipeRef.current.setReframe(reframeOn ? true : null).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reframeOn, status]);

  const changePreset = async (next) => {
    setPreset(next);
    if (status !== 'ready' || !pipeRef.current) return;
    try { await pipeRef.current.setPreset(next); } catch (err) { message.warning(err.message || 'Preset change failed'); }
  };

  const toggleEffects = async () => {
    const next = !effectsOn;
    setEffectsOn(next);
    if (status !== 'ready' || !pipeRef.current) return;
    try { await pipeRef.current.setEnabled(next); } catch { /* best-effort */ }
  };

  const uploadBackground = async (fileList) => {
    const file = [...fileList].find((item) => item.type.startsWith('image/'));
    if (!file) return;
    try {
      const bitmap = await createImageBitmap(file);
      bgBitmapRef.current?.close?.();
      bgBitmapRef.current = bitmap;
      setBgImageName(file.name);
      setBgKind('image');
    } catch { message.error('Could not read that image'); }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'camera-effects.png'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      message.success(t.photoSaved);
    }, 'image/png');
  };

  const toggleRecord = () => {
    if (recording) { recorderRef.current?.stop(); return; }
    const pipe = pipeRef.current;
    if (!pipe) return;
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const recorder = new MediaRecorder(pipe.stream, { mimeType });
    chunksRef.current = [];
    recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'camera-effects.webm'; link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      message.success(t.videoSaved);
      setRecording(false);
    };
    recorderRef.current = recorder;
    recorder.start(250);
    setRecording(true);
  };

  if (status === 'idle' || status === 'error') return <section className="mx-auto max-w-5xl">
    <div className="group relative flex min-h-[390px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-200 bg-white/80 px-6 text-center shadow-sm transition hover:border-blue-400 hover:shadow-md" onClick={() => !busy && start()}>
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#bfdbfe_1px,transparent_1px)] [background-size:18px_18px]"></div>
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-[0_16px_40px_rgba(37,99,235,.28)] transition group-hover:-translate-y-1"><Icon name="Video" size={36} /></div>
      <h2 className="relative text-2xl font-bold text-slate-800">{t.start}</h2>
      <p className="relative mt-2 max-w-xl text-sm text-slate-500">{t.startTip}</p>
      <button className="relative mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700" disabled={busy}>{busy ? (progress || t.startingCamera) : t.start}</button>
      {status === 'error' && error && <p className="relative mt-4 max-w-xl rounded-md bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</p>}
      <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold text-emerald-700"><Icon name="ShieldCheck" size={15} />{t.privacy}</div>
    </div>
    <p className="mt-3 text-center text-xs text-slate-400">{t.model}</p>
  </section>;

  const presetLabel = preset === 'fast' ? t.presetFast : preset === 'small' ? t.presetLight : t.presetBalanced;
  return <section className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,.08)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700"><Icon name="ShieldCheck" size={15} />{t.privacy}</div>
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold ${modelLoading ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${modelLoading ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          {modelLoading ? t.loadingModel : (stats?.status === 'passthrough' ? t.passthrough : t.ready)}
        </span>
        {backend && <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold">{backend}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={takePhoto} disabled={busy} className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold leading-none text-slate-600 hover:bg-slate-50 disabled:opacity-50"><Icon name="Camera" size={14} />{t.photo}</button>
        <button onClick={toggleRecord} disabled={busy} className={`inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold leading-none text-white disabled:opacity-50 ${recording ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-black'}`}><Icon name="Circle" size={14} />{recording ? t.recording : t.record}</button>
        <button onClick={stop} disabled={busy} className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md bg-slate-100 px-4 py-2 text-xs font-bold leading-none text-slate-600 hover:bg-slate-200 disabled:opacity-50">{t.stop}</button>
      </div>
    </div>
    {busy && <div className="h-0.5 overflow-hidden bg-blue-100"><div className="h-full w-1/3 animate-[cameraprogress_1.2s_ease-in-out_infinite] bg-blue-600"></div></div>}
    <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="min-w-0 bg-slate-900 p-4 md:p-6">
        <video ref={videoRef} autoPlay muted playsInline className="mx-auto block max-h-[560px] w-full rounded-md bg-black object-contain" />
        {stats && <div className="mx-auto mt-3 flex max-w-xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-semibold text-slate-400">
          <span>{t.stats}: {stats.fps} FPS</span>
          <span>{t.backend}: {stats.backend}</span>
          <span>{t.latency}: {stats.latencyMs} ms</span>
          <span>{t.preset}: {presetLabel}</span>
        </div>}
      </div>
      <aside className="space-y-5 border-t border-slate-100 p-4 lg:border-l lg:border-t-0">
        <div>
          <div className="mb-2 text-xs font-bold text-slate-800">{t.background}</div>
          <div className="flex flex-wrap gap-2">
            {['blur', 'none', 'color', 'image'].map((kind) => <button key={kind} onClick={() => setBgKind(kind)} className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${bgKind === kind ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-200'}`}>
              {kind === 'blur' ? t.bgBlur : kind === 'none' ? t.bgNone : kind === 'color' ? t.bgColor : t.bgImage}
            </button>)}
          </div>
          {bgKind === 'blur' && <label className="mt-3 block text-xs text-slate-500">{t.blurStrength}: {blurSigma}
            <input type="range" min="1" max="20" step="0.5" value={blurSigma} onChange={(e) => setBlurSigma(Number(e.target.value))} className="mt-1 w-full" />
          </label>}
          {bgKind === 'color' && <div className="mt-3 flex gap-2">{BG_COLORS.map((c) => <button key={c} onClick={() => setBgColor(c)} aria-label={c} className={`h-8 w-8 rounded-full border-2 ${bgColor === c ? 'border-blue-500' : 'border-transparent'}`} style={{ backgroundColor: c }} />)}</div>}
          {bgKind === 'image' && <div className="mt-3">
            <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"><Icon name="Image" size={14} />{t.uploadBg}</button>
            {bgImageName && <p className="mt-2 truncate text-[11px] text-slate-400">{bgImageName}</p>}
            <input ref={fileRef} className="hidden" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => { uploadBackground(e.target.files); e.target.value = ''; }} />
          </div>}
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">{t.touchup}
            <button onClick={() => setTouchupOn(!touchupOn)} className={`relative h-5 w-9 rounded-full transition ${touchupOn ? 'bg-blue-600' : 'bg-slate-200'}`} aria-label={t.touchup}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${touchupOn ? 'left-[18px]' : 'left-0.5'}`}></span>
            </button>
          </label>
          {touchupOn && <div className="mt-3 space-y-3">
            <label className="block text-xs text-slate-500">{t.touchupStrength}: {touchupStrength.toFixed(2)}
              <input type="range" min="0" max="1" step="0.05" value={touchupStrength} onChange={(e) => setTouchupStrength(Number(e.target.value))} className="mt-1 w-full" />
            </label>
            <label className="block text-xs text-slate-500">{t.touchupAmount}: {touchupAmount}
              <input type="range" min="1" max="24" step="1" value={touchupAmount} onChange={(e) => setTouchupAmount(Number(e.target.value))} className="mt-1 w-full" />
            </label>
          </div>}
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">{t.reframe}
            <button onClick={() => setReframeOn(!reframeOn)} className={`relative h-5 w-9 rounded-full transition ${reframeOn ? 'bg-blue-600' : 'bg-slate-200'}`} aria-label={t.reframe}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${reframeOn ? 'left-[18px]' : 'left-0.5'}`}></span>
            </button>
          </label>
        </div>
        <div>
          <label className="flex items-center justify-between text-xs font-bold text-slate-800">{t.effects}
            <button onClick={toggleEffects} className={`relative h-5 w-9 rounded-full transition ${effectsOn ? 'bg-blue-600' : 'bg-slate-200'}`} aria-label={t.effects}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${effectsOn ? 'left-[18px]' : 'left-0.5'}`}></span>
            </button>
          </label>
        </div>
        <div>
          <div className="mb-2 text-xs font-bold text-slate-800">{t.preset}</div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => <button key={p} onClick={() => changePreset(p)} className={`rounded-md border px-3 py-1.5 text-xs font-semibold ${preset === p ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-200'}`}>
              {p === 'fast' ? t.presetFast : p === 'small' ? t.presetLight : t.presetBalanced}
            </button>)}
          </div>
        </div>
      </aside>
    </div>
    <style>{`@keyframes cameraprogress{0%{transform:translateX(-100%)}50%{transform:translateX(150%)}100%{transform:translateX(400%)}}`}</style>
  </section>;
}
