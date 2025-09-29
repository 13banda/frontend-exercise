import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameState } from '../types/game';
import { formatTime } from '../utils/gameLogic';

interface EndPageProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function EndPage({ gameState, onPlayAgain, onNewGame }: EndPageProps) {
  const navigate = useNavigate();
  
  const gameTime = gameState.endTime 
    ? Math.floor((gameState.endTime - gameState.startTime) / 1000)
    : 0;

  const getPerformanceRating = () => {
    const efficiency = gameState.tiles.length / gameState.moves;
    if (efficiency >= 0.8) return { 
      rating: 'Plant Expert!', 
      color: 'from-yellow-400 to-orange-500', 
      emoji: '🌟',
      description: 'Outstanding botanical memory!'
    };
    if (efficiency >= 0.6) return { 
      rating: 'Green Thumb!', 
      color: 'from-emerald-400 to-teal-500', 
      emoji: '🌿',
      description: 'Great plant recognition!'
    };
    if (efficiency >= 0.4) return { 
      rating: 'Growing Gardener!', 
      color: 'from-blue-400 to-indigo-500', 
      emoji: '🌱',
      description: 'Good botanical skills!'
    };
    return { 
      rating: 'Budding Botanist!', 
      color: 'from-purple-400 to-pink-500', 
      emoji: '🌿',
      description: 'Keep growing your skills!'
    };
  };

  const performance = getPerformanceRating();

  const handlePlayAgain = () => {
    onPlayAgain();
    navigate('/game');
  };

  const handleNewGame = () => {
    onNewGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-white/20">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">{performance.emoji}</div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Garden Complete!
          </h1>
          <p className="text-white/80 text-xl">Congratulations, {gameState.playerName}!</p>
        </div>

        <div className={`bg-gradient-to-r ${performance.color} rounded-2xl p-6 mb-6 text-center`}>
          <h2 className="text-2xl font-bold text-white mb-2">{performance.rating}</h2>
          <p className="text-white/90">{performance.description}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">⏱️</span>
              </div>
              <span className="font-semibold text-white">Time</span>
            </div>
            <span className="text-2xl font-bold text-white">{formatTime(gameTime)}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎯</span>
              </div>
              <span className="font-semibold text-white">Moves</span>
            </div>
            <span className="text-2xl font-bold text-white">{gameState.moves}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📋</span>
              </div>
              <span className="font-semibold text-white">Board Size</span>
            </div>
            <span className="text-2xl font-bold text-white">{gameState.boardSize.label.split(' ')[0]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePlayAgain}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-lg"
          >
            🌱 Grow Again
          </button>
          
          <button
            onClick={handleNewGame}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-lg"
          >
            🌿 New Garden
          </button>
        </div>
      </div>
    </div>
  );
}