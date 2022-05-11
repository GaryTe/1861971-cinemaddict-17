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
      render (new CardMovieView(this.containerForDescribingMovieCard[i]), filmsListContainer);
      render(new PopupForInformationView(this.containerForDescribingMovieCard[i]), body);
    }
  };
}
