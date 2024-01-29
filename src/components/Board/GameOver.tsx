import React, { FC } from "react";

type Props = {
  game: number;
};

const GameOver: FC<Props> = ({ game }) => {
  if (game === -1) return null;
  return <div>Game over</div>;
};

export default GameOver;
