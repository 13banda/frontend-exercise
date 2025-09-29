import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";
import { EndPage } from "./pages/EndPage";
import { useGameState } from "./hooks/useGameState";
import { BoardSize } from "./types/game";
import { GameStatus } from "./constants/game";

function App() {
  const { gameState, initializeGame, flipTile, resetGame } = useGameState();

  const handleStartGame = (playerName: string, boardSize: BoardSize) => {
    initializeGame(playerName, boardSize);
  };

  const handleGameEnd = () => {
    // call anything after game end
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage onStartGame={handleStartGame} />} />
        <Route
          path="/game"
          element={
            gameState ? (
              <GamePage
                gameState={gameState}
                onTileFlip={flipTile}
                onGameEnd={handleGameEnd}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/end"
          element={
            gameState && gameState.gameStatus === GameStatus.Won ? (
              <EndPage gameState={gameState} onPlayAgain={handlePlayAgain} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
