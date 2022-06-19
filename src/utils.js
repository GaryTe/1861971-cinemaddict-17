import dayjs from 'dayjs';

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}
function getRandomArrayElement  (elements)  {
  return  elements[getRandomPositiveInteger(0, elements.length - 1)];
}

const receiptDate = (dueDate) => dayjs(dueDate).format('D MMMM');
const receiptTime = (dueTime) => dayjs(dueTime).format('H : mm');

function createElements () {
  let element = '<span class="film-details__genre"></span>';
  for(let i=0; i<1; i++){
    element = document.createElement('span');
    element.classList.add('film-details__genre');
    element.textContent = 'Comedy';
  }
  return element;
}

export {getRandomArrayElement, getRandomPositiveInteger ,receiptDate, receiptTime, createElements};
