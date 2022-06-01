import { filmDescription } from '../temporary-data.js';

const number = 17;
export default class FilmsModel {
  getFilms = () => Array.from({length: number}, filmDescription);
}
