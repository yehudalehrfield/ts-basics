export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

export function arrayMutate(
  numbers: number[],
  mutuate: (v: number) => number
): number[] {
  return numbers.map(mutuate);
}

console.log(arrayMutate([1, 2, 3], (v) => v * 10));

export type MutationFunction = (v: number) => number;

export function arrayMutateWithType(
  numbers: number[],
  mutuate: MutationFunction
): number[] {
  return numbers.map(mutuate);
}

// func returning a func
export function createAdder(num: number): MutationFunction {
  return (val: number) => num + val;
}

const addOne = createAdder(1);

console.log(addOne(2));
