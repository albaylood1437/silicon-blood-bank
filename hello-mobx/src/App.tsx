import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { TodoList } from "./todoList";
import { todoStore } from "./todoStore";

function App() {
  return (
    <div className="App">
      <TodoList todoStore={todoStore} />
    </div>
  );
}

export default App;
