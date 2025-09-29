import React from 'react'
import { GameState } from '../types/game'
import { useTimer } from '../hooks/useTimer'
import { formatTime } from '../utils/gameLogic'

interface GameStatsProps {
  gameState: GameState
}

export function GameStats({ gameState }: GameStatsProps) {
  const elapsedTime = useTimer(gameState.gameStatus === 'playing', gameState.startTime)
  const displayTime = gameState.endTime 
    ? Math.floor((gameState.endTime - gameState.startTime) / 1000)
    : elapsedTime

  const matchedPairs = gameState.matchedPairs.length / 2
  const totalPairs = gameState.tiles.length / 2

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-600">{gameState.playerName}</div>
          <div className="text-sm text-blue-500">Player</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-green-600">{formatTime(displayTime)}</div>
          <div className="text-sm text-green-500">Time</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-purple-600">{gameState.moves}</div>
          <div className="text-sm text-purple-500">Moves</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-3">
          <div className="text-2xl font-bold text-orange-600">{matchedPairs}/{totalPairs}</div>
          <div className="text-sm text-orange-500">Pairs</div>
        </div>
      </div>
    </div>
  )
}