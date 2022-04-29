import PopupForInformation from '../view/popup-view.js';
import {render} from '../render.js';

export default class PopupPresenter {
  boardComponent = new PopupForInformation();
  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
  };
}
