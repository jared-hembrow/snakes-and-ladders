import { useSocket } from "@/socket/Socket";
import { generateRandomName } from "@/util";
import React, { useState } from "react";

type Props = {};

const NewGame = (props: Props) => {
  const [gameIdInput, setGameIdInput] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>(generateRandomName());
  const { socket } = useSocket();
  console.log(gameIdInput);

  const handleJoin = () => {
    if (!socket) return;
    socket.emit(
      "join_game",
      JSON.stringify({ gameId: gameIdInput, name: playerName })
    );
  };
  const handleNew = () => {
    if (!socket) return;
    socket.emit("create_game", JSON.stringify({ name: playerName }));
  };

  return (
    <div>
      <div>
        <div className="bg-blue-500 text-white py-4 px-8 rounded-md shadow-md">
          <h1 className="text-3xl font-bold">Snakes and Ladders</h1>
        </div>
        <div>
          <input
            value={playerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPlayerName(e.target.value)
            }
            type="text"
            id="textInput"
            name="textInput"
            placeholder="Name"
            className="text-black w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <button
            onClick={handleNew}
            className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 w-full hover:bg-blue-600"
          >
            Create New Game
          </button>

          <input
            value={gameIdInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGameIdInput(e.target.value)
            }
            type="text"
            id="textInput"
            name="textInput"
            placeholder="Game ID"
            className="text-black w-full border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleJoin}
            className="bg-green-500 text-white py-2 px-4 rounded-md w-full hover:bg-green-600"
          >
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGame;
