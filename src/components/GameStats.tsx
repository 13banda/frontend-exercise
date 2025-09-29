import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { formatTime } from '../utils/gameLogic';

interface GameStatsProps {
  gameState: GameState;
}

export function GameStats({ gameState }: GameStatsProps) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (gameState.gameStatus === "playing") {
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
  const matchedPairs = gameState.matchedPairs.length / 2;
  const totalPairs = gameState.tiles.length / 2;

  return (
    <>
      <div className='flex flex-wrap justify-center gap-4 mb-8'>
        {/* Player */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gameState.playerName}</div>
            <div className="text-white/70 text-sm">Player</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* Timer */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{formatTime(timeElapsed)}</div>
            <div className="text-white/70 text-sm">Time</div>
          </div>
        </div>

        {/* Moves */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{gameState.moves}</div>
            <div className="text-white/70 text-sm">Moves</div>
          </div>
        </div>

        {/* Pairs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{matchedPairs}/{totalPairs}</div>
            <div className="text-white/70 text-sm">Pairs Found</div>
          </div>
        </div>
      </div>
    </>
  );
}
