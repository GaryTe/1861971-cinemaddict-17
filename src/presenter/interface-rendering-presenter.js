import UserTitleView from '../view/user-title-view.js';
import MainFilterElementsView from '../view/main-filter-elements-view.js';
import FilterElementsView from '../view/filter-elements-view.js';
import CardMovieView from '../view/card-movie-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmContainerView from '../view/film-container-view.js';
import PopupForInformationView from '../view/popup-for-information-view.js';
import {render} from '../render.js';


export default class InterfaceRenderingPresenter {

  init = (renderingContainer,generatorObject) => {

    this.containerForDescribingMovieCard = [...generatorObject.getFilms()];

    const headerLogo = document.querySelector('.header');
    render(new UserTitleView(), headerLogo);

    render(new MainFilterElementsView(), renderingContainer);

    render(new FilterElementsView(), renderingContainer);
    render(new FilmContainerView(), renderingContainer);

    const filmsList = document.querySelector('.films-list');
    render(new ShowMoreButtonView(), filmsList);

    const filmsListContainer = document.querySelector('.films-list__container');
    const body = document.querySelector('body');

    for(let i=0; i<this.containerForDescribingMovieCard.length; i++){
      callPopup(this.containerForDescribingMovieCard[i]);
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
