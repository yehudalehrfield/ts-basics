import { create } from "zustand";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleDoneState: (id: number) => void;
}>((set) => ({
  todos: [],
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [...state.todos, { id: state.todos.length, text, done: false }],
    })),
  removeTodo: (removeId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter(({ id }) => id !== removeId),
    })),
  toggleDoneState: (toggleId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((todo) => ({
        ...todo,
        done: toggleId === todo.id ? !todo.done : todo.done,
      })),
    })),
}));

export default useTodos;
