const gameboard = () => {
  const board = new Array(10).fill(null).map(() => new Array(10).fill(null));

  const getBoard = () => board;

  return { getBoard };
};

export default gameboard;
