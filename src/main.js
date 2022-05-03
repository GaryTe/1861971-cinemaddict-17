import DrawingMarkupElementsPresenter from './presenter/drawing-markup-elements-presenter.js';
import GeneratorObject from './model/generator-object.js';

const siteMainElement = document.querySelector('.main');

const drawingElementsPresenter = new DrawingMarkupElementsPresenter();
const generatorObject = new GeneratorObject();

drawingElementsPresenter.init(siteMainElement,generatorObject);
