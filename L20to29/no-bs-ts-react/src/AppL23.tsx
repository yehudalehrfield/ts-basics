import React, { useCallback, useRef } from "react";

import { useTodos } from "./useTodosL23";

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

// Can use this for components with children:
// function UL<T>({
//   items,
//   render,
//   children
// }: React.PropsWithChildren<
//   React.DetailedHTMLProps<
//     React.HTMLAttributes<HTMLUListElement>,
//     HTMLUListElement
//   > & {
//     items: T[];
//     render: (item: T) => React.ReactNode;
//   }
// >) {
function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} onClick={() => itemClick(item)}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const { todos, addTodo, removeTodo, toggleDoneState } = useTodos([
    { id: 0, text: "initial todo", done: false },
  ]);
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
        itemClick={(todo) => alert(todo.text + " was clicked")}
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

export default App;
