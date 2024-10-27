import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "O";

  if (!gameTurns.length || gameTurns[0].player === "O") {
    activePlayer = "X";
  }

  return activePlayer;
}

function populateGameBoard(gameTurns) {
  const board = [...INITIAL_GAMEBOARD.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  return board;
}

function checkWinner(gameBoard, gameTurns) {
  if (gameTurns.length === 9) {
    return "tie";
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const first = gameBoard[combinations[0].row][combinations[0].col];
    const second = gameBoard[combinations[1].row][combinations[1].col];
    const third = gameBoard[combinations[2].row][combinations[2].col];

    if (first && first === second && second === third) {
      return first;
    }
  }

  return null;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = populateGameBoard(gameTurns);
  const winner = checkWinner(gameBoard, gameTurns);

  function handleCellClick(row, col) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row, col }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleReset() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {winner && <GameOver winner={winner} onRematchClick={handleReset} />}
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
