function printIngredients(
  quantity: string,
  ingredient: string,
  extra?: string
) {
  console.log(`${quantity} ${ingredient} ${extra ? `Notes: ${extra}` : ""}`);
}

printIngredients("1C", "Flour");
printIngredients("1C", "Flour", "Sift well");

interface User {
  id: string;
  info?: {
    email?: string;
  };
}

function getEmail(user: User): string {
  if (user.info) {
    return user.info.email!; // using the ! coerces TS to believe that it will not be null/undefined
  }
  return "";
}

function getEmailBetter(user: User): string {
  return user?.info?.email ?? "";
}

function addWithCallBack(x: number, y: number, callback?: () => void) {
  console.log(x, y);
  //   if (callback) {
  //     callback();
  //   } // not such a good way
  callback?.(); // better
}
