import "./index.html";
import "./style.scss";

const listElements = document.querySelectorAll(".photo-section__element");
const leftArrow = document.querySelector(".prev-arrow");
const rightArrow = document.querySelector(".next-arrow");

let numberOfClicks = 0;
let numberOfVisiblePhotos = 4;

const swipeToRight = () => {
  if (numberOfClicks == -1) {
    numberOfClicks++;
  }
  if (numberOfClicks < listElements.length - numberOfVisiblePhotos) {
    listElements[numberOfClicks].style.display = "none";
    numberOfClicks++;
  }
};

const swipeToLeft = () => {
  if (numberOfClicks == listElements.length - numberOfVisiblePhotos) {
    numberOfClicks--;
  }
  if (numberOfClicks >= 0) {
    listElements[numberOfClicks].style.display = "";
    numberOfClicks--;
  }
};

rightArrow.addEventListener("click", swipeToRight);
leftArrow.addEventListener("click", swipeToLeft);
