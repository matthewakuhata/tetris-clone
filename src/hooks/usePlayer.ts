import { useCallback, useState } from "react";
import { STAGE_WIDTH } from "../helpers/stage-creator";
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

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetrominos: randomTetrisPiece().shape,
      collided: false,
    });
  }, []);

  return { player, updatePlayerPos, resetPlayer };
};
