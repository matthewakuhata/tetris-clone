import React from "react";
import { StageType } from "../helpers/stage-creator";
import Cell from "./Cell";

export interface StageProps {
  stage: StageType;
}

const Stage: React.FC<StageProps> = ({ stage }) => {
  return (
    <div>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </div>
  );
};

export default Stage;
