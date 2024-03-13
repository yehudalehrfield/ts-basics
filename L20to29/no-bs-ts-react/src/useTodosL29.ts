import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useReducer } from "react";

import { createMachine, assign } from "xstate";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }
  | { type: "TOGGLE_DONE"; id: number };

const todoMachine = createMachine({
  types: {} as {
    context: { todos: Todo[] };
    events:
      | { type: "END_WORKING" }
      | { type: "START_WORKING" }
      | { type: "SET_TODOS"; todos: Todo[] }
      | { type: "ADD_TODO"; text: string }
      | { type: "REMOVE_TODO"; id: number };
    actions: { type: "assign"; text: string };
  },
  id: "todoMachine",
  initial: "editing",
  context: {
    todos: [],
  },
  states: {
    editing: {
      // on: {
      //   START_WORKING: {
      //     target: "working",
      //   },
      // },
      on: {
        ADD_TODO: {
          actions: assign({
            todos: ({ context }, event) => {
              console.log("addToDo event clicked:");
              console.log(event);
              return [
                ...context.todos,
                {
                  id: context.todos.length,
                  text: "",
                  done: false,
                },
              ];
            },
          }),
        },
        SET_TODOS: {
          actions: assign({
            // todos: (_, {todos}) => todos
            todos: [],
          }),
        },
      },
    },
    working: {
      on: {
        END_WORKING: "editing",
      },
    },
  },
});

// const todoMachine = createMachine(
//   {
//     id: "todoMachine",
//     // initial: "editing",
//     // context: {
//     //   todos: [],
//     // },
//     schema: {
//       context: {} as { todos: Todo[] },
//       events: {} as
//         | { type: "END_WORKING" }
//         | { type: "START_WORKING" }
//         | { type: "SET_TODOS"; todos: Todo[] }
//         | { type: "ADD_TODO"; text: string }
//         | { type: "REMOVE_TODO"; id: number },
//     },
//     initial: "editing",
//     context: {
//       todos: [],
//     },
//     states: {
//       editing: {
//         on: {
//           START_WORKING: {
//             target: "working",
//             cond: "haveUndoneTodos",
//           },
//           ADD_TODO: {
//             actions: assign({
//               todos: ({ todos }, { text }) => [
//                 ...todos,
//                 {
//                   id: todos.length,
//                   text,
//                   done: false,
//                 },
//               ],
//             }),
//           },
//           REMOVE_TODO: {
//             actions: assign({
//               todos: ({ todos }, { id: removeId }) =>
//                 todos.filter(({ id }) => id !== removeId),
//             }),
//           },
//           SET_TODOS: {
//             actions: assign({
//               todos: (_, { todos }) => todos,
//             }),
//           },
//         },
//       },
//       working: {
//         exit: assign({
//           todos: ({ todos }) => {
//             const newTodos = [...todos];
//             const undoneTodo = newTodos.find(({ done }) => !done);
//             if (undoneTodo) {
//               undoneTodo.done = true;
//             }
//             return newTodos;
//           },
//         }),
//         on: {
//           END_WORKING: {
//             target: "editing",
//           },
//         },
//       },
//     },
//   },
//   {
//     guards: {
//       haveUndoneTodos: ({ todos }) => todos.some(({ done }) => !done),
//     },
//   }
// );

export function useTodos(initialTodos: Todo[]): {
  // todos: Todo[];
  // addTodo: (text: string) => void;
  // removeTodo: (id: number) => void;
  // toggleDoneState: (id: number) => void;
  isEditing: boolean;
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  startWorking: () => void;
  endWorking: () => void;
} {
  const [state, send] = useMachine(todoMachine);

  useEffect(() => {
    send({ type: "SET_TODOS", todos: initialTodos });
  }, [send, initialTodos]);

  const addTodo = useCallback(
    (text: string) => {
      send({
        type: "ADD_TODO",
        text,
      });
    },
    [send]
  );

  const removeTodo = useCallback(
    (id: number) => {
      send({
        type: "REMOVE_TODO",
        id,
      });
    },
    [send]
  );

  const startWorking = useCallback(() => {
    send({ type: "START_WORKING" });
  }, [send]);
  const endWorking = useCallback(() => {
    send({ type: "END_WORKING" });
  }, [send]);

  return {
    isEditing: state.matches("editing"),
    todos: state.context.todos,
    addTodo,
    removeTodo,
    startWorking,
    endWorking,
  };
  // const [todos, dispatch] = useReducer((todos: Todo[], action: ActionType) => {
  //   switch (action.type) {
  //     case "ADD":
  //       return [...todos, { id: todos.length, text: action.text, done: false }];
  //     case "REMOVE":
  //       return todos.filter(({ id }) => id !== action.id);
  //     case "TOGGLE_DONE":
  //       return todos.map((todo) => ({
  //         ...todo,
  //         done: action.id === todo.id ? !todo.done : todo.done,
  //       }));
  //     default:
  //       throw new Error();
  //   }
  // }, initialTodos);

  // const addTodo = useCallback((text: string) => {
  //   dispatch({ type: "ADD", text });
  // }, []);

  // const removeTodo = useCallback((id: number) => {
  //   dispatch({ type: "REMOVE", id });
  // }, []);

  // const toggleDoneState = useCallback((id: number) => {
  //   dispatch({ type: "TOGGLE_DONE", id });
  // }, []);

  // return { todos, addTodo, removeTodo, toggleDoneState };
}
