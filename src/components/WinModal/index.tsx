import React from "react";
import { GameStatus } from "../../constants/game";

interface WinModalProps {
  gameStatus: GameStatus;
}

export function WinModal({ gameStatus }: WinModalProps) {
  if (gameStatus !== GameStatus.Won) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-center transform animate-bounce shadow-2xl border border-white/20">
        <div className="text-7xl mb-4">🌱</div>
        <h2 className="text-4xl font-bold text-white mb-3">Garden Master!</h2>
        <p className="text-white/90 text-lg">
          You matched all the plant pairs!
        </p>
      </div>
    </div>
  );
}
