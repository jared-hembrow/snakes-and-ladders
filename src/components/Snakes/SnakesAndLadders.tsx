"use client";
import React from "react";
import { SnakesProvider } from "./SnakesCTX";
import { Board } from "@/components";

type Props = {};

const SnakesAndLaddersCompoennt = (props: Props) => {
  return (
    <div>
      <Board />
    </div>
  );
};

// Export component with context wrapped
const SnakesAndLadders = (props: Props) => {
  return (
    <SnakesProvider>
      <SnakesAndLaddersCompoennt {...props} />
    </SnakesProvider>
  );
};
export default SnakesAndLadders;
