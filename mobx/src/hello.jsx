import React from "react";
import { Timer } from "./store";

export const hello = () => {
  return (
    <div>
      <h1>{Timer.secondsPassed}</h1>
    </div>
  );
};
