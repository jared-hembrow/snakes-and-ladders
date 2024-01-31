import { SnakesAndLadders } from "@/components";
import SnakesBoard from "@/components/Snakes/SnakesBoard";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <SnakesAndLadders />
    </div>
  );
};

export default page;
