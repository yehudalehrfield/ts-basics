import React, { useCallback, useRef } from "react";

import {
  useTodos,
  useAddTodos,
  useRemoveTodos,
  useToggleDoneState,
  TodosProvider,
} from "./useTodosL25";

import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = (
  { title, children, style, ...rest } //rest include all other props that belong to the type (button)
) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "azure",
      color: "green",
      fontSize: "medium",
    }}
  >
    {title ?? children /*use a title if exists, else use children*/}
  </button>
);

function UL<T>({
  items,
  render,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodos();
  const removeTodo = useRemoveTodos();
  const toggleDoneState = useToggleDoneState();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Todos" />
      <UL
        className="" //extended from  React.DetailedHTMLProps...
        items={todos}
        render={(todo) => (
          <li style={{ color: todo.done ? "green" : "red" }}>
            {todo.text}
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => toggleDoneState(todo.id)}
            >
              {todo.done ? "Mark incomplete" : "Mark complete"}
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </Button>
          </li>
        )}
      />

      <div>
        <input type="text" ref={newTodoRef} />
        <Button style={{ marginLeft: "20px" }} onClick={onAddTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useTodos();
  return (
    <UL
      items={todos}
      render={(todo) => (
        <li style={{ color: todo.done ? "green" : "red" }}>{todo.text}</li>
      )}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider initialTodos={[{ id: 0, text: "initial todo", done: false }]}>
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      <App></App>
      <JustShowTodos></JustShowTodos>
    </div>
  </TodosProvider>
);

export default AppWrapper;
