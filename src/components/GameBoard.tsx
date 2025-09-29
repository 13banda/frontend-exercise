import React from 'react';
import { GameState } from '../types/game';
import { PLANT_IMAGES } from '../utils/gameLogic';
import { GameTile } from './GameTile';

interface GameBoardProps {
  gameState: GameState;
  onTileFlip: (tileId: number) => void;
}

export function GameBoard({ gameState, onTileFlip }: GameBoardProps) {
  const { tiles, boardSize, flippedTiles } = gameState
  const isDisabled = flippedTiles.length >= 2

  // Calculate optimal tile size and gap based on board dimensions
  const getBoardConfig = () => {
    const totalTiles = boardSize.rows * boardSize.cols
    const maxDimension = Math.max(boardSize.rows, boardSize.cols)

    if (totalTiles <= 4) {
      return { tileSize: 'w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32', gap: 'gap-4', maxWidth: '20rem' }
    } else if (totalTiles <= 12) {
      return { tileSize: 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28', gap: 'gap-3', maxWidth: '28rem' }
    } else if (totalTiles <= 20) {
      return { tileSize: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24', gap: 'gap-3', maxWidth: '32rem' }
    } else {
      return { tileSize: 'w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20', gap: 'gap-2', maxWidth: '36rem' }
    }
  }

  const { tileSize, gap, maxWidth } = getBoardConfig()


  return (
    <div className="p-6">
      <div
        className="grid gap-3 mx-auto max-w-fit"
        style={{
          gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${boardSize.rows}, minmax(0, 1fr))`
        }}
      >
        {tiles.map((tile) => (
          <div key={tile.id} className={tileSize}>
            <GameTile
              tile={tile}
              onFlip={onTileFlip}
              disabled={isDisabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
}