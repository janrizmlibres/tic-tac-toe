import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { PLAYERS } from "./constants";
import { deriveActivePlayer, populateGameBoard, checkWinner } from "./helpers";

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const symbols = Object.keys(players);
  const activePlayer = deriveActivePlayer(gameTurns, symbols);
  const gameBoard = populateGameBoard(gameTurns);
  const winner = checkWinner(gameBoard, gameTurns, players);

  function handleCellClick(row, col) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns, symbols);

      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => ({
      ...prevPlayers,
      [symbol]: newName,
    }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {symbols.map((symbol) => (
            <Player
              key={symbol}
              name={players[symbol]}
              symbol={symbol}
              isActive={activePlayer === symbol}
              onChangeName={handlePlayerNameChange}
            />
          ))}
        </ol>
        {winner && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard
          board={gameBoard}
          hasWinner={!!winner}
          onCellClick={handleCellClick}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
