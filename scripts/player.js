import gameboard from '../scripts/gameboard.js';

const player = (name, isAI) => {
  const { placeShip, getBoard, receiveAttack, isAllShipsSunk, resetBoard } =
    gameboard();

  const attackPlayer = (x, y, playerToAttack) => {
    if (!isAI) {
      return playerToAttack.receiveAttack(x, y);
    } else if (isAI) {
      let result;
      do {
        const [x1, y1] = getRandomBoardCoords();
        result = playerToAttack.receiveAttack(x1, y1);
      } while (result === false);
      return result;
    }
  };

  const getRandomBoardCoords = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const getName = () => name;

  return {
    attackPlayer,
    placeShip,
    getName,
    getBoard,
    receiveAttack,
    isAllShipsSunk,
    resetBoard,
  };
};

export default player;
