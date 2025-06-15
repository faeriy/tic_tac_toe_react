import "./Game.scss"
import Board from "../Board/Board";
import Logo from "../Logo/Logo";
import { useState } from 'react';
import { useAudio } from '../../hooks/useAudio';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove]
    const xIsNext = currentMove % 2 === 0;

    // Audio functionality
    const {
        isMusicPlaying,
        isSoundEnabled,
        toggleBackgroundMusic,
        toggleSoundEffects,
        playMoveSound,
        playWinSound,
        playDrawSound
    } = useAudio();

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        
        // Play move sound
        playMoveSound();
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    // Map the history and create an Array of list button items
    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button className="game__button" onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="game">
            <Logo />
            <div className="game__content">
                <div className="game__board">
                    <Board 
                        xIsNext={xIsNext} 
                        squares={currentSquares} 
                        onPlay={handlePlay}
                        onWin={playWinSound}
                        onDraw={playDrawSound}
                    />
                </div>
                <div className="game__info">
                    <div className="game__audio-controls">
                        <button 
                            className={`game__audio-button ${isMusicPlaying ? 'active' : ''}`}
                            onClick={toggleBackgroundMusic}
                            title="Toggle background music"
                        >
                            🎵 {isMusicPlaying ? 'ON' : 'OFF'}
                        </button>
                        <button 
                            className={`game__audio-button ${isSoundEnabled ? 'active' : ''}`}
                            onClick={toggleSoundEffects}
                            title="Toggle sound effects"
                        >
                            🔊 {isSoundEnabled ? 'ON' : 'OFF'}
                        </button>
                    </div>
                    <div className="game__moves-header">Game History</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}