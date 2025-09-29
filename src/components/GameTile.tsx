import React from 'react';
import { Tile } from '../types/game';
import { PLANT_IMAGES } from '../utils/gameLogic';

interface GameTileProps {
    tile: Tile;
    onFlip: (tileId: number) => void;
    disabled?: boolean;
}

interface TileFaceProps {
    children: React.ReactNode;
    flipped?: boolean;
    rotateY?: number;
    className?: string;
}

export const TileFace: React.FC<TileFaceProps> = ({
    children,
    rotateY = 0,
    className = '',
}) => {
    return (
        <div
            className={`absolute inset-0 rounded-xl flex items-center justify-center ${className}`}
            style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${rotateY}deg)`,
            }}
        >
            {children}
        </div>
    );
};

export function GameTile({ tile, onFlip, disabled = false }: GameTileProps) {
    const handleClick = () => {
        if (!disabled && !tile.isFlipped && !tile.isMatched) {
            onFlip(tile.id);
        }
    };

    return (
        <div
            className="w-16 h-16 sm:w-20 sm:h-20 perspective-1000"
            onClick={handleClick}
        >
            <div
                className={`relative w-full h-full rounded-xl transition-transform duration-500 transform`}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: tile.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                <TileFace rotateY={0} className="bg-gradient-to-br from-green-500 to-emerald-600">
                    <img
                        src="/growy_logo.svg"
                        alt="Growy Logo"
                        className="w-2/3 h-2/3 object-contain"
                    />
                </TileFace>

                <TileFace rotateY={180}>
                    <img
                        src={`/${PLANT_IMAGES[tile.imageId]}`}
                        alt={`Plant ${tile.imageId + 1}`}
                        className="w-full h-full object-cover rounded-xl"
                    />
                </TileFace>
            </div>
        </div>
    );
}
