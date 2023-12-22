import { useEffect, useState } from "react"
import { getImgColor } from './utils';

export default function useImageColor(imgUrl) {
    const [imgColors, setImgColors] = useState([]);
    const [imgSize, setImageSize] = useState({});
    useEffect(() => {
        getImgColor(imgUrl).then(({colors, width, height}) => {
            setImgColors(colors);
            setImageSize({width, height})
        })
        return (() => {
            setImgColors([]);
            setImageSize({});
        });
    }, [imgUrl]);
    return {imgColors, imgSize};
}