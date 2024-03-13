import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";
import "./App.css";
import AppL23 from "./AppL23";
import AppL25 from "./AppL25";
import AppL26 from "./AppL26";
import AppL27 from "./AppL27";
import AppL28 from "./AppL28";
import AppL29 from "./AppL29";

// const Heading = (props: { title: string }) => <h2>{props.title}</h2>;
const Heading = ({ title }: { title: string }) => <h2>{title}</h2>; // destructuring

// const Box = ({ children }: { children: React.ReactNode }) => (
//   <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
// );

const Box: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>;

// const Box: React.FunctionComponent = ({ children }) => (
//   <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
// ); // not working

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number }
  | { type: "TOGGLE_DONE"; id: number };

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

const Incrementer: React.FunctionComponent<{
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>; // this type we got from the hint in the setState below
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(() => value + 1)} title={`Add - ${value}`} /> // here we are using the title prop
);

//we will use a custom hook
const useNumber = (initialValue: number) => useState(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const IncrementerBetter: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <Button onClick={() => setValue(() => value + 1)}>Add - {value}</Button> // here we are not using the title prop
);

function App() {
  const onItemClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => setPayload(data));
  });

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
  }, []);

  const [value, setValue] = useState(0);
  const [valueBetter, setValueBetter] = useNumber(0);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: "ADD", text: newTodoRef.current.value });
      newTodoRef.current.value = "";
    }
  }, []);

  const AppL20 = () => (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["boy", "cat", "dog"]} onClick={onItemClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
      <IncrementerBetter value={valueBetter} setValue={setValueBetter} />
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id} style={{ color: todo.done ? "green" : "red" }}>
          {todo.text}
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() => dispatch({ type: "TOGGLE_DONE", id: todo.id })}
          >
            {todo.done ? "Mark incomplete" : "Mark complete"}
          </Button>
          <Button
            style={{ marginLeft: "20px" }}
            onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
          >
            Remove
          </Button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <Button style={{ marginLeft: "20px" }} onClick={addTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  );

  return (
    // <AppL20 />
    // <AppL23 />
    // <AppL25 />
    // <AppL26 />
    // <AppL27 />
    // <AppL28 />
    <AppL29 />
  );
}

export default App;
