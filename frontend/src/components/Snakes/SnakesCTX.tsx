"use client";
import { ReactNode, createContext, useReducer } from "react";

type SnakesAndLaddersState = {
  gameId: string | null;
  playerId: number | null;
  game: GameDetails | null;
};
type GameDetails = {
  players: {
    id: number;
    position: number;
    connectionId: string;
    name: string;
  }[];
  lastRoll: { playerId: number; roll: [number, number] } | null;
  turn: number;
  status: string;
};
const initialState: SnakesAndLaddersState = {
  gameId: null,
  playerId: null,
  game: null,
};
const SnakesCTX = createContext<{
  state: SnakesAndLaddersState;
  dispatch: (action: SnakesCTXAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});
export enum ActionTypes {
  GAME_JOINED = "GAME_JOINED",
  GAME_UPDATED = "GAME_UPDATED",
}
// TODO make this better
export type SnakesCTXAction = {
  type: ActionTypes;
  payload: any;
};

export const SnakesProvider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: SnakesAndLaddersState, action: SnakesCTXAction) => {
    console.log("Reducer Action: ", action);
    switch (action.type) {
      case ActionTypes.GAME_JOINED:
        return { ...state, ...action.payload };
      case ActionTypes.GAME_UPDATED:
        return { ...state, game: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SnakesCTX.Provider value={{ state, dispatch }}>
      {children}
    </SnakesCTX.Provider>
  );
};

export default SnakesCTX;
