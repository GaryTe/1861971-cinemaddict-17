import DrawingMarkupElementsPresenter from './presenter/drawing-markup-elements-presenter.js';

const siteMainElement = document.querySelector('.main');

const drawingElementsPresenter = new DrawingMarkupElementsPresenter();

drawingElementsPresenter.init(siteMainElement);
