const utils = () => {
  const defaultShips = [
    { name: 'Carrier', length: 5 },
    { name: 'Battleship', length: 4 },
    { name: 'Destroyer', length: 3 },
    { name: 'Submarine', length: 3 },
    { name: 'Patrol Boat', length: 2 },
  ];

  const getDefaultShips = () => defaultShips;

  return { getDefaultShips };
};

export default utils;
