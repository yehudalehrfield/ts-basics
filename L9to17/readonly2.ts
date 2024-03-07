class Doggy {
  constructor(public readonly name: string, public readonly age: number) {} // we can declare modifiers on the fly in the constructor
}

const dog0 = new Doggy("spot", 6);
const dog1 = new Doggy("max", 2);

console.log(dog0);

// dog1.age = 3; //error since it is readonly

class DogList {
  private dogs: Doggy[] = [];
  static instance: DogList = new DogList();
  private constructor() {}

  public addDog(dog: Doggy) {
    this.dogs.push(dog);
  }
  static addDog(dog: Doggy) {
    DogList.instance.dogs.push(dog);
  }

  getDogs() {
    return this.dogs;
  }
}

// const badDogList = new DogList(); //error since the constructor is private

//public method
DogList.instance.addDog(dog0);

//static method
DogList.addDog(dog1);

console.log(DogList.instance.getDogs());
