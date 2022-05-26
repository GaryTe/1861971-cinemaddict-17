import AbstractView from '../framework/view/abstract-view';

const createNoTaskTemplate = () =>
  '<h2 class="films-list__title">There are no movies in our database</h2>';

export  default class NoTaskView extends AbstractView{
  get template() {
    return createNoTaskTemplate();
  }
}
