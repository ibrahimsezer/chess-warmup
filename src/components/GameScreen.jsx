import React from 'react';
import { ArrowUpDown, XCircle, Grid3X3, MousePointer2, EyeOff } from 'lucide-react';
import ChessBoard from './ChessBoard';
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
    t // Çeviri propu
}) {
    return (
        <div className="flex flex-col items-center w-full max-w-lg">
            {/* Main Game Container */}
            <div className="bg-white/5 backdrop-blur-xl p-4 md:p-8 rounded-3xl shadow-2xl border border-white/10 w-full relative overflow-hidden flex flex-col items-center mb-4 transition-all duration-300">

                {/* Top Bar */}
                <div className="w-full flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">{t.game.score}</span>
                        <span className="text-3xl font-mono font-black text-white">{score}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">{t.game.target}</span>
                        <span className={`text-5xl font-black drop-shadow-lg ${feedback === 'wrong' ? 'text-red-500 shake' : 'text-aqua'}`}>
                            {currentSquare ? `${currentSquare.file}${currentSquare.rank}` : '?'}
                        </span>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">{t.game.time}</span>
                        <span className={`text-3xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            {timeLeft}s
                        </span>
                    </div>
                </div>

                {/* MODE: COLOR GUESS */}
                {mode === 'color' && currentSquare && (
                    <div className="w-full">
                        <div className="text-center mb-8 relative z-10">
                            <div className="text-slate-300 mb-2 text-sm uppercase tracking-wide font-medium">{t.game.questionColor}</div>
                            {streak > 2 && (
                                <div className="inline-block bg-aqua text-black text-xs font-black px-3 py-1 rounded-full animate-bounce mb-2 shadow-lg shadow-aqua/50">
                                    {streak}x {t.game.streak}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => onColorGuess('black')}
                                className={`h-36 rounded-2xl font-black text-2xl transition-all active:scale-95 border-b-[6px] ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'white' ? 'opacity-20' : ''} bg-[#1a1a1a] hover:bg-black border-black text-slate-300 flex flex-col items-center justify-center gap-3 shadow-lg group`}
                            >
                                <div className="w-10 h-10 bg-black rounded shadow-md group-hover:scale-110 transition-transform"></div>
                                {t.game.buttons.black}
                            </button>
                            <button
                                onClick={() => onColorGuess('white')}
                                className={`h-36 rounded-2xl font-black text-2xl transition-all active:scale-95 border-b-[6px] ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'black' ? 'opacity-20' : ''} bg-slate-100 hover:bg-white border-slate-300 text-slate-800 flex flex-col items-center justify-center gap-3 shadow-lg group`}
                            >
                                <div className="w-10 h-10 bg-white border rounded shadow-md group-hover:scale-110 transition-transform"></div>
                                {t.game.buttons.white}
                            </button>
                        </div>
                    </div>
                )}

                {/* MODE: COORDINATE & BLIND COORDINATE */}
                {(mode === 'coordinate' || mode === 'blind_coordinate') && (
                    <div className="flex flex-col items-center gap-6">
                        <ChessBoard
                            mode={mode}
                            orientation={orientation}
                            currentSquare={currentSquare}
                            feedback={feedback}
                            onSquareClick={onBoardClick}
                        />

                        <div className="flex items-center gap-3 mt-2">
                            {mode === 'blind_coordinate' && (
                                <span className="text-aqua text-[10px] font-black px-2 py-1 bg-aqua/10 rounded border border-aqua/20 animate-pulse">
                                    {t.game.blindActive}
                                </span>
                            )}
                            <button
                                onClick={onToggleOrientation}
                                className="flex items-center gap-2 text-slate-400 hover:text-white text-xs py-2 px-4 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                {t.game.buttons.flip} ({orientation === 'white' ? t.game.buttons.white : t.game.buttons.black})
                            </button>
                        </div>
                    </div>
                )}

                {/* Feedback Overlay - using Aqua for correct */}
                {feedback === 'correct' && (
                    <div className="absolute inset-0 bg-aqua/20 pointer-events-none animate-ping-short z-50 rounded-3xl" />
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
            <div className="w-full grid grid-cols-4 gap-2">
                <button
                    onClick={onQuit}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all hover:scale-105 active:scale-95 group"
                    title={t.game.controls.quit}
                >
                    <XCircle className="w-5 h-5 mb-1 group-hover:rotate-90 transition-transform" />
                    <span className="text-[9px] font-black uppercase">{t.game.controls.quit}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('color')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 group ${mode === 'color' ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 border-white/5 hover:text-white'}`}
                >
                    <Grid3X3 className="w-5 h-5 mb-1 transition-transform" />
                    <span className="text-[9px] font-black uppercase">{t.game.controls.color}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('coordinate')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 group ${mode === 'coordinate' ? 'bg-white text-black border-white' : 'bg-white/5 text-slate-400 hover:bg-white/10 border-white/5 hover:text-white'}`}
                >
                    <MousePointer2 className="w-5 h-5 mb-1 transition-transform" />
                    <span className="text-[9px] font-black uppercase">{t.game.controls.coord}</span>
                </button>

                <button
                    onClick={() => onSwitchMode('blind_coordinate')}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 group ${mode === 'blind_coordinate' ? 'bg-aqua text-black border-aqua shadow-[0_0_15px_rgba(0,210,168,0.3)]' : 'bg-white/5 text-slate-400 hover:bg-white/10 border-white/5 hover:text-white'}`}
                >
                    <EyeOff className="w-5 h-5 mb-1 transition-transform" />
                    <span className="text-[9px] font-black uppercase">{t.game.controls.blind}</span>
                </button>
            </div>

            <div className="text-slate-600 text-[10px] mt-4 text-center w-full uppercase tracking-widest font-bold opacity-50">
                {t.game.warning}
            </div>
        </div>
    );
}