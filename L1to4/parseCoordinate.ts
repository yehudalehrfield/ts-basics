interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinateFromObject(obj: Coordinate): Coordinate {
  return {
    ...obj,
  };
}

function parseCoordinateFromNumbers(x: number, y: number): Coordinate {
  return {
    x,
    y,
  };
}

//func overloading
function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(coordString: string): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  let coord: Coordinate = { x: 0, y: 0 };

  if (typeof arg1 == "object") {
    coord = {
      ...(arg1 as Coordinate),
    };
    // coord = arg1 as Coordinate;
  } else if (typeof arg1 == "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [k, v] = str.split(":");
      coord[k as "x" | "y"] = parseInt(v);
    });
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 5, y: 10 }));
console.log(parseCoordinate("x:12,y:18"));
console.log(parseCoordinate("x:12"));
