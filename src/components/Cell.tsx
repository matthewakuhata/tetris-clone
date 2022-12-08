import React from "react";
import { StyledCell } from "./styles/StyledCell";

const Cell = ({ type }: { type: number }) => {
  return <StyledCell type={type}>Cell</StyledCell>;
};

export default Cell;
