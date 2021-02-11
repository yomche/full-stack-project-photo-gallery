import './style.scss';
import './index.html';
import { photoWidth, numberOfSlidingPhoto, numberOfVisiblePhotos } from './constants';

const slider = document.querySelector<HTMLElement>('.photo-section__slider');
const leftArrow = document.querySelector<HTMLElement>('.prev-arrow');
const rightArrow = document.querySelector<HTMLElement>('.next-arrow');
const photoList = document.querySelector<HTMLElement>('.photo-section__list');

const headerSection = document.querySelector<HTMLElement>('.header');
const asideSection = document.querySelector<HTMLElement>('.aside');
const photoSection = document.querySelector<HTMLElement>('.photo-section');

const getPhotos = async (url: string) => {
  try {
    const response = await fetch(url);
    const photos = await response.json();
    imagesHandler(photos);
  } catch (error) {
    return error;
  }
};

getPhotos('https://picsum.photos/v2/list');

const imagesHandler = (photos: Record<string, string>[]) => {
  const fragment = document.createDocumentFragment();

  photos.forEach(function (photoItem) {
    const image = document.createElement('img');
    image.src = photoItem.download_url;
    image.classList.add('photo-section__element');
    fragment.appendChild(image);
  });

  slider.appendChild(fragment);

  const elements = document.querySelectorAll<HTMLElement>('.photo-section__element');
  elements.forEach(function (item) {
    const openImageHandler = (event: Event) => {
      const target = event.target;
      if (target === item) {
        const copyImageSrc: string = item.getAttribute('src');
        const biggerImage = document.createElement('img');
        biggerImage.src = copyImageSrc;
        biggerImage.classList.add('photo-element-center');
        biggerImage.setAttribute('id', 'center-image');
        photoList.appendChild(biggerImage);
      }
    };

    item.addEventListener('click', openImageHandler);
  });

  const closeBiggerImageHandler = (event: Event) => {
    const target = event.target;
    const biggerImage = document.getElementById('center-image');
    if (
      target === document.documentElement ||
      target === document.body ||
      target === headerSection ||
      target === asideSection ||
      target === photoSection
    ) {
      biggerImage.parentNode.removeChild(biggerImage);
    }
  };

  document.addEventListener('click', closeBiggerImageHandler);
};

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

      // NEED TO FIX (CONST 30 - amount of photos from picsum)
      position = Math.max(position, -photoWidth * (30 - numberOfVisiblePhotos));
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

// NEED TO FIX (CONST 30 - amount of photos from picsum)
if (30 > numberOfVisiblePhotos) {
  leftArrow.addEventListener('click', swipeToLeft);
  rightArrow.addEventListener('click', swipeToRight);
} else {
  leftArrow.classList.add('hide-arrow');
  rightArrow.classList.add('hide-arrow');
}
