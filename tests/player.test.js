import player from '../scripts/player.js';

test('should return true if the human player attack was successful', () => {
  const humanPlayer = player('Player 1', false);
  const computerPlayer = player('AI', true);
  computerPlayer.placeShip(1, 0, 'Carrier', 5, 'vertical');
  expect(humanPlayer.attackPlayer(1, 0, computerPlayer)).toBe(true);
  expect(humanPlayer.attackPlayer(1, 1, computerPlayer)).toBe(true);
});

test('should return false if the human player tried attacking the same location', () => {
  const humanPlayer = player('Player 1', false);
  const computerPlayer = player('AI', true);
  computerPlayer.placeShip(1, 0, 'Carrier', 5, 'vertical');
  humanPlayer.attackPlayer(1, 1, computerPlayer);
  expect(humanPlayer.attackPlayer(1, 1, computerPlayer)).toBe(false);
});

test('should return true if the computer player attack was successful', () => {
  const humanPlayer = player('Player 1', false);
  const computerPlayer = player('AI', true);
  humanPlayer.placeShip(1, 0, 'Carrier', 5, 'vertical');
  expect(computerPlayer.attackPlayer(null, null, humanPlayer)).toBe(true);
  expect(computerPlayer.attackPlayer(null, null, humanPlayer)).toBe(true);
});
