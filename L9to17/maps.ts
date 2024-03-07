type FlexibleDogInfo = {
  name: string;
} & Record<string, string>;

const dog: FlexibleDogInfo = {
  name: "max",
  breed: "mutt",
};
console.log(dog);

const dog2: FlexibleDogInfo = {
  name: "spot",
  breed: "dachsund",
  age: "5",
};

console.log(dog2);

// now we will do this without using Record

type FlexibleDogInfoBetter = {
  name: string;
  [key: string]: string | number;
};

interface DogInfo {
  name: string;
  age: number;
}

// from TS docs in Mapped Types
type OptionalFlags<Type> = {
  [Property in keyof Type]: string | number; //boolean;
};

type DogInfoOptions = OptionalFlags<DogInfo>; // now DogInfoOptions automatically has the type of DogInfo

type Listeners<T> = {
  [Property in keyof T as `on${Capitalize<string & Property>}Change`]?: (
    newVal: T[Property]
  ) => void;
} & {
  [Property in keyof T as `on${Capitalize<
    string & Property
  >}Delete`]?: () => void;
};

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented";
}

const max: DogInfo = {
  name: "max",
  age: 2,
};

type DogInfoListeners = Listeners<DogInfo>; // just creating this so we can cmd+I => cmd+K and see what type we are looking at

listenToObject(max, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {},
});
