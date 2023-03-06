import { get } from "../../utils/dom.js";

const $modal = get(".image-modal");
const $imageFrame = get(".img-frame");
const $selectBtn = $modal.querySelector(".select-btn");
const $cancelBtn = $modal.querySelector(".cancel-btn");
const $colorPicker = get(".color-picker");

const selectFrameColor = () => {
    const color = $colorPicker.value;
    $imageFrame.style.background = color;
    closeModal();
};

const closeModal = () => {
    $modal.close();
};

export const showModal = () => {
    $modal.showModal();

    $selectBtn.onclick = selectFrameColor;
    $cancelBtn.onclick = closeModal;
};
