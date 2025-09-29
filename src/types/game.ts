export interface GameState {
  playerName: string
  boardSize: BoardSize
  tiles: Tile[]
  flippedTiles: number[]
  matchedPairs: number[]
  moves: number
  startTime: number
  endTime?: number
  gameStatus: 'playing' | 'won'
}

export interface Tile {
  id: number
  imageId: number
  isFlipped: boolean
  isMatched: boolean
}

export interface BoardSize {
  rows: number
  cols: number
  label: string
}

export interface GameResult {
  playerName: string
  time: number
  moves: number
  boardSize: string
}