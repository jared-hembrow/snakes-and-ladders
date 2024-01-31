"use client";
import React, { Fragment, useContext, useEffect } from "react";
import SnakesCTX, { SnakesProvider } from "./SnakesCTX";
import SnakesBoard, { playerColors } from "./SnakesBoard";
import { Tile, TileTypes } from "@/types.d";
import { snakesAndLaddersBoard } from "@/Game";
import style from "./Snakes.module.css";
import Dice from "./Dice";
import GameOver from "./GameOver";
import { SocketProvider, useSocket } from "@/socket/Socket";
import NewGame from "./NewGame";

type Props = {};

const SnakesAndLaddersCompoennt = (props: Props) => {
  const {
    state: { gameId, playerId, game },
    dispatch,
  } = useContext(SnakesCTX);
  const { socket, sockEvent } = useSocket();

  // Connect socket when component is mounted
  useEffect(() => {
    if (!socket) return;
    socket.connect();
  }, [socket]);

  // Dispatch Event to reducer from Socket
  useEffect(() => {
    if (!sockEvent) return;
    dispatch(sockEvent);
  }, [sockEvent]);

  // Get all special tiles and place into array
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
  const renderGameId = () => {
    if (!gameId) return null;
    return (
      <div className={style["game-id-panel"]}>
        <div className={style["game-id-panel-label"]}>Game Id:</div>
        <div className={style["game-id-panel-text"]}> {gameId}</div>
      </div>
    );
  };
  const renderName = () => {
    console.log(!playerId);
    if (playerId === null) return null;
    return (
      <div className={style["name-panel"]}>
        <div className={style["name-panel-text"]}>
          {" "}
          {game?.players[playerId].name}
        </div>
      </div>
    );
  };
  if (!gameId) return <NewGame />;
  return (
    <>
      {renderGameId()}
      {renderName()}

      <div>
        <GameOver />
        <Fragment
          key={
            !game
              ? "null-game"
              : `game-${game.players.map((p) => p.position).join("-")}`
          }
        >
          <SnakesBoard
            players={
              !game
                ? []
                : game?.players.map((p) => {
                    return { position: p.position, order: p.id };
                  })
            }
            height={1000}
            tiles={getSpecialTiles(snakesAndLaddersBoard)}
          />
        </Fragment>
        <div
          className={`shadow-md bg-${
            playerId !== null ? playerColors[playerId] : "white"
          }-600 ${style["control-board"]}`}
        >
          <Dice />
        </div>
      </div>
    </>
  );
};
// Export component with context wrapped
const SnakesAndLadders = (props: Props) => {
  return (
    <SocketProvider>
      <SnakesProvider>
        <SnakesAndLaddersCompoennt {...props} />
      </SnakesProvider>
    </SocketProvider>
  );
};
export default SnakesAndLadders;
