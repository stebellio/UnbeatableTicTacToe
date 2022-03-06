import {Board, Move, Score, Symbol} from "./game";

export let maxDepth = 0;

export class Ai {

    public symbol: Symbol;

    constructor(symbol: Symbol) {
        this.symbol = symbol;
    }

    calculate(grid: string[][]) {
        return this.move(grid);
    }

    public firstMove() {
        return Math.floor(Math.random() * 10);
    }

    protected move(grid: string[][]) {

        // Initial minimum score and move
        let bestScore: Score = Score.MIN;
        let bestMove: Move = {
            x: -1,
            y: -1
        }

        Board.iterateBoard(grid, (square: string, i: number, j: number) => {
            // Empty spot
            if (square === Symbol.EMPTY) {
                grid[i][j] = this.symbol;

                let score = this.minimax(grid, 0, false);

                // Reset
                grid[i][j] = Symbol.EMPTY;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = {
                        x: i,
                        y: j
                    }
                }
            }
        });

        if (bestMove.x === -1 || bestMove.y === -1) {
            throw 'Error';
        }

        return bestMove;

    }

    private minimax(board: string[][], depth: number, isMaximizing: boolean): Score
    {
        maxDepth = Math.max(depth, maxDepth);

        let result = Board.checkWinner(board);
        if (result !== null) {
            return this.getScore(result);
        }

        if (isMaximizing) {
            let bestScore = Score.MIN;

            Board.iterateBoard(board, (square: string, i: number, j: number) => {
                if (square == Symbol.EMPTY) {
                    board[i][j] = this.symbol;
                    let score = this.minimax(board, depth + 1, false);
                    board[i][j] = Symbol.EMPTY;
                    bestScore = Math.max(score, bestScore);
                }
            });

            return bestScore;

        }
        else {

            let bestScore = Score.MAX;

            Board.iterateBoard(board, (square: string, i: number, j: number) => {
                if (square == Symbol.EMPTY) {
                    board[i][j] = this.getOpponentSymbol();
                    let score = this.minimax(board, depth + 1, true);
                    board[i][j] = Symbol.EMPTY;
                    bestScore = Math.min(score, bestScore);
                }
            });

            return bestScore;
        }
    }

    protected getScore(result: string | null)
    {
        switch (result) {
            case this.symbol:
                return Score.WIN
            case 'tie':
                return Score.DRAW;
            case this.getOpponentSymbol():
                return Score.LOSS;
            default:
                return Score.UNDEFINED;
        }
    }

    protected getOpponentSymbol(): Symbol
    {

        if (this.symbol === Symbol.X) {
            return Symbol.O;
        }
        else {
            return Symbol.X;
        }

    }
}