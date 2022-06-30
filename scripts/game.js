import humanPlayer from './humanPlayer.js';
import computerPlayer from './computerPlayer.js';

const game = () => {
  const player1 = humanPlayer('Human');
  const player2 = computerPlayer('AI');
  player2.placeAllShips();

  const placeShip = (x, y, ship, orientation) => {
    return player1.placeShip(x, y, ship.name, ship.length, orientation);
  };

  const playTurn = (x, y) => {
    const playerAttackResult = player1.attackPlayer(x, y, player2);
    if (!playerAttackResult) return;
    if (player2.isAllShipsSunk()) return player1;
    player2.attackPlayer(player1);
    if (player1.isAllShipsSunk()) return player2;
  };

  const getHumanPlayer = () => player1;

  const getComputerPlayer = () => player2;

  return {
    playTurn,
    placeShip,
    getHumanPlayer,
    getComputerPlayer,
  };
};

export default game;
