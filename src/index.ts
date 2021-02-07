import './style.scss';
import './index.html';
import {
  photoWidth,
  numberOfSlidingPhoto,
  numberOfVisiblePhotos,
  slider,
  leftArrow,
  rightArrow,
} from './constantValues';
import { photoElements } from './photoElements';

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

if (photoElements.length > 4) {
  leftArrow.addEventListener('click', swipeToLeft);
  rightArrow.addEventListener('click', swipeToRight);
} else {
  leftArrow.style.display = 'none';
  rightArrow.style.display = 'none';
}
