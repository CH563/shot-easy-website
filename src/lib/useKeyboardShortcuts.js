import { useEffect, useRef } from "react"
import { tinykeys } from "tinykeys"

export default function useKeyboardShortcuts(toSave, toCopy, dependencies) {
    const save = useRef(toSave);
    const copy = useRef(toCopy);
    
    useEffect(() => {
        save.current = toSave;
        copy.current = toCopy;
    }, [...dependencies]);

    useEffect(() => {
        const unsubscribe = tinykeys(window, {
            "$mod+KeyS": event => {
                event.preventDefault()
                save.current && save.current();
            },
            "$mod+KeyC": event => {
                event.preventDefault()
                copy && copy.current();
            }
        })
        return () => {
            unsubscribe();
        }
    }, [window]);
};
