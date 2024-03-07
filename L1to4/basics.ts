let user: string = "yehuda";
let hasLoggedIn: boolean = true;

user += " Lehrfield";

console.log(user);

let myNumber: number = 10;

let myRegex: RegExp = /foo/;

const names: string[] = user.split(" ");

const myValues: Array<number> = [1, 2, 3];

interface Person {
  first: string;
  last: string;
  cool: boolean;
}
const myPerson: Person = {
  first: "Yehuda",
  last: "Lehrfield",
  cool: true,
};

const ids: Record<number, string> = {
  10: "a",
  20: "b",
};

ids[30] = "c";

if (ids[30] == "D") {
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));
const out = [4, 5, 6].map((v) => v * 10);
const outString = [4, 5, 6].map((v) => `${v * 10}`);
