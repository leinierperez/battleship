// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol Boat - 2
const ship = (name, length) => {
  const shipArray = new Array(length).fill(0);

  const getShipArray = () => shipArray;

  return { getShipArray, name, length };
};

export default ship;
