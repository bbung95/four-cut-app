import { get } from "../../utils/dom.js";

const $imageFrame = get(".img-frame");
const $imageInfo = $imageFrame.querySelector(".img-info");

const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month < 10 ? "0" + month : month}.${day < 10 ? "0" + day : day}`;
};

const setDate = () => {
    const $infoDate = $imageInfo.querySelector(".date");
    const today = getDate();

    $infoDate.textContent = today;
};

export const setImagePage = () => {
    setDate();
};
