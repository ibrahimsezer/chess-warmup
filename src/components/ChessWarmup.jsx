import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react'; // Globe ikonu eklendi
import { getRandomSquare, getSquareColor, generateMovePuzzle } from '../utils/chessLogic';
import { translations } from '../utils/translations'; // Çeviriler eklendi

import MenuScreen from './MenuScreen';
import GameScreen from './GameScreen';
import GameOverScreen from './GameOverScreen';
import Footer from './Footer';

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
    }, [gameState, mode]);

    const nextTurn = () => {
        setFeedback(null);
        if (mode === 'piece_move') {
            setCurrentSquare(generateMovePuzzle());
        } else {
            setCurrentSquare(getRandomSquare());
        }
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

        // Initial Square Generation based on mode
        if (selectedMode === 'piece_move') {
            setCurrentSquare(generateMovePuzzle());
        } else {
            setCurrentSquare(getRandomSquare());
        }
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

        let target = currentSquare;
        // Adjust if we are in piece_move mode (nested target)
        if (mode === 'piece_move' && currentSquare.target) {
            target = currentSquare.target;
        }

        const squareId = `${target.file}${target.rank}`;
        setCurrentSessionLog(prev => [...prev, { square: squareId, result, fileIdx: target.fileIdx, rank: target.rank }]);
    };

    const handleColorGuess = (color) => {
        const actualColor = getSquareColor(currentSquare.fileIdx, currentSquare.rank);
        if (color === actualColor) handleCorrect();
        else handleWrong();
    };

    const handleBoardClick = (fileIdx, rank) => {
        if (gameState !== 'playing') return;

        // Allowed modes
        if (mode !== 'coordinate' && mode !== 'blind_coordinate' && mode !== 'piece_move') return;

        let isCorrect = false;

        if (mode === 'piece_move') {
            if (currentSquare && currentSquare.target && fileIdx === currentSquare.target.fileIdx && rank === currentSquare.target.rank) {
                isCorrect = true;
            }
        } else {
            if (fileIdx === currentSquare.fileIdx && rank === currentSquare.rank) {
                isCorrect = true;
            }
        }

        if (isCorrect) handleCorrect();
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
        <div className="min-h-screen bg-surface text-white font-sans flex flex-col items-center justify-center p-4 selection:bg-aqua selection:text-black">

            {/* Header & Language Toggle */}
            <div className="mb-8 text-center relative w-full max-w-4xl flex flex-col items-center">
                <button
                    onClick={toggleLanguage}
                    className={`p-3 bg-white/5 hover:bg-aqua hover:text-black rounded-lg border border-white/10 transition-all duration-300 items-center gap-2 text-sm font-bold text-slate-300 hover:border-aqua mb-4 md:mb-0 md:absolute md:right-8 md:top-0 ${gameState !== 'menu' ? 'hidden md:flex' : 'flex'}`}
                >
                    <Globe className="w-4 h-4" />
                    {lang === 'tr' ? 'EN' : 'TR'}
                </button>

                <div className="mb-4 flex items-center justify-center">
                    <img src="/banner.png" alt="Chess Warmup" className="h-16 md:h-36 w-auto object-contain drop-shadow-lg" />
                </div>
                <p className="text-slate-400 text-sm md:text-base tracking-widest uppercase font-medium">{t.header.subtitle}</p>
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
            <Footer />
        </div>
    );
}