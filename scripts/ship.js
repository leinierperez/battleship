// Carrier - 5
// Battleship - 4
// Destroyer - 3
// Submarine - 3
// Patrol Boat - 2
const ship = (name, length) => {
  const shipArray = new Array(length).fill(0);

  const getShipArray = () => [...shipArray];

  const hit = (hitLocation) => {
    if (
      hitLocation >= 0 &&
      hitLocation < length &&
      shipArray[hitLocation] !== 1
    ) {
      shipArray[hitLocation] = 1;
      return true;
    } else return false;
  };

  const isSunk = () => shipArray.every((location) => location === 1);

  return { getShipArray, name, length, hit, isSunk };
};

export default ship;
