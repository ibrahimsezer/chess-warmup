import React from 'react';
import HistoryDashboard from './HistoryDashboard';
import { Eye, EyeOff, Grid3X3, MousePointer2, Castle, ChessKnight, ChessBishop, ChessKing } from 'lucide-react';
import { getModeName, FILES, RANKS } from '../utils/chessLogic';
import OpeningExplorer from './OpeningExplorer';

export default function MenuScreen({ onStartGame, history, t, lang }) {



    return (
        <div className="flex flex-col gap-8 max-w-6xl w-full lg:flex-row items-start justify-center">
            {/* LEFT COLUMN: MODE SELECTION */}
            <div className="flex flex-col gap-8 w-full max-w-md">
                <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 w-full text-center relative overflow-hidden group">
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
                                title={t.menu.modes.piece_move.title}
                                desc={t.menu.modes.piece_move.desc}
                                icon={<Castle className="w-6 h-6 text-aqua" />}
                                bg="bg-black/40"
                                hover="hover:bg-black hover:text-white"
                                iconBg="bg-white/10"
                                borderColor="border-aqua/50"
                                overlayIcon={<Castle className="w-16 h-16 text-aqua/25 absolute rotate-12" />}
                                onClick={() => onStartGame('piece_move')}
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

                {/* NEW OPENING EXPLORER COMPONENT */}
                <OpeningExplorer lang={lang} />
            </div>

            {/* RIGHT COLUMN: HISTORY & HEATMAP */}
            <HistoryDashboard history={history} t={t} lang={lang} />
        </div>

    );
}

function ModeButton({ title, desc, icon, bg, hover, iconBg, borderColor, overlayIcon, onClick, extraEffect, accentColor }) {
    return (
        <button onClick={onClick} className={`w-full ${bg} p-4 rounded-xl flex items-center justify-start transition-all duration-300 group/btn border ${borderColor} ${hover} relative overflow-hidden active:scale-95`}>
            {extraEffect && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aqua/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />}

            {/* Overlay Icon (Background decoration) */}
            <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 transform scale-50 group-hover/btn:scale-100 pointer-events-none flex items-center justify-end">
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