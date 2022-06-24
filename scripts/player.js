import gameboard from '../scripts/gameboard.js';

const player = (name, isAI) => {
  const board = gameboard();
  const { placeShip, getBoard } = board;

  const attackPlayer = (x, y, playerToAttack) => {
    if (!isAI) {
      return playerToAttack.getBoard().receiveAttack(x, y);
    } else if (isAI) {
      let result;
      do {
        const [x1, y1] = getRandomBoardCoords();
        result = playerToAttack.getBoard().receiveAttack(x1, y1);
      } while (result === false);
      return result;
    }
  };

  const getRandomBoardCoords = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    return [x, y];
  };

  const getName = () => name;

  return { attackPlayer, placeShip, getRandomBoardCoords, getName, getBoard };
};

export default player;
