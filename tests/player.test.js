import humanPlayer from '../scripts/humanPlayer.js';
import computerPlayer from '../scripts/computerPlayer.js';
import utils from '../scripts/utils.js';

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

test('should return true if the computer randomly places their ships', () => {
  const { getDefaultShips } = utils();
  const correctShipCellCount = getDefaultShips().reduce((prev, curr) => {
    return prev + curr.length;
  }, 0);
  const player2 = computerPlayer('AI');
  player2.placeAllShips();
  let board = player2.getBoard();
  let shipCellsCount = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] !== null) shipCellsCount++;
    }
  }
  expect(shipCellsCount).toBe(correctShipCellCount);
});

test('should return true if the computer randomly attacks a players ship', () => {
  const player1 = humanPlayer('Player 1');
  const player2 = computerPlayer('AI');
  expect(player2.attackPlayer(player1)).toBe(true);
  expect(player2.attackPlayer(player1)).toBe(true);
});
