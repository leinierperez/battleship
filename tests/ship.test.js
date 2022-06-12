import ship from '../scripts/ship.js';

test('should create a ship of given length and name', () => {
  const newShip = ship('Carrier', 5);
  expect(newShip.name).toBe('Carrier');
  expect(newShip.length).toBe(5);
});

test('should initialize shipArray once a ship is created', () => {
  const newShip = ship('Patrol Boat', 2);
  expect(newShip.getShipArray()).toEqual([0, 0]);
});

test('should mark given position as hit on the ship', () => {
  const newShip = ship('Carrier', 5);
  newShip.hit(3);
  expect(newShip.getShipArray()).toEqual([0, 0, 0, 1, 0]);
});

test('should return error message if its an invalid position on the ship', () => {
  const newShip = ship('Carrier', 5);
  expect(newShip.hit(5)).toBe('Invalid Location');
});
