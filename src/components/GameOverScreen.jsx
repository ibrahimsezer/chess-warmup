import { Trophy, RotateCcw } from 'lucide-react';

export default function GameOverScreen({ score, onMenu, onRestart, mode, t }) {
    return (
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 max-w-md w-full text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-aqua/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
                <Trophy className="w-20 h-20 text-aqua mx-auto mb-6 drop-shadow-[0_0_15px_rgba(0,210,168,0.5)]" />
                <h2 className="text-4xl font-black mb-2 text-white">{t.gameOver.title}</h2>

                <div className="bg-black/40 rounded-2xl p-6 mb-8 mt-6 border border-white/5">
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">{t.gameOver.totalScore}</div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-aqua">{score}</div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onMenu}
                        className="flex-1 bg-white/5 hover:bg-white/10 hover:text-white text-slate-300 p-4 rounded-xl font-bold transition-all border border-white/5"
                    >
                        {t.gameOver.menuBtn}
                    </button>
                    <button
                        onClick={() => onRestart(mode)}
                        className="flex-1 bg-aqua hover:bg-white text-black hover:text-black p-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-aqua/50 active:scale-95"
                    >
                        <RotateCcw className="w-5 h-5" />
                        {t.gameOver.replayBtn}
                    </button>
                </div>
            </div>
        </div>
    );
}