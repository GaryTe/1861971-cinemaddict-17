import UserTitle from '../view/user-title-view.js';
import MainFilterElements from '../view/main-filter-elements-view.js';
import FilterElements from '../view/filter-elements-view.js';
import CardMovie from '../view/card-movie-view.js';
import ShowMoreButton from '../view/show-more-button-view.js';
import FilmContainer from '../view/film-container-view.js';
import PopupForInformation from '../view/popup-for-information-view.js';
import {render} from '../render.js';

export default class DrawingMarkupElementsPresenter {

  init = (renderingContainer,generatorObject) => {

    this.containerForDescribingMovieCard = [...generatorObject.getObject()];

    const headerLogo = document.querySelector('.header');
    render(new UserTitle(), headerLogo);

    render(new MainFilterElements(), renderingContainer);

    render(new FilterElements(), renderingContainer);
    render(new FilmContainer(), renderingContainer);

    const filmsListContainer = document.querySelector('.films-list__container');

    let indicatorsForComments = 0;
    this.containerForDescribingMovieCard.forEach((value,index)=>{
      render(new CardMovie(value), filmsListContainer);
      indicatorsForComments =  index;
    });

    const filmsList = document.querySelector('.films-list');
    render(new ShowMoreButton(), filmsList);

    const body = document.querySelector('body');
    render(new PopupForInformation(this.containerForDescribingMovieCard, indicatorsForComments), body);

  };
}
