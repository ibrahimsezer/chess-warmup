import React from 'react';
import { chessPieces } from '../data/chessPieces';

export default function PieceGuide({ lang }) {
    return (
        <div className="w-full flex flex-col gap-8 items-center justify-center py-8">
            <h2 className="text-3xl font-black text-white tracking-tight text-center">
                {lang === 'en' ? "Chess Pieces" : "Satranç Taşları"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-4">
                {chessPieces.map((piece) => (
                    <div
                        key={piece.id}
                        className="group relative bg-[#0f1110] border border-white/10 rounded-[2rem] p-5 flex flex-col items-center text-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(45,212,191,0.3)] hover:border-aqua/50"
                    >
                        {/* Diamond Image Container */}
                        <div className="relative w-36 h-36 mb-6 transition-transform duration-500 group-hover:scale-110">

                            {/* Image Mask/Wrapper */}
                            <div className="absolute inset-2 overflow-hidden rotate-45 rounded-[1.5rem]">
                                {/* Counter-rotate image to keep it upright */}
                                <img
                                    src={piece.image}
                                    alt={piece.name[lang]}
                                    className="w-[120%] h-[120%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45"
                                />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-aqua transition-colors duration-300">
                                {piece.name[lang]}
                            </h3>
                            <div className="h-0.5 w-12 bg-white/10 group-hover:w-24 group-hover:bg-aqua/50 transition-all duration-500" />
                            <p className="text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                                {piece.description[lang]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
