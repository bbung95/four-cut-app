import { get } from "../../utils/dom.js";
import { getDate } from "./date.js";

const $imageFrame = get(".img-frame");
const $imageSelects = $imageFrame.querySelectorAll(".img-select");
const $imageInfo = $imageFrame.querySelector(".img-info");
const $file = get(".file-input");

const setDate = () => {
    const $infoDate = $imageInfo.querySelector(".date");
    const today = getDate();

    $infoDate.textContent = today;
};

const fileExtentionCheck = (event) => {
    const $file = event.target;
    const fileName = $file.files[0].name.toLowerCase();

    if (fileName.endsWith("jpg") || fileName.endsWith("png") || fileName.endsWith("jpeg")) return true;

    alert("png, jpg, jpeg 파일만 등록가능합니다.");
    $file.value = "";

    return false;
};

const imageUpload = (e) => {
    if (e.target.className.includes("drag")) {
        e.target.classList.remove("drag");
        return;
    }

    let node = e.target;

    $file.click();
    $file.onchange = (event) => {
        if (!fileExtentionCheck(event)) return;

        if (node.nodeName === "IMG") {
            node = node.parentNode;
        }

        imagePreview(node, event);
    };
};

const imageRemove = (target) => {
    target.innerHTML = "";
};

const imagePreview = (target, event) => {
    var reader = new FileReader();

    if (!event.target.files[0]) return;

    imageRemove(target);

    reader.onload = function (event) {
        var img = document.createElement("img");
        img.className = "img";
        img.setAttribute("src", event.target.result);
        target.appendChild(img);
        target.classList.remove("empty");
        dragEvent(img);
    };

    reader.readAsDataURL(event.target.files[0]);
    $file.value = "";
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
