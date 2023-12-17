import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const supportImg = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'];


export const fileToDataURL = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function() {
            resolve(img);
        };
        img.src = e.target.result;
    };
    reader.onerror = function (e) {
        reject(e);
    };
    reader.readAsDataURL(file);
})