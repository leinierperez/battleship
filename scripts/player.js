import gameboard from '../scripts/gameboard.js';

const player = (name) => {
  const { placeShip, getBoard, receiveAttack, isAllShipsSunk } = gameboard();

  const getName = () => name;

  return {
    placeShip,
    getName,
    getBoard,
    receiveAttack,
    isAllShipsSunk,
  };
};

export default player;
