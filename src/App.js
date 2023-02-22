import { useState } from 'react';
import { getLangTicTacToe } from './helpers';
import { langTicTacToe } from './lang';

function Square({ value, onSquareClick }) {
    return (
        <td>
            <button className="square" aria-label="square" onClick={onSquareClick}>
                {value}
            </button>
        </td>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (calculate(squares).winner || squares[i]) return;
        const nextSquares = squares.slice();
        if (xIsNext) nextSquares[i] = 'X';
        else nextSquares[i] = 'O';
        onPlay(nextSquares);
    }

    return (
        <table>
            <tbody>
                <tr>
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                </tr>
                <tr>
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                </tr>
                <tr>
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
                </tr>
            </tbody>
        </table>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const lang = getLangTicTacToe();

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => (
        <li key={move}>
            <button onClick={() => setCurrentMove(move)}>
                {move > 0 ?
                    <><span lang-tag="go_to_move">{langTicTacToe[lang]['go_to_move']}</span>{move}</> :
                    <span lang-tag="go_to_start">{langTicTacToe[lang]['go_to_start']}</span>
                }
            </button>
        </li>
    ));

    const result = calculate(currentSquares);

    return (
        <>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <div className="status">
                    {result.winner ?
                        <><span lang-tag="winner">{langTicTacToe[lang]['winner']}</span>{result.winner}</> :
                        result.draw ? <span lang-tag="draw">{langTicTacToe[lang]['draw']}</span> :
                            <><span lang-tag="next_player">{langTicTacToe[lang]['next_player']}</span>{xIsNext ? 'X' : 'O'}</>
                    }
                </div>
                <ul>{moves}</ul>
            </div>
        </>
    );
}

function calculate(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let draw = true;
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a] };
        }
        if (!squares[a] || !squares[b] || !squares[c]) {
            draw = false;
        }
    }
    return { draw };
}