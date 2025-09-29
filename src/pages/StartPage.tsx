import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoardSize } from "../types/game";
import { BOARD_SIZES } from "../utils/gameLogic";

interface StartPageProps {
  onStartGame: (playerName: string, boardSize: BoardSize) => void;
}

export function StartPage({ onStartGame }: StartPageProps) {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [selectedBoardSize, setSelectedBoardSize] = useState<BoardSize>(
    BOARD_SIZES[1],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStartGame(playerName.trim(), selectedBoardSize);
      navigate("/game");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse animation-delay-2000" />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg">
                <img
                  src="/growy_logo.svg"
                  alt="Growy Logo"
                  className="w-12 h-12 mx-auto object-contain"
                />
              </div>
            </div>

            <h1 className="text-3xl font-extrabold text-white mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Plant Memory Game
            </h1>
            <p className="text-white/70 text-sm">
              Match plant pairs and test your memory.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="playerName"
                className="block text-sm font-semibold text-white/90"
              >
                Player Name
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 focus:outline-none"
                placeholder="Enter your name..."
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/90">
                Board Size
              </label>
              <div className="grid grid-cols-2 gap-3">
                {BOARD_SIZES.map((size, index) => {
                  const isSelected = selectedBoardSize === size;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedBoardSize(size)}
                      className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 min-h-[80px]
                        ${
                          isSelected
                            ? "bg-gradient-to-br from-purple-600 to-pink-500 border-pink-400 text-white shadow-lg scale-105"
                            : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-purple-300 hover:scale-102"
                        }`}
                    >
                      <span className="text-base font-bold">
                        {size.rows}×{size.cols}
                      </span>
                      <span className="text-xs opacity-75 mt-1">
                        {size.label.split(" ").slice(-1)[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={!playerName.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
