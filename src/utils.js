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

function addToWatchlist (data,classAssignment) {
  if(data){
    return '' ;
  }
  return classAssignment;
}

function addAlreadyWatched (data, classAssignment) {
  return  addToWatchlist (data, classAssignment);
}

function addAddToFavorites (data, classAssignment) {
  return addToWatchlist (data, classAssignment);
}

function createElements () {
  let element = '<span class="film-details__genre"></span>';
  for(let i=0; i<1; i++){
    element = document.createElement('span');
    element.classList.add('film-details__genre');
    element.textContent = 'Comedy';
  }
  return element;
}

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {updateItem, getRandomArrayElement, getRandomPositiveInteger ,receiptDate, receiptTime, addToWatchlist, addAlreadyWatched, addAddToFavorites,createElements};
