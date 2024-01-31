import React, { FC, useContext } from "react";
import SnakesCTX from "./SnakesCTX";
import style from "./Snakes.module.css";
import { useSocket } from "@/socket/Socket";
const GameOver: FC = () => {
  const {
    state: { gameId, game },
  } = useContext(SnakesCTX);
  const { socket } = useSocket();
  const onPlayAgain = () => {
    socket?.emit("restart_game", JSON.stringify({ gameId: gameId }));
  };

  if (game?.status === "in progress") return null;
  return (
    <div
      className={`${
        style["gameover"]
      } ${"bg-white p-8 rounded-md shadow-md w-96 text-center"}`}
    >
      <h1 className="text-black text-2xl font-bold mb-4">Game Over!</h1>

      <p className="text-gray-700 mb-6">{game?.status}</p>

      <button
        onClick={onPlayAgain}
        className="bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-600"
      >
        Play Again
      </button>
    </div>
  );
};
export default GameOver;
