import React, { useState, useEffect } from "react";
import { GameState } from "../types/game";
import { formatTime } from "../utils/gameLogic";
import { GameStatCard } from "./GameStatCard";
import { GameStatus } from "../constants/game";

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (gameState.gameStatus === GameStatus.Playing) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);

      return () => clearInterval(interval);
    } else if (gameState.endTime) {
      // Stop at end time
      setCurrentTime(gameState.endTime);
    }
  }, [gameState.gameStatus, gameState.endTime]);

  const timeElapsed = Math.floor((currentTime - gameState.startTime) / 1000);

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <GameStatCard label="Time" value={formatTime(timeElapsed)} />
      <GameStatCard label="Moves" value={gameState.moves} />
      <GameStatCard
        label="Pairs Found"
        value={gameState.matchedPairs.length / 2}
      />
    </div>
  );
}
