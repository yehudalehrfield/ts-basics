interface Database<K, T> {
  get(id: K): T;
  set(id: K, value: T): void;
}

type DBKeyType = string | number | symbol;

class InMemoryDatabase<K extends DBKeyType, T> implements Database<K, T> {
  //   private db: Record<string, string> = {};
  protected db: Record<K, T> = {} as Record<K, T>;
  get(id: K): T {
    return this.db[id];
  }
  set(id: K, value: T): void {
    this.db[id] = value;
  }
}

const myDb = new InMemoryDatabase<string, string>();
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

class PersistentMemoryDb<K extends DBKeyType, T>
  extends InMemoryDatabase<K, T>
  implements Persistable
{
  saveToString(): string {
    return JSON.stringify(this.db); //because db is protected we can access it from this class which extends InMemoryDatabase
  }
  restoreFromString(storedState: string): void {
    this.db = JSON.parse(storedState);
  }
}

const myPersistendDb = new PersistentMemoryDb<string, number>();
myPersistendDb.set("foo", 2);
console.log(myPersistendDb.get("foo"));

const savedDb = myPersistendDb.saveToString();
console.log(savedDb);

const myPersistendDb2 = new PersistentMemoryDb();
myPersistendDb2.restoreFromString(savedDb);
console.log(myPersistendDb2.saveToString());
