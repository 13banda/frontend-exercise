export interface BoardSize {
  rows: number;
  cols: number;
  label: string;
}

export interface GameState {
  board: number[];
  flippedCards: number[];
  matchedCards: number[];
  moves: number;
  score: number;
  isGameComplete: boolean;
  timeElapsed: number;
  gameStatus: 'playing' | 'won' | 'lost';
  startTime: number;
  endTime?: number;
  playerName: string;
  boardSize: BoardSize;
  difficulty: string;
  tiles: number[];
}
export interface Tile {
  id: number
  imageId: number
  isFlipped: boolean
  isMatched: boolean
}
export type Difficulty = 'easy' | 'medium' | 'hard';