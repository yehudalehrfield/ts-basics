//todo: recreate forEach, filter, map using reduce...

function forEachMyVersion<T>(items: T[], forEachFunc: (v: T) => void) {
  items.reduce((a, v) => {
    forEachFunc(v);
    return undefined;
  }, undefined);
}

forEachMyVersion([1, 2, 3], (v: number) => {
  console.log(v + 1);
});

function filterMyVersion<T>(items: T[], filterFunc: (v: T) => boolean): T[] {
  return items.reduce((a: T[], v: T) => (filterFunc(v) ? [...a, v] : a), []);
}

console.log(filterMyVersion([1, 2, 3, 4, 5, 6], (v: number) => v % 2 == 0));

function mapMyVersion<T>(items: T[], mapFunc: (v: T) => T): T[] {
  return items.reduce((a: T[], v: T) => [...a, mapFunc(v)], []);
}

console.log(mapMyVersion([1, 2, 3, 4, 5], (v: number) => v * 2));

function mapMyVersionJH<T, K>(items: T[], mapFunc: (v: T) => K): K[] {
  return items.reduce((a: K[], v: T) => [...a, mapFunc(v)], []);
}

console.log(mapMyVersionJH([1, 2, 3, 4, 5], (v: number) => v * 2));
console.log(
  mapMyVersionJH([1, 2, 3, 4, 5], (v: number) => (v * 10).toString())
);
