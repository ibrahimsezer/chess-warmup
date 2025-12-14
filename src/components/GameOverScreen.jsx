import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

export default function GameOverScreen({ score, onMenu, onRestart, mode }) {
    return (
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 max-w-md w-full text-center">
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Süre Doldu!</h2>

            <div className="bg-slate-900/50 rounded-xl p-6 mb-8 mt-6">
                <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Toplam Skor</div>
                <div className="text-5xl font-bold text-emerald-400">{score}</div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={onMenu}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 p-4 rounded-xl font-bold transition-colors"
                >
                    Menüye Dön
                </button>
                <button
                    onClick={() => onRestart(mode)}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                >
                    <RotateCcw className="w-5 h-5" />
                    Tekrar Oyna
                </button>
            </div>
        </div>
    );
}