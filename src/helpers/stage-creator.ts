export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

type CellType = [number, string];
export type StageType = CellType[][];

type CreateStage = () => StageType;

export const createStage: CreateStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 0, "clear"])
  );
};