import CardMovieView from '../view/card-movie-view.js';
import PopupForInformationView from '../view/popup-for-information-view.js';
import {render} from '../framework/render.js';
import { id } from '../utils.js';

export default class RenderMovieCardsPopup {
  #changeData;
  #dataMovie;

  #cardMovie = null;
  #popupForInformation = null;

  #body = document.querySelector('body');
  #filmsListContainer = document.querySelector('.films-list__container');

  constructor(changeData) {
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#dataMovie = movie;

    this.#openPopup(movie);

    const prevCardMovie = this.#cardMovie;
    const nodeBody = this.#body;

    this.#cardMovie.setWatchlist(this.#handleWatchlistClick);
    this.#cardMovie.setWatched(this.#handleWatchedClick);
    this.#cardMovie.setFavorites(this.#handleFavoritesClick);

    if (this.#cardMovie === null || this.#popupForInformation === null) {
      render(this.#cardMovie, this.#filmsListContainer);
      this.#popupForInformation = 1;
      return;
    }
    replaceNode ();

    function  replaceNode  ()  {
      const nodeFather = document.querySelector('.films-list__container');
      const oldChild = document.querySelectorAll('.film-card');
      const nodeChild = prevCardMovie.element;

      nodeFather.appendChild(nodeChild);
      const indexNode = document.querySelectorAll('.film-card').length-1;
      nodeFather.replaceChild(document.querySelectorAll('.film-card')[indexNode], oldChild[id]);
    }

    if (nodeBody.contains(document.querySelector('.film-details'))) {
      this.#addHandlerCardMovie (movie);
    }
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#dataMovie, userDetails:{... this.#dataMovie.userDetails,watchlist : !this.#dataMovie.userDetails.watchlist}});
  };

  #handleWatchedClick = () => {
    this.#changeData({...this.#dataMovie, userDetails:{... this.#dataMovie.userDetails,alreadyWatched : !this.#dataMovie.userDetails.alreadyWatched}});
  };

  #handleFavoritesClick = () => {
    this.#changeData({...this.#dataMovie, userDetails:{... this.#dataMovie.userDetails,favorite : !this.#dataMovie.userDetails.favorite}});
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

  #openPopup (film) {
    this.#cardMovie= new CardMovieView(film);
    this.#cardMovie.setClickHandler(this.#addHandlerCardMovie);
  }

  #addHandlerCardMovie = (film) => {
    this.#popupForInformation = new PopupForInformationView(film);
    render(this.#popupForInformation, this.#body);
    this.#popupForInformation.setClickHandler(this.#closePopup);
    this.#popupForInformation.setWatchlist(this.#handleWatchlistClick);
    this.#popupForInformation.setWatched(this.#handleWatchedClick);
    this.#popupForInformation.setFavorites(this.#handleFavoritesClick);
    document.addEventListener('keydown',this.#popupCloseKey);
    this.#body.classList.add('hide-overflow');
    this.#checkingOpenPopups();
  };

}
