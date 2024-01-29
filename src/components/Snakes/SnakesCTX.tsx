"use client";
import { Game } from "@/Game";
import { ReactNode, createContext, useReducer } from "react";

const testPlayers = [{ name: "jed" }];

type SnakesAndLaddersState = {
  game: Game;
};
const initialState: SnakesAndLaddersState = {
  game: new Game(testPlayers),
};
const SnakesCTX = createContext<{
  state: SnakesAndLaddersState;
  dispatch: (action: SnakesCTXAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

// TODO make this better
type SnakesCTXAction = {
  type: string;
  payload: any;
};

export const SnakesProvider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: SnakesAndLaddersState, action: SnakesCTXAction) => {
    switch (action.type) {
      case "INIT_GAME":
        return { ...state, game: new Game(testPlayers) };
      default:
        return state;
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SnakesCTX.Provider value={{ state, dispatch }}>
      {children}
    </SnakesCTX.Provider>
  );
};

export default SnakesCTX;
