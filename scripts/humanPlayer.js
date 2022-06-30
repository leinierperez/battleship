import player from './player.js';

const humanPlayer = (name) => {
  const { placeShip, getBoard, receiveAttack, isAllShipsSunk, getName } =
    player(name);

  const attackPlayer = (x, y, playerToAttack) =>
    playerToAttack.receiveAttack(x, y);

  return {
    attackPlayer,
    placeShip,
    getName,
    getBoard,
    receiveAttack,
    isAllShipsSunk,
  };
};

export default humanPlayer;
