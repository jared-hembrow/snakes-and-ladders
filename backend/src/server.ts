// server.js
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Game } from "./game/game";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

// TYPES
type Turn = {
  playerId: number;
  gameId: string;
};

function makeid(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const games: { [key: string]: Game } = {};
const rooms: { [roomId: string]: { gameId: string; players: string[] } } = {};
const players: { [playerId: string]: string } = {};

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/public" + req.url);
});

io.on("connection", (socket) => {
  // Listen for messages from the client
  socket.on("create_game", (msg) => {
    console.log("games: ", games);

    try {
      const body: { name: string } = JSON.parse(msg);
      if (!body.name)
        return socket.emit(
          "error",
          JSON.stringify({ error: 400, msg: "Invalid body" })
        );
      const newId = makeid(6);
      const newRoomId = makeid(10);
      rooms[newRoomId] = { gameId: newId, players: [socket.id] };
      players[socket.id] = newRoomId;
      games[newId] = new Game([{ name: body.name, connectionId: socket.id }]);
      const game = games[newId];
      socket.emit(
        "game_joined",
        JSON.stringify({
          playerId: 0,
          gameId: newId,
          game: game.getGameStatus(),
        })
      );
    } catch (e) {
      console.error(e);
      socket.emit("error", e);
    }
  });
  socket.on("join_game", (msg) => {
    try {
      const body: { gameId: string; name: string } = JSON.parse(msg);
      if (!body.gameId)
        return socket.emit(
          "error",
          JSON.stringify({ error: 400, msg: "Invalid body" })
        );
      if (!games[body.gameId])
        return socket.emit(
          "error",
          JSON.stringify({ error: 404, msg: "Game does not exist" })
        );
      const game = games[body.gameId];

      const playerId = game.addPlayer({
        name: body.name,
        connectionId: socket.id,
      });
      socket.emit(
        "game_joined",
        JSON.stringify({
          playerId: playerId,
          gameId: body.gameId,
          game: game.getGameStatus(),
        })
      );
    } catch (e) {
      console.error(e);
      socket.emit("error", e);
    }
  });
  socket.on("take_turn", (msg) => {
    try {
      const turn: Turn = JSON.parse(msg);

      if (!turn.hasOwnProperty("gameId") || !turn.hasOwnProperty("playerId"))
        return socket.emit("error", { error: 400, msg: "Invalid body" });
      if (!games[turn.gameId])
        return socket.emit("error", { error: 402, msg: "Game does not exist" });
      const game = games[turn.gameId];
      game.takeTurn(turn.playerId);
      const update = game.getGameStatus();

      io.to(update.players.map((p) => p.connectionId)).emit(
        "game_updated",
        JSON.stringify(update)
      );
    } catch (e) {
      console.error(e);
      socket.emit("error", e);
    }
  });
  socket.on("restart_game", (msg) => {
    try {
      const body: { gameId: string } = JSON.parse(msg);

      if (!body.hasOwnProperty("gameId"))
        return socket.emit("error", { error: 400, msg: "Invalid body" });

      const game = games[body.gameId];
      game.restart();
      const update = game.getGameStatus();

      io.to(update.players.map((p) => p.connectionId)).emit(
        "game_updated",
        JSON.stringify(update)
      );
    } catch (e) {
      console.error(e);
      socket.emit("error", e);
    }
  });

  // Listen for disconnection
  socket.on("disconnect", () => {
    try {
      if (players[socket.id]) {
        const roomId = players[socket.id];
        if (rooms[roomId]) {
          const gameId = rooms[roomId].gameId;
          rooms[roomId].players = rooms[roomId].players.filter(
            (p) => p !== socket.id
          );
          if (rooms[roomId].players.length === 0) {
            delete games[gameId];
            delete rooms[roomId];
          }
        }
        delete players[socket.id];
      }
    } catch (e) {
      console.error(e);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
