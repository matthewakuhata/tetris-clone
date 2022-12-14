import { useEffect, useState } from "react";
import { CellType, createStage, StageType } from "../helpers/stage-creator";
import { PlayerState } from "./usePlayer";

export const useStage = (player: PlayerState, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);

    const sweepRows = (newStage: StageType) => {
      let rowsCleared = 0;
      const stageCleared = newStage.reduce((acc, row, idx) => {
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          rowsCleared++;
          const newRow = new Array<CellType>(newStage[0].length).fill([
            0,
            "clear",
          ]);
          acc.unshift(newRow);
          return acc;
        } else {
          acc.push(row);
          return acc;
        }
      }, [] as StageType);

      setRowsCleared(rowsCleared);
      return stageCleared;
    };

    const updateStage = (prevStage: StageType) => {
      const newStage: StageType = prevStage.map((row) =>
        row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      player.tetrominos.forEach((row, y) =>
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collided ? "merged" : "clear"}`,
            ];
          }
        })
      );

      if (player.collided) {
        resetPlayer();
        return sweepRows(newStage);
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [
    player.collided,
    player.pos.x,
    player.pos.y,
    player.tetrominos,
    resetPlayer,
  ]);

  return { stage, rowsCleared, setStage };
};
