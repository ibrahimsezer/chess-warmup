import React from 'react';
import { Eye, EyeOff, Play, Grid3X3, Brain, History, BarChart2, MousePointer2, Castle, ChessKnight, ChessBishop, ChessKing } from 'lucide-react';
import ChessBoard from './ChessBoard';
import { getModeName, FILES, RANKS } from '../utils/chessLogic';

export default function MenuScreen({ onStartGame, history, t, lang }) {

    const calculateHeatmap = () => {
        const map = {};
        FILES.forEach(f => {
            RANKS.forEach(r => {
                map[`${f}${r}`] = { correct: 0, wrong: 0 };
            });
        });

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

    const heatmapData = history.length > 0 ? calculateHeatmap() : null;

    return (
        <div className="flex flex-col gap-8 max-w-5xl w-full md:flex-row items-start justify-center">
            {/* LEFT COLUMN: MODE SELECTION */}
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 w-full max-w-md text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-aqua/5 to-transparent pointer-events-none" />
                <div className="mb-2 relative z-10">
                    <h2 className="text-3xl font-black mb-6 text-white tracking-tight">{t.menu.title}</h2>
                    <div className="space-y-4">
                        <ModeButton
                            title={t.menu.modes.color.title}
                            desc={t.menu.modes.color.desc}
                            icon={<Grid3X3 className="w-6 h-6 text-aqua" />} // Icon black on Aqua
                            bg="bg-black/40"
                            hover="hover:bg-black hover:text-white"
                            iconBg="bg-white/10"
                            borderColor="border-aqua/50"
                            overlayIcon={<ChessKnight className="w-16 h-16 text-aqua/25 absolute rotate-12" />}
                            onClick={() => onStartGame('color')}
                            accentColor="text-aqua"
                            extraEffect
                        />
                        <ModeButton
                            title={t.menu.modes.coordinate.title}
                            desc={t.menu.modes.coordinate.desc}
                            icon={<MousePointer2 className="w-6 h-6 text-aqua" />}
                            bg="bg-black/40"
                            hover="hover:bg-black hover:text-white"
                            iconBg="bg-white/10"
                            borderColor="border-aqua/50"
                            overlayIcon={<ChessBishop className="w-16 h-16 text-aqua/25 absolute rotate-12" />}
                            onClick={() => onStartGame('coordinate')}
                            accentColor="text-aqua"
                            extraEffect
                        />
                        <ModeButton
                            title={t.menu.modes.blind.title}
                            desc={t.menu.modes.blind.desc}
                            icon={<EyeOff className="w-6 h-6 text-aqua" />} // Inverse style
                            bg="bg-black/40"
                            hover="hover:bg-black hover:text-white"
                            iconBg="bg-white/10"
                            borderColor="border-aqua/50"
                            overlayIcon={<ChessKing className="w-16 h-16 text-aqua/25 absolute rotate-12" />}
                            onClick={() => onStartGame('blind_coordinate')}
                            accentColor="text-aqua"
                            extraEffect
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: HISTORY & HEATMAP */}
            {history.length > 0 && (
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
                                    {history.map((h) => (
                                        <tr key={h.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 font-medium text-white">{getModeName(h.mode, lang)}</td>
                                            <td className="px-4 py-3 text-center font-mono font-bold">{h.score}</td>
                                            <td className="px-4 py-3 text-center text-aqua font-bold">{h.correct}</td>
                                            <td className="px-4 py-3 text-center text-red-400 font-bold">{h.wrong}</td>
                                        </tr>
                                    ))}
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
            )}
        </div>
    );
}

function ModeButton({ title, desc, icon, bg, hover, iconBg, borderColor, overlayIcon, onClick, extraEffect, accentColor }) {
    return (
        <button onClick={onClick} className={`w-full ${bg} p-4 rounded-xl flex items-center justify-between transition-all duration-300 group/btn border ${borderColor} ${hover} relative overflow-hidden active:scale-95`}>
            {extraEffect && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aqua/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />}

            {/* Overlay Icon (Background decoration) */}
            <div className="opacity-0 group-hover/btn:opacity-100 transition-all duration-500 transform scale-50 group-hover/btn:scale-100 pointer-events-none">
                {overlayIcon}
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className={`${iconBg} p-3 rounded-lg shadow-lg group-hover/btn:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                <div className="text-left">
                    <div className="font-black text-lg group-hover/btn:text-inherit">{title}</div>
                    <div className={`${accentColor} text-xs font-medium opacity-70 group-hover/btn:text-inherit group-hover/btn:opacity-100`}>{desc}</div>
                </div>
            </div>
        </button>
    );
}