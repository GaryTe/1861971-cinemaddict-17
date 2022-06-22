import {render, replace, remove} from '../framework/render.js';
import MainFilterElementsView from '../view/main-filter-elements-view';
//import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export  default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #tasksModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, tasksModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    //const tasks = this.#tasksModel.tasks;

    return [
      {
        type: FilterType.ALL,
        name: 'All',
        //count: filter[FilterType.ALL](tasks).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'WATCHLIST',
        //count: filter[FilterType.OVERDUE](tasks).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'HISTORY',
        //count: filter[FilterType.TODAY](tasks).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'FAVORITES',
        // count: filter[FilterType.FAVORITES](tasks).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new MainFilterElementsView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
