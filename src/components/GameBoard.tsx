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

  // Calculate responsive tile size based on board size
  const getTileSize = () => {
    const maxCols = Math.max(boardSize.cols, boardSize.rows)
    if (maxCols <= 3) return 'w-24 h-24 sm:w-28 sm:h-28'
    if (maxCols <= 4) return 'w-20 h-20 sm:w-24 sm:h-24'
    if (maxCols <= 5) return 'w-16 h-16 sm:w-20 sm:h-20'
    return 'w-12 h-12 sm:w-16 sm:h-16'
  }

  return (
    <div
      className={`grid gap-2 sm:gap-3 mx-auto justify-center items-center`}
      style={{
        gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
        maxWidth: `${boardSize.cols * (boardSize.cols <= 4 ? 7 : 5)}rem`
      }}
    >
      {tiles.map((tile) => (
        <div key={tile.id} className={getTileSize()}>
          <GameTile
            tile={tile}
            onFlip={onTileFlip}
            disabled={isDisabled}
          />
        </div>
      ))}
    </div>
  )
}