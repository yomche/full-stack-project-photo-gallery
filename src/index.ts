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
      leftArrow.addEventListener('click', () => {
        swipeToLeft(amountOfPhotos);
      });
      rightArrow.addEventListener('click', () => {
        swipeToRight(amountOfPhotos);
      });
    } else {
      leftArrow.classList.add('hide-arrow');
      rightArrow.classList.add('hide-arrow');
    }
  } catch (error) {
    return error;
  }
};

getPhotos('https://picsum.photos/v2/list');

const openImageHandler = (item: HTMLElement, event: Event) => {
  const target = event.target;
  if (target === item) {
    const copyImageSrc: string = item.getAttribute('src');
    const biggerImage = document.createElement('img');
    biggerImage.src = copyImageSrc;
    biggerImage.classList.add('photo-element-center');
    biggerImage.setAttribute('id', 'center-image');
    photoList.appendChild(biggerImage);
    localStorage.setItem('isOpen', 'true');
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

const localStorageHandler = (photos: Record<string, string>[]) => {
  const isOpenLocalStorage = localStorage.getItem('isOpen');

  if (isOpenLocalStorage === 'true') {
    const biggerImage = document.createElement('img');
    biggerImage.src = photos[0].download_url;
    biggerImage.classList.add('photo-element-center');
    biggerImage.setAttribute('id', 'center-image');
    photoList.appendChild(biggerImage);
  }
};

const imagesHandler = (photos: Record<string, string>[]) => {
  const fragment = document.createDocumentFragment();
  photos.forEach(function (photoItem) {
    const image = document.createElement('img');
    image.src = photoItem.download_url;
    image.classList.add('photo-section__element');
    fragment.appendChild(image);
  });

  slider.appendChild(fragment);

  localStorageHandler(photos);

  const elements = document.querySelectorAll<HTMLElement>('.photo-section__element');
  elements.forEach(function (item) {
    item.addEventListener('click', (event) => {
      openImageHandler(item, event);
    });
  });

  document.addEventListener('click', closeBiggerImageHandler);
};
