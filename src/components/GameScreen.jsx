import React, { useState, useEffect } from 'react';
import { ArrowUpDown, XCircle, Grid3X3, MousePointer2, EyeOff, Castle } from 'lucide-react';
import ChessBoard from './ChessBoard';
import PieceMoveGame from './PieceMoveGame';
import { getSquareColor } from '../utils/chessLogic';

export default function GameScreen({
    mode,
    score,
    timeLeft,
    currentSquare,
    feedback,
    streak,
    onColorGuess,
    onBoardClick,
    orientation,
    onToggleOrientation,
    onQuit,
    onSwitchMode,
    t
}) {
    // NEW STATE: Controls the visibility of the center flash message
    const [showFlash, setShowFlash] = useState(false);

    // EFFECT: Triggers the flash whenever the target square changes
    useEffect(() => {
        if (currentSquare && (mode === 'coordinate' || mode === 'blind_coordinate' || mode === 'piece_move')) {
            setShowFlash(true);
            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 1000); // 1 second duration
            return () => clearTimeout(timer);
        }
    }, [currentSquare, mode]);

    const getTargetText = () => {
        if (!currentSquare) return '?';
        if (mode === 'piece_move' && currentSquare.notation) return currentSquare.notation;
        return currentSquare.file ? `${currentSquare.file}${currentSquare.rank}` : '?';
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg">
            {/* Main Game Container */}
            <div className="bg-slate-800 p-4 md:p-8 rounded-2xl shadow-2xl border border-slate-700 w-full relative overflow-hidden flex flex-col items-center mb-4">

                {/* Top Bar */}
                <div className="w-full flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t.game.score}</span>
                        <span className="text-2xl font-mono font-bold text-emerald-400">{score}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t.game.target}</span>
                        <span className={`text-4xl font-black ${feedback === 'wrong' ? 'text-red-500 shake' : 'text-white'}`}>
                            {getTargetText()}
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider">{t.game.time}</span>
                        <span className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                {/* MODE: COLOR GUESS */}
                {mode === 'color' && currentSquare && (
                    <div className="w-full">
                        <div className="text-center mb-8 relative z-10">
                            <div className="text-slate-400 mb-2 text-sm">{t.game.questionColor}</div>
                            {streak > 2 && (
                                <div className="inline-block bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce mb-2">
                                    {streak}x {t.game.streak}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => onColorGuess('black')}
                                className={`h-32 rounded-xl font-bold text-2xl transition-all active:scale-95 border-b-4 ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'white' ? 'opacity-50' : ''} bg-slate-700 hover:bg-slate-600 border-slate-900 text-slate-300 flex flex-col items-center justify-center gap-2`}
                            >
                                <div className="w-8 h-8 bg-slate-900 rounded border border-slate-600"></div>
                                {t.game.buttons.black}
                            </button>
                            <button
                                onClick={() => onColorGuess('white')}
                                className={`h-32 rounded-xl font-bold text-2xl transition-all active:scale-95 border-b-4 ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'black' ? 'opacity-50' : ''} bg-slate-200 hover:bg-white border-slate-400 text-slate-900 flex flex-col items-center justify-center gap-2`}
                            >
                                <div className="w-8 h-8 bg-white rounded border border-slate-300"></div>
                                {t.game.buttons.white}
                            </button>
                        </div>
                    </div>
                )}

                {/* MODE: COORDINATE & BLIND COORDINATE & PIECE MOVE */}
                {(mode === 'coordinate' || mode === 'blind_coordinate' || mode === 'piece_move') && (
                    <div className="flex flex-col items-center gap-4 relative">
                        {/* FLASH MESSAGE OVERLAY */}
                        {showFlash && currentSquare && (
                            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none animate-ping-short">
                                <div className="text-6xl md:text-8xl font-black text-amber-400 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] scale-150 opacity-80">
                                    {getTargetText()}
                                </div>
                            </div>
                        )}

                        {mode === 'piece_move' ? (
                            <PieceMoveGame
                                currentPuzzle={currentSquare}
                                feedback={feedback}
                                onSquareClick={onBoardClick}
                                orientation={orientation}
                            />
                        ) : (
                            <ChessBoard
                                mode={mode}
                                orientation={orientation}
                                currentSquare={currentSquare}
                                feedback={feedback}
                                onSquareClick={onBoardClick}
                            />
                        )}

                        <div className="flex items-center gap-2 mt-2">
                            {mode === 'blind_coordinate' && (
                                <span className="text-amber-400 text-xs font-bold px-2 py-1 bg-amber-400/10 rounded animate-pulse">
                                    {t.game.blindActive}
                                </span>
                            )}
                            <button
                                onClick={onToggleOrientation}
                                className="flex items-center gap-2 text-slate-400 hover:text-white text-xs py-2 px-4 rounded-full hover:bg-slate-700 transition-colors"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                {t.game.buttons.flip} ({orientation === 'white' ? t.game.buttons.white : t.game.buttons.black})
                            </button>
                        </div>
                    </div>
                )}

                {/* Feedback Overlay */}
                {feedback === 'correct' && (
                    <div className="absolute inset-0 bg-green-500/10 pointer-events-none animate-ping-short z-20" />
                )}

                <style>{`
                    .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                    @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                    }
                    .animate-ping-short { animation: ping 0.5s cubic-bezier(0, 0, 0.2, 1) infinite; }
                `}</style>
            </div>

            {/* Quick Actions Bar */}
            <div className="w-full grid grid-cols-5 gap-2">
                <button
                    onClick={onQuit}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-900/50 transition-colors group"
                    title={t.game.controls.quit}
                >
                    <XCircle className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">{t.game.controls.quit}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('color')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors group ${mode === 'color' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border-slate-700'}`}
                >
                    <Grid3X3 className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">{t.game.controls.color}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('coordinate')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors group ${mode === 'coordinate' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border-slate-700'}`}
                >
                    <MousePointer2 className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">{t.game.controls.coord}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('piece_move')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors group ${mode === 'piece_move' ? 'bg-amber-600 text-white border-amber-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border-slate-700'}`}
                >
                    <Castle className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">{t.game.controls.moves}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('blind_coordinate')}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-colors group ${mode === 'blind_coordinate' ? 'bg-purple-600 text-white border-purple-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border-slate-700'}`}
                >
                    <EyeOff className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">{t.game.controls.blind}</span>
                </button>
            </div>

            <div className="text-slate-500 text-[10px] mt-2 text-center w-full">
                {t.game.warning}
            </div>
        </div>
    );
}