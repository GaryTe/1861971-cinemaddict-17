import {receiptDate, receiptTime} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const checkEmoji = (emoji) => {
  if (emoji === null) {
    return '';
  }
  return emoji;
};

const checkComment = (description) => {
  if (description === undefined) {
    return '';
  }
  return description;
};

const createPopup = (substitutionData) => {
  const {filmInfo,userDetails,comments,emoji,description} = substitutionData;

  const emotion = checkEmoji (emoji);

  const comment = checkComment (description);

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
      const element = `<span class="film-details__genre">${filmInfo.genre[i]}</span>`;
      genres.push(element);
    }
    return genres;
  }

  function getCommentsList() {
    const list = [];
    for(let i=0; i<comments.length; i++){
      const detailsFilm = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comments[i].comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">Tim Macoveev</span>
          <span class="film-details__comment-day">2019/12/31 23:59</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`;
      list.push(detailsFilm);
    }
    return list;
  }

  return (
    `<section class="film-details">
<form class="film-details__inner" action="" method="get" tabindex = "0">
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
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${userDetails.watchlist? 'film-details__control-button--active': ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${userDetails.alreadyWatched? 'film-details__control-button--active': ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${userDetails.favorite? 'film-details__control-button--active': ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
       <ul class="film-details__comments-list">${getCommentsList()}</ul>
    <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${emotion}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${comment}</textarea>
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
export  default class PopupForInformationView extends AbstractStatefulView{
  #radioButtons = [];
  #dataScroll = 0;
  _emojis = [
    '<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">',
    '<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-smile">',
    '<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-smile">',
    '<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-smile">'
  ];

  constructor(substitutionData){
    super();
    this._state = PopupForInformationView.parseTaskToState (substitutionData);
    this.#sethandlersForRadioButtons ();
    this.#setHandersForTextarea ();
    this.#scroll ();
  }

  get template() {
    return createPopup(this._state);
  }

  static parseTaskToState = (task) => ({...task, emoji: null});

  _restoreHandlers = () => {
    this.#sethandlersForRadioButtons ();
    this.#setHandersForTextarea ();
    this.#scroll ();
    this.setClickHandler (this._callback.click);
    this.setWatchlist (this._callback.watchlistClick);
    this.setWatched (this._callback.watchedClick);
    this.setFavorites (this._callback.favoritesClick);
  };

  #scroll = () => {
    this.element.addEventListener ('scroll', () => {
      this.#dataScroll = this.element.scrollTop;
    });
  };

  #sethandlersForRadioButtons = () => {
    this.#radioButtons = this.element.querySelectorAll ('.film-details__emoji-item');
    for (let i = 0; i < this.#radioButtons.length; i++) {
      this.#check (this.#radioButtons[i], this._emojis[i]);
    }
  };

  #check = (radioButton, feeling) => {
    radioButton.addEventListener ('change', () => {
      this.updateElement ({emoji: feeling});
      this.element.scrollBy (0, this.#dataScroll);
    });
  };

  #setHandersForTextarea = () => {
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionComment);
  };

  #descriptionComment = (evt) => {
    this._setState({
      description: evt.target.value
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.film-details__inner').addEventListener('keydown', (evt) => {
      if (evt.key === 'Control') {return;}
      if (evt.ctrlKey && evt.key === 'Enter') {
        this.#formSubmitHandler ();
      }
    });
  };

  setClickHandler = (callback, valueScroll) => {
    this.element.scrollBy (0, valueScroll);
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  setWatchlist = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setWatched = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavorites = (callback) => {
    this._callback.favoritesClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoritesClickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };

  #watchlistClickHandler = () => {
    this._callback.watchlistClick (this.#dataScroll);
  };

  #watchedClickHandler = () => {
    this._callback.watchedClick (this.#dataScroll);
  };

  #favoritesClickHandler = () => {
    this._callback.favoritesClick (this.#dataScroll);
  };

  #formSubmitHandler = () => {
    this._callback.formSubmit(PopupForInformationView.parseStateToTask(this._state));
  };

  static parseStateToTask = (state) => {
    const task = {...state};
    return task;
  };
}

