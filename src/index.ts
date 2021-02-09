import './style.scss';
import './index.html';
import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos } from './constants';
import { photoElements } from './photoElements';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
const leftArrow = document.querySelector<HTMLElement>('.prev-arrow');
const rightArrow = document.querySelector<HTMLElement>('.next-arrow');
const photoList = document.querySelector<HTMLElement>('.photo-section__list');

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

  const elements = document.querySelectorAll<HTMLElement>('.photo-section__element');
  elements.forEach(function (item) {

    const openImageHandler = (event: Event) => {
      const target = event.target;
      if (target == item ) {
        const copyImageSrc: string= item.getAttribute('src');
        const biggerImage = document.createElement('img');
        biggerImage.src = copyImageSrc;
        biggerImage.classList.add('photo-element-center');
        biggerImage.setAttribute('id', 'center-image');
        photoList.appendChild(biggerImage);
      }
    };

    item.addEventListener('click', openImageHandler);
  });

  let isOpen = false;

  const closeDropdownHandler = () => {
    const biggerImage = document.getElementById('center-image');
    if (isOpen) {
    biggerImage.parentNode.removeChild(biggerImage);
    }
    isOpen = !isOpen;
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
