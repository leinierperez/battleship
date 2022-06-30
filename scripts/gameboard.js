import ship from '../scripts/ship.js';

const gameboard = () => {
  let board = new Array(10).fill(null).map(() => new Array(10).fill(null));
  let ships = {};

  const getBoard = () => [...board];

  const placeShip = (x, y, shipName, shipLength, orientation) => {
    if (
      shipFits(x, y, shipLength, orientation) &&
      !isShipIntersecting(x, y, shipLength, orientation) &&
      !isShipSurrounding(x, y, shipLength, orientation)
    ) {
      const newShip = ship(shipName, shipLength);
      if (orientation === 'horizontal') {
        for (let i = 0; i < newShip.length; i++) {
          board[x][i + y] = {
            cellHit: false,
            shipName: newShip.name,
            shipIndex: i,
          };
          ships[newShip.name] = newShip;
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < newShip.length; i++) {
          board[i + x][y] = {
            cellHit: false,
            shipName: newShip.name,
            shipIndex: i,
          };
          ships[newShip.name] = newShip;
        }
      }
      return true;
    }
    return false;
  };

  const shipFits = (x, y, shipLength, orientation) => {
    if (x >= 0 && y >= 0) {
      if (orientation === 'horizontal' && y + shipLength <= board.length)
        return true;
      else if (orientation === 'vertical' && x + shipLength <= board.length)
        return true;
    }
    return false;
  };

  const isShipIntersecting = (x, y, shipLength, orientation) => {
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
  };

  const isShipAtLocation = (x, y) => {
    if (board[x][y] === null || board[x][y] === 'miss') return false;
    else return true;
  };

  const receiveAttack = (x, y) => {
    if (isShipAtLocation(x, y) && !ships[board[x][y].shipName].isSunk()) {
      const { shipName, shipIndex } = board[x][y];
      const ship = ships[shipName];
      if (ship.hit(shipIndex)) {
        board[x][y].cellHit = true;
        return true;
      }
      return false;
    } else if (isShipAtLocation(x, y) === false && board[x][y] !== 'miss') {
      board[x][y] = 'miss';
      return true;
    }
    return false;
  };

  const isAllShipsSunk = () => {
    let shipsSunk = [];
    for (const ship in ships) {
      shipsSunk.push(ships[ship].isSunk());
    }
    return shipsSunk.every((val) => val === true);
  };

  const isShipSurrounding = (x, y, shipLength, orientation) => {
    if (orientation === 'horizontal') {
      for (let i = y - 1; i <= y + shipLength; ++i) {
        if (i < 0 || i > 9) continue;
        for (let j = x - 1; j <= x + 1; j++) {
          if (j < 0 || j > 9) continue;
          if (isShipAtLocation(j, i)) return true;
        }
      }
    } else if (orientation === 'vertical') {
      for (let i = y - 1; i <= y + 1; ++i) {
        if (i < 0 || i > 9) continue;
        for (let j = x - 1; j <= x + shipLength; j++) {
          if (j < 0 || j > 9) continue;
          if (isShipAtLocation(j, i)) return true;
        }
      }
    }
    return false;
  };

  return {
    getBoard,
    placeShip,
    isShipAtLocation,
    receiveAttack,
    isAllShipsSunk,
  };
};

export default gameboard;
