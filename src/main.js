import DrawingMarkupElementsPresenter from './presenter/drawing-markup-elements-presenter.js';
import GeneratorArrayObject from './model/generator-object.js';

const siteMainElement = document.querySelector('.main');

const drawingElementsPresenter = new DrawingMarkupElementsPresenter();
const generatorObject = new GeneratorArrayObject();

drawingElementsPresenter.init(siteMainElement,generatorObject);
