import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos, Direction, Condition } from './constants';

const photoList = document.querySelector<HTMLElement>('.photo-section__list');
const slider = document.querySelector<HTMLElement>('.photo-section__slider');

const isOpenData = localStorage.getItem('isOpen');
let isOpen = isOpenData ?? 'false';

export const processImages = (photos: Record<string, string>[]): void => {
  addSliderPhotos(photos);
  getCurrentStateFromStorage();
  addClicksHandlers();
};

const addSliderPhotos = (photos: Record<string, string>[]) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(function (photoItem) {
    const image = document.createElement('img');
    image.src = photoItem.download_url;
    image.classList.add('photo-section__element');
    fragment.appendChild(image);
  });

  slider.appendChild(fragment);
};

const getCurrentStateFromStorage = () => {
  const position = parseInt(localStorage.getItem('position'));
  slider.style.transform = 'translateX(' + position + 'px)';

  if (isOpenData === 'true') {
    createBiggerImage(localStorage.getItem('src'));
  }
};

const createBiggerImage = (source: string) => {
  const biggerImage = document.createElement('img');
  biggerImage.src = source;
  biggerImage.classList.add('photo-element-center');
  biggerImage.setAttribute('id', 'center-image');
  photoList.appendChild(biggerImage);
  return biggerImage;
};

const addClicksHandlers = () => {
  document.querySelectorAll<HTMLElement>('.photo-section__element').forEach(function (item) {
    item.addEventListener('click', openImageHandler(item));
  });
  document.addEventListener('click', closeBiggerImageHandler, { capture: true });
};

const openImageHandler = (item: HTMLElement) => (event: Event) => openImage(item, event);

const isPhotoOpenChecker = (condition: Condition) => {
  if (condition === Condition.Open) {
    localStorage.setItem('isOpen', 'true');
    isOpen = 'true';
  } else if (condition === Condition.Close) {
    localStorage.setItem('isOpen', 'false');
    isOpen = 'false';
  }
};

const openImage = (item: HTMLElement, event: Event) => {
  const target = event.target;
  if (target === item) {
    const biggerImage = createBiggerImage(item.getAttribute('src'));
    localStorage.setItem('src', biggerImage.src);
    isPhotoOpenChecker(Condition.Open);
  }
};

const closeBiggerImageHandler = () => {
  const biggerImage = document.getElementById('center-image');
  if (isOpen === 'true') {
    biggerImage.parentNode.removeChild(biggerImage);
    isPhotoOpenChecker(Condition.Close);
  }
};

export const leftArrowClickHandler = (amountOfPhotos: number) => (): void =>
  swipeToLeft(amountOfPhotos);

export const rightArrowClickHandler = (amountOfPhotos: number) => (): void =>
  swipeToRight(amountOfPhotos);

let position = parseInt(localStorage.getItem('position'));

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
