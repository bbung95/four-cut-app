import { get } from "../../utils/dom.js";
import { getDate } from "./date.js";

const $imgFrame = get(".img-frame");

export const capture = () => {
    isValidate();

    html2canvas($imgFrame).then((canvas) => {
        saveAs(canvas.toDataURL("image/jpg"), `${getDate()}.jpg`);
    });
};

const isValidate = () => {
    const $imgEmpty = $imgFrame.querySelectorAll(".empty");

    if ($imgEmpty.length > 0) {
        // 모달 추가 예정
        alert("이미지를 추가해주세요.");
        return;
    }
};

const saveAs = (uri, filename) => {
    let link = document.createElement("a");
    if (typeof link.download === "string") {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
};
