import { filmDescription } from '../temporary-data.js';

const listOfMovieObject = 5;
export default class GeneratorArrayObject {
  generator = Array.from({length: listOfMovieObject}, filmDescription);

  getObject = () => this.generator;

}
