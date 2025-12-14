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
        default: return m;
    }
};