import UserTitleView from '../view/user-title-view.js';
import MainFilterElementsView from '../view/main-filter-elements-view.js';
import FilterElementsView from '../view/filter-elements-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmContainerView from '../view/film-container-view.js';
import NoTaskView from '../view/no-task-view.js';
import RenderMovieCardsPopup from './render-movie-cards-popup.js';
import {render} from '../framework/render.js';
import { SortType, UserAction, UpdateType } from '../const.js';

const NUMBER_DRAWING_MOVIE_CARDS = 5;

function searchElement(element) {
  return document.querySelector(`${element}`);
}

export default class InterfaceRenderingPresenter {
  #tasksModel = [];
  #counterOfNumberOfRenderedFilms = NUMBER_DRAWING_MOVIE_CARDS;
  #currentSortType = SortType.SORT_BY_DEFAUL;

  #headerLogo = document.querySelector('.header');
  #siteMainElement = document.querySelector('.main');

  #showMoreButton = new ShowMoreButtonView();
  #taskPresenter = new Map();
  #sortComponent = null;
  #noTaskComponent = new NoTaskView();

  constructor(generatorObject){
    this.#tasksModel = generatorObject;
    this.#tasksModel.addObserver (this.#handleModelEvent);
  }

  get tasks() {
    switch(this.#currentSortType) {
      case SortType.SORT_BY_DATE:
        return [...this.#tasksModel.getFilms()];
      case SortType.SORT_BY_RATING:
        return [...this.#tasksModel.getFilms()];
    }
    return this.#tasksModel.getFilms();
  }

  init = () => {
    this.#renderElement();
    this.#renderingDocument();
  };

  #renderElement = () => {
    render(new UserTitleView(), this.#headerLogo);
    render(new MainFilterElementsView(), this.#siteMainElement);
    this.#renderSort ();
    render(new FilmContainerView(), this.#siteMainElement);
  };

  #renderSort = () => {
    this.#sortComponent = new FilterElementsView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#siteMainElement);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return ;
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetRenderedTaskCount: true});
    this.#renderBoard();
  };

  #renderNoTask = () => {
    render(this.#noTaskComponent, searchElement('.films-list'));
  };

  #showFirstFiveMovieCards = () => {
    for(let i=0; i<Math.min(this.tasks.length, NUMBER_DRAWING_MOVIE_CARDS); i++){
      this.#callPopup(this.tasks[i]);
    }
  };

  #callShowMoreButton = () => {
    render(this.#showMoreButton, searchElement('.films-list'));
    this.#showMoreButton.setClickHandler(this.#passValue);
  };

  #renderingDocument () {
    if(this.tasks.every((value) => value === 0)){
      this.#renderNoTask();
      return;
    }
    this.#showFirstFiveMovieCards();
    this.#callShowMoreButton();
  }

  #showMovieCards = (tasks) => {
    tasks.forEach((task) => this.#callPopup(task))
  };

  #passValue = () => {
    const taskCount = this.tasks.length;
    const newRenderedTaskCount = Math.min(taskCount, this.#counterOfNumberOfRenderedFilms + NUMBER_DRAWING_MOVIE_CARDS);
    const tasks = this.tasks.slice(this.#counterOfNumberOfRenderedFilms, newRenderedTaskCount);
    this.#showMovieCards (tasks);
    this.#counterOfNumberOfRenderedFilms = newRenderedTaskCount;
    if(this.#counterOfNumberOfRenderedFilms >= this.tasks.length){
      const oldShowMoreButton = document.querySelector('.films-list__show-more');
      searchElement('.films-list').removeChild(oldShowMoreButton);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#tasksModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#tasksModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#tasksModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    switch (updateType) {
      case UpdateType.PATCH:
        this.#taskPresenter.get(data.id).init(data, this.#tasksModel._id);
        // - обновить часть списка (например, когда поменялось описание)
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #clearBoard = ({resetRenderedTaskCount = false, resetSortType = false} = {}) => {
    const taskCount = this.tasks.length;

    this.#taskPresenter.forEach((presenter) => presenter.destroy());
    this.#taskPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noTaskComponent);
    remove(this.#showMoreButton);

    if (resetRenderedTaskCount) {
      this.#counterOfNumberOfRenderedFilms = NUMBER_DRAWING_MOVIE_CARDS;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#counterOfNumberOfRenderedFilms = Math.min(taskCount, this.#counterOfNumberOfRenderedFilms);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.SORT_BY_DEFAUL;
    }
  };

  #renderBoard = () => {
    const tasks = this.tasks;
    const taskCount = tasks.length;

    render(this.#siteMainElement, new FilmContainerView());

    if (taskCount === 0) {
      this.#renderNoTask ();
    }

    this.#renderSort ();

    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство #renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
    this.#showMovieCards(tasks.slice(0, Math.min(taskCount, this.#counterOfNumberOfRenderedFilms)));

    if (taskCount > this.#counterOfNumberOfRenderedFilms) {
      this.#callShowMoreButton ();
    }
  };

  #callPopup = (film) => {
    const renderMovieCardsPopup = new RenderMovieCardsPopup(this.#handleViewAction);
    renderMovieCardsPopup.init(film);
    this.#taskPresenter.set(film.id, renderMovieCardsPopup);
  };
}
