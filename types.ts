export type SudokuBoard = number[][];
export type SudokuCell = {
  value: number;
  isFixed: boolean; // Determines if the initial value is fixed
};
