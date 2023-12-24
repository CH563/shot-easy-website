import { useEffect } from "react"
import { supportImg } from './utils';

export default function usePaste(toPaste, dependencies = []) {
    useEffect(() => {
        const getPaste = async (e) => {
            const data = e.clipboardData;
            if (!data || !data.items) return;
            const items = Array.from(data.items).filter(e => supportImg.includes(e.type));
            if (!items.length) return;
            const file = items[0].getAsFile();
            toPaste && toPaste(file);
        }
        document.addEventListener('paste', getPaste, false);
        return (() => {
            document.removeEventListener('paste', getPaste);
        })
    }, [document, ...dependencies]);
};