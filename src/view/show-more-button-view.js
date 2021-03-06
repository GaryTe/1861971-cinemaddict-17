import AbstractView from '../framework/view/abstract-view';

const createButtonsShowMore = () => '<button class="films-list__show-more">Show more</button>';

export  default class ShowMoreButtonView extends AbstractView{
  get template() {
    return createButtonsShowMore();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#clickHandler);
  };

  #clickHandler = () => {
    this._callback.click();
  };
}
