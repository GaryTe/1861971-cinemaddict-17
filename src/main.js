import InterfaceRenderingPresenter from './presenter/interface-rendering-presenter.js';
import FilmsModel from './model/films-model.js';

const films = new FilmsModel();
const interfaceRendering = new InterfaceRenderingPresenter(films);


interfaceRendering.init();
