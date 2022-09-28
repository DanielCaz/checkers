import { useState } from "react";
import BoardCell from "./BoardCell";

const Board = () => {
  const [board, setBoard] = useState<Array<Array<number>>>([
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
  ]);
  const [turn, setTurn] = useState<number>(2);
  const [selected, setSelected] = useState<number[]>([]);
  const [pointsRed, setPointsRed] = useState(0);
  const [pointsBlack, setPointsBlack] = useState(0);

  let jumped = false;

  const handleClick = (row: number, col: number) => {
    if (isGameOver()) return;

    if (selected.length === 0) {
      if (board[row][col] === turn || board[row][col] === turn * 11) {
        setSelected([row, col]);
      }
      return;
    }

    if (!isValidMove(row, col)) {
      setSelected([]);
      return;
    }

    const [prevRow, prevCol] = selected;
    if (board[row][col] === 0) {
      const newBoard = [...board];
      newBoard[row][col] = board[prevRow][prevCol];
      newBoard[prevRow][prevCol] = 0;
      setBoard(newBoard);

      if (!jumped) {
        setTurn(turn === 1 ? 2 : 1);
      }
    }
    setSelected([]);
  };

  const isValidMove = (row: number, col: number): boolean => {
    if (!isValidSquare(row, col)) {
      return false;
    }

    if (!isAdjacent(row, col)) {
      return false;
    }

    return true;
  };

  const isAdjacent = (row: number, col: number): boolean => {
    const [prevRow, prevCol] = selected;
    const rowDiff = row - prevRow;
    const colDiff = col - prevCol;

    if (board[prevRow][prevCol] < 10) {
      if ((turn === 2 && rowDiff > 0) || (turn === 1 && rowDiff < 0)) {
        return false;
      }
    }

    if (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 1) {
      return true;
    }

    if (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 2) {
      const rowMid = (row + prevRow) / 2;
      const colMid = (col + prevCol) / 2;
      if (board[rowMid][colMid] !== 0 && board[rowMid][colMid] !== turn) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[rowMid][colMid] = 0;
          return newBoard;
        });
        jumped = true;
        if (turn === 2) {
          setPointsRed(pointsRed + 1);
        } else {
          setPointsBlack(pointsBlack + 1);
        }
        return true;
      }
    }

    return false;
  };

  const isValidSquare = (row: number, col: number): boolean => {
    return row % 2 !== 0 ? col % 2 === 0 : col % 2 !== 0;
  };

  const isGameOver = (): boolean => {
    return pointsRed === 12 || pointsBlack === 12;
  };

  return (
    <div className="mx-auto table-responsive" style={{ maxWidth: 600 }}>
      <table className="table table caption-top">
        <caption>
          <p>
            Turn:{" "}
            <span className={`text-${turn === 1 ? "dark" : "danger"}`}>
              {turn === 1 ? "Black" : "Red"}
            </span>
          </p>
          <p>
            Red: <span className="text-danger">{pointsRed}</span> - Red:{" "}
            <span className="text-dark">{pointsBlack}</span>
          </p>
          {isGameOver() && (
            <div
              className={`alert alert-${
                pointsRed === 12 ? "success" : "danger"
              }`}
              role="alert"
            >
              {pointsRed === 12 ? "Red" : "Black"} wins!
            </div>
          )}
          <hr />
        </caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">A</th>
            <th scope="col">B</th>
            <th scope="col">C</th>
            <th scope="col">D</th>
            <th scope="col">E</th>
            <th scope="col">F</th>
            <th scope="col">G</th>
            <th scope="col">H</th>
          </tr>
        </thead>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <th scope="row">{rowIndex + 1}</th>
              {row.map((cell, cellIndex) => (
                <BoardCell
                  key={cellIndex}
                  cell={cell}
                  isSelected={
                    selected.length > 0 &&
                    selected[0] === rowIndex &&
                    selected[1] === cellIndex
                  }
                  rowIndex={rowIndex}
                  cellIndex={cellIndex}
                  handleClick={handleClick}
                  isValidSquare={isValidSquare(rowIndex, cellIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
