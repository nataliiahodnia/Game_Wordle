import { range } from "../util/array";
import { Keyboard } from "./Keyboard";
import { useEffect, useState, useMemo } from "react";

const WORD_LENGTH = 5;
const ROWS = 6;

type CellState = {
  letter: string;
  variant?: "correct" | "semi-correct" | "incorrect";
};

type Board = CellState[][];

const deepCopyBoard = (board: Board): Board =>
  JSON.parse(JSON.stringify(board));

const getPrevCell = (board: Board): CellState | undefined => {
  const flatArray = board.flat();
  const nextEmptyIndex = flatArray.findIndex((el) => el.letter === "");
  return nextEmptyIndex > 0 ? flatArray[nextEmptyIndex - 1] : undefined;
};

const getEmptyCell = () => ({
  letter: "",
});

const getEmptyBoard = () =>
  range(ROWS).map(() => range(WORD_LENGTH).map(getEmptyCell));

export const Field = () => {
  const [board, setBoard] = useState<Board>(getEmptyBoard());

  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === "Backspace") {
        handleBackspace();
      }
      if (e.keyCode >= 65 && e.keyCode <= 98) {
        handleBackspace(e.key);
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.removeEventListener("keydown", onKeydown);
    };
  }, [board]);

  const currentWord = useMemo(()=>{
    const prevCell = getPrevCell(board)
    console.log(prevCell)
    return "";
    
  }, [board])

  const handleBackspace = () => {
    setBoard((prev) => {
      const nextBoard = deepCopyBoard(prev);
      const prevCell = getPrevCell(board);
      if (prevCell) {
        prevCell.letter = "";
      }
      return nextBoard;
    });
  };

  const handlePressed = (letter) => {
    setBoard((prev) => {
      const nextState = deepCopyBoard(prev);

      const nextEmptyCell = nextState.flat().find((el) => el.letter === "");
      if (nextEmptyCell) {
        nextEmptyCell.letter = letter;
      }
      nextEmptyCell.letter;
      return nextState;
    });
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
