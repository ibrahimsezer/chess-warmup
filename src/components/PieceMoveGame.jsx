import React from 'react';
import ChessBoard from './ChessBoard';

export default function PieceMoveGame({
    currentPuzzle,
    feedback,
    onSquareClick,
    orientation
}) {
    // Helper to construct the pieces object for the board
    const pieces = {};
    if (currentPuzzle && currentPuzzle.start) {
        const startId = `${currentPuzzle.start.file}${currentPuzzle.start.rank}`;
        pieces[startId] = { type: currentPuzzle.piece, color: 'white' };
    }

    // In this mode, we want the target to be hidden on the board until feedback is given.
    // ChessBoard currentSquare prop is used for feedback highlighting.
    // If feedback is null, the target is invisible on the board, which is what we want.

    return (
        <div className="flex flex-col items-center gap-4 relative w-full">
            <ChessBoard
                mode="piece_move"
                orientation={orientation}
                currentSquare={currentPuzzle?.target}
                feedback={feedback}
                onSquareClick={onSquareClick}
                pieces={pieces}
            />
        </div>
    );
}
