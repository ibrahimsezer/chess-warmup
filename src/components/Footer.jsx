import React from 'react';
import { Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0a0a0a] text-white py-16 px-6 md:px-20 font-sans border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                    {/* Left Section: Description */}
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-4 text-[#00D2A8]">Chess Warmup</h2>
                        <p className="text-lg leading-relaxed text-gray-300">
                            Your daily destination for chess visualization improvement.
                            Track your progress, learn openings, and master the board with our interactive tools.
                        </p>
                    </div>

                    {/* Right Section: Links */}
                    <div className="flex flex-wrap gap-12 lg:gap-24">
                        {/* Column 1: Game Modes */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="font-bold text-lg mb-2 text-[#00D2A8]">Game Modes</h4>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Vision Training</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Opening Explorer</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Daily Challenge</a>
                        </div>

                        {/* Column 2: Learn */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="font-bold text-lg mb-2 text-[#00D2A8]">Learn</h4>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Blog</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Piece Guide</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Strategy</a>
                        </div>

                        {/* Column 3: Community */}
                        <div className="flex flex-col space-y-4">
                            <h4 className="font-bold text-lg mb-2 text-[#00D2A8]">Community</h4>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">About Us</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Contact</a>
                            <a href="#" className="text-gray-400 hover:text-[#00D2A8] transition-colors">Discord</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-gray-800">
                    <div className="w-full lg:w-auto">
                        <p className="text-gray-500">© {new Date().getFullYear()} Chess Warmup - İbrahim Sezer. All rights reserved.</p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-[#00D2A8] transition-colors">
                            <Linkedin className="w-5 h-5 fill-current" />
                        </a>
                        <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-[#00D2A8] transition-colors">
                            <IconTwitterX className="w-5 h-5" />
                        </a>
                        <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-[#00D2A8] transition-colors">
                            <Youtube className="w-5 h-5 fill-current" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Custom SVG for X (Twitter)
const IconTwitterX = ({ className }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
);

export default Footer;
