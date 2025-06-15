import './Board.scss'
import Square from '../Square/Square';
import { useEffect } from 'react';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log("winner is: ", squares[a]);
            return squares[a];
        }
    }
    return null;
}

export default function Board({ xIsNext, squares, onPlay, onWin, onDraw }) {
    const winner = calculateWinner(squares);
    const isBoardFull = squares.every(element => element != null);

    // Play sound effects when game ends
    useEffect(() => {
        if (winner && onWin) {
            // Small delay to let the last move sound finish
            setTimeout(() => {
                onWin();
            }, 300);
        } else if (isBoardFull && !winner && onDraw) {
            // Small delay to let the last move sound finish
            setTimeout(() => {
                onDraw();
            }, 300);
        }
    }, [winner, isBoardFull, onWin, onDraw]);

    let status;

    if (winner) {
        status = "🎉 Winner: " + winner + " 🎉";
    } else if (isBoardFull) {
        status = "🤝 It's a draw! 🤝";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    function handleClick(index) {
        const nextSquares = squares.slice();
        if (squares[index] || calculateWinner(nextSquares)) {
            return;
        }

        if (xIsNext) {
            nextSquares[index] = "X";
        } else {
            nextSquares[index] = "O";
        }
        console.log("index of square is : ", index);
        onPlay(nextSquares);
    }

    return (
        <>
            <div className={`status ${winner ? 'winner' : isBoardFull ? 'draw' : ''}`}>
                {status}
            </div>
            <div className="board">
                <div className="board__row">
                    <Square value={squares[0]} onSquareClick={() => { handleClick(0) }} />
                    <Square value={squares[1]} onSquareClick={() => { handleClick(1) }} />
                    <Square value={squares[2]} onSquareClick={() => { handleClick(2) }} />
                </div>
                <div className="board__row">
                    <Square value={squares[3]} onSquareClick={() => { handleClick(3) }} />
                    <Square value={squares[4]} onSquareClick={() => { handleClick(4) }} />
                    <Square value={squares[5]} onSquareClick={() => { handleClick(5) }} />
                </div>
                <div className="board__row">
                    <Square value={squares[6]} onSquareClick={() => { handleClick(6) }} />
                    <Square value={squares[7]} onSquareClick={() => { handleClick(7) }} />
                    <Square value={squares[8]} onSquareClick={() => { handleClick(8) }} />
                </div>
            </div>
        </>
    )
}
