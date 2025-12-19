import React, { useState } from 'react';
import { X, ExternalLink, CalendarDays, Newspaper } from 'lucide-react';
import { latestNews } from '../data/latestNews';

export default function LatestNews({ lang }) {
    const [selectedNews, setSelectedNews] = useState(null);

    const isEn = lang === 'en';
    const headerTitle = isEn ? "Latest News" : "Son Haberler";
    const sourceLabel = isEn ? "Source" : "Kaynak";
    const readMoreLabel = isEn ? "Read More" : "Devamını Oku";

    return (
        <div className="w-full flex flex-col gap-4 mt-8">
            {/* Header with gradient line */}
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-white shrink-0 tracking-tight flex items-center gap-2">
                    <Newspaper className="w-6 h-6 text-aqua" />
                    {headerTitle}
                </h2>
                <div className="h-[1px] bg-gradient-to-r from-aqua/50 to-transparent w-full"></div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x pr-4 custom-scrollbar">
                {latestNews.map((news) => (
                    <div
                        key={news.id}
                        onClick={() => setSelectedNews(news)}
                        className="min-w-[300px] max-w-[300px] h-[220px] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 
                                   cursor-pointer hover:bg-white/10 hover:border-aqua/50 hover:scale-[1.02] transition-all duration-300
                                   flex flex-col justify-between group snap-start"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-xs font-medium text-white/40 mb-3 uppercase tracking-wider">
                                <CalendarDays className="w-3 h-3 text-aqua" />
                                {news.date[lang]}
                            </div>
                            <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-aqua transition-colors line-clamp-3">
                                {news.title[lang]}
                            </h3>
                            <p className="text-sm text-white/60 line-clamp-2">
                                {news.content[lang]}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                            <span className="text-xs font-bold text-aqua tracking-wide opacity-80 group-hover:opacity-100 flex items-center gap-1">
                                {readMoreLabel}
                            </span>
                            <span className="text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full">
                                {news.sourceName}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup Modal */}
            {selectedNews && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
                    onClick={() => setSelectedNews(null)}>
                    <div
                        className="bg-[#0f1110] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedNews(null)}
                            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 text-sm font-medium text-aqua mb-4 uppercase tracking-widest">
                            <CalendarDays className="w-4 h-4" />
                            {selectedNews.date[lang]}
                        </div>

                        <h2 className="text-2xl font-black text-white mb-6 leading-tight">
                            {selectedNews.title[lang]}
                        </h2>

                        <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                            <p className="text-base text-white/80 leading-relaxed mb-8 whitespace-pre-wrap">
                                {selectedNews.content[lang]}
                            </p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xs text-white/40 uppercase mb-0.5">{sourceLabel}</span>
                                <span className="font-bold text-white">{selectedNews.sourceName}</span>
                            </div>
                            <a
                                href={selectedNews.sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-aqua/10 hover:bg-aqua/20 text-aqua px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                            >
                                {sourceLabel}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
