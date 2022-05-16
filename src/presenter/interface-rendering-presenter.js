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

export default class InterfaceRenderingPresenter {

  init = (renderingContainer,generatorObject) => {

    let counterOfNumberOfRenderedFilms = numberOfDrawnFilmsPerTime;
    this.containerForDescribingMovieCard = [...generatorObject.getFilms()];
    const movieCards = this.containerForDescribingMovieCard;

    const headerLogo = document.querySelector('.header');
    render(new UserTitleView(), headerLogo);

    render(new MainFilterElementsView(), renderingContainer);

    render(new FilterElementsView(), renderingContainer);
    render(new FilmContainerView(), renderingContainer);

    const filmsList = document.querySelector('.films-list');
    this.showMoreButtonView = new ShowMoreButtonView();

    const filmsListContainer = document.querySelector('.films-list__container');
    const body = document.querySelector('body');

    if(this.containerForDescribingMovieCard.every((value) => value === 0)){
      render(new NoTaskView(), filmsList);
    }else{
      for(let i=0; i<Math.min(this.containerForDescribingMovieCard.length, numberOfDrawnFilmsPerTime); i++){
        callPopup(this.containerForDescribingMovieCard[i]);
      }
    }

    if(this.containerForDescribingMovieCard.length > numberOfDrawnFilmsPerTime){
      render(this.showMoreButtonView,filmsList);
      const showMore = document.querySelector('.films-list__show-more');
      showMore.addEventListener('click', showMovieCards);
    }

    function showMovieCards (){
      movieCards
        .slice(counterOfNumberOfRenderedFilms, counterOfNumberOfRenderedFilms + numberOfDrawnFilmsPerTime)
        .forEach((value)=>{callPopup(value);});
      counterOfNumberOfRenderedFilms += numberOfDrawnFilmsPerTime;
      if(counterOfNumberOfRenderedFilms >= movieCards.length){
        const oldShowMoreButton = document.querySelector('.films-list__show-more');
        filmsList.removeChild(oldShowMoreButton);
      }
    }

    function callPopup (films){
      render (new CardMovieView(films), filmsListContainer);
      const filmCards = document.querySelectorAll('.film-card');

      for(const filmCard of filmCards){
        filmCard.addEventListener('click',(evt)=> {
          const target = evt.target.src.split('/');
          const imageAddress = films.filmInfo.poster.split('/');
          if(imageAddress[imageAddress.length-1] === target[target.length-1]){
            render(new PopupForInformationView(films), body);
            body.classList.add('hide-overflow');
            addEventHandler();
            checkingOpenPopups();
          }
        });
      }

      function addEventHandler (){
        const closeButtons = document.querySelectorAll('.film-details__close-btn');
        for(const closeButton of closeButtons){
          closeButton.addEventListener('click',closePopup);
        }
        document.addEventListener('keydown',popupCloseKey);
      }

      function popupCloseKey (evt){
        if(evt.key === 'Escape'){
          closePopup();
        }
      }

      function closePopup (){
        document.removeEventListener('keydown', popupCloseKey);
        const oldChild = document.querySelector('.film-details');
        body.removeChild(oldChild);
        body.classList.remove('hide-overflow');
      }

      function checkingOpenPopups (){
        const popups = document.querySelectorAll('.film-details');
        if (popups.length > 1){
          body.removeChild(popups[0]);
        }
      }

    }
  };
}
