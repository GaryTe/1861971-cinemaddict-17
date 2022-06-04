import CardMovieView from '../view/card-movie-view.js';
import PopupForInformationView from '../view/popup-for-information-view.js';
import {render,replace,remove} from '../framework/render.js';

export default class RenderMovieCardsPopup {
  #changeData;
  #dataMovie;
  #filmContainer;

  #cardMovie = null;
  #popupForInformation = null;

  #body = document.querySelector('body');
  #filmsListContainer = document.querySelector('.films-list__container');

  constructor(filmContainer,changeData) {
    this.#filmContainer = filmContainer;
    this.#changeData = changeData;
  }

  init = (movie, films) => {
    this.#dataMovie = movie;

    this.#openPopup(movie, films);

    const prevCardMovie = this.#cardMovie;
    const prevPopupForInformation = this.#popupForInformation;

    this.#cardMovie.setWatchlist(this.#handleWatchlistClick);
    this.#cardMovie.setWatched(this.#handleWatchedClick);
    this.#cardMovie.setFavorites(this.#handleFavoritesClick);

    if (prevCardMovie === null || prevPopupForInformation === null) {
      render(this.#cardMovie, this.#filmsListContainer);
      this.#popupForInformation = 1;
      return;
    }
    /*
    const nodeFather = document.querySelector('.films-list__container');
    const oldChild = document.querySelectorAll('.film-card');
    //replaceNode ();

    function replaceNode () {
      const nodeChild = prevCardMovie.element;
      oldChild.splice (2, 2, nodeChild);

      const mean = nodeFather.contains(nodeChild);
      if (!mean) {
        nodeFather.appendChild(nodeChild);
        nodeFather.replaceChild(document.querySelectorAll('.film-card')[5], oldChild[3]);
      }
    *
    }

    if (this.#filmContainer.contains(prevCardMovie.element)) {

    }

    if (this.#filmContainer.contains(prevPopupForInformation.element)) {
      replace(this.#popupForInformation, prevPopupForInformation);
    }
*/
    remove(prevCardMovie);
    remove(prevPopupForInformation);
  };

  destroy = () => {
    remove(this.#cardMovie);
    remove(this.#popupForInformation);
  };

  #handleWatchlistClick = (target) => {
    if (target.classList.contains ('film-card__controls-item--active')) {
      target.classList.remove ('film-card__controls-item--active');
    } else {
      target.classList.add ('film-card__controls-item--active');
    }
    this.#changeData({...this.#dataMovie, userDetails:{... this.#dataMovie.userDetails,watchlist : !this.#dataMovie.userDetails.watchlist}});
  };

  #handleWatchedClick = (target) => {
    if (target.classList.contains ('film-card__controls-item--active')) {
      target.classList.remove ('film-card__controls-item--active');
    } else {
      target.classList.add ('film-card__controls-item--active');
    }
    this.#changeData({...this.#dataMovie, isWatched: !this.#dataMovie.isWatched});
  };

  #handleFavoritesClick = (target) => {
    if (target.classList.contains ('film-card__controls-item--active')) {
      target.classList.remove ('film-card__controls-item--active');
    } else {
      target.classList.add ('film-card__controls-item--active');
    }
    this.#changeData({...this.#dataMovie, isFavorites: !this.#dataMovie.isFavorites});
  };

  #closePopup = () => {
    document.removeEventListener('keydown', this.#popupCloseKey);
    const oldChild = document.querySelector('.film-details');
    this.#body.removeChild(oldChild);
    this.#body.classList.remove('hide-overflow');
  };

  #popupCloseKey = (evt) => {
    if(evt.key === 'Escape'){
      this.#closePopup();
    }
  };

  #checkingOpenPopups () {
    const popups = document.querySelectorAll('.film-details');
    if (popups.length > 1){
      this.#body.removeChild(popups[0]);
    }
  }

  #openPopup (film, movies) {
    this.#cardMovie= new CardMovieView(film);
    this.#cardMovie.setClickHandler(this.#addHandlerCardMovie, movies);
  }

  #addHandlerCardMovie = (film) => {
    this.#popupForInformation = new PopupForInformationView(film);
    render(this.#popupForInformation, this.#body);
    this.#popupForInformation.setClickHandler(this.#closePopup);
    document.addEventListener('keydown',this.#popupCloseKey);
    this.#body.classList.add('hide-overflow');
    this.#checkingOpenPopups();
  };

}
