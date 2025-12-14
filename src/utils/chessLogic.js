export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8];

// Kare rengi hesaplama (a1=Siyah, h1=Beyaz mantığı)
export const getSquareColor = (fileIndex, rank) => {
    const fileNum = fileIndex + 1;
    return (fileNum + rank) % 2 !== 0 ? 'white' : 'black';
};

export const getRandomSquare = () => {
    const fileIdx = Math.floor(Math.random() * 8);
    const rank = Math.floor(Math.random() * 8) + 1;
    return { file: FILES[fileIdx], rank, fileIdx };
};

export const getModeName = (m) => {
    switch (m) {
        case 'color': return 'Renk Hafızası';
        case 'coordinate': return 'Koordinat';
        case 'blind_coordinate': return 'Hayalet';
        default: return m;
    }
};