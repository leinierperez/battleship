import game from './game.js';
import utils from './utils.js';

// TODO: Some Refactoring can be done
const dom = (() => {
  const playerBoardElement = document.querySelector('.player-board');
  const computerBoardElement = document.querySelector('.computer-board');
  const playAgainButton = document.querySelector('#play-again-btn');
  const gameoverDiv = document.querySelector('.gameover');
  const orientationButton = document.querySelector('#orientation-btn');
  const middleMessageDiv = document.querySelector('.middle-message-container');
  const { getDefaultShips } = utils();
  let currentOrientation = 'vertical';
  let newGame = game();
  let ships = getDefaultShips();
  let currentShip = ships.shift();
  let currentCells = [];
  let humanPlayer = newGame.getHumanPlayer();
  let computerPlayer = newGame.getComputerPlayer();

  const createGameboard = (size, container) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const cell = document.createElement('div');
        cell.classList.add('board-cell');
        cell.dataset.x = i;
        cell.dataset.y = j;
        container.appendChild(cell);
      }
    }
  };

  const displayShipPlacement = (e, currentShip, currentCells, nextShip) => {
    if (currentShip === undefined) return;
    const element = e.target;
    const x = parseInt(element.dataset.x);
    const y = parseInt(element.dataset.y);
    let result = newGame.placeShip(x, y, currentShip, currentOrientation);
    if (!result) return result;
    for (const cell of currentCells) {
      cell.classList.remove('hovered-cell');
      cell.classList.add('ship-cell');
    }
    for (let i = 0; i < nextShip.length; i++) {
      currentCells[i].classList.add('invalid-placement');
    }
    colorSurroundingCells(x, y, currentOrientation, currentShip);
    return result;
  };

  const updateCellsOnHover = (e, currentShip, currentCells) => {
    if (currentShip === undefined) return;
    const playerCells = [...playerBoardElement.children];
    const element = e.target;
    const x = parseInt(element.dataset.x);
    const y = parseInt(element.dataset.y);
    let cell;
    for (let i = 0; i < currentShip.length; i++) {
      if (currentOrientation === 'vertical') {
        cell = findCell(playerCells, x + i, y);
      } else {
        cell = findCell(playerCells, x, y + i);
      }
      if (cell) {
        currentCells.push(cell);
        cell.classList.add('hovered-cell');
      }
    }
    for (const cell of currentCells) {
      if (
        currentCells.length !== currentShip.length ||
        cell.classList.contains('ship-cell') ||
        cell.classList.contains('surrounding-cell')
      ) {
        cell.classList.add('invalid-placement');
      }
    }
  };

  const updateCellsOnMouseLeave = (e) => {
    const playerCells = [...playerBoardElement.children];
    for (const cell of playerCells) {
      cell.classList.remove('hovered-cell');
      cell.classList.remove('invalid-placement');
    }
  };

  const cellsPositioningHandler = () => {
    playerBoardElement.addEventListener('click', (e) => {
      let nextShip = ships[0] || 1;
      const result = displayShipPlacement(
        e,
        currentShip,
        currentCells,
        nextShip
      );
      if (!result) return;
      currentShip = ships.shift();
      if (currentShip === undefined) {
        enableBoards();
        computerBoardElement.classList.remove('disabled-board');
        middleMessageDiv.style.display = 'none';
      }
    });
    playerBoardElement.addEventListener('mouseover', (e) =>
      updateCellsOnHover(e, currentShip, currentCells)
    );
    playerBoardElement.addEventListener('mouseout', (e) => {
      updateCellsOnMouseLeave(e);
      currentCells = [];
    });
  };

  const colorSurroundingCells = (x, y, orientation, currentShip) => {
    const playerCells = [...playerBoardElement.children];
    if (orientation === 'horizontal') {
      for (let i = y - 1; i <= y + currentShip.length; ++i) {
        if (i < 0 || i > 9) continue;
        for (let j = x - 1; j <= x + 1; j++) {
          if (j < 0 || j > 9) continue;
          const cell = findCell(playerCells, j, i);
          if (!cell.classList.contains('ship-cell')) {
            cell.classList.add('surrounding-cell');
          }
        }
      }
    } else if (orientation === 'vertical') {
      for (let i = y - 1; i <= y + 1; ++i) {
        if (i < 0 || i > 9) continue;
        for (let j = x - 1; j <= x + currentShip.length; j++) {
          if (j < 0 || j > 9) continue;
          const cell = findCell(playerCells, j, i);
          if (!cell.classList.contains('ship-cell')) {
            cell.classList.add('surrounding-cell');
          }
        }
      }
    }
  };

  const updateBoard = (player, cells) => {
    const playerBoard = player.getBoard();
    for (let i = 0; i < playerBoard.length; i++) {
      for (let j = 0; j < playerBoard.length; j++) {
        if (playerBoard[i][j] === 'miss') {
          createAttackSpan(true, cells, i, j);
        } else if (playerBoard[i][j] !== null && playerBoard[i][j].cellHit) {
          createAttackSpan(false, cells, i, j);
        }
      }
    }
  };

  const createAttackSpan = (isMiss, cells, x, y) => {
    const span = document.createElement('span');
    const cell = findCell(cells, x, y);
    if (cell.firstChild) return;
    if (isMiss) {
      span.classList.add('attack', 'attack-missed');
    } else {
      span.classList.add('attack', 'attack-successful');
    }
    cell.appendChild(span);
  };

  const findCell = (cells, x, y) => {
    return cells.find(
      (cell) =>
        parseInt(cell.getAttribute('data-x')) === x &&
        parseInt(cell.getAttribute('data-y')) === y
    );
  };

  const attackBoard = (e) => {
    const element = e.target.closest('.board-cell');
    if (!element) return;
    const computerCells = [...computerBoardElement.children];
    const playerCells = [...playerBoardElement.children];
    const x = parseInt(element.dataset.x);
    const y = parseInt(element.dataset.y);
    const winner = newGame.playTurn(x, y);
    updateBoard(humanPlayer, playerCells);
    updateBoard(computerPlayer, computerCells);
    if (winner) {
      disableBoards();
      displayGameover(winner);
    }
  };

  const changeShipOrientation = () => {
    if (currentOrientation === 'vertical') {
      currentOrientation = 'horizontal';
      orientationButton.innerText = 'Horizontal';
    } else {
      currentOrientation = 'vertical';
      orientationButton.innerText = 'Vertical';
    }
  };

  const displayGameover = (winningPlayer) => {
    const winningMessageH2 = document.querySelector('.win-message');
    gameoverDiv.style = 'display: flex';
    const winningText =
      winningPlayer.getName() === 'Human' ? 'Player' : 'Computer';
    winningMessageH2.innerText = `The ${winningText} has Won`;
  };

  const restartGame = () => {
    newGame = game();
    ships = getDefaultShips();
    currentShip = ships.shift();
    currentCells = [];
    enableBoards();
    humanPlayer = newGame.getHumanPlayer();
    computerPlayer = newGame.getComputerPlayer();
    resetDisplay();
  };

  const resetDisplay = () => {
    const computerCells = [...computerBoardElement.children];
    const playerCells = [...playerBoardElement.children];
    for (const cell of computerCells) {
      if (cell.firstChild) cell.firstChild.remove();
    }
    for (const cell of playerCells) {
      if (cell.firstChild) cell.firstChild.remove();
      cell.classList.remove('ship-cell', 'surrounding-cell');
    }
    gameoverDiv.style = 'display: none';
    middleMessageDiv.style.display = 'block';
    computerBoardElement.classList.add('disabled-board');
  };

  const disableBoards = () => {
    playerBoardElement.style.pointerEvents = 'none';
    computerBoardElement.style.pointerEvents = 'none';
  };

  const enableBoards = () => {
    playerBoardElement.style.pointerEvents = 'auto';
    computerBoardElement.style.pointerEvents = 'auto';
  };

  const init = () => {
    createGameboard(10, playerBoardElement);
    createGameboard(10, computerBoardElement);
    cellsPositioningHandler();
    orientationButton.addEventListener('click', changeShipOrientation);
    playAgainButton.addEventListener('click', restartGame);
    computerBoardElement.addEventListener('click', attackBoard);
  };

  return { init };
})();

export default dom;
