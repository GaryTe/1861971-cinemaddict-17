import { filmDescription } from '../temporary-data.js';

export default class GeneratorObject {
  generator = Array.from({length: 5}, filmDescription);

  getObject = () => this.generator;

}
