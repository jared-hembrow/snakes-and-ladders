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
