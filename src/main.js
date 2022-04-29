import BoardPresenter from './presenter/board-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PopupPresenter from './presenter/popup-presenter.js';

const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const headerLogo = document.querySelector('.header__logo');

const boardPresenter = new BoardPresenter();
const headerPresenter = new HeaderPresenter();
const popupPresenter = new PopupPresenter();

boardPresenter.init(siteMainElement);
headerPresenter.init(headerLogo);
popupPresenter.init(body);
