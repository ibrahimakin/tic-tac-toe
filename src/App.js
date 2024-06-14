import { useState } from 'react';
import { lang_xox, getLangXOX } from './lang';

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
    const lang = getLangXOX();

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const moves = history.map((squares, move) => (
        <div key={move}>
            <button disabled={move === currentMove} onClick={() => setCurrentMove(move)}>
                {move === currentMove ? move > 0 ?
                    <><span lang-tag="move">{lang_xox[lang]['move']}</span>{move}</> : history.length > 1 &&
                    <span lang-tag="start">{lang_xox[lang]['start']}</span> : move > 0 ?
                    <><span lang-tag="go_to_move">{lang_xox[lang]['go_to_move']}</span>{move}</> :
                    <span lang-tag="go_to_start">{lang_xox[lang]['go_to_start']}</span>
                }
            </button>
        </div>
    ));

    const result = calculate(currentSquares);

    return (
        <>
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <div className="status">
                    <span lang-tag={result.status}>{lang_xox[lang][result.status]}</span>{result.winner || <span>{xIsNext ? 'X' : 'O'}</span>}
                </div>
                {moves}
            </div>
        </>
    );
}

function calculate(squares) {
    const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    let status = 'draw', winner = ' ';
    if (!squares.includes('X')) return { status: 'first_player' };
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { status: 'winner', winner: squares[a] };
        }
        if (!squares[a] || !squares[b] || !squares[c]) {
            status = 'next_player';
            winner = null;
        }
    }
    return { status, winner };
}