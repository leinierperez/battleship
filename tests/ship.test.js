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
