import AbstractView from '../framework/view/abstract-view';

const createButtonsFilter = () =>
  `<ul class="sort">
<li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
<li><a href="#" class="sort__button">Sort by date</a></li>
<li><a href="#" class="sort__button">Sort by rating</a></li>
</ul>`;

export default class FilterElementsView extends AbstractView{
  get template() {
    return createButtonsFilter();
  }
}
