type ThreeDCoordinate = [x: number, y: number, z: number];

function add3DCoordinates(
  c1: ThreeDCoordinate,
  c2: ThreeDCoordinate
): ThreeDCoordinate {
  return [c1[0] + c2[0], c1[1] + c2[1], c1[2] + c2[2]];
}

console.log(add3DCoordinates([1, 2, 3], [1, 2, 3]));

function simpleStringState(
  initial: string
): [() => string, (v: string) => void] {
  let str: string = initial;

  return [
    () => str,
    (v: string) => {
      str = v;
    },
  ];
}

const [strGetter, strSetter] = simpleStringState("hey");
console.log(strGetter());
strSetter("there");
console.log(strGetter());
