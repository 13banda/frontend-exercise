import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GameBoard } from "../components/GameBoard";
import { GameStats } from "../components/GameStats";
import { GameState } from "../types/game";
import { GameStatus } from "../constants/game";
import { WinModal } from "../components/WinModal";

interface GamePageProps {
  gameState: GameState;
  onTileFlip: (tileId: number) => void;
  onGameEnd: () => void;
}

export function GamePage({ gameState, onTileFlip, onGameEnd }: GamePageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (gameState.gameStatus === GameStatus.Won) {
      const timer = setTimeout(() => {
        onGameEnd();
        navigate("/end");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameState.gameStatus, onGameEnd, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          {/* Left side - Game name */}
          <div>
            <h1 className="text-5xl font-bold mb-1 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Memory Game
            </h1>
            <p className="text-white/70 text-lg">
              Find all the matching pairs to win!
            </p>
          </div>

          {/* Right side - Player info */}
          <div className="text-right">
            <h2 className="text-xl font-bold text-white">
              {gameState.playerName}
            </h2>
            <p className="text-white/60">Player</p>
          </div>
        </div>


        <GameStats gameState={gameState} />

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <GameBoard gameState={gameState} onTileFlip={onTileFlip} />
        </div>

        <WinModal gameStatus={gameState.gameStatus} />
      </div>
    </div>
  );
}
