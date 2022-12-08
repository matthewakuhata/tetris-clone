import { useEffect, useState } from "react";
import { createStage, StageType } from "../helpers/stage-creator";
import { PlayerState } from "./usePlayer";

export const useStage = (player: PlayerState, resetPlayer: () => void) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
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
      }

      return newStage;
    };

    setStage((prev) => updateStage(prev));
  }, [player, resetPlayer]);

  return { stage, setStage };
};
