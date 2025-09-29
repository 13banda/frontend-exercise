import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StartPage } from './pages/StartPage';
import { GamePage } from './pages/GamePage';
import { EndPage } from './pages/EndPage';
import { useGameState } from './hooks/useGameState';
import { BoardSize } from './types/game';

function App() {
  const { gameState, initializeGame, flipTile, resetGame, clearGame } = useGameState();

  const handleStartGame = (playerName: string, boardSize: BoardSize, difficulty: string) => {
    initializeGame(playerName, boardSize, difficulty);
  };

  const handleGameEnd = () => {
    // Game end logic is handled in the GamePage component
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleNewGame = () => {
    clearGame();
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<StartPage onStartGame={handleStartGame} />} 
        />
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
            gameState && gameState.gameStatus === 'won' ? (
              <EndPage 
                gameState={gameState} 
                onPlayAgain={handlePlayAgain} 
                onNewGame={handleNewGame} 
              />
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