import { GameStatus } from "../constants/game";

export interface BoardSize {
  rows: number;
  cols: number;
  label: string;
}

export interface GameState {
  board: number[];
  flippedTiles: number[];
  matchedPairs: number[];
  moves: number;
  score: number;
  isGameComplete: boolean;
  timeElapsed: number;
  gameStatus: GameStatus;
  startTime: number;
  endTime?: number;
  playerName: string;
  boardSize: BoardSize;
  tiles: Tile[];
}
export interface Tile {
  id: number;
  imageId: number;
  isFlipped: boolean;
  isMatched: boolean;
}
