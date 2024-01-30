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
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        {/* <!-- Snake body --> */}
        <rect x="20" y="20" width="20" height="20" fill="green" />
        <rect x="40" y="20" width="20" height="20" fill="green" />
        <rect x="60" y="20" width="20" height="20" fill="green" />

        {/* <!-- Snake head --> */}
        <polygon points="80,20 100,10 100,30" fill="green" />
      </svg>
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
      <div className={style["control-board"]}>
        <Dice />
      </div>
    </div>
  );
};

export default Board;
