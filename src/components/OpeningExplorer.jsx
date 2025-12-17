import React, { useState } from 'react';
import { BookOpen, Sword, Shield, Crown, ChevronDown, ChevronRight, Hash } from 'lucide-react';

const OPENINGS = [
    {
        id: 1,
        name: "Ruy Lopez",
        moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
        icon: Sword,
        description: "The Ruy Lopez is one of the oldest and most popular chess openings. White attacks the knight on c6 which defends the e5 pawn. It leads to complex and strategic positions."
    },
    {
        id: 2,
        name: "Sicilian Defense",
        moves: "1. e4 c5",
        icon: Shield,
        description: "The Sicilian Defense is a sharp and aggressive counter to 1.e4. Black fights for the center from the flank (c5) and avoids symmetry. It is the most popular response to e4."
    },
    {
        id: 3,
        name: "Queen's Gambit",
        moves: "1. d4 d5 2. c4",
        icon: Crown,
        description: "The Queen's Gambit is a solid choice for White. White offers a pawn (c4) to divert Black's d5 pawn and control the center. Black can accept or decline the gambit."
    },
    {
        id: 4,
        name: "French Defense",
        moves: "1. e4 e6 2. d4 d5",
        icon: BookOpen,
        description: "The French Defense is a solid and resilient defense. Black stakes a claim in the center with 1...e6 and 2...d5 while keeping the position closed. It can lead to strategic maneuvering."
    },
    {
        id: 5,
        name: "King's Indian Defense",
        moves: "1. d4 Nf6 2. c4 g6",
        icon: Hash, // Using Hash as a placeholder for structure
        description: "A hypermodern opening where Black allows White to build a strong center with pawns, planning to undermine it later with piece play and pawn breaks."
    }
];

export default function OpeningExplorer() {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 w-full max-w-md">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Openings Explorer
            </h3>

            <div className="relative pl-6 border-l-2 border-amber-600/30 space-y-8">
                {OPENINGS.map((opening) => {
                    const Icon = opening.icon;
                    const isExpanded = expandedId === opening.id;

                    return (
                        <div key={opening.id} className="relative group">
                            {/* Timeline Node */}
                            <div className={`absolute -left-[33px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-300 bg-[#1a1a1a] ${isExpanded ? 'border-amber-500 text-amber-500' : 'border-amber-600/50 text-slate-500 group-hover:border-amber-500/80 group-hover:text-amber-500/80'}`}>
                                <Icon className="w-4 h-4" />
                            </div>

                            {/* Content */}
                            <div
                                onClick={() => toggleExpand(opening.id)}
                                className="cursor-pointer transition-all duration-300"
                            >
                                <div className="flex justify-between items-start">
                                    <h4 className={`text-lg font-bold transition-colors ${isExpanded ? 'text-amber-500' : 'text-slate-300 group-hover:text-amber-400'}`}>
                                        {opening.name}
                                    </h4>
                                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                                </div>

                                <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-0.5 rounded border border-white/5 inline-block mt-1 mb-2">
                                    {opening.moves}
                                </span>

                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                                        {opening.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
