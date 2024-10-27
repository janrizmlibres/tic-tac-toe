import { WINNING_COMBINATIONS } from "./winning-combinations";
import { INITIAL_GAMEBOARD } from "./constants";

export function deriveActivePlayer(gameTurns, symbols) {
  let activePlayer = symbols[0];

  if (gameTurns.length > 0 && gameTurns[0].player === symbols[0]) {
    activePlayer = symbols[1];
  }

  return activePlayer;
}

export function populateGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAMEBOARD.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

export function checkWinner(gameBoard, gameTurns, players) {
  if (gameTurns.length === 9) {
    return "tie";
  }

  for (const combinations of WINNING_COMBINATIONS) {
    const first = gameBoard[combinations[0].row][combinations[0].col];
    const second = gameBoard[combinations[1].row][combinations[1].col];
    const third = gameBoard[combinations[2].row][combinations[2].col];

    if (first && first === second && second === third) {
      return players[first];
    }
  }

  return null;
}
