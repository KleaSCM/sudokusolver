

type SudokuBoard = number[][];

const isValid = (board: SudokuBoard, row: number, col: number, num: number): boolean => {
    // Check if `num` is not in the current row
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    // Check if `num` is not in the current column
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }

    // Check if `num` is not in the current 3x3 grid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (board[r][c] === num) return false;
        }
    }

    return true;
};

const findEmptyLocation = (board: SudokuBoard): [number, number] | null => {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) return [r, c];
        }
    }
    return null;
};

const solveSudokuRecursive = (board: SudokuBoard): boolean => {
    const emptyLocation = findEmptyLocation(board);
    if (!emptyLocation) return true; // No empty location means puzzle is solved

    const [row, col] = emptyLocation;

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudokuRecursive(board)) return true;
            board[row][col] = 0; // Backtrack
        }
    }

    return false;
};

export const solveSudoku = (board: SudokuBoard): SudokuBoard | null => {
    const boardCopy = board.map(row => row.slice()); // Create a copy of the board
    const solved = solveSudokuRecursive(boardCopy);
    return solved ? boardCopy : null;
};
