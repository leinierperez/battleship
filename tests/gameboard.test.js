import gameboard from '../scripts/gameboard.js';

test('should initialize gameboard and return it', () => {
  const newGameboard = gameboard();
  expect(newGameboard.getBoard()).toEqual(
    new Array(10).fill(null).map(() => new Array(10).fill(null))
  );
});
