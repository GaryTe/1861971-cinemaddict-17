import UserTitle from '../view/user-title-view.js';
import FilterElements from '../view/filter-view.js';
import CardMovie from '../view/movie-card-view.js';
import ShowMoreButton from '../view/button-show-more.js';
import FilmContainer from '../view/film-container-view.js';
import PopupForInformation from '../view/popup-view.js';
import {render} from '../render.js';

export default class DrawingMarkupElementsPresenter {

  init = (renderingContainer) => {
    this.containerForRendering = renderingContainer;

    const headerLogo = document.querySelector('.header');
    this.placeForTitleUser = headerLogo;
    render(new UserTitle(), this.placeForTitleUser);

    render(new FilterElements(), this.containerForRendering);
    render(new FilmContainer(), this.containerForRendering);

    const filmsListContainer = document.querySelector('.films-list__container');
    this.filmsContainer = filmsListContainer;
    for(let i=0; i<5; i++){
      render(new CardMovie(), this.filmsContainer);
    }

    const filmsList = document.querySelector('.films-list');
    this.placeForButton = filmsList;
    render(new ShowMoreButton(), this.placeForButton);

    const body = document.querySelector('body');
    this.placeForPopup = body;
    render(new PopupForInformation(), this.placeForPopup);

  };
}
