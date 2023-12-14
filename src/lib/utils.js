import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const supportImg = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif', 'image/webp'];