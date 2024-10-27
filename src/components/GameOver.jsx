export default function GameOver({ winner, onRematchClick }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner === "tie" ? "It's a draw!" : `${winner} won!`}</p>
      <p>
        <button onClick={onRematchClick}>Rematch!</button>
      </p>
    </div>
  );
}
