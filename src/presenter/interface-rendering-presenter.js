import UserTitleView from '../view/user-title-view.js';
import MainFilterElementsView from '../view/main-filter-elements-view.js';
import FilterElementsView from '../view/filter-elements-view.js';
import CardMovieView from '../view/card-movie-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmContainerView from '../view/film-container-view.js';
import PopupForInformationView from '../view/popup-for-information-view.js';
import NoTaskView from '../view/no-task-view.js';
import {render} from '../render.js';

const numberOfDrawnFilmsPerTime = 5;

function searchElement(element) {
  return document.querySelector(`${element}`);
}

export default class InterfaceRenderingPresenter {
  headerLogo = document.querySelector('.header');
  siteMainElement = document.querySelector('.main');
  body = document.querySelector('body');
  counterOfNumberOfRenderedFilms = numberOfDrawnFilmsPerTime;

  constructor(generatorObject){
    this.films =[...generatorObject.getFilms()];
  }

  init = () => {
    render(new UserTitleView(), this.headerLogo);
    render(new MainFilterElementsView(), this.siteMainElement);
    render(new FilterElementsView(), this.siteMainElement);
    render(new FilmContainerView(), this.siteMainElement);
    this.renderingDocument();
  };


  renderingDocument () {
    if(this.films.every((value) => value === 0)){
      render(new NoTaskView(), searchElement('.films-list'));
    }else{
      for(let i=0; i<Math.min(this.films.length, numberOfDrawnFilmsPerTime); i++){
        this.callPopup(this.films[i]);
      }
    }

    if(this.films.length > numberOfDrawnFilmsPerTime){
      render(new ShowMoreButtonView(), searchElement('.films-list'));
      const showMore = document.querySelector('.films-list__show-more');
      showMore.addEventListener('click', this.showMovieCards);
    }
  }

  showMovieCards (){
    this.films
      .slice(this.counterOfNumberOfRenderedFilms, this.counterOfNumberOfRenderedFilms + numberOfDrawnFilmsPerTime)
      .forEach((value)=>{this.callPopup(value);});
    this.counterOfNumberOfRenderedFilms += numberOfDrawnFilmsPerTime;
    if(this.counterOfNumberOfRenderedFilms >= this.films.length){
      const oldShowMoreButton = document.querySelector('.films-list__show-more');
      searchElement('.films-list').removeChild(oldShowMoreButton);
    }
  }

  closePopup (){
    document.removeEventListener('keydown', this.popupCloseKey);
    const oldChild = document.querySelector('.film-details');
    const body = document.querySelector('body');
    body.removeChild(oldChild);
    body.classList.remove('hide-overflow');
  }

  popupCloseKey (evt){
    if(evt.key === 'Escape'){
      this.closePopup();
    }
  }

  addEventHandler (){
    const closeButtons = document.querySelectorAll('.film-details__close-btn');
    for(const closeButton of closeButtons){
      closeButton.addEventListener('click', this.closePopup);
    }
    document.addEventListener('keydown',this.popupCloseKey);
  }

  checkingOpenPopups (){
    const popups = document.querySelectorAll('.film-details');
    if (popups.length > 1){
      this.body.removeChild(popups[0]);
    }
  }

  callPopup (films){
    const filmsListContainer = document.querySelector('.films-list__container');
    render (new CardMovieView(films), filmsListContainer);
    const filmCards = document.querySelectorAll('.film-card');

    for(const filmCard of filmCards){
      filmCard.addEventListener('click',(evt)=> {
        const target = evt.target.src.split('/');
        const imageAddress = films.filmInfo.poster.split('/');
        if(imageAddress[imageAddress.length-1] === target[target.length-1]){
          render(new PopupForInformationView(films), this.body);
          this.body.classList.add('hide-overflow');
          this.addEventHandler();
          this.checkingOpenPopups();
        }
      });
    }
  }


}
