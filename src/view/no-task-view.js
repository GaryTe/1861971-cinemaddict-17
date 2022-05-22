import { createElement } from '../render.js';

const createNoTaskTemplate = () =>
  '<h2 class="films-list__title">There are no movies in our database</h2>';

export  default class NoTaskView {
  getTemplate() {
    return createNoTaskTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
