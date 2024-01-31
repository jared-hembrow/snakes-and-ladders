"use client";
import React, { useContext } from "react";
import SnakesCTX from "../Snakes/SnakesCTX";
import { useSocket } from "@/socket/Socket";
import { playerColors } from "./SnakesBoard";
import style from "./Snakes.module.css";

const Dice = () => {
  const {
    state: { game, playerId, gameId },
  } = useContext(SnakesCTX);
  const { socket } = useSocket();
  const handleRoll = () => {
    console.log("roll");
    if (!socket || playerId === null || !gameId) return;
    console.log("emitting take_turn");
    socket.emit("take_turn", JSON.stringify({ playerId, gameId }));
  };
  return (
    <div
      className={`p-4 rounded shadow-md ${
        playerId !== null
          ? style[`bg-${playerColors[playerId]}`]
          : style["bg-white"]
      } flex justify-between`}
    >
      <div className={`flex flex-col  `}>
        <div className="text-black">
          <div
            style={{
              letterSpacing: "1px",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            {game?.players[game.turn || 0].name}&apos;s Roll
          </div>
        </div>
        <div className="flex mb-4">
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-2xl text-black font-bold rounded">
            <span id="die1">
              {!game?.lastRoll || game?.lastRoll.roll[0] === 0
                ? null
                : game?.lastRoll.roll[0]}
            </span>
          </div>
          <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-2xl text-black font-bold rounded ml-4">
            <span id="die2">
              {!game?.lastRoll || game?.lastRoll.roll[1] === 0
                ? null
                : game?.lastRoll.roll[1]}
            </span>
          </div>
        </div>
      </div>
      <div></div>
      <div className="flex flex-col-reverse">
        <button
          disabled={!game ? true : game.turn !== playerId ? true : false}
          onClick={handleRoll}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Roll
        </button>
      </div>
    </div>
  );
};

export default Dice;
