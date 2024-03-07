function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Max", age: 12 },
  { name: "Spot", age: 10 },
];

console.log(pluck(dogs, "name"));
console.log(pluck(dogs, "age"));

interface BaseEvent {
  time: number;
  user: string;
}

interface EventMap {
  addToCart: BaseEvent & { quantity: number; productId: string };
  checkout: BaseEvent;
}

function sendEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log(name, data);
}

sendEvent("addToCart", {
  time: 10,
  user: "yehuda",
  productId: "id1",
  quantity: 5,
});

sendEvent("checkout", { time: 7, user: "tom" });
