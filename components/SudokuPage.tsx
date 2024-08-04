

import React, { useState } from 'react';
import styles from '../styles/SudokuPage.module.scss'; 
import { solveSudoku } from '../utils/sudokuSolver';
import { SudokuBoard } from '../types';

const initialBoard: SudokuBoard = Array(9).fill(null).map(() => Array(9).fill(0));

const SudokuPage: React.FC = () => {
    const [board, setBoard] = useState<SudokuBoard>(initialBoard);
    const [error, setError] = useState<string | null>(null);
    const [isSolving, setIsSolving] = useState<boolean>(false);

    const handleCellChange = (row: number, col: number, value: number) => {
        const newBoard = board.map(row => row.slice()) as SudokuBoard;
        newBoard[row][col] = value;
        setBoard(newBoard);
    };

    const handleSolve = async () => {
        setIsSolving(true);
        try {
            const solvedBoard = solveSudoku(board);
            if (solvedBoard) {
                setBoard(solvedBoard);
            } else {
                setError('No solution found');
            }
        } catch (err) {
            setError('An error occurred while solving');
        }
        setIsSolving(false);
    };

    const handleReset = () => {
        setBoard(initialBoard);
        setError(null);
    };

    return (
        <div className={styles.sudokuContainer}>
            {isSolving && <div className={styles.loading}>Solving...</div>}
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.grid}>
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            type="number"
                            min="1"
                            max="9"
                            value={cell === 0 ? '' : cell}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, parseInt(e.target.value) || 0)}
                            className={styles.cell}
                        />
                    ))
                )}
            </div>
            <button onClick={handleSolve} className={styles.button}>Solve</button>
            <button onClick={handleReset} className={styles.button}>Reset</button>
        </div>
    );
};

export default SudokuPage;

