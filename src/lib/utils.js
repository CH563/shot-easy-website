import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import backgroundConfig from './backgroundConfig';

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

export const copyAsBlob = (value) => navigator.clipboard.write([
    new ClipboardItem({
        [value.type]: value
    })
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
    if (!src.startsWith('data')) { img.crossOrigin = 'Anonymous'; }
    return new Promise(function (resolve, reject) {
        img.onload = function () {
            resolve(img);
        };
        const errorHandler = function () { return reject(new Error('An error occurred attempting to load image')); };
        img.onerror = errorHandler;
        img.onabort = errorHandler;
        img.src = src;
    });
};

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

// 获取使用颜色最多的像素点
export const getCounts = function (data, ignore) {
    const countMap = {};

    for (let i = 0; i < data.length; i += 4) {
        // 3个点是一个色值, 第4个点是alpha
        const alpha = data[i + 3];
        if (alpha === 0) continue;

        const rgbComponents = Array.from(data.subarray(i, i + 3));

        if (rgbComponents.indexOf(undefined) !== -1) continue;

        const colorArr = alpha && alpha !== 255 ? rgbComponents.concat([alpha]) : rgbComponents;

        if (ignore.indexOf(`rgb(${ colorArr.join(',') })`) !== -1) continue;
        
        if (countMap[colorArr.join('_')]) {
            countMap[colorArr.join('_')].count++;
        } else {
            countMap[colorArr.join('_')] = {
                color: colorArr,
                count: 1
            };
        }
    }

    const counts = Object.values(countMap);
    return counts.sort(function (a, b) { return b.count - a.count; });
};

function kMeans(pixels, k) {
    let centroids = initializeCentroids(pixels, k);
    let assignments = [];
    let iterations = 0;
    let maxIterations = 100;

    while (iterations < maxIterations) {
        assignments = assignPixelsToCentroids(pixels, centroids, k);
        centroids = calculateNewCentroids(pixels, assignments, k);
        iterations++;
    }

    return { centroids, assignments };
}

function initializeCentroids(pixels, k) {
    let centroids = [];
    for (let i = 0; i < k; i++) {
        const idx = (Math.floor(Math.random() * (pixels.length / 4))) * 4;
        centroids.push([pixels[idx], pixels[idx + 1], pixels[idx + 2]]);
    }
    return centroids;
}

function assignPixelsToCentroids(pixels, centroids, k) {
    let assignments = new Array(pixels.length / 4).fill(0);
    for (let i = 0; i < pixels.length; i += 4) {
        let minDist = Infinity;
        let assignment = 0;
        for (let j = 0; j < k; j++) {
            const dist = euclideanDistance(pixels, i, centroids[j]);
            if (dist < minDist) {
                minDist = dist;
                assignment = j;
            }
        }
        assignments[i / 4] = assignment;
    }
    return assignments;
}

function calculateNewCentroids(pixels, assignments, k) {
    let sums = Array.from({ length: k }, () => [0, 0, 0]);
    let counts = new Array(k).fill(0);

    for (let i = 0; i < assignments.length; i++) {
        const centroidIndex = assignments[i];
        sums[centroidIndex][0] += pixels[i * 4];
        sums[centroidIndex][1] += pixels[i * 4 + 1];
        sums[centroidIndex][2] += pixels[i * 4 + 2];
        counts[centroidIndex]++;
    }

    return sums.map((sum, i) => sum.map(s => s / counts[i]));
}

function euclideanDistance(pixels, idx, centroid) {
    const rDiff = pixels[idx] - centroid[0];
    const gDiff = pixels[idx + 1] - centroid[1];
    const bDiff = pixels[idx + 2] - centroid[2];
    return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}


export const getImgColor = async (img) => {
    let colors = [];
    let width = 0;
    let height = 0;
    if (!img) return {colors, width, height};
    try {
        const image = await getImage(img);
        width = image.width;
        height = image.height;
        const w = 20;
        const imageData = getImageData(image, w, w*image.height/image.width);
        const { centroids } = kMeans(imageData, 5);
        centroids.map(e => {
            if (e.some(i => isNaN(i))) return e;
            colors.push(`rgb(${ e.map(i => parseInt(i)).join(',') })`);
        });
    } catch (error) {
        console.log(error)
    }
    return {colors, width, height};
};

export const scatterArray = (arr, chunkSize = 4) => {
    const scattered = [];
    // const arrLength = arr.length;

    while (scattered.length < 7) {
        const chunk = [];
        for (let i = 0; i < chunkSize; i++) {
            chunk.push(arr[Math.floor(Math.random() * arr.length)]);
        }
        scattered.push(chunk);
    }

    return scattered;
}