import { useState, useCallback, useEffect } from "react";
import { GameState, BoardSize, Tile } from "../types/game";
import { createGameBoard, checkForMatch } from "../utils/gameLogic";

export function useGameState() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const initializeGame = useCallback(
    (playerName: string, boardSize: BoardSize) => {
      const tiles = createGameBoard(boardSize);
      setGameState({
        playerName,
        boardSize,
        tiles,
        flippedTiles: [],
        matchedPairs: [],
        moves: 0,
        startTime: Date.now(),
        gameStatus: "playing",
      });
    },
    []
  );

  const flipTile = useCallback(
    (tileId: number) => {
      if (!gameState || gameState.gameStatus !== "playing") return;

      setGameState((prevState) => {
        if (!prevState) return prevState;

        const tile = prevState.tiles.find((t) => t.id === tileId);
        if (!tile || tile.isFlipped || tile.isMatched) return prevState;

        // Flip the selected tile
        const updatedTiles = prevState.tiles.map((t) =>
          t.id === tileId ? { ...t, isFlipped: true } : t
        );

        const newFlippedTiles = [...prevState.flippedTiles, tileId];

        // If two tiles are flipped, check for match
        if (newFlippedTiles.length === 2) {
          const isMatch = checkForMatch(updatedTiles, newFlippedTiles);

          if (isMatch) {
            const finalTiles = updatedTiles.map((t) =>
              newFlippedTiles.includes(t.id) ? { ...t, isMatched: true } : t
            );

            const newMatchedPairs = [
              ...prevState.matchedPairs,
              ...newFlippedTiles,
            ];
            const gameWon = newMatchedPairs.length === prevState.tiles.length;

            return {
              ...prevState,
              tiles: finalTiles,
              flippedTiles: [],
              matchedPairs: newMatchedPairs,
              moves: prevState.moves + 1,
              gameStatus: gameWon ? "won" : "playing",
              endTime: gameWon ? Date.now() : undefined,
            };
          } else {
            // Temporarily show both, then flip them back
            setTimeout(() => {
              setGameState((current) => {
                if (!current) return current;
                const resetTiles = current.tiles.map((t) =>
                  newFlippedTiles.includes(t.id) && !t.isMatched
                    ? { ...t, isFlipped: false }
                    : t
                );
                return {
                  ...current,
                  tiles: resetTiles,
                  flippedTiles: [],
                };
              });
            }, 1000); // 1s delay so user can see
          }
        }

        return {
          ...prevState,
          tiles: updatedTiles,
          flippedTiles: newFlippedTiles,
          moves: prevState.moves + 1,
        };
      });
    },
    [gameState]
  );

  const resetGame = useCallback(() => {
    setGameState(null);
  }, []);

  return {
    gameState,
    initializeGame,
    flipTile,
    resetGame,
  };
}
