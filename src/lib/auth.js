import { sha256 } from 'js-sha256'


async function digestMessage(message) {
  if (typeof crypto !== 'undefined' && crypto?.subtle?.digest) {
    const msgUint8 = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } else {
    return sha256(message).toString()
  }
}

export const generateSignature = async (payload) => {
  const { t, m } = payload
  const secretKey = import.meta.env.PUBLIC_SECRET_KEY
  const signText = `${t}:${m}:${secretKey}`
  // eslint-disable-next-line no-return-await
  return await digestMessage(signText)
}

export const verifySignature = async(payload, sign) => {
  // if (Math.abs(payload.t - Date.now()) > 1000 * 60 * 5) {
  //   return false
  // }
  const payloadSign = await generateSignature(payload)
  console.log('payloadSign', payloadSign);
  return payloadSign === sign
}
