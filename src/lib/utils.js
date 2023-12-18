import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const isAppleDevice = () => {
    const PLATFORM = typeof navigator === "object" ? navigator.platform : "";
    return /Mac|iPod|iPhone|iPad/.test(PLATFORM);
}

export const modKey = () => isAppleDevice ? '⌘' : 'Ctrl';

export const supportImg = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'];


export const fileToDataURL = (file) => new Promise((resolve, reject) => {
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
