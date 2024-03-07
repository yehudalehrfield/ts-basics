// function creating a function
function myLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = myLogFunction();
logger("out");

// function creating a class
function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      console.log(str);
      this.completeLog += str;
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLoggerClass = createLoggerClass();
const myLogger = new MyLoggerClass();
myLogger.log("out again");
myLogger.log("and again");
console.log(myLogger.dumpLog());

function createSimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};
    set(id: string, val: T) {
      this.db[id] = val;
    }
    get(id: string) {
      return this.db[id];
    }
    getObject(): object {
      return this.db;
    }
  };
}

const StringDatabase = createSimpleMemoryDatabase<string>();
const sDb1 = new StringDatabase();
sDb1.set("key1", "str1");
sDb1.set("key2", "another string");

// Constructor type => "new" means it can create (construct); the output is of the generic type...
type Constructor<T> = new (...args: any[]) => T;

// we extend to Constructor for classes that (must) have the getObject method
// now, if we remove/comment out the getObject class above, we'll see an error below...
function createDumpable<T extends Constructor<{ getObject(): object }>>(
  Base: T
) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = createDumpable(StringDatabase);
const sDb2 = new DumpableStringDatabase();
sDb2.set("foo", "bar");
sDb2.set("hello", "world");
sDb2.dump();
