import { Tile, TileTypes } from "@/types.d";
import { snakesAndLaddersBoard } from ".";

export class Game {
  board = new Board();
  players: Player[];
  turn: number;
  gameWon: number = -1;
  constructor(players: { name: string }[]) {
    this.turn = 0;
    this.players = players.map((player, idx) => new Player(idx, player.name));
  }

  rollDie(): [number, number] {
    const rand = () => Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    return [rand(), rand()];
  }

  takeTurn(playerId: number) {
    const player = this.players[playerId];
    const diceRoll = this.rollDie();
    player.setRoll(diceRoll);
    console.log(diceRoll);
    player.position += diceRoll.reduce((p, c) => p + c, 0);
    const result = this.checkPosition(player);
    console.log(result);
    switch (result.type) {
      case "NORMAL":
        return;
      case "FINISH":
        console.log("GAMME OVER");
        this.gameWon = player.id;
        return;
      case "JUMP":
        player.position = result.destination || 1;
        return;
      case "OUT_OF_BOUNDS":
        player.position -= diceRoll.reduce((p, c) => p + c, 0);
        return;
      default:
        return;
    }
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
}
export class Player {
  id: number;
  name: string;
  position: number;
  currentRoll: [number, number] = [0, 0];
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.position = 1;
  }
  setRoll(roll: [number, number]) {
    this.currentRoll = roll;
  }
  getRoll(): [number, number] {
    return this.currentRoll;
  }
}
export class Board {
  tiles: Tile[][] = [];
  constructor() {
    this.tiles = this.createGrid([10, 10]);
  }

  createGrid(grid: [number, number]): Tile[][] {
    let rows: Tile[][] = [];
    for (let i = 1; i < grid[0] + 1; i++) {
      let columns = [];
      for (let y = 1; y < grid[1] + 1; y++) {
        const tile = snakesAndLaddersBoard.get(i > 1 ? i * 10 - 10 + y : y);
        if (!tile) continue;
        columns.push(tile);
      }
      rows.push(i % 2 === 0 ? columns.reverse() : columns);
    }
    return rows.reverse();
  }
}
