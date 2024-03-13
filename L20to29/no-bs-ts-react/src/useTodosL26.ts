import { useCallback, useEffect, useReducer } from "react";
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

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleDoneState: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  useEffect(() => setTodos(initialTodos), [initialTodos, setTodos]);

  const addTodo = useCallback(
    (text: string) => {
      setTodos([...todos, { id: todos.length, text: text, done: false }]);
    },
    [todos]
  );

  const removeTodo = useCallback((removeId: number) => {
    setTodos(todos.filter(({ id }) => removeId != id));
  }, []);

  const toggleDoneState = useCallback((isDoneid: number) => {
    setTodos(
      todos.map((todo) => ({
        ...todo,
        done: isDoneid == todo.id ? !todo.done : todo.done,
      }))
    );
  }, []);

  return { todos, addTodo, removeTodo, toggleDoneState };
}
