interface Database {
  get(id: string): string;
  set(id: string, value: string): void;
}

class InMemoryDatabase implements Database {
  //   private db: Record<string, string> = {};
  protected db: Record<string, string> = {};
  get(id: string): string {
    return this.db[id];
  }
  set(id: string, value: string): void {
    this.db[id] = value;
  }
}

const myDb = new InMemoryDatabase();
myDb.set("foo", "bar");
myDb.set("hello", "world");

console.log(myDb.get("foo"));
console.log(myDb.get("hello"));
console.log(myDb.get("hey"));

// myDb.db["foo"] = "baz"; // cannot set this way since db is private

interface Persistable {
  saveToString(): string;
  restoreFromString(storedState: string): void;
}

class PersistentMemoryDb extends InMemoryDatabase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db); //because db is protected we can access it from this class which extends InMemoryDatabase
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myPersistendDb = new PersistentMemoryDb();
myPersistendDb.set("foo", "bar");
console.log(myPersistendDb.get("foo"));

const savedDb = myPersistendDb.saveToString();
console.log(savedDb);

const myPersistendDb2 = new PersistentMemoryDb();
myPersistendDb2.restoreFromString(savedDb);
console.log(myPersistendDb2.saveToString());

export {};
