import player from './player.js';
import utils from './utils.js';

const computerPlayer = (name) => {
  const { placeShip, getName, getBoard, receiveAttack, isAllShipsSunk } =
    player(name);
  const { getDefaultShips, randomInArray } = utils();

  const placeAllShips = () => {
    const orientations = ['vertical', 'horizontal'];
    let randomOrientation = randomInArray(orientations);
    let [x, y] = getRandomBoardCoords();
    for (const { name, length } of getDefaultShips()) {
      while (!placeShip(x, y, name, length, randomOrientation)) {
        [x, y] = getRandomBoardCoords();
        randomOrientation = randomInArray(orientations);
      }
    }
  };

  const attackPlayer = (playerToAttack) => {
    let result;
    do {
      const [x, y] = getRandomBoardCoords();
      result = playerToAttack.receiveAttack(x, y);
    } while (result === false);
    return result;
  };

  const getRandomBoardCoords = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  return {
    attackPlayer,
    placeShip,
    getName,
    getBoard,
    receiveAttack,
    isAllShipsSunk,
    placeAllShips,
  };
};

export default computerPlayer;
