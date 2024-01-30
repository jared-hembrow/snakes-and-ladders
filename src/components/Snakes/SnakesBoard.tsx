"use client";
import { snakesAndLaddersBoard } from "@/Game";
import { Tile, TileTypes } from "@/types.d";
import React, { FC, useEffect, useRef } from "react";

type Props = {
  tiles: Tile[];
  height: number;
};
type Coord = [x: number, y: number];
type StartEndCoordsMap = { start: Coord; end: Coord };
const SnakesBoard: FC<Props> = ({ tiles, height = 1000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef || !canvasRef.current) return;
    RenderSquareBoard(height / 10);
  }, []);

  const drawSnake = (
    ctx: CanvasRenderingContext2D,
    start: Coord,
    end: Coord
  ) => {
    // Set the line style
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000";

    // Define the points as {x, y}
    const diff = [end[0] - start[0], end[1] - start[1]];
    let cp1 = [diff[0] / 4 + start[0] + 50, diff[1] / 4 + start[1] + 50];
    let cp2 = [diff[0] / 4 + start[0] - 50, diff[1] / 4 + start[1] - 50];

    let cp3 = [
      (diff[0] / 4) * 3 + start[0] + 50,
      (diff[1] / 4) * 3 + start[1] + 50,
    ];
    let cp4 = [
      (diff[0] / 4) * 3 + start[0] - 50,
      (diff[1] / 4) * 3 + start[1] - 50,
    ];

    let midPoint = [diff[0] / 2 + start[0], diff[1] / 2 + start[1]];
    // let cp1 = [end[0] / 3 - 100, end[1] / 3 + 100];
    // let cp2 = [end[0] / 3 + 100, end[1] / 3 - 100];
    // let cp3 = [(end[0] / 3) * 2 - 100, (end[1] / 3) * 2 + 100];
    // let cp4 = [(end[0] / 3) * 2 + 100, (end[1] / 3) * 2 - 100];
    console.log(diff, cp1, cp2, cp3, cp4);
    // Cubic Bézier curve
    // 1st curves
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.bezierCurveTo(cp1[0], cp1[1], cp2[0], cp2[1], midPoint[0], midPoint[1]);
    ctx.stroke();
    // 2nd curves
    ctx.beginPath();
    ctx.moveTo(midPoint[0], midPoint[1]);
    ctx.bezierCurveTo(cp3[0], cp3[1], cp4[0], cp4[1], end[0], end[1]);
    ctx.stroke();
    // Draw snake head
    // Draw a filled circle for the snake head
    ctx.fillStyle = "gray"; // Blue color

    // Draw a filled ellipse for the snake head
    const rotation = findRotation(start, end);
    ctx.beginPath();
    ctx.ellipse(start[0], start[1], 10, 10, rotation, 0, 2 * Math.PI);
    ctx.fill();
  };

  const findRotation = (start: Coord, end: Coord): number => {
    // angle=Math.atan2(y2−y1,x2−x1)
    // Calculate the angle in radians
    var angle = Math.atan2(end[1] - start[1], end[0] - end[1]);
    console.log(angle);
    // Convert the angle from radians to degrees
    var degrees = angle * (180 / Math.PI);

    return degrees;
  };

  const drawLadder = (
    ctx: CanvasRenderingContext2D,
    start: Coord,
    end: Coord
  ) => {
    // Set the line style
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000";

    // Draw Left side of Ladder
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();

    // Draw  side of Ladder
    ctx.beginPath();
    ctx.moveTo(start[0] + 50, start[1]);
    ctx.lineTo(end[0] + 50, end[1]);
    ctx.stroke();

    // Draw Rungs of ladder
    const diff = [end[0] - start[0], end[1] - start[1]];
    const rungCount = diff[1] / 20;
    const step = diff[0] / 20;
    console.log(diff[0] / 20, diff, rungCount);
    for (let i = 1; i < 20; i++) {
      const stepX = step * i;
      const stepY = rungCount * i;
      const rungStart = [start[0] + step * i, start[1] + stepY - 10];
      const rungEnd = [start[0] + 50 + stepX, start[1] + stepY];
      // Move to the starting point
      ctx.beginPath();
      ctx.moveTo(rungStart[0], rungStart[1] + 10);
      // Draw a line to the specified endpoint (x, y)
      ctx.lineTo(rungEnd[0], rungEnd[1]);

      // Stroke the path
      ctx.stroke();
    }
  };

  const RenderSquareBoard = (squareSize: number = 100) => {
    if (!canvasRef || !canvasRef.current) return;
    const canvas = canvasRef.current;
    var context = canvas.getContext("2d");
    if (!context) return;

    const squares: { [key: number | string]: any } = {};

    var colorA = "white";
    var colorB = "red";

    var initRow = 1;
    var totalRows = 10;
    var initcolumn = 1;
    var totalColumns = 10;

    var x = 0;
    var y = canvas.height - squareSize;

    var columnNr = 1;
    var leftToRight = true;
    for (var row = initRow; row <= totalRows; row++) {
      if (leftToRight) {
        x = 0;
      } else {
        x = canvas.width - squareSize;
      }

      for (var column = initcolumn; column <= totalColumns; column++) {
        if (columnNr % 2 == 0) {
          context.fillStyle = colorA;
        } else {
          context.fillStyle = colorB;
        }

        context.fillRect(x, y, squareSize, squareSize);

        squares[columnNr] = x.toString() + "," + y.toString();

        context.font = "17px tahoma";
        context.fillStyle = "black";
        context.fillText(`${columnNr}`, x, y + squareSize);

        var x1, y1;
        if (leftToRight) {
          x += squareSize;

          x1 = x + squareSize / 2;
        } else {
          x -= squareSize;
          x1 = x - squareSize / 2;
        }

        y1 = y - squareSize / 2;

        columnNr++;
      }

      y -= squareSize;
      leftToRight = !leftToRight;
    }
    renderSpecialTiles(context);
  };

  const getTileCoord = (tile: Tile, squareSize: number): StartEndCoordsMap => {
    const resultCoords: StartEndCoordsMap = {
      start: [0, 0],
      end: [0, 0],
    };

    if (tile.type === TileTypes.LADDER_BASE) {
      const distCoords = snakesAndLaddersBoard.get(tile.destination || -0);
      if (distCoords)
        resultCoords.end = [
          distCoords.coords[0] * squareSize + 30,
          distCoords.coords[1] * squareSize + squareSize - 20,
        ];

      resultCoords.start = [
        tile.coords[0] * squareSize + 10,
        tile.coords[1] * squareSize + 20,
      ];
    }
    if (tile.type === TileTypes.SNAKE_HEAD) {
      const distCoords = snakesAndLaddersBoard.get(tile.destination || -0);
      if (distCoords)
        resultCoords.end = [
          distCoords.coords[0] * squareSize + 30,
          distCoords.coords[1] * squareSize + squareSize - 20,
        ];

      resultCoords.start = [
        tile.coords[0] * squareSize + squareSize / 2,
        tile.coords[1] * squareSize + squareSize - 20,
      ];
    }

    return resultCoords;
  };
  const renderSpecialTiles = (ctx: CanvasRenderingContext2D) => {
    const squareSize = height / 10;
    // drawLadder(ctx, [100, 100], [600, 600]);
    // drawSnake(ctx, [410, 920], [630, 180]);
    for (const t of tiles) {
      if (!t.hasOwnProperty("destination")) continue;
      const tileCoords = getTileCoord(t, squareSize);
      if (t.type === TileTypes.LADDER_BASE) {
        console.log("Ladder");
        drawLadder(ctx, tileCoords.start, tileCoords.end);
      }
      if (t.type === TileTypes.SNAKE_HEAD) {
        console.log("Snake");
        console.log("tile: ", t);
        console.log("coords:", tileCoords);
        drawSnake(ctx, tileCoords.start, tileCoords.end);
      }
    }
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        id="board"
        width={height}
        height={height}
      ></canvas>
    </div>
  );
};

export default SnakesBoard;
