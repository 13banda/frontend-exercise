import React from 'react'
import { GameState } from '../types/game'
import { formatTime } from '../utils/gameLogic'

interface EndPageProps {
  gameState: GameState
  onPlayAgain: () => void
  onNewGame: () => void
}

export function EndPage({ gameState, onPlayAgain, onNewGame }: EndPageProps) {
  const gameTime = gameState.endTime 
    ? Math.floor((gameState.endTime - gameState.startTime) / 1000)
    : 0

  const getPerformanceRating = () => {
    const efficiency = gameState.tiles.length / gameState.moves
    if (efficiency >= 0.8) return { 
      rating: 'Memory Master!', 
      color: 'from-yellow-400 to-orange-500', 
      emoji: '🏆',
      description: 'Outstanding performance!'
    }
    if (efficiency >= 0.6) return { 
      rating: 'Excellent!', 
      color: 'from-emerald-400 to-teal-500', 
      emoji: '🌟',
      description: 'Great memory skills!'
    }
    if (efficiency >= 0.4) return { 
      rating: 'Well Done!', 
      color: 'from-blue-400 to-indigo-500', 
      emoji: '👏',
      description: 'Good job!'
    }
    return { 
      rating: 'Keep Practicing!', 
      color: 'from-purple-400 to-pink-500', 
      emoji: '💪',
      description: 'You\'ll get better!'
    }
  }

  const performance = getPerformanceRating()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-white/20">
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">{performance.emoji}</div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Game Complete!
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
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-white">Time</span>
            </div>
            <span className="text-2xl font-bold text-white">{formatTime(gameTime)}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-white">Moves</span>
            </div>
            <span className="text-2xl font-bold text-white">{gameState.moves}</span>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex justify-between items-center border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-semibold text-white">Board Size</span>
            </div>
            <span className="text-2xl font-bold text-white">{gameState.boardSize.label.split(' ')[0]}</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-6 rounded-xl hover:from-emerald-600 hover:to-teal-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-lg"
          >
            🔄 Play Again
          </button>
          
          <button
            onClick={onNewGame}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-lg"
          >
            🎮 New Game
          </button>
        </div>
      </div>
    </div>
  )
}