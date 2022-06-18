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

test('should not place a ship on the gameboard if the ship does not fit', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(8, 1, 'Battleship', 4, 'vertical');
  expect(newGameboard.isShipAtLocation(8, 1)).toBe(false);
});

test('should not place a ship on the gameboard if the ships intersect', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(4, 1, 'Battleship', 4, 'horizontal');
  newGameboard.placeShip(4, 4, 'Battleship', 4, 'horizontal');
  newGameboard.placeShip(3, 1, 'Battleship', 4, 'vertical');
  expect(newGameboard.isShipAtLocation(4, 5)).toBe(false);
  expect(newGameboard.isShipAtLocation(3, 1)).toBe(false);
});

test('should return true if the attack invoked the ships hit function it hit a ship', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(4, 2, 'Battleship', 4, 'vertical');
  expect(newGameboard.receiveAttack(4, 2)).toBe(true);
});

test(`should return false if the ship was already attacked at that location`, () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(4, 2, 'Battleship', 4, 'vertical');
  newGameboard.receiveAttack(4, 2);
  expect(newGameboard.receiveAttack(4, 2)).toBe(false);
});

test('should put a miss on the board if the attack did not hit a ship', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(5, 2, 'Battleship', 4, 'vertical');
  newGameboard.receiveAttack(4, 2);
  expect(newGameboard.getBoard()[4][2]).toBe('miss');
});

test('should return true if all the ships on the board have sunk', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(1, 0, 'Carrier', 5, 'vertical');
  newGameboard.placeShip(1, 1, 'Battleship', 4, 'vertical');
  newGameboard.placeShip(1, 2, 'Destroyer', 3, 'vertical');
  newGameboard.placeShip(1, 3, 'Submarine', 3, 'vertical');
  newGameboard.placeShip(1, 4, 'Patrol Boat', 2, 'vertical');

  for (let i = 1; i <= 5; i++) {
    newGameboard.receiveAttack(i, 0);
    newGameboard.receiveAttack(i, 1);
    newGameboard.receiveAttack(i, 2);
    newGameboard.receiveAttack(i, 3);
    newGameboard.receiveAttack(i, 4);
  }

  expect(newGameboard.isAllShipsSunk()).toBe(true);
});

test('should return false if all the ships on the board have not sunk', () => {
  const newGameboard = gameboard();
  newGameboard.placeShip(1, 0, 'Carrier', 5, 'vertical');
  newGameboard.placeShip(1, 1, 'Battleship', 4, 'vertical');
  newGameboard.placeShip(1, 2, 'Destroyer', 3, 'vertical');
  newGameboard.placeShip(1, 3, 'Submarine', 3, 'vertical');
  newGameboard.placeShip(1, 4, 'Patrol Boat', 2, 'vertical');

  for (let i = 1; i <= 5; i++) {
    newGameboard.receiveAttack(i, 0);
    newGameboard.receiveAttack(i, 1);
    newGameboard.receiveAttack(i, 3);
    newGameboard.receiveAttack(i, 4);
  }

  expect(newGameboard.isAllShipsSunk()).toBe(false);
});
