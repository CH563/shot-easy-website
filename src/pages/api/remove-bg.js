import { verifySignature } from '@lib/auth';

const apiKey = import.meta.env.REMOVE_API_KEY

export const POST = async ({ request }) => {
    const formData = await request.formData();
    const image = formData.get('image');
    const time = formData.get('time');
    const sign = formData.get('sign');
    const isOk = await verifySignature({ t: time, m: image.size }, sign);
    if (!isOk) return new Response(JSON.stringify({
        error: {
            message: 'Invalid signature.',
        },
    }), { status: 401 });
    const reqFormData = new FormData();
    reqFormData.append('size', 'auto');
    reqFormData.append('image_file', image);
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: reqFormData,
    });
    if (!response.ok) {
        return response;
    }
    const data = await response.blob();
    return new Response(data);
}