import React, { useState } from 'react'
import { StartPage } from './pages/StartPage'
import { GamePage } from './pages/GamePage'
import { EndPage } from './pages/EndPage'
import { useGameState } from './hooks/useGameState'
import { BoardSize } from './types/game'

type AppState = 'start' | 'game' | 'end'

function App() {
  const [appState, setAppState] = useState<AppState>('start')
  const { gameState, initializeGame, flipTile, resetGame } = useGameState()

  const handleStartGame = (playerName: string, boardSize: BoardSize) => {
    initializeGame(playerName, boardSize)
    setAppState('game')
  }

  const handleGameEnd = () => {
    setAppState('end')
  }

  const handlePlayAgain = () => {
    if (gameState) {
      initializeGame(gameState.playerName, gameState.boardSize)
      setAppState('game')
    }
  }

  const handleNewGame = () => {
    resetGame()
    setAppState('start')
  }

  if (appState === 'start') {
    return <StartPage onStartGame={handleStartGame} />
  }

  if (appState === 'game' && gameState) {
    return (
      <GamePage
        gameState={gameState}
        onTileFlip={flipTile}
        onGameEnd={handleGameEnd}
      />
    )
  }

  if (appState === 'end' && gameState) {
    return (
      <EndPage
        gameState={gameState}
        onPlayAgain={handlePlayAgain}
        onNewGame={handleNewGame}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    </div>
  )
}

export default App
