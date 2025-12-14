import React from 'react';
import { ArrowUpDown } from 'lucide-react';
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
    onToggleOrientation
}) {
    return (
        <div className="bg-slate-800 p-4 md:p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-lg w-full relative overflow-hidden flex flex-col items-center">

            {/* Top Bar */}
            <div className="w-full flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <div className="flex flex-col">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Skor</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400">{score}</span>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Hedef</span>
                    <span className={`text-4xl font-black ${feedback === 'wrong' ? 'text-red-500 shake' : 'text-white'}`}>
                        {currentSquare ? `${currentSquare.file}${currentSquare.rank}` : '?'}
                    </span>
                </div>

                <div className="flex flex-col items-end">
                    <span className="text-slate-400 text-[10px] uppercase tracking-wider">Süre</span>
                    <span className={`text-2xl font-mono font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {timeLeft}s
                    </span>
                </div>
            </div>

            {/* MODE: COLOR GUESS */}
            {mode === 'color' && currentSquare && (
                <div className="w-full">
                    <div className="text-center mb-8 relative z-10">
                        <div className="text-slate-400 mb-2 text-sm">Bu kare hangi renk?</div>
                        {streak > 2 && (
                            <div className="inline-block bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full animate-bounce mb-2">
                                {streak}x Seri!
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => onColorGuess('black')}
                            className={`h-32 rounded-xl font-bold text-2xl transition-all active:scale-95 border-b-4 ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'white' ? 'opacity-50' : ''} bg-slate-700 hover:bg-slate-600 border-slate-900 text-slate-300 flex flex-col items-center justify-center gap-2`}
                        >
                            <div className="w-8 h-8 bg-slate-900 rounded border border-slate-600"></div>
                            SİYAH
                        </button>
                        <button
                            onClick={() => onColorGuess('white')}
                            className={`h-32 rounded-xl font-bold text-2xl transition-all active:scale-95 border-b-4 ${feedback === 'wrong' && getSquareColor(currentSquare.fileIdx, currentSquare.rank) === 'black' ? 'opacity-50' : ''} bg-slate-200 hover:bg-white border-slate-400 text-slate-900 flex flex-col items-center justify-center gap-2`}
                        >
                            <div className="w-8 h-8 bg-white rounded border border-slate-300"></div>
                            BEYAZ
                        </button>
                    </div>
                </div>
            )}

            {/* MODE: COORDINATE & BLIND COORDINATE */}
            {(mode === 'coordinate' || mode === 'blind_coordinate') && (
                <div className="flex flex-col items-center gap-4">
                    <ChessBoard
                        mode={mode}
                        orientation={orientation}
                        currentSquare={currentSquare}
                        feedback={feedback}
                        onSquareClick={onBoardClick}
                    />

                    <div className="flex items-center gap-2 mt-2">
                        {mode === 'blind_coordinate' && (
                            <span className="text-amber-400 text-xs font-bold px-2 py-1 bg-amber-400/10 rounded animate-pulse">
                                Hayalet Mod Aktif
                            </span>
                        )}
                        <button
                            onClick={onToggleOrientation}
                            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs py-2 px-4 rounded-full hover:bg-slate-700 transition-colors"
                        >
                            <ArrowUpDown className="w-4 h-4" />
                            Tahtayı Çevir ({orientation === 'white' ? 'Beyaz' : 'Siyah'})
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
    );
}