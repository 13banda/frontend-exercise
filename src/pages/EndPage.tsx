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
    if (efficiency >= 0.8) return { rating: 'Excellent!', color: 'text-green-600', emoji: '🌟' }
    if (efficiency >= 0.6) return { rating: 'Great!', color: 'text-blue-600', emoji: '👏' }
    if (efficiency >= 0.4) return { rating: 'Good!', color: 'text-yellow-600', emoji: '👍' }
    return { rating: 'Keep practicing!', color: 'text-purple-600', emoji: '💪' }
  }

  const performance = getPerformanceRating()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Game Complete!</h1>
          <p className="text-gray-600">Well done, {gameState.playerName}!</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium text-gray-700">Time:</span>
            <span className="text-xl font-bold text-blue-600">{formatTime(gameTime)}</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium text-gray-700">Moves:</span>
            <span className="text-xl font-bold text-purple-600">{gameState.moves}</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
            <span className="font-medium text-gray-700">Board Size:</span>
            <span className="text-xl font-bold text-green-600">{gameState.boardSize.label}</span>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-1">{performance.emoji}</div>
            <div className={`text-xl font-bold ${performance.color}`}>
              {performance.rating}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Play Again (Same Settings)
          </button>
          
          <button
            onClick={onNewGame}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            New Game (Change Settings)
          </button>
        </div>
      </div>
    </div>
  )
}