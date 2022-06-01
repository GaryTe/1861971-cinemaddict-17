import UserTitleView from '../view/user-title-view.js';
import MainFilterElementsView from '../view/main-filter-elements-view.js';
import FilterElementsView from '../view/filter-elements-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmContainerView from '../view/film-container-view.js';
import NoTaskView from '../view/no-task-view.js';
import RenderMovieCardsPopup from './render-movie-cards-popup.js';
import {render,remove} from '../framework/render.js';
import { updateItem } from '../utils.js';

const NUMBER_DRAWING_MOVIE_CARDS = 5;

function searchElement(element) {
  return document.querySelector(`${element}`);
}

export default class InterfaceRenderingPresenter {
  #films = [];
  #movies = [];
  #counterOfNumberOfRenderedFilms = NUMBER_DRAWING_MOVIE_CARDS;
  #taskPresenter = new Map();


  #headerLogo = document.querySelector('.header');
  #siteMainElement = document.querySelector('.main');

  #showMoreButton = new ShowMoreButtonView();
  #filmContainer = new FilmContainerView();

  constructor(generatorObject){
    this.#films =[...generatorObject.getFilms()];
  }

  init = () => {
    this.#renderElement();
    this.#renderingDocument();
  };

  #renderElement = () => {
    render(new UserTitleView(), this.#headerLogo);
    render(new MainFilterElementsView(), this.#siteMainElement);
    render(new FilterElementsView(), this.#siteMainElement);
    render(this.#filmContainer, this.#siteMainElement);
  };

  #renderNoTask = () => {
    render(new NoTaskView(), searchElement('.films-list'));
  };

  #showFirstFiveMovieCards = () => {
    for(let i=0; i<Math.min(this.#films.length, NUMBER_DRAWING_MOVIE_CARDS); i++){
      this.#callPopup(this.#films[i]);
      this.#movies[i] = this.#films[i];
    }
  };

  #callShowMoreButton = () => {
    render(this.#showMoreButton, searchElement('.films-list'));
    this.#showMoreButton.setClickHandler(this.#passValue);
  };

  #renderingDocument () {
    if(this.#films.every((value) => value === 0)){
      this.#renderNoTask();
      return;
    }
    this.#showFirstFiveMovieCards();
    this.#callShowMoreButton();
  }

  #showMovieCards = (from, to) => {
    this.#films
      .slice(from, to)
      .forEach((value)=>{this.#callPopup(value);});
  };

  #passValue = () => {
    this.#showMovieCards (this.#counterOfNumberOfRenderedFilms, this.#counterOfNumberOfRenderedFilms + NUMBER_DRAWING_MOVIE_CARDS);
    this.#counterOfNumberOfRenderedFilms += NUMBER_DRAWING_MOVIE_CARDS;
    if(this.#counterOfNumberOfRenderedFilms >= this.#films.length){
      const oldShowMoreButton = document.querySelector('.films-list__show-more');
      searchElement('.films-list').removeChild(oldShowMoreButton);
    }
  };

  #handleTaskChange = (updatedTask) => {
    this.#films = updateItem(this.#films, updatedTask);
    this.#taskPresenter.get(updatedTask.id).init(updatedTask);
  };

  #clearTaskList = () => {
    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();
    this.#counterOfNumberOfRenderedFilms = NUMBER_DRAWING_MOVIE_CARDS;
    remove(this.#showMoreButton);
  };

  #callPopup = (film) => {
    const renderMovieCardsPopup = new RenderMovieCardsPopup(this.#filmContainer,this.#handleTaskChange);
    renderMovieCardsPopup.init(film, this.#movies);
    this.#taskPresenter.set(film.id, renderMovieCardsPopup);
  };
}
