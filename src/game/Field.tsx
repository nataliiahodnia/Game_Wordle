import { range } from "../util/array";
import { Keyboard } from "./Keyboard";
import { useState } from "react";

const WORD_LENGTH = 5;
const ROWS = 6;

type CellState = {
  letter: string;
  variant?: "correct" | "semi-correct" | "incorrect";
};

type board = CellState[][];

const getEmptyCell = () => ({
  letter: "",
});

const getEmptyBoard = () =>
  range(ROWS).map(() => range(WORD_LENGTH).map
  (getEmptyCell));

export const Field = () => {
  const [board, setBoard] = useState<Board>(getEmptyBoard());

  const handleBackspace = () => {
    console.log("bsp");
  };

  const handlePressed = (letter) => {
    console.log(letter);
  };

  console.log(board);

  return (
    <>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, index) => (
              <div className={`cell ${cell.variant}`} key={index}>
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Keyboard onPressed={handlePressed} onBackspace={handleBackspace} />
    </>
  );
};
