import { Tile, TileTypes } from "@/types.d";

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
    const position = snakesAndLaddersBoard[player.position];
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
        const tile: Tile = snakesAndLaddersBoard[i > 1 ? i * 10 - 10 + y : y];
        columns.push(tile);
      }
      rows.push(i % 2 === 0 ? columns.reverse() : columns);
    }
    return rows.reverse();
  }
}

const snakesAndLaddersBoard: { [key: number]: Tile } = {
  1: {
    tileNum: 1,
    type: TileTypes.NORMAL,
  },
  2: {
    tileNum: 2,
    type: TileTypes.LADDER_BASE,
    destination: 38,
  },
  3: {
    tileNum: 3,
    type: TileTypes.NORMAL,
  },
  4: {
    tileNum: 4,
    type: TileTypes.NORMAL,
  },
  5: {
    tileNum: 5,
    type: TileTypes.SNAKE_HEAD,
    destination: 14,
  },
  6: {
    tileNum: 6,
    type: TileTypes.NORMAL,
  },
  7: {
    tileNum: 7,
    type: TileTypes.NORMAL,
  },
  8: {
    tileNum: 8,
    type: TileTypes.NORMAL,
  },
  9: {
    tileNum: 9,
    type: TileTypes.LADDER_BASE,
    destination: 31,
  },
  10: {
    tileNum: 10,
    type: TileTypes.NORMAL,
  },
  11: {
    tileNum: 11,
    type: TileTypes.NORMAL,
  },
  12: {
    tileNum: 12,
    type: TileTypes.NORMAL,
  },
  13: {
    tileNum: 13,
    type: TileTypes.NORMAL,
  },
  14: {
    tileNum: 14,
    type: TileTypes.SNAKE_HEAD,
    destination: 7,
  },
  15: {
    tileNum: 15,
    type: TileTypes.NORMAL,
  },
  16: {
    tileNum: 16,
    type: TileTypes.NORMAL,
  },
  17: {
    tileNum: 17,
    type: TileTypes.NORMAL,
  },
  18: {
    tileNum: 18,
    type: TileTypes.NORMAL,
  },
  19: {
    tileNum: 19,
    type: TileTypes.NORMAL,
  },
  20: {
    tileNum: 20,
    type: TileTypes.NORMAL,
  },
  21: {
    tileNum: 21,
    type: TileTypes.NORMAL,
  },
  22: {
    tileNum: 22,
    type: TileTypes.NORMAL,
  },
  23: {
    tileNum: 23,
    type: TileTypes.NORMAL,
  },
  24: {
    tileNum: 24,
    type: TileTypes.NORMAL,
  },
  25: {
    tileNum: 25,
    type: TileTypes.NORMAL,
  },
  26: {
    tileNum: 26,
    type: TileTypes.NORMAL,
  },
  27: {
    tileNum: 27,
    type: TileTypes.SNAKE_HEAD,
    destination: 9,
  },
  28: {
    tileNum: 28,
    type: TileTypes.NORMAL,
  },
  29: {
    tileNum: 29,
    type: TileTypes.NORMAL,
  },
  30: {
    tileNum: 30,
    type: TileTypes.NORMAL,
  },
  31: {
    tileNum: 31,
    type: TileTypes.NORMAL,
  },
  32: {
    tileNum: 32,
    type: TileTypes.NORMAL,
  },
  33: {
    tileNum: 33,
    type: TileTypes.NORMAL,
  },
  34: {
    tileNum: 34,
    type: TileTypes.NORMAL,
  },
  35: {
    tileNum: 35,
    type: TileTypes.NORMAL,
  },
  36: {
    tileNum: 36,
    type: TileTypes.NORMAL,
  },
  37: {
    tileNum: 37,
    type: TileTypes.NORMAL,
  },
  38: {
    tileNum: 38,
    type: TileTypes.NORMAL,
  },
  39: {
    tileNum: 39,
    type: TileTypes.NORMAL,
  },
  40: {
    tileNum: 40,
    type: TileTypes.NORMAL,
  },
  41: {
    tileNum: 41,
    type: TileTypes.LADDER_BASE,
    destination: 84,
  },
  42: {
    tileNum: 42,
    type: TileTypes.NORMAL,
  },
  43: {
    tileNum: 43,
    type: TileTypes.NORMAL,
  },
  44: {
    tileNum: 44,
    type: TileTypes.NORMAL,
  },
  45: {
    tileNum: 45,
    type: TileTypes.NORMAL,
  },
  46: {
    tileNum: 46,
    type: TileTypes.NORMAL,
  },
  47: {
    tileNum: 47,
    type: TileTypes.NORMAL,
  },
  48: {
    tileNum: 48,
    type: TileTypes.NORMAL,
  },
  49: {
    tileNum: 49,
    type: TileTypes.NORMAL,
  },
  50: {
    tileNum: 50,
    type: TileTypes.NORMAL,
  },
  51: {
    tileNum: 51,
    type: TileTypes.NORMAL,
  },
  52: {
    tileNum: 52,
    type: TileTypes.NORMAL,
  },
  53: {
    tileNum: 53,
    type: TileTypes.NORMAL,
  },
  54: {
    tileNum: 54,
    type: TileTypes.SNAKE_HEAD,
    destination: 34,
  },
  55: {
    tileNum: 55,
    type: TileTypes.NORMAL,
  },
  56: {
    tileNum: 56,
    type: TileTypes.NORMAL,
  },
  57: {
    tileNum: 57,
    type: TileTypes.NORMAL,
  },
  58: {
    tileNum: 58,
    type: TileTypes.NORMAL,
  },
  59: {
    tileNum: 59,
    type: TileTypes.NORMAL,
  },
  60: {
    tileNum: 60,
    type: TileTypes.NORMAL,
  },
  61: {
    tileNum: 61,
    type: TileTypes.NORMAL,
  },
  62: {
    tileNum: 62,
    type: TileTypes.NORMAL,
  },
  63: {
    tileNum: 63,
    type: TileTypes.NORMAL,
  },
  64: {
    tileNum: 64,
    type: TileTypes.NORMAL,
  },
  65: {
    tileNum: 65,
    type: TileTypes.NORMAL,
  },
  66: {
    tileNum: 66,
    type: TileTypes.NORMAL,
  },
  67: {
    tileNum: 67,
    type: TileTypes.NORMAL,
  },
  68: {
    tileNum: 68,
    type: TileTypes.NORMAL,
  },
  69: {
    tileNum: 69,
    type: TileTypes.NORMAL,
  },
  70: {
    tileNum: 70,
    type: TileTypes.NORMAL,
  },
  71: {
    tileNum: 71,
    type: TileTypes.NORMAL,
  },
  72: {
    tileNum: 72,
    type: TileTypes.NORMAL,
  },
  73: {
    tileNum: 73,
    type: TileTypes.NORMAL,
  },
  74: {
    tileNum: 74,
    type: TileTypes.NORMAL,
  },
  75: {
    tileNum: 75,
    type: TileTypes.SNAKE_HEAD,
    destination: 55,
  },
  76: {
    tileNum: 76,
    type: TileTypes.NORMAL,
  },
  77: {
    tileNum: 77,
    type: TileTypes.NORMAL,
  },
  78: {
    tileNum: 78,
    type: TileTypes.NORMAL,
  },
  79: {
    tileNum: 79,
    type: TileTypes.NORMAL,
  },
  80: {
    tileNum: 80,
    type: TileTypes.SNAKE_HEAD,
    destination: 63,
  },
  81: {
    tileNum: 81,
    type: TileTypes.NORMAL,
  },
  82: {
    tileNum: 82,
    type: TileTypes.NORMAL,
  },
  83: {
    tileNum: 83,
    type: TileTypes.NORMAL,
  },
  84: {
    tileNum: 84,
    type: TileTypes.NORMAL,
  },
  85: {
    tileNum: 85,
    type: TileTypes.NORMAL,
  },
  86: {
    tileNum: 86,
    type: TileTypes.NORMAL,
  },
  87: {
    tileNum: 87,
    type: TileTypes.NORMAL,
  },
  88: {
    tileNum: 88,
    type: TileTypes.NORMAL,
  },
  89: {
    tileNum: 89,
    type: TileTypes.NORMAL,
  },
  90: {
    tileNum: 90,
    type: TileTypes.NORMAL,
  },
  91: {
    tileNum: 91,
    type: TileTypes.NORMAL,
  },
  92: {
    tileNum: 92,
    type: TileTypes.NORMAL,
  },
  93: {
    tileNum: 93,
    type: TileTypes.NORMAL,
  },
  94: {
    tileNum: 94,
    type: TileTypes.NORMAL,
  },
  95: {
    tileNum: 95,
    type: TileTypes.NORMAL,
  },
  96: {
    tileNum: 96,
    type: TileTypes.NORMAL,
  },
  97: {
    tileNum: 97,
    type: TileTypes.NORMAL,
  },
  98: {
    tileNum: 98,
    type: TileTypes.LADDER_BASE,
    destination: 78,
  },
  99: {
    tileNum: 99,
    type: TileTypes.SNAKE_HEAD,
    destination: 80,
  },
  100: {
    tileNum: 100,
    type: TileTypes.NORMAL,
  },
};
