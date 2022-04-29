import FirstFilter from '../view/filter-view.js';
import CardMovie from '../view/movie-card-view.js';
import ButtonsShowMore from '../view/button-show-more.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent1 = new FirstFilter();
  boardComponent2 = new CardMovie();
  boardComponent4 = new ButtonsShowMore();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent1, this.boardContainer);
    render(this.boardComponent2, this.boardContainer);
    render(this.boardComponent4, this.boardComponent2.getElement());
  };
}
