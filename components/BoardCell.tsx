import Image from "next/image";

const BoardCell = ({
  handleClick,
  rowIndex,
  cellIndex,
  cell,
  isSelected,
  isValidSquare,
  isHighlighted,
}: {
  handleClick: (row: number, col: number) => void;
  rowIndex: number;
  cellIndex: number;
  cell: number;
  isSelected: boolean;
  isValidSquare: boolean;
  isHighlighted: boolean;
}) => {
  return (
    <td
      onClick={() => handleClick(rowIndex, cellIndex)}
      style={{
        minWidth: 50,
        minHeight: 50,
        width: 75,
        height: 75,
      }}
      className={`text-center bg-${
        isSelected
          ? "info"
          : isValidSquare
          ? isHighlighted
            ? "warning"
            : "light"
          : "secondary"
      }`}
      id={`${rowIndex}${cellIndex}`}
    >
      {(cell === 1 || cell === 2 || cell === 11 || cell === 22) && (
        <Image
          width={30}
          height={30}
          alt=""
          src={`/${
            cell === 1
              ? "black-circle"
              : cell === 2
              ? "red-circle"
              : cell === 11
              ? "black-crown"
              : cell === 22 && "red-crown"
          }.png`}
        />
      )}
    </td>
  );
};

export default BoardCell;
