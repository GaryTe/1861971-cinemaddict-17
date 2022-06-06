import {getRandomArrayElement, getRandomPositiveInteger} from './utils.js';
import {nanoid} from 'nanoid';

const commentText = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const movieTitle = [
  'Mode for Each Other',
  'Popeye the Sailor meets Sindbad the Sailor',
  'Wayne in "Sagebrush trail"',
  'Santa Claus the Martians',
  'The Dance of life',
  'The Great Flamarion',
  'The man with Golden the arm'
];

const emotion = ['smile', 'sleeping', 'puke', 'angry'];

const postrers = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-am.jpg'
];

const description = [
  'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.',
  'Классика это класс, не то что сейчас, одни спецэффекты.',
  'Я бы посмотрел фильм "Майор Пэйн".'
];

const comment = () => ({
  'id': getRandomPositiveInteger(0, 42),
  'author': 'Ilya O\'Reilly',
  'comment': getRandomArrayElement(commentText),
  'date': '2019-05-11T16:12:32.554Z',
  'emotion': getRandomArrayElement(emotion)
});

const comments = Array.from({length: 5}, comment);

const filmDescription = () => ({
  'id': nanoid(),
  'comments': comments,
  'filmInfo': {
    'title': getRandomArrayElement(movieTitle),
    'alternative_title': 'Laziness Who Sold Themselves',
    'totalRating': 5.3,
    'poster': getRandomArrayElement(postrers),
    'age_rating': 18,
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano'
    ],
    'actors': [
      'Morgan Freeman'
    ],
    'release': {
      'date': '2019-05-11T00:00:00.000Z',
      'release_country': 'Finland'
    },
    'runtime': 77,
    'genre': [
      'Comedy',
      'Western',
      'Film-Noir'
    ],
    'description': getRandomArrayElement(description)
  },
  'userDetails': {
    'watchlist': false,
    'alreadyWatched': false,
    'watchingDate': '2019-04-12T02:12:32.554Z',
    'favorite': false
  }
});

export {filmDescription};
