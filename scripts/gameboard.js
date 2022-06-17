import ship from '../scripts/ship.js';

const gameboard = () => {
  const board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  const ships = {};

  const getBoard = () => board;

  const placeShip = (x, y, shipName, shipLength, orientation) => {
    if (
      shipFits(x, y, shipLength) &&
      !isShipIntersecting(x, y, shipLength, orientation)
    ) {
      const newShip = ship(shipName, shipLength);
      if (orientation === 'horizontal') {
        for (let i = 0; i < newShip.length; i++) {
          board[x][i + y] = { shipName: newShip.name, shipIndex: i };
          ships[newShip.name] = newShip;
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < newShip.length; i++) {
          board[i + x][y] = { shipName: newShip.name, shipIndex: i };
          ships[newShip.name] = newShip;
        }
      }
    }
  };

  const shipFits = (x, y, shipLength) => {
    if (
      x > 0 &&
      y > 0 &&
      y + shipLength < board[0].length &&
      x + shipLength < board.length
    ) {
      return true;
    }
    return false;
  };

  const isShipIntersecting = (x, y, shipLength, orientation) => {
    if (!isShipAtLocation(x, y)) {
      if (orientation === 'horizontal') {
        for (let i = 0; i < shipLength; i++) {
          if (isShipAtLocation(x, i + y)) return true;
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < shipLength; i++) {
          if (isShipAtLocation(i + x, y)) return true;
        }
      }
      return false;
    } else {
      return true;
    }
  };

  const isShipAtLocation = (x, y) => {
    if (board[x][y] === null) return false;
    else return true;
  };

  const receiveAttack = (x, y) => {
    if (isShipAtLocation(x, y) && !ships[board[x][y].shipName].isSunk()) {
      const { shipName, shipIndex } = board[x][y];
      const ship = ships[shipName];
      return ship.hit(shipIndex);
    } else if (isShipAtLocation(x, y) === false) {
      board[x][y] = 'miss';
      return 'miss';
    }
  };

  return { getBoard, placeShip, isShipAtLocation, receiveAttack };
};

export default gameboard;
