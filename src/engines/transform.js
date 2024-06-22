import WorkerC from './WorkerCompress?worker';
import WorkerP from './WorkerPreview?worker';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { uniqId } from '../lib/utils';
import { compressorState } from '../states/compressor';
import { Mimes } from '../lib/mimes';
import { AvifImage } from "./AvifImage";

let workerC = null;
let workerP = null;

async function message(event) {
    const value = compressorState.list.get(event.data.key);
    if (value) {
        const item = toJS(value);
        item.width = event.data.width;
        item.height = event.data.height;
        item.compress = event.data.compress ?? item.compress;
        item.preview = event.data.preview ?? item.preview;

        // SVG can't convert in worker，so we do converting here
        if (
            item.blob.type === Mimes.svg &&
            event.data.compress &&
            compressorState.option.format.target
        ) {
            const target = compressorState.option.format.target.toLowerCase();
            const canvas = document.createElement('canvas');
            canvas.width = item.width;
            canvas.height = item.height;
            const context = canvas.getContext('2d');
            if (['jpg', 'jpeg'].includes(target)) {
                context.fillStyle = compressorState.option.format.transparentFill;
                context.fillRect(0, 0, item.width, item.height);
            }
            const svg = await new Promise((resolve) => {
                const img = new Image();
                img.src = item.compress.src;
                img.onload = () => resolve(img);
            });
            context.drawImage(
                svg,
                0,
                0,
                item.width,
                item.height,
                0,
                0,
                item.width,
                item.height
            );

            // Convert svg to target type
            let blob;
            if (target === 'avif') {
                blob = await AvifImage.encode(
                    context,
                    item.width,
                    item.height,
                    compressorState.option.avif.quality,
                    compressorState.option.avif.speed
                );
            } else {
                blob = await new Promise((resolve) => {
                    canvas.toBlob(
                        (result) => {
                            resolve(result);
                        },
                        Mimes[target],
                        1
                    );
                });
            }
            item.compress.blob = blob;
            item.compress.src = URL.createObjectURL(blob);
        }

        compressorState.list.set(item.key, item);
    }
}

export function useWorkerHandler() {
    useEffect(() => {
        workerC = new WorkerC();
        workerP = new WorkerP();
        workerC.addEventListener('message', message);
        workerP.addEventListener('message', message);

        return () => {
            workerC.removeEventListener('message', message);
            workerP.removeEventListener('message', message);
            workerC.terminate();
            workerP.terminate();
            workerC = null;
            workerP = null;
        };
    }, []);
}

export function createMessageData(item) {
    return {
        info: {
            key: item.key,
            name: item.name,
            blob: item.blob,
            width: item.width,
            height: item.height,
        },
        option: toJS(compressorState.option),
    };
}

export function createCompressTask(item) {
    workerC?.postMessage(createMessageData(item));
}

export function createPreviewTask(item) {
    workerP?.postMessage(createMessageData(item));
}

export async function createImage(file, dirName) {
    let name = file.name
    if (typeof dirName != 'undefined') {
        name = dirName + name;
    }
    const info = {
        key: uniqId(),
        name,
        blob: file,
        width: 0,
        height: 0,
        src: URL.createObjectURL(file),
    };

    // Due to createImageBitmap do not support SVG blob,
    // we should get dimension of SVG via Image
    if (file.type === Mimes.svg) {
        const { width, height } = await new Promise((resolve) => {
            const img = new Image();
            img.src = info.src;
            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height,
                });
            };
        });
        info.width = width;
        info.height = height;
    }

    compressorState.list.set(info.key, info);

    createPreviewTask(info);
    createCompressTask(info);

}
