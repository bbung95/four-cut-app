import { get } from "./utils/dom.js";
import { setImagePage } from "./public/js/script.js";

const $mainPage = get(".main-page");
const $imagePage = get(".image-page");

const loading = () => {
    $mainPage.classList.add("hidden");
    $imagePage.classList.remove("hidden");
    setImagePage();
};

const init = () => {
    setTimeout(loading, 100);
};

init();
