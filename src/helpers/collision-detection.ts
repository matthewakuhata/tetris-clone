import { PlayerState } from "../hooks/usePlayer";
import { StageType } from "./stage-creator";

export const checkCollision = (
  player: PlayerState,
  stage: StageType,
  { x: moveX, y: moveY }: { x: number; y: number }
) => {
  for (let y = 0; y < player.tetrominos.length; y++) {
    for (let x = 0; x < player.tetrominos[y].length; x++) {
      if (player.tetrominos[y][x] === 0) continue;

      if (
        !stage[y + player.pos.y + moveY] ||
        !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
        stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
      ) {
        return true;
      }
    }
  }
};
