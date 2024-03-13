import React, { useCallback, useRef } from "react";

import useTodos from "./useTodosL28";

import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "azure",
      color: "green",
      fontSize: "medium",
    }}
  >
    {title ?? children}
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
  const { todos, addTodo, removeTodo, toggleDoneState } = useTodos(
    (state) => state
  );
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
  const todos = useTodos((state) => state.todos);
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
  <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
    <App />
    <JustShowTodos />
  </div>
);

export default AppWrapper;
