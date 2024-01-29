"use client";
import React, { FC, Fragment, useContext, useState } from "react";
import style from "./Board.module.css";
import TileItem from "./TileItem";
import SnakesCTX from "../Snakes/SnakesCTX";

const Board: FC = () => {
  const [rolls, setRolls] = useState<[number, number]>([0, 0]);
  const {
    state: { game },
  } = useContext(SnakesCTX);
  console.log(game);
  console.log(rolls);
  const handleRollBtn = () => {};
  return (
    <div>
      {game.board.tiles.map((n, idx) => (
        <div key={`row-${idx}`} className="flex flex-row">
          {n.map((y) => {
            const players = game.players.filter(
              (p) => p.position === y.tileNum
            );
            return (
              <Fragment key={`tile-${y}`}>
                <TileItem
                  data={y}
                  players={
                    players.length > 0 ? players.map((p) => p.id) : undefined
                  }
                />
              </Fragment>
            );
          })}
        </div>
      ))}
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700"
        onClick={handleRollBtn}
      >
        Roll
      </button>
      <div>{rolls[0]}</div>
      <div>{rolls[1]}</div>
      <div>{rolls[1] + rolls[0]}</div>
    </div>
  );
};

export default Board;
