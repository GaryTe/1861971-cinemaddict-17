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
  if(data === true){
    return  classAssignment;
  }
  return '';
}

function addAlreadyWatched (data, classAssignment) {
  return  addToWatchlist (data, classAssignment);
}

function addAddToFavorites (data, classAssignment) {
  return addToWatchlist (data, classAssignment);
}

export {getRandomArrayElement, receiptDate, receiptTime, addToWatchlist, addAlreadyWatched, addAddToFavorites};
