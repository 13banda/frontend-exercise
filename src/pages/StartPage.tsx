import React, { useState } from 'react'
import { BoardSize } from '../types/game'
import { BOARD_SIZES } from '../utils/gameLogic'

interface StartPageProps {
  onStartGame: (playerName: string, boardSize: BoardSize) => void
}

export function StartPage({ onStartGame }: StartPageProps) {
  const [playerName, setPlayerName] = useState('')
  const [selectedBoardSize, setSelectedBoardSize] = useState<BoardSize>(BOARD_SIZES[1])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      onStartGame(playerName.trim(), selectedBoardSize)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/growy_logo.svg"
            alt="Growy Logo"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Memory Game</h1>
          <p className="text-gray-600">Test your memory with beautiful plant images!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="boardSize" className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              id="boardSize"
              value={BOARD_SIZES.findIndex(size => size === selectedBoardSize)}
              onChange={(e) => setSelectedBoardSize(BOARD_SIZES[parseInt(e.target.value)])}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            >
              {BOARD_SIZES.map((size, index) => (
                <option key={index} value={index}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Game
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Match pairs of plant images to win!</p>
        </div>
      </div>
    </div>
  )
}