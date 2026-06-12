// Same-origin ffmpeg.wasm worker for ShotEasy Video Convert.
// It mirrors the @ffmpeg/ffmpeg worker protocol while avoiding Vite's generated
// worker.js?type=module path, which can hang in development for this app.
const T = {
    LOAD: 'LOAD',
    EXEC: 'EXEC',
    FFPROBE: 'FFPROBE',
    WRITE_FILE: 'WRITE_FILE',
    READ_FILE: 'READ_FILE',
    DELETE_FILE: 'DELETE_FILE',
    RENAME: 'RENAME',
    CREATE_DIR: 'CREATE_DIR',
    LIST_DIR: 'LIST_DIR',
    DELETE_DIR: 'DELETE_DIR',
    MOUNT: 'MOUNT',
    UNMOUNT: 'UNMOUNT',
    ERROR: 'ERROR',
    LOG: 'LOG',
    PROGRESS: 'PROGRESS',
};

let ffmpeg = null;

self.postMessage({
    type: T.LOG,
    data: { type: 'stderr', message: 'ShotEasy ffmpeg worker started.' },
});

async function load({ coreURL, wasmURL }) {
    const first = !ffmpeg;
    self.postMessage({
        type: T.LOG,
        data: { type: 'stderr', message: 'Importing ffmpeg-core.js...' },
    });
    const mod = await import(coreURL);
    const createFFmpegCore = mod.default;
    if (!createFFmpegCore) throw new Error('createFFmpegCore not found.');

    ffmpeg = await createFFmpegCore({
        mainScriptUrlOrBlob: `${coreURL}#${btoa(JSON.stringify({ wasmURL }))}`,
    });

    ffmpeg.setLogger((data) => self.postMessage({ type: T.LOG, data }));
    ffmpeg.setProgress((data) => self.postMessage({ type: T.PROGRESS, data }));
    return first;
}

self.onmessage = async ({ data: { id, type, data } }) => {
    const transfer = [];
    let result;
    try {
        if (type !== T.LOAD && !ffmpeg) throw new Error('ffmpeg not loaded');
        switch (type) {
            case T.LOAD:
                result = await load(data);
                break;
            case T.EXEC:
                ffmpeg.setTimeout(data.timeout ?? -1);
                ffmpeg.exec(...data.args);
                result = ffmpeg.ret;
                ffmpeg.reset();
                break;
            case T.FFPROBE:
                ffmpeg.setTimeout(data.timeout ?? -1);
                ffmpeg.ffprobe(...data.args);
                result = ffmpeg.ret;
                ffmpeg.reset();
                break;
            case T.WRITE_FILE:
                ffmpeg.FS.writeFile(data.path, data.data);
                result = true;
                break;
            case T.READ_FILE:
                result = ffmpeg.FS.readFile(data.path, { encoding: data.encoding });
                break;
            case T.DELETE_FILE:
                ffmpeg.FS.unlink(data.path);
                result = true;
                break;
            case T.RENAME:
                ffmpeg.FS.rename(data.oldPath, data.newPath);
                result = true;
                break;
            case T.CREATE_DIR:
                ffmpeg.FS.mkdir(data.path);
                result = true;
                break;
            case T.LIST_DIR: {
                result = ffmpeg.FS.readdir(data.path).map((name) => {
                    const stat = ffmpeg.FS.stat(`${data.path}/${name}`);
                    return { name, isDir: ffmpeg.FS.isDir(stat.mode) };
                });
                break;
            }
            case T.DELETE_DIR:
                ffmpeg.FS.rmdir(data.path);
                result = true;
                break;
            case T.MOUNT: {
                const fs = ffmpeg.FS.filesystems[data.fsType];
                result = fs ? ffmpeg.FS.mount(fs, data.options, data.mountPoint) || true : false;
                break;
            }
            case T.UNMOUNT:
                ffmpeg.FS.unmount(data.mountPoint);
                result = true;
                break;
            default:
                throw new Error(`Unknown message type: ${type}`);
        }
    } catch (error) {
        self.postMessage({ id, type: T.ERROR, data: String(error) });
        return;
    }

    if (result instanceof Uint8Array) transfer.push(result.buffer);
    self.postMessage({ id, type, data: result }, transfer);
};
