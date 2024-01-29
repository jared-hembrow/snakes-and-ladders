"use client";
import React, { useContext } from "react";
import SnakesCTX from "../Snakes/SnakesCTX";

type Props = {};

const Dice = (props: Props) => {
  const {
    state: { game, playerId },
    dispatch,
  } = useContext(SnakesCTX);
  const handleRoll = () => {
    console.log("roll");
    dispatch({ type: "ROLL_DICE", payload: null });
  };
  return (
    <div className="p-8 rounded shadow-md">
      <div className="flex mb-4">
        <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-2xl font-bold rounded">
          <span id="die1">
            {game.players[playerId].currentRoll[0] === 0
              ? null
              : game.players[playerId].currentRoll[0]}
          </span>
        </div>
        <div className="w-12 h-12 bg-gray-300 flex items-center justify-center text-2xl font-bold rounded ml-4">
          <span id="die2">
            {game.players[playerId].currentRoll[1] === 0
              ? null
              : game.players[playerId].currentRoll[1]}
          </span>
        </div>
      </div>

      <p className="text-lg mb-4">
        Total:{" "}
        <span id="total">
          {game.players[playerId].currentRoll.reduce((p, c) => c + p, 0)}
        </span>
      </p>

      <button
        onClick={handleRoll}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Roll Dice
      </button>
    </div>
  );
};

export default Dice;
