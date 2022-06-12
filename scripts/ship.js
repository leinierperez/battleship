// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol Boat - 2
const ship = (name, length) => {
  const shipArray = new Array(length).fill(0);

  const getShipArray = () => shipArray;

  const hit = (hitLocation) => {
    if (hitLocation >= 0 && hitLocation < length) shipArray[hitLocation] = 1;
    else return 'Invalid Location';
  };

  return { getShipArray, name, length, hit };
};

export default ship;
