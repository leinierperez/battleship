import gameboard from '../scripts/gameboard.js';

test('should initialize gameboard and return it', () => {
  const newGameboard = gameboard();
  expect(newGameboard.getBoard()).toEqual(
    new Array(10).fill(null).map(() => new Array(10).fill(null))
  );
});

test('should place a ship on the gameboard horizontally', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(2, 1, 'Carrier', 5, 'horizontal');
  expect(newGameboard.isShipAtLocation(2, 1)).toBe(!null);
  expect(newGameboard.isShipAtLocation(2, 2)).toBe(!null);
  expect(newGameboard.isShipAtLocation(2, 3)).toBe(!null);
  expect(newGameboard.isShipAtLocation(2, 4)).toBe(!null);
  expect(newGameboard.isShipAtLocation(2, 5)).toBe(!null);
});

test('should place a ship on the gameboard vertically', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(4, 2, 'Battleship', 4, 'vertical');
  expect(newGameboard.isShipAtLocation(4, 2)).toBe(!null);
  expect(newGameboard.isShipAtLocation(5, 2)).toBe(!null);
  expect(newGameboard.isShipAtLocation(6, 2)).toBe(!null);
  expect(newGameboard.isShipAtLocation(7, 2)).toBe(!null);
});
