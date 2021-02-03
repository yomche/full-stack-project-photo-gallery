import "./index.html";
import "./style.scss";

const listElements = document.querySelectorAll(".photo-section__element");
const leftArrow = document.querySelector(".prev-arrow");
const rightArrow = document.querySelector(".next-arrow");

let currentPhotoNumber = 0;
let numberOfVisiblePhotos = 4;

const swipeToRight = () => {
  if (currentPhotoNumber == -1) {
    currentPhotoNumber++;
  }
  if (currentPhotoNumber < listElements.length - numberOfVisiblePhotos) {
    listElements[currentPhotoNumber].style.display = "none";
    currentPhotoNumber++;
  }
};

const swipeToLeft = () => {
  if (currentPhotoNumber == listElements.length - numberOfVisiblePhotos) {
    currentPhotoNumber--;
  }
  if (currentPhotoNumber >= 0) {
    listElements[currentPhotoNumber].style.display = "";
    currentPhotoNumber--;
  }
};

rightArrow.addEventListener("click", swipeToRight);
leftArrow.addEventListener("click", swipeToLeft);