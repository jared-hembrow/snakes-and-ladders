import { Tile, TileTypes } from "./snakesMap";
import { snakesAndLaddersBoard } from "./snakesMap";
type GameUpdate = {
  players: {
    id: number;
    position: number;
    connectionId: string;
    name: string;
  }[];
  lastRoll: LastRoll | null;
  turn: number;
  status: string;
};
type LastRoll = { playerId: number; roll: [number, number] };
export class Game {
  board = snakesAndLaddersBoard;
  players: Player[];
  turn: number;
  gameWon: number = -1;
  lastRoll: LastRoll | null = null;
  constructor(players: { name: string; connectionId: string }[]) {
    this.turn = 0;
    this.players = players.map(
      (player, idx) => new Player(idx, player.name, player.connectionId)
    );
  }
  restart() {
    for (const p of this.players) {
      p.position = 1;
    }
    this.turn = 0;
    this.gameWon = -1;
    this.lastRoll = null;
  }
  addPlayer(player: { name: string; connectionId: string }): number {
    const playerId = this.players.length;
    this.players.push(new Player(playerId, player.name, player.connectionId));
    return playerId;
  }
  rollDie(): [number, number] {
    const rand = () => Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return [rand(), rand()];
  }
  setNextTurn() {
    this.lastRoll = {
      playerId: this.turn,
      roll: this.players[this.turn].currentRoll,
    };
    const playerCount = this.players.length;
    if (this.turn + 1 === playerCount) this.turn = 0;
    else this.turn += 1;
    this.players[this.turn].currentRoll = [0, 0];
  }
  takeTurn(playerId: number) {
    const player = this.players[playerId];
    const diceRoll = this.rollDie();
    player.setRoll(diceRoll);
    player.position += diceRoll.reduce((p, c) => p + c, 0);
    const result = this.checkPosition(player);
    console.log("result: ", result);
    switch (result.type) {
      case "NORMAL":
        break;
      case "FINISH":
        console.log("Finished");
        this.gameWon = player.id;
        break;
      case "JUMP":
        player.position = result.destination || 1;
        break;
      case "OUT_OF_BOUNDS":
        player.position -= diceRoll.reduce((p, c) => p + c, 0);
        break;
      default:
        break;
    }
    this.setNextTurn();
  }
  checkPosition(player: Player): {
    type: "OUT_OF_BOUNDS" | "NORMAL" | "FINISH" | "JUMP" | "NULL";
    destination: null | number;
  } {
    const position = snakesAndLaddersBoard.get(player.position);
    if (!position) return { type: "OUT_OF_BOUNDS", destination: null };
    switch (position.type) {
      case TileTypes.NORMAL:
        return { type: "NORMAL", destination: null };
      case TileTypes.FINISH:
        return { type: "FINISH", destination: null };
      case TileTypes.LADDER_BASE:
        return { type: "JUMP", destination: position.destination || 0 };
      case TileTypes.SNAKE_HEAD:
        return { type: "JUMP", destination: position.destination || 0 };
      default:
        return { type: "NULL", destination: null };
    }
  }
  getGameStatusText(): string {
    if (this.gameWon === -1) return "in progress";
    if (this.gameWon > -1) return `${this.players[this.gameWon].name} has won!`;
    return "";
  }
  getGameStatus(): GameUpdate {
    return {
      players: this.players.map((p) => {
        return {
          id: p.id,
          position: p.position,
          connectionId: p.connectionId,
          name: p.name,
        };
      }),
      lastRoll: this.lastRoll,
      turn: this.turn,
      status: this.getGameStatusText(),
    };
  }
}

export class Player {
  id: number;
  name: string;
  connectionId: string;
  position: number;
  currentRoll: [number, number] = [0, 0];
  constructor(id: number, name: string, connectionId: string) {
    this.id = id;
    this.name = name;
    this.connectionId = connectionId;
    this.position = 1;
  }
  setRoll(roll: [number, number]) {
    this.currentRoll = roll;
  }
  getRoll(): [number, number] {
    return this.currentRoll;
  }
}
