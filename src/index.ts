import "./style.scss";
import "./index.html";

const slider = document.querySelector<HTMLElement>(".photo-section__slider");
const leftArrow = document.querySelector<HTMLElement>(".prev-arrow");
const rightArrow = document.querySelector<HTMLElement>(".next-arrow");
const sliderElements = document.querySelectorAll<HTMLElement>(".photo-section__element");

let photoWidth:number = 300;
let numberOfSlidingPhoto:number = 1;
let position:number = 0;
const numberOfVisiblePhotos: number = 4;

const swipeToLeft = (): void => {
  position += photoWidth * numberOfSlidingPhoto;
  position = Math.min(position, 0);
  slider.style.transform = "translateX(" +  position + "px)";
};

const swipeToRight = (): void => {
  position -= photoWidth * numberOfSlidingPhoto;
  position = Math.max(position, -photoWidth * (sliderElements.length - numberOfVisiblePhotos));
  slider.style.transform = "translateX(" +  position + "px)";
};

leftArrow.addEventListener("click", swipeToLeft);
rightArrow.addEventListener("click", swipeToRight);
