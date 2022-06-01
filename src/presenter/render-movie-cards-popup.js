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
      return;
    }

    if (this.#filmContainer.contains(prevCardMovie.element)) {
      replace(this.#cardMovie, prevCardMovie);
    }

    if (this.#filmContainer.contains(prevPopupForInformation.element)) {
      replace(this.#popupForInformation, prevPopupForInformation);
    }

    remove(prevCardMovie);
    remove(prevPopupForInformation);
  };

  destroy = () => {
    remove(this.#cardMovie);
    remove(this.#popupForInformation);
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#dataMovie, isWatchlist: !this.#dataMovie.isWatchlist});
  };

  #handleWatchedClick = () => {
    this.#changeData({...this.#dataMovie, isWatched: !this.#dataMovie.isWatched});
  };

  #handleFavoritesClick = () => {
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
