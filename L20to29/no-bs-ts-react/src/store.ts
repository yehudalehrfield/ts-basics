import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface TodosSliceState {
  todos: Todo[];
}

const initialState: TodosSliceState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (todosState, action: PayloadAction<string>) => {
      todosState.todos = [
        ...todosState.todos,
        { id: todosState.todos.length, text: action.payload, done: false },
      ];
    },
    removeTodo: (todosState, action: PayloadAction<number>) => {
      todosState.todos = todosState.todos.filter(
        ({ id }) => id !== action.payload
      );
    },
    toggleDoneState: (todosState, action: PayloadAction<number>) => {
      todosState.todos = todosState.todos.map((todo) => ({
        ...todo,
        done: action.payload === todo.id ? !todo.done : todo.done,
      }));
    },
  },
});

export const { addTodo, removeTodo, toggleDoneState } = todosSlice.actions;

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;

export default store;
