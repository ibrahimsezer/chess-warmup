import React, { useState, useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';

export default function OpeningSimulation({ pgn, orientation = 'white' }) {
    const [game, setGame] = useState(new Chess());
    const [moveIndex, setMoveIndex] = useState(0); // 0 = start position
    const [isPlaying, setIsPlaying] = useState(false);
    const [history, setHistory] = useState([]); // Array of move objects or FENs

    // Initialize game and history when PGN changes
    useEffect(() => {
        try {
            const tempGame = new Chess();
            tempGame.loadPgn(pgn);
            const historyMoves = tempGame.history({ verbose: true });
            setHistory(historyMoves);

            // Reset current game to start
            const newGame = new Chess();
            setGame(newGame);
            setMoveIndex(0);
            setIsPlaying(false);
        } catch (e) {
            console.error("Invalid PGN:", e);
        }
    }, [pgn]);

    // Timer for auto-play
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                nextMove();
            }, 1000); // 1 second per move
        }
        return () => clearInterval(interval);
    }, [isPlaying, moveIndex, history]);

    const nextMove = () => {
        if (moveIndex < history.length) {
            const move = history[moveIndex]; // move object

            // We can't just apply move to current game state if it's a new object every render unless we track it
            // Better: Reconstruct game state from scratch or clone
            setGame(prevGame => {
                const nextGame = new Chess(prevGame.fen());
                nextGame.move(move.san); // Execute the move
                return nextGame;
            });

            setMoveIndex(prev => {
                if (prev + 1 >= history.length) setIsPlaying(false);
                return prev + 1;
            });
        } else {
            setIsPlaying(false);
        }
    };

    const prevMove = () => {
        if (moveIndex > 0) {
            const newIndex = moveIndex - 1;
            const nextGame = new Chess();
            // Replay from start up to newIndex
            for (let i = 0; i < newIndex; i++) {
                nextGame.move(history[i].san);
            }
            setGame(nextGame);
            setMoveIndex(newIndex);
            setIsPlaying(false);
        }
    };

    const reset = () => {
        setGame(new Chess());
        setMoveIndex(0);
        setIsPlaying(false);
    };

    // Convert FEN to pieces object that ChessBoard expects
    const getPieces = (fen) => {
        const pieces = {};
        const board = new Chess(fen).board(); // board() returns an 8x8 array
        board.forEach((row, rIdx) => {
            row.forEach((piece, cIdx) => {
                if (piece) {
                    const file = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][cIdx];
                    const rank = 8 - rIdx;
                    pieces[`${file}${rank}`] = {
                        type: piece.type.toUpperCase(), // p -> P for ChessPawn
                        color: piece.color === 'w' ? 'white' : 'black'
                    };
                }
            });
        });
        return pieces;
    };

    return (
        <div className="flex flex-col items-center gap-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-500 w-full">
            <div className="w-full max-w-[320px] aspect-square shadow-2xl rounded-lg overflow-hidden border-4 border-slate-700 bg-slate-800 relative group">
                {/* Board */}
                <ChessBoard
                    pieces={getPieces(game.fen())}
                    orientation={orientation}
                    isHeatmapMode={false}
                    isResponsive={true}
                    onSquareClick={() => { }} // No interaction
                />

                {/* Last Move Highlight Overlay - Optional Polish */}
                {/* We could calculate and highlight, but for simplicity we skip unless requested */}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4 bg-black/40 p-2 sm:p-3 rounded-2xl border border-white/10 backdrop-blur-md shadow-lg">
                <button
                    onClick={reset}
                    title="Reset"
                    className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all active:scale-95"
                >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                    onClick={prevMove}
                    disabled={moveIndex === 0}
                    title="Previous Move"
                    className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="min-w-[80px] text-center">
                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Move</div>
                    <div className="text-lg font-mono font-black text-white leading-none">
                        {Math.ceil(moveIndex / 2)} <span className="text-slate-500 text-sm">/ {Math.ceil(history.length / 2)}</span>
                    </div>
                </div>

                <button
                    onClick={isPlaying ? () => setIsPlaying(false) : () => setIsPlaying(true)}
                    className={`p-3 rounded-xl border transition-all active:scale-95 shadow-lg ${isPlaying ? 'bg-amber-500/10 border-amber-500/50 text-amber-500 hover:bg-amber-500/20' : 'bg-aqua/10 border-aqua/50 text-aqua hover:bg-aqua/20'}`}
                >
                    {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current pl-0.5" />}
                </button>

                <button
                    onClick={nextMove}
                    disabled={moveIndex === history.length}
                    title="Next Move"
                    className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95"
                >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
        </div>
    );
}
