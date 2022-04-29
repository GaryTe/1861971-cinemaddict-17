import TitleUser from '../view/user-title-view.js';
import {render} from '../render.js';

export default class HeaderPresenter {
  boardComponent = new TitleUser();
  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
  };
}
