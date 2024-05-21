const rows = ["loikjuhgwersdf", "bogkfvjkfgv", "mgjfhndb"];

const buttons = rows.map((row) => row.split(""));

export const Keyboard = ({ onBackspace, onPressed }) => (
  <div className="keyboard">
    <div>
      {buttons.map((row, index) => (
        <div key={index}>
          {row.map((letter) => (
            <button onClick={() => onPressed(letter)} key={letter}>
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
    <div>
      <button onClick={() => onBackspace()}>Backspace</button>
    </div>
  </div>
);
