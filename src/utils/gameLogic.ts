import { BoardSize, Tile } from '../types/game'

export const BOARD_SIZES: BoardSize[] = [
  { rows: 2, cols: 2, label: '2x2 (Easy)' },
  { rows: 3, cols: 4, label: '3x4 (Medium)' },
  { rows: 4, cols: 5, label: '4x5 (Hard)' },
  { rows: 6, cols: 6, label: '6x6 (Expert)' }
]

export const PLANT_IMAGES = Array.from(
  { length: 18 },
  (_, i) => `plant${String(i + 1).padStart(2, "0")}.jpg`
);

export function createGameBoard(boardSize: BoardSize): Tile[] {
  const totalTiles = boardSize.rows * boardSize.cols
  const pairsNeeded = totalTiles / 2

  // Select random plant images for this game
  const selectedImages = PLANT_IMAGES.slice(0, pairsNeeded)

  // Create pairs of tiles
  const tiles: Tile[] = []
  selectedImages.forEach((_, imageId) => {
    // Add two tiles for each image (a pair)
    tiles.push(
      { id: tiles.length, imageId, isFlipped: false, isMatched: false },
      { id: tiles.length + 1, imageId, isFlipped: false, isMatched: false }
    )
  })

  // Shuffle the tiles
  return shuffleArray(tiles)
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function checkForMatch(tiles: Tile[], flippedTileIds: number[]): boolean {
  if (flippedTileIds.length !== 2) return false

  const [firstTile, secondTile] = flippedTileIds.map(id => tiles.find(tile => tile.id === id)!)
  return firstTile.imageId === secondTile.imageId
}
