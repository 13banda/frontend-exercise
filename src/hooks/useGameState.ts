import { useState, useCallback } from 'react'
import { GameState, BoardSize } from '../types/game'
import { createGameBoard, checkForMatch } from '../utils/gameLogic'

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  const initializeGame = useCallback((playerName: string, boardSize: BoardSize) => {
    const tiles = createGameBoard(boardSize)
    setGameState({
      playerName,
      boardSize,
      tiles,
      flippedTiles: [],
      matchedPairs: [],
      moves: 0,
      startTime: Date.now(),
      gameStatus: 'playing'
    })
  }, [])

  const flipTile = useCallback(
    (tileId: number) => {
      if (!gameState || gameState.gameStatus !== 'playing') return

      setGameState((prevState) => {
        if (!prevState) return prevState

        const tile = prevState.tiles.find((t) => t.id === tileId)
        if (!tile || tile.isFlipped || tile.isMatched) return prevState

        // If two tiles are already flipped, reset them first
        if (prevState.flippedTiles.length === 2) {
          const updatedTiles = prevState.tiles.map((t) => ({
            ...t,
            isFlipped: t.isMatched ? t.isFlipped : false
          }))

          return {
            ...prevState,
            tiles: updatedTiles.map((t) => (t.id === tileId ? { ...t, isFlipped: true } : t)),
            flippedTiles: [tileId],
            moves: prevState.moves + 1
          }
        }

        // Flip the selected tile
        const updatedTiles = prevState.tiles.map((t) => (t.id === tileId ? { ...t, isFlipped: true } : t))

        const newFlippedTiles = [...prevState.flippedTiles, tileId]

        // Check for match if two tiles are flipped
        if (newFlippedTiles.length === 2) {
          const isMatch = checkForMatch(updatedTiles, newFlippedTiles)

          if (isMatch) {
            const finalTiles = updatedTiles.map((t) => (newFlippedTiles.includes(t.id) ? { ...t, isMatched: true } : t))

            const newMatchedPairs = [...prevState.matchedPairs, ...newFlippedTiles]
            const gameWon = newMatchedPairs.length === prevState.tiles.length

            return {
              ...prevState,
              tiles: finalTiles,
              flippedTiles: [],
              matchedPairs: newMatchedPairs,
              moves: prevState.moves + 1,
              gameStatus: gameWon ? 'won' : 'playing',
              endTime: gameWon ? Date.now() : undefined
            }
          }
        }

        return {
          ...prevState,
          tiles: updatedTiles,
          flippedTiles: newFlippedTiles,
          moves: prevState.moves + 1
        }
      })
    },
    [gameState]
  )

  const resetGame = useCallback(() => {
    setGameState(null)
  }, [])
  const clearGame = useCallback(() => {
    setGameState(null)
  }, [])

  return {
    gameState,
    initializeGame,
    flipTile,
    resetGame,
    clearGame
  }
}
