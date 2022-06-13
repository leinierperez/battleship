import ship from '../scripts/ship.js';

const gameboard = () => {
  const board = new Array(10).fill(null).map(() => new Array(10).fill(null));

  const getBoard = () => board;

  const placeShip = (x, y, shipName, shipLength, orientation) => {
    const newShip = ship(shipName, shipLength);
    if (orientation === 'horizontal') {
      for (let i = 0; i < newShip.length; i++) {
        board[x][i + y] = newShip;
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < newShip.length; i++) {
        board[i + x][y] = newShip;
      }
    }
  };

  const isShipAtLocation = (x, y) => {
    if (board[x][y] === null) return false;
    else return true;
  };

  return { getBoard, placeShip, isShipAtLocation };
};

export default gameboard;
