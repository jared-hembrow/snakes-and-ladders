export type TileMap = Map<number, Tile>;
export type Tile = {
  type: TileTypes;
  tileNum: number;
  destination?: number;
  coords: [x: number, y: number];
};
export enum TileTypes {
  START = "START",
  NORMAL = "NORMAL",
  LADDER_BASE = "LADDER_BASE",
  LADDER_TOP = "LADDER_TOP",
  SNAKE_TAIL = "SNAKE_TAIL",
  SNAKE_HEAD = "SNAKE_HEAD",
  FINISH = "FINISH",
}

export const snakesAndLaddersBoard: TileMap = new Map([
  [
    1,
    {
      tileNum: 1,
      type: TileTypes.NORMAL,
      coords: [0, 9],
    },
  ],
  [
    2,
    {
      tileNum: 2,
      type: TileTypes.LADDER_BASE,
      destination: 38,
      coords: [1, 9],
    },
  ],
  [
    3,
    {
      tileNum: 3,
      type: TileTypes.NORMAL,
      coords: [2, 9],
    },
  ],
  [
    4,
    {
      tileNum: 4,
      type: TileTypes.NORMAL,
      coords: [3, 9],
    },
  ],
  [
    5,
    {
      tileNum: 5,
      type: TileTypes.NORMAL,
      coords: [4, 9],
    },
  ],
  [
    6,
    {
      tileNum: 6,
      type: TileTypes.NORMAL,
      coords: [5, 9],
    },
  ],
  [
    7,
    {
      tileNum: 7,
      type: TileTypes.NORMAL,
      coords: [6, 9],
    },
  ],
  [
    8,
    {
      tileNum: 8,
      type: TileTypes.NORMAL,
      coords: [7, 9],
    },
  ],
  [
    9,
    {
      tileNum: 9,
      type: TileTypes.LADDER_BASE,
      destination: 31,
      coords: [8, 9],
    },
  ],
  [
    10,
    {
      tileNum: 10,
      type: TileTypes.NORMAL,
      coords: [9, 9],
    },
  ],
  [
    11,
    {
      tileNum: 11,
      type: TileTypes.NORMAL,
      coords: [9, 8],
    },
  ],
  [
    12,
    {
      tileNum: 12,
      type: TileTypes.NORMAL,
      coords: [8, 8],
    },
  ],
  [
    13,
    {
      tileNum: 13,
      type: TileTypes.NORMAL,
      coords: [7, 8],
    },
  ],
  [
    14,
    {
      tileNum: 14,
      type: TileTypes.SNAKE_HEAD,
      destination: 7,
      coords: [6, 8],
    },
  ],
  [
    15,
    {
      tileNum: 15,
      type: TileTypes.NORMAL,
      coords: [5, 8],
    },
  ],
  [
    16,
    {
      tileNum: 16,
      type: TileTypes.NORMAL,
      coords: [4, 8],
    },
  ],
  [
    17,
    {
      tileNum: 17,
      type: TileTypes.NORMAL,
      coords: [3, 8],
    },
  ],
  [
    18,
    {
      tileNum: 18,
      type: TileTypes.NORMAL,
      coords: [2, 8],
    },
  ],
  [
    19,
    {
      tileNum: 19,
      type: TileTypes.NORMAL,
      coords: [1, 8],
    },
  ],
  [
    20,
    {
      tileNum: 20,
      type: TileTypes.NORMAL,
      coords: [0, 8],
    },
  ],
  [
    21,
    {
      tileNum: 21,
      type: TileTypes.NORMAL,
      coords: [0, 7],
    },
  ],
  [
    22,
    {
      tileNum: 22,
      type: TileTypes.NORMAL,
      coords: [1, 7],
    },
  ],
  [
    23,
    {
      tileNum: 23,
      type: TileTypes.NORMAL,
      coords: [2, 7],
    },
  ],
  [
    24,
    {
      tileNum: 24,
      type: TileTypes.NORMAL,
      coords: [3, 7],
    },
  ],
  [
    25,
    {
      tileNum: 25,
      type: TileTypes.NORMAL,
      coords: [4, 7],
    },
  ],
  [
    26,
    {
      tileNum: 26,
      type: TileTypes.NORMAL,
      coords: [5, 7],
    },
  ],
  [
    27,
    {
      tileNum: 27,
      type: TileTypes.SNAKE_HEAD,
      destination: 10,
      coords: [6, 7],
    },
  ],
  [
    28,
    {
      tileNum: 28,
      type: TileTypes.NORMAL,
      coords: [7, 7],
    },
  ],
  [
    29,
    {
      tileNum: 29,
      type: TileTypes.NORMAL,
      coords: [8, 7],
    },
  ],
  [
    30,
    {
      tileNum: 30,
      type: TileTypes.NORMAL,
      coords: [9, 7],
    },
  ],
  [
    31,
    {
      tileNum: 31,
      type: TileTypes.NORMAL,
      coords: [9, 6],
    },
  ],
  [
    32,
    {
      tileNum: 32,
      type: TileTypes.NORMAL,
      coords: [8, 6],
    },
  ],
  [
    33,
    {
      tileNum: 33,
      type: TileTypes.NORMAL,
      coords: [7, 6],
    },
  ],
  [
    34,
    {
      tileNum: 34,
      type: TileTypes.NORMAL,
      coords: [6, 6],
    },
  ],
  [
    35,
    {
      tileNum: 35,
      type: TileTypes.NORMAL,
      coords: [5, 6],
    },
  ],
  [
    36,
    {
      tileNum: 36,
      type: TileTypes.NORMAL,
      coords: [4, 6],
    },
  ],
  [
    37,
    {
      tileNum: 37,
      type: TileTypes.NORMAL,
      coords: [3, 6],
    },
  ],
  [
    38,
    {
      tileNum: 38,
      type: TileTypes.NORMAL,
      coords: [2, 6],
    },
  ],
  [
    39,
    {
      tileNum: 39,
      type: TileTypes.NORMAL,
      coords: [1, 6],
    },
  ],
  [
    40,
    {
      tileNum: 40,
      type: TileTypes.NORMAL,
      coords: [0, 6],
    },
  ],
  [
    41,
    {
      tileNum: 41,
      type: TileTypes.LADDER_BASE,
      destination: 84,
      coords: [0, 5],
    },
  ],
  [
    42,
    {
      tileNum: 42,
      type: TileTypes.NORMAL,
      coords: [1, 5],
    },
  ],
  [
    43,
    {
      tileNum: 43,
      type: TileTypes.NORMAL,
      coords: [2, 5],
    },
  ],
  [
    44,
    {
      tileNum: 44,
      type: TileTypes.SNAKE_HEAD,
      destination: 5,
      coords: [3, 5],
    },
  ],
  [
    45,
    {
      tileNum: 45,
      type: TileTypes.NORMAL,
      coords: [4, 5],
    },
  ],
  [
    46,
    {
      tileNum: 46,
      type: TileTypes.NORMAL,
      coords: [5, 5],
    },
  ],
  [
    47,
    {
      tileNum: 47,
      type: TileTypes.NORMAL,
      coords: [6, 5],
    },
  ],
  [
    48,
    {
      tileNum: 48,
      type: TileTypes.NORMAL,
      coords: [7, 5],
    },
  ],
  [
    49,
    {
      tileNum: 49,
      type: TileTypes.NORMAL,
      coords: [8, 5],
    },
  ],
  [
    50,
    {
      tileNum: 50,
      type: TileTypes.NORMAL,
      coords: [9, 5],
    },
  ],
  [
    51,
    {
      tileNum: 51,
      type: TileTypes.NORMAL,
      coords: [9, 4],
    },
  ],
  [
    52,
    {
      tileNum: 52,
      type: TileTypes.NORMAL,
      coords: [8, 4],
    },
  ],
  [
    53,
    {
      tileNum: 53,
      type: TileTypes.NORMAL,
      coords: [7, 4],
    },
  ],
  [
    54,
    {
      tileNum: 54,
      type: TileTypes.SNAKE_HEAD,
      destination: 34,
      coords: [6, 4],
    },
  ],
  [
    55,
    {
      tileNum: 55,
      type: TileTypes.NORMAL,
      coords: [5, 4],
    },
  ],
  [
    56,
    {
      tileNum: 56,
      type: TileTypes.NORMAL,
      coords: [4, 4],
    },
  ],
  [
    57,
    {
      tileNum: 57,
      type: TileTypes.NORMAL,
      coords: [3, 4],
    },
  ],
  [
    58,
    {
      tileNum: 58,
      type: TileTypes.NORMAL,
      coords: [2, 4],
    },
  ],
  [
    59,
    {
      tileNum: 59,
      type: TileTypes.NORMAL,
      coords: [1, 4],
    },
  ],
  [
    60,
    {
      tileNum: 60,
      type: TileTypes.NORMAL,
      coords: [0, 4],
    },
  ],
  [
    61,
    {
      tileNum: 61,
      type: TileTypes.NORMAL,
      coords: [0, 3],
    },
  ],
  [
    62,
    {
      tileNum: 62,
      type: TileTypes.NORMAL,
      coords: [1, 3],
    },
  ],
  [
    63,
    {
      tileNum: 63,
      type: TileTypes.NORMAL,
      coords: [2, 3],
    },
  ],
  [
    64,
    {
      tileNum: 64,
      type: TileTypes.NORMAL,
      coords: [3, 3],
    },
  ],
  [
    65,
    {
      tileNum: 65,
      type: TileTypes.NORMAL,
      coords: [4, 3],
    },
  ],
  [
    66,
    {
      tileNum: 66,
      type: TileTypes.NORMAL,
      coords: [5, 3],
    },
  ],
  [
    67,
    {
      tileNum: 67,
      type: TileTypes.NORMAL,
      coords: [6, 3],
    },
  ],
  [
    68,
    {
      tileNum: 68,
      type: TileTypes.NORMAL,
      coords: [7, 3],
    },
  ],
  [
    69,
    {
      tileNum: 69,
      type: TileTypes.NORMAL,
      coords: [8, 3],
    },
  ],
  [
    70,
    {
      tileNum: 70,
      type: TileTypes.NORMAL,
      coords: [9, 3],
    },
  ],
  [
    71,
    {
      tileNum: 71,
      type: TileTypes.NORMAL,
      coords: [9, 2],
    },
  ],
  [
    72,
    {
      tileNum: 72,
      type: TileTypes.NORMAL,
      coords: [8, 2],
    },
  ],
  [
    73,
    {
      tileNum: 73,
      type: TileTypes.NORMAL,
      coords: [7, 2],
    },
  ],
  [
    74,
    {
      tileNum: 74,
      type: TileTypes.NORMAL,
      coords: [6, 2],
    },
  ],
  [
    75,
    {
      tileNum: 75,
      type: TileTypes.SNAKE_HEAD,
      destination: 55,
      coords: [5, 2],
    },
  ],
  [
    76,
    {
      tileNum: 76,
      type: TileTypes.NORMAL,
      coords: [4, 2],
    },
  ],
  [
    77,
    {
      tileNum: 77,
      type: TileTypes.NORMAL,
      coords: [3, 2],
    },
  ],
  [
    78,
    {
      tileNum: 78,
      type: TileTypes.NORMAL,
      coords: [2, 2],
    },
  ],
  [
    79,
    {
      tileNum: 79,
      type: TileTypes.NORMAL,
      coords: [1, 2],
    },
  ],
  [
    80,
    {
      tileNum: 80,
      type: TileTypes.SNAKE_HEAD,
      destination: 63,
      coords: [0, 2],
    },
  ],
  [
    81,
    {
      tileNum: 81,
      type: TileTypes.NORMAL,
      coords: [0, 1],
    },
  ],
  [
    82,
    {
      tileNum: 82,
      type: TileTypes.NORMAL,
      coords: [1, 1],
    },
  ],
  [
    83,
    {
      tileNum: 83,
      type: TileTypes.NORMAL,
      coords: [2, 1],
    },
  ],
  [
    84,
    {
      tileNum: 84,
      type: TileTypes.NORMAL,
      coords: [3, 1],
    },
  ],
  [
    85,
    {
      tileNum: 85,
      type: TileTypes.NORMAL,
      coords: [4, 1],
    },
  ],
  [
    86,
    {
      tileNum: 86,
      type: TileTypes.NORMAL,
      coords: [5, 1],
    },
  ],
  [
    87,
    {
      tileNum: 87,
      type: TileTypes.NORMAL,
      coords: [6, 1],
    },
  ],
  [
    88,
    {
      tileNum: 88,
      type: TileTypes.NORMAL,
      coords: [7, 1],
    },
  ],
  [
    89,
    {
      tileNum: 89,
      type: TileTypes.NORMAL,
      coords: [8, 1],
    },
  ],
  [
    90,
    {
      tileNum: 90,
      type: TileTypes.NORMAL,
      coords: [9, 1],
    },
  ],
  [
    91,
    {
      tileNum: 91,
      type: TileTypes.NORMAL,
      coords: [9, 0],
    },
  ],
  [
    92,
    {
      tileNum: 92,
      type: TileTypes.NORMAL,
      coords: [8, 0],
    },
  ],
  [
    93,
    {
      tileNum: 93,
      type: TileTypes.NORMAL,
      coords: [7, 0],
    },
  ],
  [
    94,
    {
      tileNum: 94,
      type: TileTypes.NORMAL,
      coords: [6, 0],
    },
  ],
  [
    95,
    {
      tileNum: 95,
      type: TileTypes.NORMAL,
      coords: [5, 0],
    },
  ],
  [
    96,
    {
      tileNum: 96,
      type: TileTypes.NORMAL,
      coords: [4, 0],
    },
  ],
  [
    97,
    {
      tileNum: 97,
      type: TileTypes.NORMAL,
      coords: [3, 0],
    },
  ],
  [
    98,
    {
      tileNum: 98,
      type: TileTypes.LADDER_BASE,
      destination: 78,
      coords: [2, 0],
    },
  ],

  [
    99,
    {
      tileNum: 99,
      type: TileTypes.SNAKE_HEAD,
      destination: 80,
      coords: [1, 0],
    },
  ],
  [
    100,
    {
      tileNum: 100,
      type: TileTypes.FINISH,
      coords: [0, 0],
    },
  ],
]);
