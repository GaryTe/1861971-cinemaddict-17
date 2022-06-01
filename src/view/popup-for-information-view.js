import {receiptDate, receiptTime, addToWatchlist, addAlreadyWatched, addAddToFavorites} from '../utils.js';
import AbstractView from '../framework/view/abstract-view';

const createPopup = (substitutionData) =>{
  const {filmInfo,userDetails,comments,} = substitutionData;

  const dataClass = 'film-details__control-button--active';

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

  function determineNumberGenres () {
    if (filmInfo.genre.length-1 > 0){
      return 'Genres';
    }
    return 'Genre';
  }

  function createElements () {
    const genres = [];
    for(let i=0; i<filmInfo.genre.length; i++){
      const element = document.createElement('span');
      element.classList.add('film-details__genre');
      element.textContent = filmInfo.genre[i];
      genres.push(element);
    }
    return genres;
  }

  function getCommentsList() {
    const list = [];
    for(let i=0; i<comments.length; i++){
      const detailsFilm = document.createElement('li');
      detailsFilm.classList.add('film-details__comment');
      detailsFilm.insertAdjacentHTML ('beforeend' , `<span class="film-details__comment-emoji">
            <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
          </span>
          <div>
            <p class="film-details__comment-text">${comments[i].comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">Tim Macoveev</span>
              <span class="film-details__comment-day">2019/12/31 23:59</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>`);
      list.push(detailsFilm);
    }
    return list;
  }

  return (
    `<section class="film-details">
<form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${filmInfo.poster}" alt="">

          <p class="film-details__age">${filmInfo.age_rating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${decodedData()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${decodedTime()}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo['release'].release_country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${determineNumberGenres()}</td>
              <td class="film-details__cell">${createElements()}</td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${addToWatchlist(userDetails.watchlist, dataClass)}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${addAlreadyWatched(userDetails.already_watched, dataClass)}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${addAddToFavorites(userDetails.favorite, dataClass)}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
       <ul class="film-details__comments-list">${getCommentsList()}</ul>
    <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>`
  );
};
export  default class PopupForInformationView extends AbstractView{
  #substitutionData;
  #indicatorsForComments;

  constructor(substitutionData, indicatorsForComments){
    super();
    this.#substitutionData = substitutionData;
    this.#indicatorsForComments = indicatorsForComments;
  }

  get template() {
    return createPopup(this.#substitutionData, this.#indicatorsForComments);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };
}

