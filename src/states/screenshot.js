import { makeAutoObservable } from 'mobx';

class ScreenshotState {
    isGrid = false;
    imageSrc = null;
    isCrop = false;
    crop = { x: 0, y: 0 };
    rotation = 0;
    zoom = 1
    croppedAreaPixels = null;
    croppedImage = null;
    constructor () {
        makeAutoObservable(this);
    }

    toggleGrid() {
        this.isGrid = !this.isGrid;
    }

    setIsCrop(value) {
        this.isCrop = value;
    }

    setImageSrc(value) {
        this.imageSrc = value;
    }

    setCrop(value) {
        this.crop = value;
    }

    setRotation(value) {
        this.rotation = value;
    }

    setZoom(value) {
        this.zoom = value;
    }

    zoomIn() {
        this.zoom += 0.1;
    }

    zoomOut() {
        this.zoom -= 0.1;
    }

    rotateLeft() {
        let val = this.rotation + 90;
        if (val > 360) {
            val = val - 360;
        }
        this.rotation = val;
    }

    onCropCompleteEvent(croppedArea, croppedAreaPixels) {
        this.croppedAreaPixels = croppedAreaPixels;
    }
}

const screenshotState = new ScreenshotState();

export default screenshotState;