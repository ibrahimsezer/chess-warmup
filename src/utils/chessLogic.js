import { translations } from './translations';

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

export const getSquareColor = (fileIndex, rank) => {
    const fileNum = fileIndex + 1;
    return (fileNum + rank) % 2 !== 0 ? 'white' : 'black';
};

export const getRandomSquare = () => {
    const fileIdx = Math.floor(Math.random() * 8);
    const rank = Math.floor(Math.random() * 8) + 1;
    return { file: FILES[fileIdx], rank, fileIdx };
};

// Bu fonksiyonu dile göre çeviri yapacak şekilde güncelledik
export const getModeName = (m, lang = 'tr') => {
    const t = translations[lang].menu.modes;
    switch (m) {
        case 'color': return t.color.title;
        case 'coordinate': return t.coordinate.title;
        case 'blind_coordinate': return t.blind.title;
        case 'piece_move': return t.piece_move.title;
        default: return m;
    }
};

// --- PIECE MOVEMENT LOGIC ---

export const PIECES = [
    { type: 'R', name: 'Rook' },
    { type: 'B', name: 'Bishop' },
    { type: 'N', name: 'Knight' },
    { type: 'K', name: 'King' },
    { type: 'Q', name: 'Queen' }
];

const isValidSquare = (f, r) => f >= 0 && f < 8 && r >= 1 && r <= 8;

const getValidMoves = (piece, currentFileIdx, currentRank) => {
    const moves = [];
    const directions = [];

    switch (piece) {
        case 'R': // Rook: Straight
            directions.push([0, 1], [0, -1], [1, 0], [-1, 0]);
            break;
        case 'B': // Bishop: Diagonals
            directions.push([1, 1], [1, -1], [-1, 1], [-1, -1]);
            break;
        case 'Q': // Queen: All 8 directions
        case 'K': // King (treated same as Queen for directions, but distance 1)
            directions.push([0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]);
            break;
        case 'N': // Knight: L-shapes
            const knightMoves = [
                [1, 2], [1, -2], [-1, 2], [-1, -2],
                [2, 1], [2, -1], [-2, 1], [-2, -1]
            ];
            knightMoves.forEach(([df, dr]) => {
                const f = currentFileIdx + df;
                const r = currentRank + dr;
                if (isValidSquare(f, r)) moves.push({ fileIdx: f, rank: r, file: FILES[f] });
            });
            return moves; // Knight jumps, so we return immediately
    }

    // Sliding pieces (R, B, Q) + King (1 step)
    const isSliding = piece !== 'K';

    directions.forEach(([df, dr]) => {
        let f = currentFileIdx + df;
        let r = currentRank + dr;

        while (isValidSquare(f, r)) {
            moves.push({ fileIdx: f, rank: r, file: FILES[f] });
            if (!isSliding) break; // King stops after 1
            f += df;
            r += dr;
        }
    });

    return moves;
};

export const generateMovePuzzle = () => {
    // 1. Pick a random piece
    const pieceObj = PIECES[Math.floor(Math.random() * PIECES.length)];
    const piece = pieceObj.type;

    // 2. Pick a random start square
    const start = getRandomSquare();

    // 3. Get valid moves
    const validMoves = getValidMoves(piece, start.fileIdx, start.rank);

    // If no moves (should be rare/impossible on empty board unless corner case?), retry
    if (validMoves.length === 0) return generateMovePuzzle();

    // 4. Pick random target
    const target = validMoves[Math.floor(Math.random() * validMoves.length)];

    return {
        piece,
        start,   // { file, rank, fileIdx }
        target,  // { file, rank, fileIdx }
        notation: `${piece}${target.file}${target.rank}` // Simply e.g. Ra5 (Standard)
    };
};