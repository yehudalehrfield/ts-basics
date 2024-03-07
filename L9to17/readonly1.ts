interface Cat {
  name: string;
  breed: string;
}

function makeCat(name: string, breed: string): Cat {
  return { name, breed };
}

const cat1 = makeCat("cat1", "tabby");
cat1.name = "newName";

// we want to not be able to mutate so...
type ReadonlyCat = Readonly<Cat>;

const makeCatReadonly = (name: string, breed: string): ReadonlyCat => {
  return { name, breed };
};

const cat2 = makeCatReadonly("cat1", "tabby");
// cat2.name = "newName"; //compile error since it's readonly...

function makeCoordinate(
  x: number,
  y: number,
  z: number
): readonly [number, number, number] {
  return [x, y, z];
}

const coord1 = makeCoordinate(1, 2, 3);
// coord1[0] = 10; //compile error since it's readonly...

//array immutablity

const notReallyConst = [1, 2, 3];
notReallyConst[0] = 10;

const reallyConst = [1, 2, 3] as const;
// reallyConst[0] = 10; //compile error as each element is also const
