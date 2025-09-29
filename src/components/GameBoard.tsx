import React from 'react'
import { GameTile } from './GameTile'
import { GameState } from '../types/game'

interface GameBoardProps {
  gameState: GameState
  onTileFlip: (tileId: number) => void
}

export function GameBoard({ gameState, onTileFlip }: GameBoardProps) {
  const { tiles, boardSize, flippedTiles } = gameState
  const isDisabled = flippedTiles.length >= 2

  return (
    <div
      className="grid gap-2 mx-auto max-w-4xl"
      style={{
        gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${boardSize.rows}, minmax(0, 1fr))`
      }}
    >
      {tiles.map((tile) => (
        <GameTile
          key={tile.id}
          tile={tile}
          onFlip={onTileFlip}
          disabled={isDisabled}
        />
      ))}
    </div>
  )
}