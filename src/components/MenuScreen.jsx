import React from 'react';
import { Eye, EyeOff, Play, Grid3X3, Brain, History, BarChart2, MousePointer2 } from 'lucide-react';
import ChessBoard from './ChessBoard';
import { getModeName, FILES, RANKS } from '../utils/chessLogic';

export default function MenuScreen({ onStartGame, history }) {

    // Isı haritası verisini hesapla
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
        <div className="flex flex-col gap-6 max-w-4xl w-full md:flex-row items-start justify-center">
            {/* SOL KOLON: MOD SEÇİMİ */}
            <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md text-center">
                <div className="mb-2">
                    <h2 className="text-2xl font-bold mb-4">Antrenman Modu</h2>
                    <div className="space-y-4">
                        <ModeButton
                            title="Renk Hafızası"
                            desc="e4 Beyaz mı Siyah mı?"
                            icon={<Grid3X3 className="w-6 h-6 text-indigo-200" />}
                            bg="bg-indigo-600"
                            hover="hover:bg-indigo-500"
                            iconBg="bg-indigo-800"
                            borderColor="border-indigo-400/20"
                            overlayIcon={<Eye className="w-6 h-6" />}
                            onClick={() => onStartGame('color')}
                        />
                        <ModeButton
                            title="Koordinat Bulucu"
                            desc="Tahtada f7'ye tıkla!"
                            icon={<MousePointer2 className="w-6 h-6 text-emerald-200" />}
                            bg="bg-emerald-600"
                            hover="hover:bg-emerald-500"
                            iconBg="bg-emerald-800"
                            borderColor="border-emerald-400/20"
                            overlayIcon={<Play className="w-6 h-6" />}
                            onClick={() => onStartGame('coordinate')}
                        />
                        <ModeButton
                            title="Hayalet Mod"
                            desc="Sayılar gizli, içgüdülerini kullan."
                            icon={<EyeOff className="w-6 h-6 text-purple-200" />}
                            bg="bg-purple-600"
                            hover="hover:bg-purple-500"
                            iconBg="bg-purple-800"
                            borderColor="border-purple-400/20"
                            overlayIcon={<Brain className="w-6 h-6" />}
                            onClick={() => onStartGame('blind_coordinate')}
                            extraEffect
                        />
                    </div>
                </div>
            </div>

            {/* SAĞ KOLON: GEÇMİŞ VE ISI HARİTASI */}
            {history.length > 0 && (
                <div className="flex flex-col gap-6 w-full max-w-md">
                    {/* GEÇMİŞ TABLOSU */}
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 w-full">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-300">
                            <History className="w-5 h-5 text-amber-500" />
                            Son Etkinlikler
                        </h3>
                        <div className="overflow-hidden rounded-lg border border-slate-700">
                            <table className="w-full text-sm text-left text-slate-400">
                                <thead className="text-xs uppercase bg-slate-700 text-slate-300">
                                    <tr>
                                        <th className="px-4 py-3">Mod</th>
                                        <th className="px-4 py-3 text-center">Skor</th>
                                        <th className="px-4 py-3 text-center text-emerald-400">✔</th>
                                        <th className="px-4 py-3 text-center text-red-400">✘</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((h) => (
                                        <tr key={h.id} className="border-b border-slate-700 hover:bg-slate-750">
                                            <td className="px-4 py-2 font-medium text-white">{getModeName(h.mode)}</td>
                                            <td className="px-4 py-2 text-center font-mono">{h.score}</td>
                                            <td className="px-4 py-2 text-center text-emerald-400">{h.correct}</td>
                                            <td className="px-4 py-2 text-center text-red-400">{h.wrong}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* ISI HARİTASI */}
                    <div className="bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700 w-full flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-300 w-full">
                            <BarChart2 className="w-5 h-5 text-amber-500" />
                            Performans Isı Haritası
                        </h3>
                        <div className="flex flex-col items-center">
                            <ChessBoard isHeatmapMode={true} heatmapData={heatmapData} />
                            <div className="flex gap-4 mt-3 text-xs font-bold uppercase tracking-wider">
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-600 rounded-sm"></div> Hata</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-600 rounded-sm"></div> Nötr</div>
                                <div className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Başarı</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Yardımcı Alt Bileşen: Buton
function ModeButton({ title, desc, icon, bg, hover, iconBg, borderColor, overlayIcon, onClick, extraEffect }) {
    return (
        <button onClick={onClick} className={`w-full ${bg} ${hover} p-4 rounded-xl flex items-center justify-between transition-all group border ${borderColor} relative overflow-hidden`}>
            {extraEffect && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />}
            <div className="flex items-center gap-3">
                <div className={`${iconBg} p-2 rounded-lg`}>{icon}</div>
                <div className="text-left">
                    <div className="font-bold text-lg">{title}</div>
                    <div className="text-indigo-200 text-xs">{desc}</div>
                </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">{overlayIcon}</div>
        </button>
    );
}