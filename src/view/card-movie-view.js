import {receiptDate, receiptTime, addToWatchlist, addAlreadyWatched, addAddToFavorites} from '../utils.js';
import AbstractView from '../framework/view/abstract-view';

const createMovieCard = (film) =>{
  const {filmInfo,userDetails,comments} = film;

  const classForElements = 'film-card__controls-item--active';

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
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addToWatchlist(userDetails.watchlist, classForElements)}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${addAlreadyWatched(userDetails.already_watched, classForElements)}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${addAddToFavorites(userDetails.favorite, classForElements)}" type="button">Mark as favorite</button>
  </div>
</article>`
  );
};
export  default class CardMovieView extends AbstractView{
  #film;
  data;
  constructor(film){
    super();
    this.#film = film;
  }

  get template() {
    return createMovieCard(this.#film);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    this.data = evt.target;
    this._callback.click();
  };
}
