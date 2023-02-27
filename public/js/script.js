import { get } from "../../utils/dom.js";

const $imageFrame = get(".img-frame");
const $imageSelects = $imageFrame.querySelectorAll(".img-select");
const $imageInfo = $imageFrame.querySelector(".img-info");
const $file = get(".file-input");

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

const imageUpload = (e) => {
    if (e.target.className.includes("drag")) {
        e.target.classList.remove("drag");
        return;
    }

    $file.click();
    $file.onchange = (event) => imagePreview(e.target, event);
};

const imagePreview = (target, event) => {
    var reader = new FileReader();

    if (!event.target.files[0]) return;

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.className = "img";
        img.setAttribute("src", event.target.result);
        target.appendChild(img);
        target.classList.remove("empty");
        dragEvent(img);
    };

    reader.readAsDataURL(event.target.files[0]);
};

const dragEvent = (target) => {
    let isPress = false;
    let prevPosX = 0;
    let prevPosY = 0;

    const dragStart = (e) => {
        isPress = true;
        prevPosX = e.clientX;
        prevPosY = e.clientY;
    };

    const dragEnd = () => {
        isPress = false;
    };

    const moveImage = (e) => {
        if (!isPress) return;

        target.classList.add("drag");

        const posX = prevPosX - e.clientX;
        const posY = prevPosY - e.clientY;

        prevPosX = e.clientX;
        prevPosY = e.clientY;

        target.style.left = target.offsetLeft - posX + "px";
        target.style.top = target.offsetTop - posY + "px";
    };

    target.onmousedown = dragStart;
    window.onmouseup = dragEnd;

    window.onmousemove = moveImage;
};

export const setImagePage = () => {
    setDate();
    $imageSelects.forEach((item) => (item.onclick = imageUpload));
};
