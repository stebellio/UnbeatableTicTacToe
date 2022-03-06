import {Ai, maxDepth} from "./ai";
import {renderMove} from "./index";
import {futimes} from "fs";

export enum Symbol {
    X = 'X',
    O = 'O',
    EMPTY = ''
}
export enum Score {
    MIN = -Infinity,
    UNDEFINED = -1,
    LOSS = 0,
    DRAW = 1,
    WIN = 2,
    MAX = Infinity
}
export type Move = {
    x: number,
    y: number
}

const positions = {
    1: {
        x: 0,
        y: 0
    },
    2: {
        x: 0,
        y: 1
    },
    3: {
        x: 0,
        y: 2
    },
    4: {
        x: 1,
        y: 0
    },
    5: {
        x: 1,
        y: 1
    },
    6: {
        x: 1,
        y: 2
    },
    7: {
        x: 2,
        y: 0
    },
    8: {
        x: 2,
        y: 1
    },
    9: {
        x: 2,
        y: 2
    }
}

export class Board {
    private _human: Symbol;
    private readonly _ai: Ai;
    protected grid: string[][];

    constructor() {
        this._ai = new Ai(Symbol.O);
        this._human = Symbol.X;
        this.grid =  [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    get human(): Symbol {
        return this._human;
    }

    set human(value: Symbol) {
        this._human = value;
    }

    public update(index: number, symbol: Symbol) {
        this.writeGrid(index, symbol);
        let winner: string | null = Board.checkWinner(this.grid);

        if (winner !== null) {
            return Board.won(winner);
        }

        let aiMove: Move = this._ai.calculate(this.grid);
        console.log(maxDepth);
        this.grid[aiMove.x][aiMove.y] = this._ai.symbol;

        let aiPosition: number = 0;

        for (const [key, value] of Object.entries(positions)) {
            if (value.x === aiMove.x && value.y === aiMove.y) {
                aiPosition = Number.parseInt(key);
            }
        }

        setTimeout(() => {
            renderMove(aiPosition, this._ai.symbol);
        }, 300)

        winner = Board.checkWinner(this.grid);

        if (winner !== null) {
            return Board.won(winner);
        }
    }

    protected writeGrid(index: number, symbol: Symbol) {
        // @ts-ignore
        let position = positions[index];
        this.grid[position.x][position.y] = symbol;
    }

    public static checkWinner(grid: string[][]) {

        let winner = null;

        // Check rows
        for (let i = 0; i < 2; i++) {

            let row = grid[i];

            if (row[0] === '') {
                continue;
            }

            if (row[0] === row[1] && row[1] === row[2] && row[0]) {
                winner = row[0];
                break
            }
        }

        if (winner !== null) {
            return winner;
        }

        // Check columns
        for (let i = 0; i < 2; i++) {

            if (grid[0][i] === '') {
                continue;
            }

            if (
                grid[0][i] == grid[1][i] &&
                grid[1][i] == grid[2][i]
            ) {
                winner = grid[0][i];
                break;
            }

        }

        if (winner !== null) {
            return winner;
        }

        // Check diagonals
        if (
            grid[0][0] === grid[1][1] &&
            grid[1][1] === grid[2][2] &&
            grid[0][0] !== Symbol.EMPTY
        ) {
            winner = grid[0][0];
        }

        if (
            grid[0][2] === grid[1][1] &&
            grid[1][1] === grid[2][0] &&
            grid[0][2] !== Symbol.EMPTY
        ) {
            winner = grid[0][2];
        }

        if (winner !== null) {
            return winner;
        }

        // Check if all spots are taken
        let noSpots = true;
        grid.forEach((row: string[]) => {
            row.forEach((col: string) => {
                if (col === Symbol.EMPTY) {
                    noSpots = false;
                }
            })
        })


        if (noSpots) {
            winner = 'tie';
        }

        return winner;
    }

    private static won(winner: string|null) {

        let msg = `${winner} won!`;

        if (winner === 'tie') {
            msg = 'It\'s a draw! ';
        }

        if (window.confirm(msg + ' Do you want to play again?')) {
            return window.location.reload();
        }

        throw 'end';
    }

    get ai(): Ai {
        return this._ai;
    }

    public static iterateBoard(grid: string[][], callback: Function) {

        grid.map((row: string[], i: number) => {
            row.map((col: string, j: number) => {
                callback(col, i, j);
            })
        })

    }
}

// ========================================


export const board = new Board();