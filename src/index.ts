import './style.scss';
import './index.html';
import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos } from './constants';
import { photoElements } from './photoElements';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
const leftArrow = document.querySelector<HTMLElement>('.prev-arrow');
const rightArrow = document.querySelector<HTMLElement>('.next-arrow');

const imagesHandler = () => {
  const fragment = document.createDocumentFragment();

  photoElements.forEach(function (photoItem) {
    const image = document.createElement('img');
    image.src = photoItem.photoSource;
    image.alt = photoItem.alternativeName;
    image.classList.add('photo-section__element');

    fragment.appendChild(image);
  });

  slider.appendChild(fragment);

  const elements = document.querySelectorAll('.photo-section__element');
  elements.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('photo-element-center');
    });
  });

  const closeDropdownHandler = (event: Event) => {
    const target = <HTMLInputElement>event.target;
    elements.forEach(function (item) {
      if (target !== item) {
        item.classList.remove('photo-element-center');
      }
    });
  };

  document.addEventListener('click', closeDropdownHandler);
};

window.addEventListener('load', imagesHandler);

let position = 0;
enum Direction {
  Left,
  Right,
}

const calculateNewPosition = (direction: Direction): number => {
  switch (direction) {
    case Direction.Left:
      position += photoWidth * numberOfSlidingPhoto;
      position = Math.min(position, 0);
      break;
    case Direction.Right:
      position -= photoWidth * numberOfSlidingPhoto;
      position = Math.max(position, -photoWidth * (photoElements.length - numberOfVisiblePhotos));
      break;
  }
  return position;
};

const swipeToLeft = (): void => {
  slider.style.transform = 'translateX(' + calculateNewPosition(Direction.Left) + 'px)';
};

const swipeToRight = (): void => {
  slider.style.transform = 'translateX(' + calculateNewPosition(Direction.Right) + 'px)';
};

if (photoElements.length > numberOfVisiblePhotos) {
  leftArrow.addEventListener('click', swipeToLeft);
  rightArrow.addEventListener('click', swipeToRight);
} else {
  leftArrow.classList.add('hide-arrow');
  rightArrow.classList.add('hide-arrow');
}
