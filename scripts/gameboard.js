import ship from '../scripts/ship.js';

const gameboard = () => {
  const board = new Array(10).fill(null).map(() => new Array(10).fill(null));

  const getBoard = () => board;

  const placeShip = (x, y, shipName, shipLength, orientation) => {
    if (x > 0 && y > 0 && isShipAtLocation(x, y) === false) {
      if (orientation === 'horizontal' && y + shipLength < board[0].length) {
        const newShip = ship(shipName, shipLength);
        for (let i = 0; i < newShip.length; i++) {
          board[x][i + y] = newShip;
        }
      } else if (orientation === 'vertical' && x + shipLength < board.length) {
        const newShip = ship(shipName, shipLength);
        for (let i = 0; i < newShip.length; i++) {
          board[i + x][y] = newShip;
        }
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
