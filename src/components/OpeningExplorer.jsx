import React, { useState } from 'react';
import { BookOpen, Sword, Shield, Crown, ChevronDown, ChevronRight, Hash } from 'lucide-react';

const OPENINGS = [
    {
        id: 1,
        name: "Ruy Lopez",
        nameTr: "Ruy Lopez",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
        icon: Sword,
        description: {
            en: "The Ruy Lopez is one of the oldest and most popular chess openings. White attacks the knight on c6 which defends the e5 pawn. It leads to complex and strategic positions.",
            tr: "Ruy Lopez, en eski ve en popüler satranç açılışlarından biridir. Beyaz, e5 piyonunu savunan c6'daki atı tehdit eder. Karmaşık ve stratejik konumlara yol açar."
        }
    },
    {
        id: 2,
        name: "Sicilian Defense",
        nameTr: "Sicilya Savunması",
        moves: "1. e4 c5",
        icon: Shield,
        description: {
            en: "The Sicilian Defense is a sharp and aggressive counter to 1.e4. Black fights for the center from the flank (c5) and avoids symmetry. It is the most popular response to e4.",
            tr: "Sicilya Savunması, 1.e4'e karşı keskin ve agresif bir yanıttır. Siyah, kanattan (c5) merkez için savaşır ve simetriden kaçınır. e4'e karşı en popüler cevaptır."
        }
    },
    {
        id: 3,
        name: "Queen's Gambit",
        nameTr: "Vezir Gambiti",
        moves: "1. d4 d5 2. c4",
        icon: Crown,
        description: {
            en: "The Queen's Gambit is a solid choice for White. White offers a pawn (c4) to divert Black's d5 pawn and control the center. Black can accept or decline the gambit.",
            tr: "Vezir Gambiti, Beyaz için sağlam bir seçimdir. Beyaz, Siyah'ın d5 piyonunu saptırmak ve merkezi kontrol etmek için bir piyon (c4) önerir. Siyah gambiti kabul edebilir veya reddedebilir."
        }
    },
    {
        id: 4,
        name: "French Defense",
        nameTr: "Fransız Savunması",
        moves: "1. e4 e6 2. d4 d5",
        icon: BookOpen,
        description: {
            en: "The French Defense is a solid and resilient defense. Black stakes a claim in the center with 1...e6 and 2...d5 while keeping the position closed. It can lead to strategic maneuvering.",
            tr: "Fransız Savunması, sağlam ve dirençli bir savunmadır. Siyah, konumu kapalı tutarken 1...e6 ve 2...d5 ile merkezde hak iddia eder. Stratejik manevralara yol açabilir."
        }
    },
    {
        id: 5,
        name: "King's Indian Defense",
        nameTr: "Şah Hint Savunması",
        moves: "1. d4 Nf6 2. c4 g6",
        icon: Hash,
        description: {
            en: "A hypermodern opening where Black allows White to build a strong center with pawns, planning to undermine it later with piece play and pawn breaks.",
            tr: "Siyahın Beyaz'ın piyonlarla güçlü bir merkez kurmasına izin verdiği, daha sonra taş oyunu ve piyon kırışlarıyla onu zayıflatmayı planladığı hipermodern bir açılış."
        }
    }
];

export default function OpeningExplorer({ lang = 'en' }) {
    const [expandedId, setExpandedId] = useState(null);
    const [isComponentExpanded, setIsComponentExpanded] = useState(false);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const toggleComponent = () => {
        setIsComponentExpanded(!isComponentExpanded);
    };

    return (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 w-full max-w-md transition-all duration-300">
            <div
                onClick={toggleComponent}
                className="flex items-center justify-between cursor-pointer group/header"
            >
                <h3 className="text-xl font-bold flex items-center gap-2 text-white mb-0">
                    <BookOpen className="w-5 h-5 text-aqua" />
                    {lang === 'tr' ? 'Açılış Gezgini' : 'Openings Explorer'}
                </h3>
                {isComponentExpanded
                    ? <ChevronDown className="w-5 h-5 text-slate-400 group-hover/header:text-white transition-colors" />
                    : <ChevronRight className="w-5 h-5 text-slate-400 group-hover/header:text-white transition-colors" />
                }
            </div>

            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isComponentExpanded ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="relative pl-6 border-l-2 border-aqua/30 space-y-8">
                    {OPENINGS.map((opening) => {
                        const Icon = opening.icon;
                        const isExpanded = expandedId === opening.id;
                        const name = lang === 'tr' && opening.nameTr ? opening.nameTr : opening.name;
                        const description = opening.description[lang] || opening.description.en;

                        return (
                            <div key={opening.id} className="relative group">
                                {/* Timeline Node */}
                                <div className={`absolute -left-[33px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 bg-[#1a1a1a] ${isExpanded ? 'border-aqua text-aqua' : 'border-aqua/50 text-slate-500 group-hover:border-aqua/80 group-hover:text-aqua/80'}`}>
                                    <Icon className="w-4 h-4" />
                                </div>

                                {/* Content */}
                                <div
                                    onClick={() => toggleExpand(opening.id)}
                                    className="cursor-pointer transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-aqua' : 'text-slate-300 group-hover:text-aqua'}`}>
                                            {name}
                                        </h4>
                                        {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                                    </div>

                                    <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-0.5 rounded border border-white/5 inline-block mt-1 mb-2">
                                        {opening.moves}
                                    </span>

                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
