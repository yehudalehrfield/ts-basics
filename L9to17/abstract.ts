// abstract classes cannot be instantiated alone
abstract class StreetFighter {
  constructor() {}

  move() {}
  fight() {
    console.log(`${this.name} attack with ${this.getSpecialAttack()}`);
  }

  // abstract methods cannot have an implementation (no {})
  abstract getSpecialAttack(): string;
  abstract get name(): string;
}

// const ryu = new StreetFighter(); //error

class Ryu extends StreetFighter {
  getSpecialAttack(): string {
    return "Hadoken";
  }
  get name(): string {
    return "Ryu";
  }
}

const ryu1 = new Ryu();
console.log(ryu1.getSpecialAttack());
ryu1.fight();

class Dude extends StreetFighter {
  getSpecialAttack(): string {
    return "Kick";
  }
  get name(): string {
    return "Dude";
  }
}

const dude1 = new Dude();
console.log(dude1.getSpecialAttack());
console.log(dude1.fight());
