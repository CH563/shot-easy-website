import { makeAutoObservable } from 'mobx';
import { createCompressTask } from '@engines/transform';

const DefaultCompressOption = {
    preview: {
        maxSize: 256,
    },
    resize: {
        method: undefined,
        width: undefined,
        height: undefined,
    },
    format: {
        target: undefined,
        transparentFill: '#FFFFFF',
    },
    jpeg: {
        quality: 0.7,
    },
    png: {
        colors: 32,
        dithering: 0,
    },
    gif: {
        colors: 128,
        dithering: false,
    },
    avif: {
        quality: 50,
        speed: 8,
    },
};

class CompressorState {
    list = new Map();
    option = DefaultCompressOption;
    tempOption = DefaultCompressOption;
    compareId = null;

    constructor () {
        makeAutoObservable(this);
    }

    reCompress() {
        this.list.forEach(info => {
            URL.revokeObjectURL(info.compress?.src);
            info.compress = undefined;
            createCompressTask(info);
        })
    }

    hasTaskRunning() {
        for (const [_, value] of this.list) {
            if (!value.preview || !value.compress) {
                return true;
            }
        }
        return false;
    }

    getProgressHintInfo() {
        const totalNum = this.list.size;
        let loadedNum = 0;
        let originSize = 0;
        let outputSize = 0;
        for (const [_, info] of this.list) {
            if (!info?.blob) continue;
            originSize += info.blob.size;
            if (info.compress) {
                loadedNum++;
                outputSize += info.compress.blob.size;
            }
        }
        const percent = Math.ceil((loadedNum * 100) / totalNum);
        const originRate = ((outputSize - originSize) * 100) / originSize;
        const rate = Number(Math.abs(originRate).toFixed(2));

        return {
            totalNum,
            loadedNum,
            originSize,
            outputSize,
            percent,
            rate
        }
    }
}

const compressorState = new CompressorState();

export {
    compressorState
};