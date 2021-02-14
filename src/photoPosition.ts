import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos } from './constants';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
let position = 0;
enum Direction {
  Left,
  Right,
}

export const swipeToLeft = (amountOfPhotos: number): void => {
  slider.style.transform =
    'translateX(' + calculateNewPosition(Direction.Left, amountOfPhotos) + 'px)';
};

export const swipeToRight = (amountOfPhotos: number): void => {
  slider.style.transform =
    'translateX(' + calculateNewPosition(Direction.Right, amountOfPhotos) + 'px)';
};

const calculateNewPosition = (direction: Direction, amountOfPhotos: number): number => {
  switch (direction) {
    case Direction.Left:
      position += photoWidth * numberOfSlidingPhoto;
      position = Math.min(position, 0);
      break;
    case Direction.Right:
      position -= photoWidth * numberOfSlidingPhoto;
      position = Math.max(position, -photoWidth * (amountOfPhotos - numberOfVisiblePhotos));
      break;
  }
  return position;
};
