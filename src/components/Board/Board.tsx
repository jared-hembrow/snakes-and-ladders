"use client";
import React, { FC, Fragment, useContext, useState } from "react";
import style from "./Board.module.css";
import TileItem from "./TileItem";
import SnakesCTX from "../Snakes/SnakesCTX";
import Dice from "./Dice";
import GameOver from "./GameOver";

const Board: FC = () => {
  const {
    state: { game },
  } = useContext(SnakesCTX);
  console.log(game);
  return (
    <div>
      <GameOver game={game.gameWon} />
      {game.board.tiles.map((n, idx) => (
        <div key={`row-${idx}`} className="flex flex-row">
          {n.map((y) => {
            const players = game.players.filter(
              (p) => p.position === y.tileNum
            );
            return (
              <Fragment key={`tile-${idx}-${y.tileNum}`}>
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
      <Dice />
    </div>
  );
};

export default Board;
