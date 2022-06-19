import { filmDescription } from '../temporary-data.js';
import Observable from '../framework/observable.js';


const number = 18;
export default class FilmsModel extends Observable {
  _id = 0;
  #tasks = Array.from({length: number}, filmDescription);
  getFilms = () => this.#tasks;

  updateTask = (updateType, update) => {
    const index = this.#tasks.findIndex((item) => item.id === update.id);
    this._id = index;

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      update,
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addTask = (updateType, update) => {
    this.#tasks = [
      update,
      ...this.#tasks,
    ];

    this._notify(updateType, update);
  };


  deleteTask = (updateType, update) => {
    const index = this.#tasks.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#tasks = [
      ...this.#tasks.slice(0, index),
      ...this.#tasks.slice(index + 1),
    ];

    this._notify(updateType);

  };
}
