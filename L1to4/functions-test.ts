import addNumbers, {
  addString,
  addStringDefault,
  fetchData,
  format,
  introduce,
} from "./functions";

console.log(addNumbers(1, 2));
console.log(addString("one", "cat"));
console.log(addStringDefault("one"));

console.log(format("title", 2));

console.log(fetchData("url"));

console.log(introduce("hey", "tom", "jerry", "paul"));
