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
      const timer = setTimeout(() => {
        onGameEnd()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [gameState.gameStatus, onGameEnd])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-4 pt-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Memory Challenge
          </h1>
          <p className="text-white/70 text-lg">Find all the matching pairs to win!</p>
        </div>

        <GameStats gameState={gameState} />

        <div className="bg-white/5 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
          <GameBoard gameState={gameState} onTileFlip={onTileFlip} />
        </div>

        {gameState.gameStatus === 'won' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-center transform animate-bounce shadow-2xl border border-white/20">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-3">Fantastic!</h2>
              <p className="text-white/90 text-lg">You found all the pairs!</p>
              <div className="mt-4 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-200"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce animation-delay-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}