import { off } from "process";
import { useCallback, useState } from "react";
import { checkCollision } from "../helpers/collision-detection";
import { StageType, STAGE_WIDTH } from "../helpers/stage-creator";
import { randomTetrisPiece, TETROMINOS } from "../helpers/tetrominos";

export interface PlayerState {
  pos: { x: number; y: number };
  tetrominos: (string | number)[][];
  collided: boolean;
}
const initialState: PlayerState = {
  pos: { x: 0, y: 0 },
  tetrominos: TETROMINOS[0].shape,
  collided: false,
};

export const usePlayer = () => {
  const [player, setPlayer] = useState(initialState);

  const updatePlayerPos = ({
    x,
    y,
    collided,
  }: {
    x: number;
    y: number;
    collided: boolean;
  }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided,
    }));
  };

  const rotate = (matrix: (string | number)[][], dir: number) => {
    const rotated = matrix.map((_, index) => matrix.map((col) => col[index]));

    if (dir > 0) return rotated.map((row) => row.reverse());
    return rotated.reverse();
  };

  const playerRotate = (stage: StageType, dir: number) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player)) as PlayerState;
    clonedPlayer.tetrominos = rotate(clonedPlayer.tetrominos, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetrominos[0].length) {
        rotate(clonedPlayer.tetrominos, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonedPlayer);
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrominos: randomTetrisPiece().shape,
      collided: false,
    });
  }, []);

  return { player, updatePlayerPos, resetPlayer, playerRotate };
};
