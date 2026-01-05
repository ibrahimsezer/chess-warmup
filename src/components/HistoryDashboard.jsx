import { History, BarChart2 } from 'lucide-react';
import ChessBoard from './ChessBoard';
import { getModeName, FILES, RANKS } from '../utils/chessLogic';

export default function HistoryDashboard({ history, t, lang }) {

    const calculateHeatmap = () => {
        const map = {};
        FILES.forEach(f => {
            RANKS.forEach(r => {
                map[`${f}${r}`] = { correct: 0, wrong: 0 };
            });
        });

        if (!history || history.length === 0) return map;

        history.forEach(session => {
            session.log.forEach(entry => {
                if (map[entry.square]) {
                    if (entry.result === 'correct') map[entry.square].correct++;
                    else map[entry.square].wrong++;
                }
            });
        });
        return map;
    };

    const heatmapData = calculateHeatmap();

    return (
        <div className="flex flex-col gap-6 w-full max-w-md">
            {/* HISTORY TABLE */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white relative z-10">
                    <History className="w-5 h-5 text-aqua" />
                    {t.menu.history}
                </h3>
                <div className="overflow-hidden rounded-xl border border-white/5 relative z-10">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs uppercase bg-black/40 text-slate-400 font-bold tracking-wider">
                            <tr>
                                <th className="px-4 py-3">{t.menu.table.mode}</th>
                                <th className="px-4 py-3 text-center">{t.menu.table.score}</th>
                                <th className="px-4 py-3 text-center text-aqua">✔</th>
                                <th className="px-4 py-3 text-center text-red-400">✘</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history && history.length > 0 ? (
                                history.map((h) => (
                                    <tr key={h.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">{getModeName(h.mode, lang)}</td>
                                        <td className="px-4 py-3 text-center font-mono font-bold">{h.score}</td>
                                        <td className="px-4 py-3 text-center text-aqua font-bold">{h.correct}</td>
                                        <td className="px-4 py-3 text-center text-red-400 font-bold">{h.wrong}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-8 text-center text-slate-500 italic">
                                        {lang === 'tr' ? 'Henüz veri yok...' : 'No data yet...'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* HEATMAP */}
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 w-full flex flex-col items-center">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white w-full">
                    <BarChart2 className="w-5 h-5 text-aqua" />
                    {t.menu.heatmap}
                </h3>
                <div className="flex flex-col items-center">
                    <ChessBoard isHeatmapMode={true} heatmapData={heatmapData} />
                    <div className="flex gap-4 mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> {t.menu.legend.error}</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-slate-700 rounded-full"></div> {t.menu.legend.neutral}</div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-aqua rounded-full shadow-[0_0_8px_rgba(0,210,168,0.5)]"></div> {t.menu.legend.success}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
