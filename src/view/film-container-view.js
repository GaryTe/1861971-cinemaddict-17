import AbstractView from '../framework/view/abstract-view';

const filmContainer = () =>
  `<section class="films">
<section class="films-list">
<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
<div class="films-list__container">`;

export  default class FilmContainerView extends AbstractView{
  get template() {
    return filmContainer();
  }
}
