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
    compareId = null;

    constructor () {
        makeAutoObservable(this);
    }

    setCompareId(id) {
        this.compareId = id;
    }

    resetOption() {
        this.option = DefaultCompressOption;
    }

    reCompress() {
        this.list.forEach(info => {
            URL.revokeObjectURL(info.compress?.src);
            info.compress = undefined;
            createCompressTask(info);
        })
    }

    setQuality(value) {
        const percent = value / 100;
        this.option.jpeg = percent;
        const num = parseInt(256 * percent);
        this.option.png.colors = num < 2 ? 2 : num;
        this.option.gif.colors = num < 2 ? 2 : num;
        this.option.avif.quality = value;
    }

    setFormat(value, color) {
        if (value !== 'auto') {
            this.option.format.target = value;
            if (['jpg', 'jpeg'].includes(value)) {
                this.option.format.transparentFill = color || DefaultCompressOption.format.transparentFill;
            }
        } else {
            this.option.format.target = undefined;
        }
    }

    setSizeType(type, value) {
        this.option.resize.method = type;
        if (!value) {
            this.option.resize.width = undefined;
            this.option.resize.height = undefined;
            return;
        }
        if (type === 'fitWidth') {
            this.option.resize.width = value;
            this.option.resize.height = undefined;
        }
        if (type === 'fitHeight') {
            this.option.resize.width = undefined;
            this.option.resize.height = value;
        }
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