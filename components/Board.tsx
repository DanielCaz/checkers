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
  const [pointsRed, setPointsRed] = useState(0);
  const [pointsBlack, setPointsBlack] = useState(0);
  const [capturedRed, setCapturedRed] = useState(0);
  const [capturedBlack, setCapturedBlack] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [nextJumps, setNextJumps] = useState<number[][]>([]);

  let jumped = false;

  const getValidMoves = (row: number, col: number) => {
    const validMoves: number[][] = [];
    const validJumps: number[][] = [];
    const piece = board[row][col];

    if (piece === 11 || piece === 22) {
      if (row > 0 && col > 0) {
        if (board[row - 1][col - 1] === 0) {
          validMoves.push([row - 1, col - 1]);
        } else if (
          (board[row - 1][col - 1] === 1 || board[row - 1][col - 1] === 11) &&
          row > 1 &&
          col > 1 &&
          board[row - 2][col - 2] === 0
        ) {
          validJumps.push([row - 2, col - 2]);
        }
      }
      if (row > 0 && col < 7) {
        if (board[row - 1][col + 1] === 0) {
          validMoves.push([row - 1, col + 1]);
        } else if (
          (board[row - 1][col + 1] === 1 || board[row - 1][col + 1] === 11) &&
          row > 1 &&
          col < 6 &&
          board[row - 2][col + 2] === 0
        ) {
          validJumps.push([row - 2, col + 2]);
        }
      }
      if (row < 7 && col > 0) {
        if (board[row + 1][col - 1] === 0) {
          validMoves.push([row + 1, col - 1]);
        } else if (
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 22) &&
          row < 6 &&
          col > 1 &&
          board[row + 2][col - 2] === 0
        ) {
          validJumps.push([row + 2, col - 2]);
        }
      }
      if (row < 7 && col < 7) {
        if (board[row + 1][col + 1] === 0) {
          validMoves.push([row + 1, col + 1]);
        } else if (
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 22) &&
          row < 6 &&
          col < 6 &&
          board[row + 2][col + 2] === 0
        ) {
          validJumps.push([row + 2, col + 2]);
        }
      }
    } else {
      if (piece === 2) {
        if (row > 0 && col > 0) {
          if (board[row - 1][col - 1] === 0) {
            validMoves.push([row - 1, col - 1]);
          } else if (
            (board[row - 1][col - 1] === 1 || board[row - 1][col - 1] === 11) &&
            row > 1 &&
            col > 1 &&
            board[row - 2][col - 2] === 0
          ) {
            validJumps.push([row - 2, col - 2]);
          }
        }
        if (row > 0 && col < 7) {
          if (board[row - 1][col + 1] === 0) {
            validMoves.push([row - 1, col + 1]);
          } else if (
            (board[row - 1][col + 1] === 1 || board[row - 1][col + 1] === 11) &&
            row > 1 &&
            col < 6 &&
            board[row - 2][col + 2] === 0
          ) {
            validJumps.push([row - 2, col + 2]);
          }
        }
      } else {
        if (row < 7 && col > 0) {
          if (board[row + 1][col - 1] === 0) {
            validMoves.push([row + 1, col - 1]);
          } else if (
            (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 22) &&
            row < 6 &&
            col > 1 &&
            board[row + 2][col - 2] === 0
          ) {
            validJumps.push([row + 2, col - 2]);
          }
        }
        if (row < 7 && col < 7) {
          if (board[row + 1][col + 1] === 0) {
            validMoves.push([row + 1, col + 1]);
          } else if (
            (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 22) &&
            row < 6 &&
            col < 6 &&
            board[row + 2][col + 2] === 0
          ) {
            validJumps.push([row + 2, col + 2]);
          }
        }
      }
    }

    console.log(validJumps);

    return { validMoves, validJumps };
  };

  const getJumpedOver = (row: number, col: number) => {
    if (turn === 2 || turn === 22) {
      if (row > 1 && col > 1 && board[row - 1][col - 1] !== 0) {
        if (
          (board[row - 1][col - 1] === 1 || board[row - 1][col - 1] === 11) &&
          board[row - 2][col - 2] === 0
        ) {
          return true;
        }
      }
      if (row > 1 && col < 6 && board[row - 1][col + 1] !== 0) {
        if (
          (board[row - 1][col + 1] === 1 || board[row - 1][col + 1] === 11) &&
          board[row - 2][col + 2] === 0
        ) {
          return true;
        }
      }
    } else {
      if (row < 6 && col > 1 && board[row + 1][col - 1] !== 0) {
        if (
          (board[row + 1][col - 1] === 2 || board[row + 1][col - 1] === 22) &&
          board[row + 2][col - 2] === 0
        ) {
          return true;
        }
      }
      if (row < 6 && col < 6 && board[row + 1][col + 1] !== 0) {
        if (
          (board[row + 1][col + 1] === 2 || board[row + 1][col + 1] === 22) &&
          board[row + 2][col + 2] === 0
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const handleClick = (row: number, col: number) => {
    if (isGameOver()) return;

    if (nextJumps.length > 0) {
      let validJump = false;
      nextJumps.forEach((val) => {
        if (val[0] === row && val[1] === col) {
          validJump = true;
          setNextJumps([]);
          return;
        }
      });

      if (!validJump) return;
    }

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
      if (turn === 1 && row === 7) {
        newBoard[row][col] = 11;
      } else if (turn === 2 && row === 0) {
        newBoard[row][col] = 22;
      }
      if (!jumped) {
        setTurn(turn === 1 ? 2 : 1);
      } else {
        const { validJumps } = getValidMoves(row, col);
        if (validJumps.length > 0) {
          setNextJumps(validJumps);
          setSelected([row, col]);
          return;
        } else {
          setTurn(turn === 1 ? 2 : 1);
        }
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
      const piece = board[rowMid][colMid];
      if (piece !== 0 && piece !== turn) {
        setBoard((prevBoard) => {
          const newBoard = [...prevBoard];
          newBoard[rowMid][colMid] = 0;
          return newBoard;
        });
        jumped = true;
        if (turn === 22) {
          setPointsRed(pointsRed + 2);
          setCapturedBlack(capturedBlack + 1);
        } else if (turn === 11) {
          setPointsBlack(pointsBlack + 2);
          setCapturedRed(capturedRed + 1);
        } else if (turn === 2) {
          setPointsRed(pointsRed + 1);
          setCapturedBlack(capturedBlack + 1);
        } else {
          setPointsBlack(pointsBlack + 1);
          setCapturedRed(capturedRed + 1);
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
    return capturedRed === 12 || capturedBlack === 12;
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
            Red: <span className="text-danger">{pointsRed}</span> - Black:{" "}
            <span className="text-dark">{pointsBlack}</span>
          </p>
          {isGameOver() && (
            <div
              className={`alert alert-${
                capturedBlack === 12 ? "success" : "danger"
              }`}
              role="alert"
            >
              {capturedBlack === 12 ? "Red" : "Black"} wins!
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
