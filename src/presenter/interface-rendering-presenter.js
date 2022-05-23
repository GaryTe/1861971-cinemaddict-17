import UserTitleView from '../view/user-title-view.js';
import MainFilterElementsView from '../view/main-filter-elements-view.js';
import FilterElementsView from '../view/filter-elements-view.js';
import CardMovieView from '../view/card-movie-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmContainerView from '../view/film-container-view.js';
import PopupForInformationView from '../view/popup-for-information-view.js';
import NoTaskView from '../view/no-task-view.js';
import {render} from '../framework/render.js';

const NUMBER_DRAWING_MOVIE_CARDS = 5;

function searchElement(element) {
  return document.querySelector(`${element}`);
}

export default class InterfaceRenderingPresenter {
  #films;
  #headerLogo;
  #siteMainElement;
  #body;
  #counterOfNumberOfRenderedFilms;
  #showMoreButton = new ShowMoreButtonView();
  #cardMovie;
  #movies;
  constructor(generatorObject){
    this.#films =[...generatorObject.getFilms()];
    this.#headerLogo = document.querySelector('.header');
    this.#siteMainElement = document.querySelector('.main');
    this.#body = document.querySelector('body');
    this.#counterOfNumberOfRenderedFilms = NUMBER_DRAWING_MOVIE_CARDS;
  }

  init = () => {
    render(new UserTitleView(), this.#headerLogo);
    render(new MainFilterElementsView(), this.#siteMainElement);
    render(new FilterElementsView(), this.#siteMainElement);
    render(new FilmContainerView(), this.#siteMainElement);
    this.#renderingDocument();
  };


  #renderingDocument () {
    if(this.#films.every((value) => value === 0)){
      render(new NoTaskView(), searchElement('.films-list'));
    }else{
      for(let i=0; i<Math.min(this.#films.length, NUMBER_DRAWING_MOVIE_CARDS); i++){
        this.#callPopup(this.#films[i]);
        this.#movies = this.#films[i];
      }
    }

    if(this.#films.length > NUMBER_DRAWING_MOVIE_CARDS){
      render(this.#showMoreButton, searchElement('.films-list'));
      this.#showMoreButton.setClickHandler(this.#showMovieCards);
    }
  }

  #showMovieCards = () => {
    this.#films
      .slice(this.#counterOfNumberOfRenderedFilms, this.#counterOfNumberOfRenderedFilms + NUMBER_DRAWING_MOVIE_CARDS)
      .forEach((value)=>{this.#callPopup(value);});
    this.#counterOfNumberOfRenderedFilms += NUMBER_DRAWING_MOVIE_CARDS;
    if(this.#counterOfNumberOfRenderedFilms >= this.#films.length){
      const oldShowMoreButton = document.querySelector('.films-list__show-more');
      searchElement('.films-list').removeChild(oldShowMoreButton);
    }
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

  #addEventHandler (){
    const closeButtons = document.querySelectorAll('.film-details__close-btn');
    for(const closeButton of closeButtons){
      closeButton.addEventListener('click', this.#closePopup);
    }
    document.addEventListener('keydown',this.#popupCloseKey);
  }

  #checkingOpenPopups (){
    const popups = document.querySelectorAll('.film-details');
    if (popups.length > 1){
      this.#body.removeChild(popups[0]);
    }
  }

  #callPopup (films){
    const filmsListContainer = document.querySelector('.films-list__container');
    this.#cardMovie= new CardMovieView(films);
    render (this.#cardMovie, filmsListContainer);
    this.#cardMovie.setClickHandler(this.#addHandlerCardMovie);


    //const filmCards = document.querySelectorAll('.film-card');
    /*
    for(const filmCard of filmCards){
      filmCard.addEventListener('click',(evt)=> {
        const target = evt.target.src.split('/');
        const imageAddress = films.filmInfo.poster.split('/');
        if(imageAddress[imageAddress.length-1] === target[target.length-1]){
          render(new PopupForInformationView(films), this.#body);
          this.#body.classList.add('hide-overflow');
          this.#addEventHandler();
          this.#checkingOpenPopups();
        }
      });
    }
*/
  }

  #addHandlerCardMovie = () => {
    const target = this.#cardMovie.data.src.split('/');
    const imageAddress = this.#movies.filmInfo.poster.split('/');
    console.log(target,imageAddress);
    if(imageAddress[imageAddress.length-1] === target[target.length-1]){
      render(new PopupForInformationView(this.#movies), this.#body);
      this.#body.classList.add('hide-overflow');
      this.#addEventHandler();
      this.#checkingOpenPopups();
    }

  };
}
