import humanPlayer from '../scripts/humanPlayer.js';
import computerPlayer from '../scripts/computerPlayer.js';

test('should return true if the human player attack was successful', () => {
  const player1 = humanPlayer('Player 1');
  const player2 = computerPlayer('AI');
  player2.placeShip(1, 0, 'Carrier', 5, 'vertical');
  expect(player1.attackPlayer(1, 0, player2)).toBe(true);
  expect(player1.attackPlayer(1, 1, player2)).toBe(true);
});

test('should return false if the human player tried attacking the same location', () => {
  const player1 = humanPlayer('Player 1');
  const player2 = computerPlayer('AI');
  player2.placeShip(1, 0, 'Carrier', 5, 'vertical');
  player1.attackPlayer(1, 1, player2);
  expect(player1.attackPlayer(1, 1, player2)).toBe(false);
});

test('should return true if the computer player attack was successful', () => {
  const player1 = humanPlayer('Player 1');
  const player2 = computerPlayer('AI');
  player1.placeShip(1, 0, 'Carrier', 5, 'vertical');
  expect(player2.attackPlayer(player1)).toBe(true);
  expect(player2.attackPlayer(player1)).toBe(true);
});
