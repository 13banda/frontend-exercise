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
        <button
            onClick={handleClick}
            className={`
              relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl font-bold text-2xl
              transition-all duration-500 transform-gpu perspective-1000
              ${tile.isFlipped
                    ? tile.isMatched
                        ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg scale-105 rotate-y-180'
                        : 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg rotate-y-180'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:scale-105 hover:shadow-lg'
                }
              disabled:cursor-not-allowed
              border-2 border-white/20
            `}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            <div className={`
              absolute inset-0 flex items-center justify-center rounded-xl
              transition-opacity duration-300
              ${tile.isFlipped ? 'opacity-100' : 'opacity-0'}
            `}>
                <img
                    src={`/${PLANT_IMAGES[tile.imageId]}`}
                    alt={`Plant ${tile.imageId + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                />
            </div>
            <div className={`
              absolute inset-0 flex items-center justify-center rounded-xl
              transition-opacity duration-300
              ${tile.isFlipped ? 'opacity-0' : 'opacity-100'}
              bg-gradient-to-br from-green-500 to-emerald-600
            `}>
                <span className="text-white text-2xl font-bold">🌱</span>
            </div>
        </button>
    )
}
