interface UserType {
  name: string;
  id: number;
  email?: string;
}

// interface UserOptionals {
//   name?: string;
//   id?: string;
//   email?: string;
// }

type UserOptionals = Partial<UserType>; // all fields are optional

type RequiredUser = Partial<UserType>; // all fields are required

type JustEmailAndName = Pick<UserType, "email" | "name">; // select given fields from the base interface

type UserWithoutId = Omit<UserType, "id">; // remove given fields from base interface

const merge = (user: UserType, overrides: UserOptionals): UserType => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    { name: "yehuda", id: 1, email: "email@gmail.com" },
    { name: "yehuda lehrfield" }
  )
);

const mapById = (users: UserType[]): Record<UserType["id"], UserType> => {
  return users.reduce((a, v) => {
    return {
      ...a,
      [v.id]: v,
    };
  }, {});
};

console.log(
  mapById([
    { name: "guy1", id: 1 },
    { name: "guy2", id: 2, email: "email2@email.com" },
  ])
);

// repeat the above but leave the id out of the map values
const mapByIdOmitIds = (
  users: UserType[]
): Record<UserType["id"], Omit<UserType, "id">> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapByIdOmitIds([
    { name: "guy1", id: 1 },
    { name: "guy2", id: 2, email: "email2@email.com" },
  ])
);
