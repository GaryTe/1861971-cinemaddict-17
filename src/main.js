import InterfaceRenderingPresenter from './presenter/interface-rendering-presenter.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteMainElement = document.querySelector('.main');

const films = new FilmsModel();
const filterModel = new FilterModel();
const interfaceRendering = new InterfaceRenderingPresenter(films);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, films);

filterPresenter.init();
interfaceRendering.init();
