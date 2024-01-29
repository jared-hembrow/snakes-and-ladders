import React, { FC } from "react";
import style from "./Tile.module.css";
import { Tile } from "@/types";
type Props = {
  data: Tile;
  players?: number[];
};
const playerColors: { [key: number]: string } = {
  0: "red",
  1: "blue",
  2: "green",
  3: "yellow",
};
const TileItem: FC<Props> = ({ data, players }) => {
  return (
    <div className={style["tile-container"]}>
      {data.tileNum}
      {!players
        ? null
        : players?.map((p) => (
            <div
              style={{ backgroundColor: playerColors[!p ? 0 : p] }}
              className={style["tile-player"]}
            ></div>
          ))}
    </div>
  );
};

export default TileItem;
