import { Queue } from './Queue';
import { convert } from './handler';
import { avifCheck } from './support';

(async () => {
    // Ensure avif check in worker
    await avifCheck();
    const queue = new Queue(3);

    globalThis.addEventListener('message', async (event) => {
        queue.push(async () => {
            const output = await convert(event.data, 'compress');
            if (output) {
                globalThis.postMessage(output);
            }
        });
    });
})();
