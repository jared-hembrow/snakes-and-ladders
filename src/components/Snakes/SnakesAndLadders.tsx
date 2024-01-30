"use client";
import React, { useContext } from "react";
import SnakesCTX, { SnakesProvider } from "./SnakesCTX";
import { Board } from "@/components";
import SnakesBoard from "./SnakesBoard";
import { Tile, TileMap, TileTypes } from "@/types.d";
import { snakesAndLaddersBoard } from "@/Game";

type Props = {};

const SnakesAndLaddersCompoennt = (props: Props) => {
  const {
    state: { game },
  } = useContext(SnakesCTX);

  const getSpecialTiles = (boardMap: Map<number, Tile>): Tile[] => {
    return Array.from(boardMap.entries()).flatMap((t) => {
      if (
        t[1].type === TileTypes.SNAKE_HEAD ||
        t[1].type === TileTypes.LADDER_BASE
      )
        return t[1];
      else return [];
    });
  };

  console.log(game);
  return (
    <div>
      <SnakesBoard
        height={1000}
        tiles={getSpecialTiles(snakesAndLaddersBoard)}
      />
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
