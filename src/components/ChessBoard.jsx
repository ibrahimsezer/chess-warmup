import React from 'react';
import { FILES, RANKS, getSquareColor } from '../utils/chessLogic';

export default function ChessBoard({
    mode,
    orientation = 'white',
    currentSquare,
    feedback,
    onSquareClick,
    isHeatmapMode = false,
    heatmapData = null
}) {
    const renderRanks = orientation === 'white' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
    const renderFiles = orientation === 'white' ? FILES : [...FILES].reverse();

    return (
        <div className={`grid grid-cols-8 border-4 border-slate-700 bg-slate-800 select-none shadow-2xl relative ${isHeatmapMode ? 'w-full max-w-[300px]' : ''}`}>
            {renderRanks.map((rank) => (
                renderFiles.map((file, colIndex) => {
                    const originalFileIdx = FILES.indexOf(file);
                    const squareId = `${file}${rank}`;
                    const isBlack = getSquareColor(originalFileIdx, rank) === 'black';

                    // --- STYLE LOGIC ---
                    let cellClass = isBlack ? 'bg-slate-600' : 'bg-slate-300';
                    let content = null;
                    let heatmapBorderClass = '';

                    if (!isHeatmapMode) {
                        // Game Mode
                        const isTarget = currentSquare && currentSquare.fileIdx === originalFileIdx && currentSquare.rank === rank;
                        if (feedback === 'wrong' && isTarget) cellClass = 'bg-red-500 animate-pulse';
                        if (feedback === 'correct' && isTarget) cellClass = 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] z-10';
                    } else {
                        // Heatmap Mode
                        const data = heatmapData ? heatmapData[squareId] : { correct: 0, wrong: 0 };
                        const total = data.correct + data.wrong;
                        heatmapBorderClass = 'border-[0.5px] border-slate-900/20';

                        if (total > 0) {
                            const successRate = data.correct / total;
                            if (successRate > 0.5) {
                                const intensity = Math.min(0.9, 0.3 + (data.correct * 0.15));
                                cellClass = `bg-emerald-500`;
                                content = <div style={{ opacity: intensity }} className="absolute inset-0 bg-emerald-500"></div>;
                            } else if (successRate < 0.5) {
                                const intensity = Math.min(0.9, 0.3 + (data.wrong * 0.15));
                                cellClass = `bg-red-500`;
                                content = <div style={{ opacity: intensity }} className="absolute inset-0 bg-red-600"></div>;
                            } else {
                                cellClass = 'bg-amber-400';
                                content = <div className="absolute inset-0 bg-amber-400 opacity-40"></div>;
                            }
                        } else {
                            cellClass = isBlack ? 'bg-slate-700' : 'bg-slate-600';
                        }
                    }

                    // --- LABEL VISIBILITY & STYLING (UPDATED) ---
                    const isBlindMode = mode === 'blind_coordinate';
                    const isRankLabelVisible = !isHeatmapMode && (!isBlindMode || (isBlindMode && feedback === 'correct' && rank === currentSquare?.rank));
                    const isFileLabelVisible = !isHeatmapMode && (!isBlindMode || (isBlindMode && feedback === 'correct' && file === currentSquare?.file));

                    // Contrast Settings
                    const textContrastClass = isBlack
                        ? 'text-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]'
                        : 'text-amber-700 font-extrabold drop-shadow-[0_1px_0px_rgba(255,255,255,0.5)]';

                    // UPDATED: Increased font sizes (text-xs sm:text-sm md:text-base)
                    const baseLabelClass = "absolute font-bold transition-all duration-300 pointer-events-none";

                    const rankLabelClass = isBlindMode && isRankLabelVisible
                        ? `${textContrastClass} scale-150 z-20 top-1 left-1 text-sm md:text-base`
                        : `${baseLabelClass} top-0.5 left-1 text-xs sm:text-sm md:text-base ${isBlack ? 'text-slate-400' : 'text-slate-600'}`;

                    const fileLabelClass = isBlindMode && isFileLabelVisible
                        ? `${textContrastClass} scale-150 z-20 bottom-1 right-1 text-sm md:text-base`
                        : `${baseLabelClass} bottom-0 right-1 text-xs sm:text-sm md:text-base ${isBlack ? 'text-slate-400' : 'text-slate-600'}`;

                    return (
                        <div
                            key={`${file}${rank}`}
                            onClick={() => !isHeatmapMode && onSquareClick(originalFileIdx, rank)}
                            className={`flex items-center justify-center relative ${isHeatmapMode ? 'w-6 h-6 md:w-8 md:h-8 text-[8px]' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 cursor-pointer hover:opacity-90'} transition-colors ${!isHeatmapMode && cellClass} ${heatmapBorderClass} ${isHeatmapMode && cellClass}`}
                        >
                            {isHeatmapMode && content}

                            {!isHeatmapMode && colIndex === 0 && (
                                <span className={`${rankLabelClass} ${!isRankLabelVisible && 'opacity-0'}`}>
                                    {rank}
                                </span>
                            )}
                            {!isHeatmapMode && ((orientation === 'white' && rank === 1) || (orientation === 'black' && rank === 8)) && (
                                <span className={`${fileLabelClass} ${!isFileLabelVisible && 'opacity-0'}`}>
                                    {file}
                                </span>
                            )}
                        </div>
                    );
                })
            ))}
        </div>
    );
}