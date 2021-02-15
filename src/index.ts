import './style.scss';
import './index.html';
import { swipeToLeft, swipeToRight } from './photoPosition';
import { numberOfVisiblePhotos } from './constants';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
const leftArrow = document.querySelector<HTMLElement>('.prev-arrow');
const rightArrow = document.querySelector<HTMLElement>('.next-arrow');
const photoList = document.querySelector<HTMLElement>('.photo-section__list');

let amountOfPhotos = 0;
let isOpen = false;

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

getPhotos('https://picsum.photos/v2/list');

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
  const isOpenLocalStorage = localStorage.getItem('isOpen');

  if (isOpenLocalStorage === 'true') {
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
  document.addEventListener('click', closeBiggerImageHandler);
};

const openImage = (item: HTMLElement) => (event: Event) => openImageHandler(item, event);

const openImageHandler = (item: HTMLElement, event: Event) => {
  const target = event.target;
  if (target === item) {
    const biggerImage = createBiggerImageInMarkup(item.getAttribute('src'));
    localStorage.setItem('isOpen', 'true');
    localStorage.setItem('src', biggerImage.src);
  }
};

const closeBiggerImageHandler = () => {
  const biggerImage = document.getElementById('center-image');
  if (isOpen === true) {
    biggerImage.parentNode.removeChild(biggerImage);
    localStorage.setItem('isOpen', 'false');
  }
  isOpen = !isOpen;
};

const leftArrowManipulation = (amountOfPhotos:number) => () => swipeToLeft(amountOfPhotos);

const rightArrowManipulation = (amountOfPhotos:number) => () => swipeToRight(amountOfPhotos);
