import houses from "./houses.json";

interface House {
  name: string;
  planets: string | string[];
}

interface HouseWithID {
  name: string;
  planets: string | string[];
  id: number;
}

function findHouses(houses: string): HouseWithID[];
function findHouses(
  houses: string,
  filter: (house: House) => boolean
): HouseWithID[];
function findHouses(houses: House[]): HouseWithID[];
function findHouses(
  houses: House[],
  filter: (house: House) => boolean
): HouseWithID[];

function findHouses(housesArg: unknown, filterArg?: unknown) {
  let housesWithIds: HouseWithID[] = [];
  if (typeof housesArg == "string") {
    JSON.parse(housesArg).forEach((house: House) => {
      housesWithIds.push(assignIdToHouse(house));
    });
  } else {
    (housesArg as House[]).forEach((house: House) => {
      housesWithIds.push(assignIdToHouse(house));
    });
  }
  if (typeof filterArg == "function") {
    return housesWithIds.filter((house) => filterArg(house));
  }
  return housesWithIds;
}

const generateId = (): number => Math.floor(Math.random() * 100);

const assignIdToHouse = (house: House): HouseWithID => {
  return { name: house.name, planets: house.planets, id: generateId() };
};

console.log(
  findHouses(JSON.stringify(houses), ({ name }) => name === "Atreides")
);

console.log(findHouses(houses, ({ name }) => name === "Harkonnen"));

console.log(findHouses(JSON.stringify(houses)));
console.log(findHouses(houses));
