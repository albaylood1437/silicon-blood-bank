import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";

// Model the application state.
class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increase() {
    this.secondsPassed += 1;
  }

  reset() {
    this.secondsPassed = 0;
  }
}

const myTimer = new Timer();
