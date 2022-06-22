import AbstractView from '../framework/view/abstract-view';

const mainNavigationFilter = (filters, currentFilter) => {
  const {type} =  filters;
  return(
    `<nav class="main-navigation">
<a href="#all" class="main-navigation__item ${type === currentFilter? 'main-navigation__item--active': ''}">All movies</a>
<a href="#watchlist" class="main-navigation__item ${type === currentFilter? 'main-navigation__item--active': ''}">Watchlist <span class="main-navigation__item-count">13</span></a>
<a href="#history" class="main-navigation__item ${type === currentFilter? 'main-navigation__item--active': ''}">History <span class="main-navigation__item-count">4</span></a>
<a href="#favorites" class="main-navigation__item ${type === currentFilter? 'main-navigation__item--active': ''}">Favorites <span class="main-navigation__item-count">8</span></a>
</nav>`);
};

export default class MainFilterElementsView extends AbstractView {

  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template () {
    return mainNavigationFilter(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    console.log (evt.target.href);
    this._callback.filterTypeChange(evt.target.value);
  };

}
