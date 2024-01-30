"use client";
import React, { useContext, useEffect } from "react";
import SnakesCTX, { SnakesProvider } from "./SnakesCTX";
import SnakesBoard from "./SnakesBoard";
import { Tile, TileMap, TileTypes } from "@/types.d";
import { snakesAndLaddersBoard } from "@/Game";
import style from "./Snakes.module.css";
import Dice from "./Dice";
import GameOver from "./GameOver";

type Props = {};

const SnakesAndLaddersCompoennt = (props: Props) => {
  const {
    state: { game },
  } = useContext(SnakesCTX);

  useEffect(() => {
    // connectSocket();
  }, []);
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
      <GameOver game={game.gameWon} />
      <SnakesBoard
        players={[
          { position: 1, order: 0 },
          { position: 10, order: 1 },
          { position: 1, order: 2 },
          { position: 1, order: 3 },
        ]}
        height={1000}
        tiles={getSpecialTiles(snakesAndLaddersBoard)}
      />
      <div className={style["control-board"]}>
        <Dice />
      </div>
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
