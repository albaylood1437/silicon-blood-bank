import { action, makeAutoObservable, observable } from "mobx";
import { getRegister } from "./services/registerService";

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export class TodoStores {
  todos: TodoItem[] = [];
  myData: any[] = [];

  constructor() {
    makeAutoObservable(this, {
      todos: observable,
      addTodo: action,
      getRegisters: action,
    });
  }

  addTodo(title: string) {
    const item: TodoItem = {
      id: +Math.random().toFixed(4),
      title,
      completed: false,
    };
    this.todos.push(item);
  }

  async getRegisters() {
    await getRegister();
  }
}

export const todoStore = new TodoStores();
