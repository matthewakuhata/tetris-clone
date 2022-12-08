import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

const Display = ({
  gameover = false,
  text,
}: {
  gameover?: boolean;
  text: string;
}) => {
  return <StyledDisplay gameOver={gameover}>{text}</StyledDisplay>;
};

export default Display;
