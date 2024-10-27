export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        const { square, player } = turn;
        return (
          <li key={`${square.row}${square.col}`}>
            {player} selected {square.row},{square.col}
          </li>
        );
      })}
    </ol>
  );
}
