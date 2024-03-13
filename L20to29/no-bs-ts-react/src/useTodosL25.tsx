import { createContext, useContext, useCallback, useReducer } from "react";
import { createGlobalState } from "react-use";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }
  | { type: "TOGGLE_DONE"; id: number };

const useGlobalTodos = createGlobalState<Todo[]>([]);

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  toggleDoneState: () => {},
});

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleDoneState: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((todos: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [...todos, { id: todos.length, text: action.text, done: false }];
      case "REMOVE":
        return todos.filter(({ id }) => id !== action.id);
      case "TOGGLE_DONE":
        return todos.map((todo) => ({
          ...todo,
          done: action.id === todo.id ? !todo.done : todo.done,
        }));
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", text });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  const toggleDoneState = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_DONE", id });
  }, []);

  return { todos, addTodo, removeTodo, toggleDoneState };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodos = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodos = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};

export const useToggleDoneState =
  (): UseTodosManagerResult["toggleDoneState"] => {
    const { toggleDoneState } = useContext(TodoContext);
    return toggleDoneState;
  };
