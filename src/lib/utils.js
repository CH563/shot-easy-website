import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import ColorThief from 'colorthief';
import backgroundConfig from './backgroundConfig';
import { filesize } from 'filesize';
import { Mimes } from './mimes';

/**
 * Globaly uniqid in browser session lifecycle
 */
let __UniqIdIndex = 0;
export function uniqId() {
    __UniqIdIndex += 1;
    return __UniqIdIndex;
}

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatSize(num) {
    const result = filesize(num, { standard: 'jedec', output: 'array' });
    return result[0] + ' ' + result[1];
}

export const isAppleDevice = () => {
    const PLATFORM = typeof navigator === 'object' ? navigator.platform : '';
    return /Mac|iPod|iPhone|iPad/.test(PLATFORM);
};

export const modKey = () => (isAppleDevice() ? '⌘' : 'Ctrl');

export const supportImg = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/gif',
    'image/webp',
];

export const fileToDataURL = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.src = e.target.result;
        };
        reader.onerror = function (e) {
            reject(e);
        };
        reader.readAsDataURL(file);
    });

export const url2Blob = async (url) => {
    return await (await fetch(url)).blob();
};

export const canvas2Blob = async (canvasElement) => new Promise((resolve, reject) => {
    canvasElement.toBlob((blob) => resolve(blob), 'image/png');
});

export const copyAsBlob = (value) =>
    navigator.clipboard.write([
        new ClipboardItem({
            [value.type]: value,
        }),
    ]);

export const toDownloadFile = (url, name) => {
    let tmpLink = document.createElement('a');
    tmpLink.href = url;
    tmpLink.download = name;
    tmpLink.style = 'position: absolute; z-index: -111; visibility: none;';
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
    tmpLink = null;
};

export const computedSize = (w, h, maxWidth = 950, maxHeight = 450) => {
    let width = w;
    let height = h;

    // 检查图片是否超过最大宽度
    if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
    }

    // 检查图片是否超过最大高度
    if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
    }
    return { width, height };
};

export const getBackground = (key) => {
    if (key.includes('_img_')) return '';
    if (backgroundConfig[key]) return backgroundConfig[key];
    return 'bg-white';
};

export const getImage = (src) => {
    const img = new Image();
    // cors
    if (!src.startsWith('data')) {
        img.crossOrigin = 'Anonymous';
    }
    return new Promise(function (resolve, reject) {
        img.onload = function () {
            resolve(img);
        };
        const errorHandler = function () {
            return reject(
                new Error('An error occurred attempting to load image')
            );
        };
        img.onerror = errorHandler;
        img.onabort = errorHandler;
        img.src = src;
    });
};

export const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180
}

export const rotateSize = (width, height, rotation) => {
    const rotRad = getRadianAngle(rotation);
    return {
        width:
            Math.abs(Math.cos(rotRad) * width) +
            Math.abs(Math.sin(rotRad) * height),
        height:
            Math.abs(Math.sin(rotRad) * width) +
            Math.abs(Math.cos(rotRad) * height),
    };
}

export const getImageData = (image, w, h, scale) => {
    if (scale === void 0) scale = 1;
    const width = w || image.width * scale;
    const height = h || image.height * scale;
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, width, height);
    const ref = context.getImageData(0, 0, width, height);
    return ref.data;
};

export const getImgColor = async (img) => {
    let colors = [];
    let width = 0;
    let height = 0;
    if (!img) return { colors, width, height };
    try {
        const image = await getImage(img);
        width = image.width;
        height = image.height;
        const colorThief = new ColorThief();
        const centroids = await colorThief.getPalette(image, 8);
        centroids.map((e) => {
            if (e.some((i) => isNaN(i))) return e;
            colors.push(e.map((i) => parseInt(i)));
        });
        colors.sort(function (a, b) {
            return (
                b[0] * 0.299 +
                b[1] * 0.587 +
                b[2] * 0.114 -
                (a[0] * 0.299 + a[1] * 0.587 + a[2] * 0.114)
            );
        });
    } catch (error) {
        console.log(error);
    }
    return { colors, width, height };
};

export const scatterArray = (arr) => {
    const scattered = [];
    const a = [];
    const b = [];
    const c = [];
    const reversedArr = [];
    for (let i = 0; i < arr.length; i++) {
        const index = arr.length - i;
        if (arr[index]) reversedArr.push(arr[index]);
    }
    const max = arr.length > 6 ? 6 : arr.length;
    for (let i = 0; i < max; i++) {
        const secend = i + 1 > arr.length - 1 ? arr.length - 1 : i + 1;
        const third = secend + 1 > arr.length - 1 ? arr.length - 1 : secend + 1;
        if (i < 2) {
            a.push(
                `linear-gradient(140deg, rgb(${arr[i].join(
                    ','
                )}) 25%, rgb(${reversedArr[i].join(',')}) 90%)`
            );
        }
        b.push(
            `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" style="background: rgb(${arr[
                    i
                ].join(',')});"><path fill="rgb(${arr[secend].join(
                    ','
                )})" d="M999.7 129.2c180.6-46 277.6-156.1 461-123.1 424.7 76.4 369.8 882.1 0 1104.5-222.4 133.8-426.7 103.7-664.7 0C563.8 1009.4 474 921 345.5 702.7 298.8 623.4 244 474.5 273 367.8c33-121.6 127.4-178 251-203 127.2-25.7 251.5 21.6 475.6-35.6Z" style="filter: blur(300px);"></path><path fill="rgb(${reversedArr[
                    secend
                ].join(
                    ','
                )})" d="M1108.4 282.7c154.7-39.5 237.9-133.8 395-105.5 363.8 65.5 316.8 756 0 946.5-190.5 114.7-365.6 88.9-569.5 0C735 1037 658 961.2 548 774.2c-40-68-86.8-195.6-62-287 28.4-104.2 109.2-152.6 215-174 109-22 215.5 18.5 407.5-30.5Z" style="filter: blur(200px);"></path><ellipse fill="rgb(${reversedArr[
                    i
                ].join(
                    ','
                )})" cx="1319.7" cy="799.3" rx="556.5" ry="379" transform="rotate(22 1319.7 799.3)" style="filter: blur(200px);"></ellipse></svg>`
            )}")`
        );
        c.push(
            `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" style="background: rgb(${arr[
                    i
                ].join(',')});"><path fill="rgb(${arr[secend].join(
                    ','
                )})" d="M831 745S643.7 567 688.5 467.8c55.8-123.9 340.5 34.9 340.5 34.9S1528.6 841 1587.8 925c93.7 133.2 119.6 266.3 0 326.4C1490.5 1300 831 745 831 745Z" style="filter: blur(325px);"></path><path fill="rgb(${arr[
                    third
                ].join(
                    ','
                )})" d="M1423.9 180c192.6 34.2 292 162.4 419.2 311 196 229 316.2 609 32.3 709.7-258.9 91.9-267.8-422.3-541.2-449.3-97.2-9.7-158.3 62-249 25.5-114.4-46-162.3-144.3-168-267.5-5.8-126.9 44.6-219.7 152-287.7 115.5-73.2 220-65.4 354.7-41.6Z" style="filter: blur(325px);"></path><path fill="rgb(${reversedArr[
                    secend
                ].join(
                    ','
                )})" d="M975.8 1560.6c225.6 216.5 133.2 620 442.3 667.3 63.2 9.7 100.7 10.8 163.7 0 367.2-63 184.2-630.2 0-954-96.7-170-177.7-247-327.8-372.5-134.9-112.7-219.3-202-384.5-261.9-135-48.9-237-74.8-372.8-28.7-123.2 41.8-210.4 99.8-245.6 225-37.4 132.8-17.7 225.3 53.1 343.8C450 1423.3 771 1364 975.8 1560.6Z" style="filter: blur(325px);"></path><circle cx="1061.6" cy="899.1" r="124.9" fill="rgb(${reversedArr[
                    i
                ].join(',')})" style="filter: blur(225px);"></circle></svg>`
            )}")`
        );
    }
    scattered.push(...a, ...b, ...c);

    return scattered;
};

export const captureScreen = async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        const video = document.createElement('video');
        video.srcObject = mediaStream;
        video.play();

        // 等待视频帧稳定
        await new Promise((resolve) => (video.onplaying = resolve));

        // 创建canvas并绘制当前视频帧
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);

        // 获取屏幕截图
        const screenshot = canvas.toDataURL('image/png');

        // 停止媒体流
        video.srcObject.getTracks().forEach((track) => track.stop());

        return screenshot;
    } catch (err) {
        console.log('Error capturing screen:', err);
    }
};

export function splitFileName(fileName) {
    const index = fileName.lastIndexOf(".");
    const name = fileName.substring(0, index);
    const suffix = fileName.substring(index + 1).toLowerCase();
    return { name, suffix };
}

export function getOutputFileName(item, option) {
    if (item.blob.type === item.compress?.blob.type) {
        return item.name;
    }

    const { name, suffix } = splitFileName(item.name);
    let resultSuffix = suffix;
    for (const key in Mimes) {
        if (item.compress?.blob.type === Mimes[key]) {
            resultSuffix = key;
            break;
        }
    }

    if (['jpg', 'jpeg'].includes(resultSuffix)) {
        resultSuffix = option.format.target?.toLowerCase() || resultSuffix;
    }

    return name + '.' + resultSuffix;
}

export function getUniqNameOnNames(names, name) {
    const getName = (checkName) => {
        if (names.has(checkName)) {
            const nameParts = checkName.split(".");
            const extension = nameParts.pop();
            const newName = nameParts.join('') + '(1).' + extension;
            return getName(newName);
        } else {
            return checkName;
        }
    };
    return getName(name);
}

export async function getFilesFromEntry(entry) {
    // If entry is a file
    if (entry.isFile) {
        const fileEntry = entry;
        return new Promise((resolve) => {
            fileEntry.file(
                (result) => {
                    const types = Object.values(Mimes);
                    resolve(types.includes(result.type) ? [result] : []);
                },
                () => []
            );
        });
    }

    // If entry is a directory
    if (entry.isDirectory) {
        const dirEntry = entry;
        const list = await new Promise((resolve) => {
            dirEntry.createReader().readEntries(resolve, () => []);
        });
        const result = [];
        for (const item of list) {
            const subList = await getFilesFromEntry(item);
            result.push(...subList);
        }
        return result;
    }

    // Otherwise
    return [];
}

export async function getFilesFromHandle(handle) {
    // If handle is a file
    if (handle.kind === 'file') {
        const fileHandle = handle;
        const file = await fileHandle.getFile();
        const types = Object.values(Mimes);
        return types.includes(file.type) ? [file] : [];
    }

    // If handle is a directory
    if (handle.kind === 'directory') {
        const result = [];
        for await (const item of handle.values()) {
            const subList = await getFilesFromHandle(item);
            result.push(...subList);
        }
        return result;
    }

    return [];
}

// get handle
export async function getFilesHandleFromHandle(handle) {
     // If handle is a file
     if (handle.kind === 'file') {
        return ;
    }
    const iter = await handle.entries()
    handle.children = []
    for await (const entry of iter) {
        const subHandle = entry[1]
        handle.children.push(subHandle)
        getFilesHandleFromHandle(subHandle)
    }
}

export async function createImageBatch(handle, cb, dir) {
    // if dir is empty and not end of /
    if (dir != '' && dir.charAt(dir.length - 1) != '/') {
        dir += '/';
    }

    for (const item of handle) {
        if (item.kind === 'file') {
            const file = await item.getFile();
            const types = Object.values(Mimes);
            if (!types.includes(file.type)) continue;
            cb(file, dir);
        }
        if (item.kind === 'directory') {
            const currnetDir = `${dir}${item.name}`;
            await createImageBatch(item.children, cb, currnetDir);
        }
    }
}
