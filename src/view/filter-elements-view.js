import AbstractView from '../framework/view/abstract-view';
import {SortType} from '../const.js';

const createButtonsFilter = (currentSortType) =>
  `<ul class="sort">
<li><a href="#" class="sort__button ${currentSortType === SortType.SORT_BY_DEFAUL? 'sort__button--active': ''}">Sort by default</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortType.SORT_BY_DATE? 'sort__button--active': ''}">Sort by date</a></li>
<li><a href="#" class="sort__button ${currentSortType === SortType.SORT_BY_RATING? 'sort__button--active': ''}">Sort by rating</a></li>
</ul>`;

export default class FilterElementsView extends AbstractView{

  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createButtonsFilter(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'YA-TR-SPAN') {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };

}
