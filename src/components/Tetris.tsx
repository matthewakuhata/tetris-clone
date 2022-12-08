import React, { useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { createStage } from "../helpers/stage-creator";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { checkCollision } from "../helpers/collision-detection";
import { useGameStatus } from "../hooks/useGameStatus";

const Tetris = () => {
  const [droptime, setDroptime] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (direction: number) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    setGameOver(false);
    resetPlayer();
    setDroptime(1000);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);

      setDroptime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        setGameOver(true);
        setDroptime(0);
      }

      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDroptime(null);
    drop();
  };

  const keyUp = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (gameOver) return;

    if (key === "ArrowDown") {
      setDroptime(1000 / (level + 1) + 200);
    }
  };

  const move = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (gameOver) return;

    if (key === "ArrowLeft") {
      movePlayer(-1);
    } else if (key === "ArrowRight") {
      movePlayer(1);
    } else if (key === "ArrowDown") {
      dropPlayer();
    } else if (key === "ArrowUp" || key === "Space") {
      playerRotate(stage, 1);
    }
  };

  useInterval(() => {
    drop();
  }, droptime);

  return (
    <StyledTetrisWrapper
      role="button"
      onKeyUp={keyUp}
      tabIndex={0}
      onKeyDown={(e) => move(e)}
    >
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameover={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`Rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
