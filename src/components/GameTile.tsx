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
        relative aspect-square cursor-pointer transition-all duration-300 group
        ${disabled ? 'cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${tile.isMatched ? 'opacity-90' : ''}
      `}
      onClick={handleClick}
    >
      <div
        className={`
          absolute inset-0 w-full h-full transition-transform duration-700 transform-style-preserve-3d
          ${tile.isFlipped || tile.isMatched ? 'rotate-y-180' : ''}
        `}
      >
        {/* Back side - Growy Logo */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center border-2 border-white/20 group-hover:shadow-xl transition-shadow duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <img
              src="/growy_logo.svg"
              alt="Growy Logo"
              className="w-8 h-8 object-contain filter brightness-0 invert drop-shadow-sm"
            />
          </div>
        </div>
        
        {/* Front side - Plant Image */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg overflow-hidden border-2 border-white/20">
          <img
            src={`/${PLANT_IMAGES[tile.imageId]}`}
            alt={`Plant ${tile.imageId + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {tile.isMatched && (
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
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