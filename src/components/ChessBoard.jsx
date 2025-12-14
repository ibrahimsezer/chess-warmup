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
        <div className={`grid grid-cols-8 border-[6px] border-white/10 bg-black select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative ${isHeatmapMode ? 'w-full max-w-[300px]' : ''}`}>
            {renderRanks.map((rank) => (
                renderFiles.map((file, colIndex) => {
                    const originalFileIdx = FILES.indexOf(file);
                    const squareId = `${file}${rank}`;
                    const isBlack = getSquareColor(originalFileIdx, rank) === 'black';

                    // --- STYLING LOGIC ---
                    // Redesign: "Black" squares are dark teal/black, "White" squares are off-white
                    let cellClass = isBlack ? 'bg-slate-800' : 'bg-slate-200'; // Fallback

                    if (!isHeatmapMode) {
                        cellClass = isBlack ? 'bg-[#2A2A2A]' : 'bg-[#EAEAEA]'; // High contrast subtle board
                    }

                    let content = null;
                    let heatmapBorderClass = '';

                    if (!isHeatmapMode) {
                        // Game Mode
                        const isTarget = currentSquare && currentSquare.fileIdx === originalFileIdx && currentSquare.rank === rank;

                        // WRONG
                        if (feedback === 'wrong' && isTarget) cellClass = 'bg-red-500 animate-pulse';

                        // CORRECT
                        if (feedback === 'correct' && isTarget) {
                            cellClass = 'bg-aqua shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] z-10 transition-colors duration-200';
                        }
                    } else {
                        // Heatmap Mode
                        const data = heatmapData ? heatmapData[squareId] : { correct: 0, wrong: 0 };
                        const total = data.correct + data.wrong;
                        heatmapBorderClass = 'border-[0.5px] border-black/10';

                        if (total > 0) {
                            const successRate = data.correct / total;
                            if (successRate > 0.5) {
                                const intensity = Math.min(0.9, 0.3 + (data.correct * 0.15));
                                cellClass = `bg-aqua`;
                                content = <div style={{ opacity: intensity }} className="absolute inset-0 bg-aqua"></div>;
                            } else if (successRate < 0.5) {
                                const intensity = Math.min(0.9, 0.3 + (data.wrong * 0.15));
                                cellClass = `bg-red-500`;
                                content = <div style={{ opacity: intensity }} className="absolute inset-0 bg-red-600"></div>;
                            } else {
                                cellClass = 'bg-slate-500';
                                content = <div className="absolute inset-0 bg-slate-500 opacity-40"></div>;
                            }
                        } else {
                            // No Data
                            cellClass = isBlack ? 'bg-slate-800' : 'bg-slate-700';
                        }
                    }

                    // --- BLIND MODE LABELS ---
                    const isBlindMode = mode === 'blind_coordinate';
                    const isRankLabelVisible = !isHeatmapMode && (!isBlindMode || (isBlindMode && feedback === 'correct' && rank === currentSquare?.rank));
                    const isFileLabelVisible = !isHeatmapMode && (!isBlindMode || (isBlindMode && feedback === 'correct' && file === currentSquare?.file));

                    // Text Contrast
                    // If black square -> text light. If white square -> text dark.
                    // Except when selected (Aqua/Red) logic applies, but simplifies here for readabiltiy:
                    const rankLabelClass = isBlindMode && isRankLabelVisible
                        ? `text-aqua scale-150 z-20 font-black drop-shadow-md`
                        : isBlack ? 'text-slate-500' : 'text-slate-400';

                    const fileLabelClass = isBlindMode && isFileLabelVisible
                        ? `text-aqua scale-150 z-20 font-black drop-shadow-md`
                        : isBlack ? 'text-slate-500' : 'text-slate-400';

                    return (
                        <div
                            key={`${file}${rank}`}
                            onClick={() => !isHeatmapMode && onSquareClick(originalFileIdx, rank)}
                            className={`flex items-center justify-center relative ${isHeatmapMode ? 'w-6 h-6 md:w-8 md:h-8 text-[8px]' : 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 cursor-pointer hover:opacity-90 active:scale-95'} transition-all duration-100 ${!isHeatmapMode && cellClass} ${heatmapBorderClass} ${isHeatmapMode && cellClass}`}
                        >
                            {isHeatmapMode && content}

                            {!isHeatmapMode && colIndex === 0 && (
                                <span className={`absolute top-0.5 left-0.5 text-[10px] font-bold ${rankLabelClass} ${!isRankLabelVisible && 'opacity-0'}`}>
                                    {rank}
                                </span>
                            )}
                            {!isHeatmapMode && ((orientation === 'white' && rank === 1) || (orientation === 'black' && rank === 8)) && (
                                <span className={`absolute bottom-0 right-0.5 text-[10px] font-bold ${fileLabelClass} ${!isFileLabelVisible && 'opacity-0'}`}>
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