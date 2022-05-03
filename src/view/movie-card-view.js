import {createElement} from '../render.js';
import {receiptDate, receiptTime, addToWatchlist, addAlreadyWatched, addAddToFavorites} from '../utils.js';

const createMovieCard = (substitutionData) =>{
  const {filmInfo,userDetails,comments} = substitutionData;

  const dataClass = 'film-card__controls-item--active';

  function decodedData () {
    if(filmInfo['release'].date !== null){
      return receiptDate(filmInfo['release'].date);
    }
    return '';
  }

  function decodedTime () {
    if(userDetails.watchingDate !== null){
      return receiptTime(userDetails.watchingDate);
    }
    return '';
  }

  function getShortDescription (){
    const arrayOfStrings = filmInfo.description.split('');
    if(arrayOfStrings.length > 140){
      const arrayOfString = filmInfo.description.split('', 139);
      const getSetting = arrayOfString.join('');
      return `${getSetting}...`;
    }
    return filmInfo.description;
  }

  return(
    `<article class="film-card">
  <a class="film-card__link">
    <h3 class="film-card__title">${filmInfo.title}</h3>
    <p class="film-card__rating">${filmInfo.totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${decodedData()}</span>
      <span class="film-card__duration">${decodedTime()}</span>
      <span class="film-card__genre">${filmInfo.genre}</span>
    </p>
    <img src="${filmInfo.poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getShortDescription()}</p>
    <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addToWatchlist(userDetails.watchlist, dataClass)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addAlreadyWatched(userDetails.already_watched, dataClass)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${addAddToFavorites(userDetails.favorite, dataClass)}" type="button">Mark as favorite</button>
  </div>
</article>`
  );
};
export  default class CardMovie {

  constructor(substitutionData){
    this.substitutionData = substitutionData;
  }

  getTemplate() {
    return createMovieCard(this.substitutionData);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
