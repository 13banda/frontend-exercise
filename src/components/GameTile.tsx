import React from 'react'
import { Tile } from '../types/game'
import { PLANT_IMAGES } from '../utils/gameLogic'

interface GameTileProps {
  tile: Tile
  onFlip: (tileId: number) => void
  disabled?: boolean
}

export function GameTile({ tile, onFlip, disabled = false }: GameTileProps) {
  const handleClick = () => {
    if (!disabled && !tile.isFlipped && !tile.isMatched) {
      onFlip(tile.id)
    }
  }

  return (
    <div
      className={`
        relative aspect-square cursor-pointer transition-all duration-300 transform hover:scale-105
        ${disabled ? 'cursor-not-allowed' : ''}
        ${tile.isMatched ? 'opacity-75' : ''}
      `}
      onClick={handleClick}
    >
      <div
        className={`
          absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d
          ${tile.isFlipped || tile.isMatched ? 'rotate-y-180' : ''}
        `}
      >
        {/* Back side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg shadow-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-2">
          <img
            src="/growy_logo.svg"
            alt="Growy Logo"
            className="w-full h-full object-contain filter brightness-0 invert"
          />
        </div>
        
        {/* Front side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg shadow-lg overflow-hidden">
          <img
            src={`/${PLANT_IMAGES[tile.imageId]}`}
            alt={`Plant ${tile.imageId + 1}`}
            className="w-full h-full object-cover"
          />
          {tile.isMatched && (
            <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}