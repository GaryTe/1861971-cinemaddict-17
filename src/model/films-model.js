import { filmDescription } from '../temporary-data.js';

const number = 7;
export default class FilmsModel {
  getFilms = () => Array.from({length: number}, filmDescription);
}
