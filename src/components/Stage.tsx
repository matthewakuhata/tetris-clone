import React from "react";

import Cell from "./Cell";
import { StageType } from "../helpers/stage-creator";
import { StyledStage } from "./styles/StyledStage";

export interface StageProps {
  stage: StageType;
}

const Stage: React.FC<StageProps> = ({ stage }) => {
  return (
    <StyledStage width={stage[0].length} height={stage.length}>
      {stage.map((row) =>
        row.map((cell, x) => <Cell key={x} type={cell[0]} />)
      )}
    </StyledStage>
  );
};

export default Stage;
