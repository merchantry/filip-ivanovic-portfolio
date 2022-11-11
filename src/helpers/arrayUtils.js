import { randomInt } from './helpers';

export function newArray(length, callback) {
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(callback(i));
  }

  return array;
}

export function randomizeElements(array) {
  const randArray = [];
  let freeSpaces = newArray(array.length, (i) => i);

  for (let i = 0; i < array.length; i++) {
    const index = freeSpaces[randomInt(0, freeSpaces.length) - 1];
    freeSpaces = freeSpaces.filter((i) => i !== index);
    randArray.push(array[index]);
  }
  return randArray;
}
