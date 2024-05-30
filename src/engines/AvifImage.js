import { avif } from './AvifWasmModule';
import { Mimes } from '../lib/mimes';
import { ImageBase } from './ImageBase'

export class AvifImage extends ImageBase {
    /**
     * Encode avif image with canvas context
     * @param context
     * @param width
     * @param height
     * @param quality
     * @param speed
     * @returns
     */
    static async encode(context, width, height, quality = 50, speed = 8) {
        const imageData = context.getImageData(0, 0, width, height).data;
        const bytes = new Uint8Array(imageData);
        const result = await avif(bytes, width, height, quality, speed);
        return new Blob([result], { type: Mimes.avif });
    }

    async compress() {
        const { width, height } = this.getOutputDimension();
        try {
            const { context } = await this.createCanvas(width, height);
            const blob = await AvifImage.encode(
                context,
                width,
                height,
                this.option.avif.quality,
                this.option.avif.speed
            );

            return {
                width,
                height,
                blob,
                src: URL.createObjectURL(blob),
            };
        } catch (error) {
            return this.failResult();
        }
    }
}
