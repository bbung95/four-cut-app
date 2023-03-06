import { get } from "./utils/dom.js";
import { setImagePage } from "./public/js/script.js";
import { showModal } from "./public/js/modal.js";
import { capture } from "./public/js/canvas.js";

const LOADING_TIME = 1000;

const $mainPage = get(".main-page");
const $nextPage = get(".next-page");
const $imagePage = get(".image-page");
const $nextBtn = $nextPage.querySelector(".start-btn");
const $modalBtn = $imagePage.querySelector(".modal-btn");
const $downloadBtn = $imagePage.querySelector(".download-btn");

const loading = () => {
    $mainPage.classList.add("hidden");
    $nextPage.classList.remove("hidden");
};

const pageMove = () => {
    $nextPage.classList.add("hidden");
    $imagePage.classList.remove("hidden");
    setImagePage();
};

const init = () => {
    setTimeout(loading, LOADING_TIME);
    $nextBtn.onclick = pageMove;
    $modalBtn.onclick = showModal;
    $downloadBtn.onclick = capture;
};

init();
