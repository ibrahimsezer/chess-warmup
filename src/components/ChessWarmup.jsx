import React, { useState, useEffect, useRef } from 'react';
import { Brain, Globe } from 'lucide-react'; // Globe ikonu eklendi
import { getRandomSquare, getSquareColor } from '../utils/chessLogic';
import { translations } from '../utils/translations'; // Çeviriler eklendi

import MenuScreen from './MenuScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';

export default function ChessVisionTrainer() {
    const [gameState, setGameState] = useState('menu');
    const [mode, setMode] = useState('color');
    const [currentSquare, setCurrentSquare] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [feedback, setFeedback] = useState(null);
    const [streak, setStreak] = useState(0);
    const [orientation, setOrientation] = useState('white');

    // Dil State'i (Varsayılan Türkçe)
    const [lang, setLang] = useState('tr');

    // Aktif dilin çeviri objesi
    const t = translations[lang];

    const [history, setHistory] = useState([]);
    const [currentSessionLog, setCurrentSessionLog] = useState([]);

    const scoreRef = useRef(score);
    const logRef = useRef(currentSessionLog);
    const modeRef = useRef(mode);
    const timerRef = useRef(null);

    useEffect(() => {
        scoreRef.current = score;
        logRef.current = currentSessionLog;
        modeRef.current = mode;
    }, [score, currentSessionLog, mode]);

    useEffect(() => {
        if (gameState === 'playing') {
            if (!currentSquare) nextTurn();

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timerRef.current);
    }, [gameState]);

    const nextTurn = () => {
        setFeedback(null);
        setCurrentSquare(getRandomSquare());
    };

    const endGame = () => {
        clearInterval(timerRef.current);

        const finalLog = logRef.current;
        const finalScore = scoreRef.current;
        const finalMode = modeRef.current;

        const correctCount = finalLog.filter(l => l.result === 'correct').length;
        const wrongCount = finalLog.filter(l => l.result === 'wrong').length;

        const newActivity = {
            id: Date.now(),
            mode: finalMode,
            score: finalScore,
            correct: correctCount,
            wrong: wrongCount,
            log: [...finalLog],
            timestamp: new Date().toLocaleTimeString(lang === 'tr' ? 'tr-TR' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        };

        setHistory(prev => [newActivity, ...prev].slice(0, 3));
        setGameState('gameover');
    };

    const startGame = (selectedMode) => {
        setMode(selectedMode);
        setScore(0);
        setStreak(0);
        setTimeLeft(60);
        setCurrentSessionLog([]);
        setGameState('playing');
        setFeedback(null);
        setCurrentSquare(getRandomSquare());
    };

    const handleQuitGame = () => {
        clearInterval(timerRef.current);
        setGameState('menu');
    };

    const handleSwitchMode = (newMode) => {
        clearInterval(timerRef.current);
        startGame(newMode);
    };

    // Dil Değiştirme Fonksiyonu
    const toggleLanguage = () => {
        setLang(prev => prev === 'tr' ? 'en' : 'tr');
    };

    const logAttempt = (result) => {
        if (!currentSquare) return;
        const squareId = `${currentSquare.file}${currentSquare.rank}`;
        setCurrentSessionLog(prev => [...prev, { square: squareId, result, fileIdx: currentSquare.fileIdx, rank: currentSquare.rank }]);
    };

    const handleColorGuess = (color) => {
        const actualColor = getSquareColor(currentSquare.fileIdx, currentSquare.rank);
        if (color === actualColor) handleCorrect();
        else handleWrong();
    };

    const handleBoardClick = (fileIdx, rank) => {
        if (gameState !== 'playing' || (mode !== 'coordinate' && mode !== 'blind_coordinate')) return;
        if (fileIdx === currentSquare.fileIdx && rank === currentSquare.rank) handleCorrect();
        else handleWrong();
    };

    const handleCorrect = () => {
        logAttempt('correct');
        setScore(s => s + 10 + (streak * 2));
        setStreak(s => s + 1);
        setFeedback('correct');
        setTimeout(nextTurn, mode === 'blind_coordinate' ? 1000 : 200);
    };

    const handleWrong = () => {
        logAttempt('wrong');
        setStreak(0);
        setFeedback('wrong');
        setTimeout(nextTurn, 800);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col items-center justify-center p-4">

            {/* Header & Language Toggle */}
            <div className="mb-6 text-center relative w-full max-w-4xl flex flex-col items-center">
                <button
                    onClick={toggleLanguage}
                    className="absolute right-0 top-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-2 text-sm font-bold text-slate-300"
                >
                    <Globe className="w-4 h-4" />
                    {lang === 'tr' ? 'EN' : 'TR'}
                </button>

                <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-2 flex items-center justify-center gap-2">
                    <Brain className="w-8 h-8 md:w-10 md:h-10" />
                    {t.header.title}
                </h1>
                <p className="text-slate-400 text-sm">{t.header.subtitle}</p>
            </div>

            {/* Screens - t (translation) prop'u iletiliyor */}
            {gameState === 'menu' && (
                <MenuScreen onStartGame={startGame} history={history} t={t} lang={lang} />
            )}

            {gameState === 'playing' && (
                <GameScreen
                    mode={mode}
                    score={score}
                    timeLeft={timeLeft}
                    currentSquare={currentSquare}
                    feedback={feedback}
                    streak={streak}
                    onColorGuess={handleColorGuess}
                    onBoardClick={handleBoardClick}
                    orientation={orientation}
                    onToggleOrientation={() => setOrientation(p => p === 'white' ? 'black' : 'white')}
                    onQuit={handleQuitGame}
                    onSwitchMode={handleSwitchMode}
                    t={t} // Çeviri objesi iletiliyor
                />
            )}

            {gameState === 'gameover' && (
                <GameOverScreen
                    score={score}
                    mode={mode}
                    onMenu={() => setGameState('menu')}
                    onRestart={startGame}
                    t={t} // Çeviri objesi iletiliyor
                    lang={lang}
                />
            )}
        </div>
    );
}