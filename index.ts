import './style.scss';
import './index.html';
import { numberOfVisiblePhotos } from './constants';
import { processImages, leftArrowClickHandler, rightArrowClickHandler } from './processImages';

const arrowSection = document.querySelector<HTMLElement>('.photo-section__manipulation');

const getPhotos = async (url: string) => {
  try {
    const response = await fetch(url);
    const photos = await response.json();
    const amountOfPhotos = photos.length;
    processImages(photos);
    if (amountOfPhotos > numberOfVisiblePhotos) {
      const leftArrow = document.createElement('img');
      const rightArrow = document.createElement('img');
      leftArrow.classList.add('prev-arrow');
      leftArrow.src = 'images/arrow-left.png';
      rightArrow.classList.add('next-arrow');
      rightArrow.src = 'images/arrow-right.png';
      arrowSection.appendChild(leftArrow);
      arrowSection.appendChild(rightArrow);
      leftArrow.addEventListener('click', leftArrowClickHandler(amountOfPhotos));
      rightArrow.addEventListener('click', rightArrowClickHandler(amountOfPhotos));
    }
  } catch (error) {
    return error;
  }
};

getPhotos('https://my-json-server.typicode.com/yomche/photo-gallery-rest-api/photos');
