import React, { useCallback, useRef } from "react";

import { Provider, useSelector, useDispatch } from "react-redux";

import store, {
  addTodo,
  removeTodo,
  selectTodos,
  toggleDoneState,
} from "./store";

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
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch(addTodo(newTodoRef.current.value));
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(todo) => {}}
        render={(todo) => (
          <li style={{ color: todo.done ? "green" : "red" }}>
            {todo.text}
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => dispatch(toggleDoneState(todo.id))}
            >
              {todo.done ? "Mark incomplete" : "Mark complete"}
            </Button>
            <Button
              style={{ marginLeft: "20px" }}
              onClick={() => dispatch(removeTodo(todo.id))}
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

const JustTheTodos = () => {
  const todos = useSelector(selectTodos);
  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <Provider store={store}>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
      }}
    >
      <App />
      <JustTheTodos />
    </div>
  </Provider>
);

export default AppWrapper;
