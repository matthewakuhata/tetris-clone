export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export type CellType = [number | string, string];
export type StageType = CellType[][];

type CreateStage = () => StageType;

export const createStage: CreateStage = () => {
  return Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );
};
