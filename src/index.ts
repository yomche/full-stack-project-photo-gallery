import './style.scss';
import './index.html';
import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos } from './constants';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
const leftArrow = document.querySelector<HTMLElement>('.prev-arrow');
const rightArrow = document.querySelector<HTMLElement>('.next-arrow');
const photoList = document.querySelector<HTMLElement>('.photo-section__list');

let amountOfPhotos = 0;

const isOpenData = localStorage.getItem('isOpen');
let isOpen = isOpenData ?? 'false';

const getPhotos = async (url: string) => {
  try {
    const response = await fetch(url);
    const photos = await response.json();
    amountOfPhotos = photos.length;
    imagesHandler(photos);
    if (amountOfPhotos > numberOfVisiblePhotos) {
      leftArrow.addEventListener('click', leftArrowManipulation(amountOfPhotos));
      rightArrow.addEventListener('click', rightArrowManipulation(amountOfPhotos));
    } else {
      leftArrow.classList.add('hide-arrow');
      rightArrow.classList.add('hide-arrow');
    }
  } catch (error) {
    return error;
  }
};

getPhotos('https://my-json-server.typicode.com/yomche/photo-gallery-api/photos');

const imagesHandler = (photos: Record<string, string>[]) => {
  createPhotos(photos);

  localStorageHandler();

  photoManipulationsHandler();
};

const createPhotos = (photos: Record<string, string>[]) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(function (photoItem) {
    const image = document.createElement('img');
    image.src = photoItem.download_url;
    image.classList.add('photo-section__element');
    fragment.appendChild(image);
  });

  slider.appendChild(fragment);
};

const localStorageHandler = () => {
  const position = parseInt(localStorage.getItem('position'));
  slider.style.transform = 'translateX(' + position + 'px)';

  if (isOpenData === 'true') {
    createBiggerImageInMarkup(localStorage.getItem('src'));
  }
};

const createBiggerImageInMarkup = (source: string) => {
  const biggerImage = document.createElement('img');
  biggerImage.src = source;
  biggerImage.classList.add('photo-element-center');
  biggerImage.setAttribute('id', 'center-image');
  photoList.appendChild(biggerImage);
  return biggerImage;
};

const photoManipulationsHandler = () => {
  document.querySelectorAll<HTMLElement>('.photo-section__element').forEach(function (item) {
    item.addEventListener('click', openImage(item));
  });
  document.addEventListener('click', closeBiggerImageHandler, { capture: true });
};

const openImage = (item: HTMLElement) => (event: Event) => openImageHandler(item, event);

enum Condition {
  Open,
  Close,
}

const isOpenChecker = (condition: Condition) => {
  if (condition === Condition.Open) {
    localStorage.setItem('isOpen', 'true');
    isOpen = 'true';
  } else if (condition === Condition.Close) {
    localStorage.setItem('isOpen', 'false');
    isOpen = 'false';
  }
};

const openImageHandler = (item: HTMLElement, event: Event) => {
  const target = event.target;
  if (target === item) {
    const biggerImage = createBiggerImageInMarkup(item.getAttribute('src'));
    localStorage.setItem('src', biggerImage.src);
    isOpenChecker(Condition.Open);
  }
};

const closeBiggerImageHandler = () => {
  const biggerImage = document.getElementById('center-image');
  if (isOpen === 'true') {
    biggerImage.parentNode.removeChild(biggerImage);
    isOpenChecker(Condition.Close);
  }
};

const leftArrowManipulation = (amountOfPhotos: number) => () => swipeToLeft(amountOfPhotos);

const rightArrowManipulation = (amountOfPhotos: number) => () => swipeToRight(amountOfPhotos);

let position = parseInt(localStorage.getItem('position'));

enum Direction {
  Left,
  Right,
}

const swipeToLeft = (amountOfPhotos: number): void => {
  slider.style.transform =
    'translateX(' + calculateNewPosition(Direction.Left, amountOfPhotos) + 'px)';
};

const swipeToRight = (amountOfPhotos: number): void => {
  slider.style.transform =
    'translateX(' + calculateNewPosition(Direction.Right, amountOfPhotos) + 'px)';
};

const calculateNewPosition = (direction: Direction, amountOfPhotos: number): number => {
  switch (direction) {
    case Direction.Left:
      position += photoWidth * numberOfSlidingPhoto;
      position = Math.min(position, 0);
      localStorage.setItem('position', position.toString());
      break;
    case Direction.Right:
      position -= photoWidth * numberOfSlidingPhoto;
      position = Math.max(position, -photoWidth * (amountOfPhotos - numberOfVisiblePhotos));
      localStorage.setItem('position', position.toString());
      break;
  }
  return position;
};
