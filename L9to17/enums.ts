const beforeLoad = "beforeLoad";
const loading = "isLoading";
const loaded = "loaded";

const isLoading = (state: string) => state == loading;

console.log(isLoading("no"));

enum LoadingState {
  beforeLoad = "beforeLoad",
  loading = "isLoading",
  loaded = "loaded",
}

const isLoadingWithEnum = (state: LoadingState) =>
  state == LoadingState.loading;

// console.log(isLoadingWithEnum("dog")); // error
console.log(isLoading(LoadingState.beforeLoad));
console.log(isLoading(LoadingState.loading));

const englishLoadingStates = {
  [LoadingState.beforeLoad]: "Before Load",
  [LoadingState.loading]: "Loading",
  [LoadingState.loaded]: "Loaded",
};

// function rollDice(dice: number): number { // can be any number
function rollDice(dice: 1 | 2 | 3): number {
  // can be any number
  let pip = 0;
  for (let i = 0; i < dice; i++) {
    pip += Math.floor(Math.random() * 5 + 1);
  }
  return pip;
}
// console.log(rollDice(5)); // will error if we have a numeric literal
console.log(rollDice(3));

// string literals with overloads
function sendEventUsingStringLiteral(
  name: "addToCart",
  data: { productId: number }
): void;
function sendEventUsingStringLiteral(
  name: "checkout",
  data: { cartCount: number }
): void;
function sendEventUsingStringLiteral(name: string, data: unknown): void {
  console.log(`${name}: ${JSON.stringify(data)}`);
}

console.log(sendEventUsingStringLiteral("addToCart", { productId: 123 }));
console.log(sendEventUsingStringLiteral("checkout", { cartCount: 123 }));
