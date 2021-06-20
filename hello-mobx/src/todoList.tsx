import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { TodoStores } from "./todoStore";
interface TodoListProps {
  todoStore: TodoStores;
}

export const TodoList: React.FC<TodoListProps> = observer(({ todoStore }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const fechData = () => {
      const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(todoStore.getRegisters());
        }, 300);
      });
      console.log("fech", myPromise);
    };
    fechData();
  }, []);
  const submit = () => {
    todoStore.addTodo(value);

    console.log("value", todoStore.myData);
  };
  return (
    <div>
      <h1>hello mobx</h1>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button type="submit" onClick={submit}>
        Submit
      </button>
      <ul>
        {todoStore.todos.map((todo: any) => (
          <li>{todo.title}</li>
        ))}
      </ul>
      <h2></h2>
    </div>
  );
});
