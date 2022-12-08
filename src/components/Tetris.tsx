import React, { useState } from "react";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { createStage } from "../helpers/stage-creator";
import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { create } from "domain";
import { checkCollision } from "../helpers/collision-detection";

const Tetris = () => {
  const [droptime, setDroptime] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage } = useStage(player, resetPlayer);

  const movePlayer = (direction: number) => {
    if (!checkCollision(player, stage, { x: direction, y: 0 })) {
      updatePlayerPos({ x: direction, y: 0, collided: false });
    }
  };

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  };

  const drop = () => {
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
    drop();
  };

  const move = ({ key }: React.KeyboardEvent<HTMLDivElement>) => {
    if (gameOver) return;

    if (key === "ArrowLeft") {
      movePlayer(-1);
    } else if (key === "ArrowRight") {
      movePlayer(1);
    } else if (key === "ArrowDown") {
      dropPlayer();
    } else if (key === "ArrowUp") {
      playerRotate(stage, 1);
    }
  };

  return (
    <StyledTetrisWrapper role="button" tabIndex={0} onKeyDown={(e) => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameover={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
