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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 inline-block mb-6 border border-white/20">
            <img
              src="/growy_logo.svg"
              alt="Growy Logo"
              className="w-16 h-16 mx-auto filter brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Memory Game
          </h1>
          <p className="text-white/80 text-lg">Match beautiful plant pairs and test your memory!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-semibold text-white/90 mb-3">
              Enter Your Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-lg"
              placeholder="Your name here..."
              required
            />
          </div>

          <div>
            <label htmlFor="boardSize" className="block text-sm font-semibold text-white/90 mb-3">
              Choose Difficulty
            </label>
            <div className="grid grid-cols-2 gap-3">
              {BOARD_SIZES.map((size, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedBoardSize(size)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium ${
                    selectedBoardSize === size
                      ? 'bg-purple-500/30 border-purple-400 text-white shadow-lg'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="font-bold">{size.label.split(' ')[0]}</div>
                  <div className="text-xs opacity-80">{size.label.split(' ')[1]}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg text-lg"
          >
            Start Playing
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            💡 Flip tiles to find matching plant pairs
          </p>
        </div>
      </div>
    </div>
  )
}