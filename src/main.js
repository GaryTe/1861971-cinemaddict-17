import InterfaceRenderingPresenter from './presenter/interface-rendering-presenter.js';
import FilmsModel from './model/films-model.js';

const siteMainElement = document.querySelector('.main');

const interfaceRendering = new InterfaceRenderingPresenter();
const films = new FilmsModel();

interfaceRendering.init(siteMainElement,films);
