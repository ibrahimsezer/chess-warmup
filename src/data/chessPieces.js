export const chessPieces = [
    {
        id: 'king',
        name: {
            tr: "Şah",
            en: "King"
        },
        description: {
            tr: "Her yöne (yatay, dikey, çapraz) sadece bir kare hareket edebilir. Oyunun en önemli taşıdır.",
            en: "Can move exactly one square horizontally, vertically, or diagonally. The most important piece."
        },
        image: "/chess-pieces/king.webp"
    },
    {
        id: 'queen',
        name: {
            tr: "Vezir",
            en: "Queen"
        },
        description: {
            tr: "Her yöne (yatay, dikey, çapraz) istediği kadar kare hareket edebilir. En güçlü taştır.",
            en: "Can move any number of squares horizontally, vertically, or diagonally. The most powerful piece."
        },
        image: "/chess-pieces/queen.webp"
    },
    {
        id: 'rook',
        name: {
            tr: "Kale",
            en: "Rook"
        },
        description: {
            tr: "Yatay veya dikey olarak istediği kadar kare hareket edebilir.",
            en: "Can move any number of squares horizontally or vertically."
        },
        image: "/chess-pieces/rook.webp"
    },
    {
        id: 'bishop',
        name: {
            tr: "Fil",
            en: "Bishop"
        },
        description: {
            tr: "Sadece çapraz yönde istediği kadar kare hareket edebilir.",
            en: "Can move any number of squares diagonally."
        },
        image: "/chess-pieces/bishop.webp"
    },
    {
        id: 'knight',
        name: {
            tr: "At",
            en: "Knight"
        },
        description: {
            tr: "L şeklinde hareket eder (iki kare ileri, bir kare yana). Taşların üzerinden atlayabilir.",
            en: "Moves in an 'L' shape (two squares in one cardinal direction, then one square perpendicular). Can jump over pieces."
        },
        image: "/chess-pieces/knight.webp"
    },
    {
        id: 'pawn',
        name: {
            tr: "Piyon",
            en: "Pawn"
        },
        description: {
            tr: "İleri doğru bir kare (ilk hamlede iki) gider. Sadece çapraz önündeki taşı yiyebilir.",
            en: "Moves forward one square (or two on first move). Captures diagonally forward."
        },
        image: "/chess-pieces/pawn.webp"
    }
];
