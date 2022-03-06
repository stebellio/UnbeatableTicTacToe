import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './game';
import {board, Symbol} from "./game";

export const renderMove = (index, symbol) => {
    const el = document.getElementById(index);
    el.innerHTML = symbol;

    if (symbol === Symbol.O) {
        el.classList.add('ai');
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button
                id={this.props.id}
                className="square"
                onClick={
                    () => {
                        if (document.getElementById(this.props.id).textContent === '') {
                            renderMove(this.props.id, board.human);
                            board.update(Number.parseInt(this.props.id), board.human);
                        }
                    }
                }>
            </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square id={i}/>;
    }

    render() {
        return (
            <div>
                <div className="status">
                    Human start with X
                </div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);