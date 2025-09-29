import React, { useEffect } from 'react'
import { GameBoard } from '../components/GameBoard'
import { GameStats } from '../components/GameStats'
import { GameState } from '../types/game'

interface GamePageProps {
  gameState: GameState
  onTileFlip: (tileId: number) => void
  onGameEnd: () => void
}

export function GamePage({ gameState, onTileFlip, onGameEnd }: GamePageProps) {
  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      // Add a small delay before showing the end screen for better UX
      const timer = setTimeout(() => {
        onGameEnd()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus, onGameEnd])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Memory Game</h1>
          <p className="text-gray-600">Find all the matching pairs!</p>
        </div>

        <GameStats gameState={gameState} />

        <div className="bg-white rounded-lg shadow-lg p-6">
          <GameBoard gameState={gameState} onTileFlip={onTileFlip} />
        </div>

        {gameState.gameStatus === 'won' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h2>
              <p className="text-gray-600">You found all the pairs!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}