import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
    const [animate, setAnimate] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Start animation after 1.5 seconds
        const timer = setTimeout(() => {
            setAnimate(true);

            // Remove component after animation completes (1s duration matches transition)
            setTimeout(() => {
                setShow(false);
            }, 1000);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Left Panel */}
            <div
                className={`absolute left-0 top-0 w-1/2 h-full bg-surface transition-transform duration-1000 ease-in-out ${animate ? '-translate-x-full' : 'translate-x-0'
                    }`}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex justify-end pr-2 w-full">
                    {/* Optional: We could put half the text here if we wanted a true split text effect, 
               but for now we'll keep it simple with fading text */}
                </div>
            </div>

            {/* Right Panel */}
            <div
                className={`absolute right-0 top-0 w-1/2 h-full bg-surface transition-transform duration-1000 ease-in-out ${animate ? 'translate-x-full' : 'translate-x-0'
                    }`}
            />

            {/* Content */}
            <div className={`relative z-10 flex gap-3 text-5xl md:text-7xl font-black tracking-wider transition-all duration-500 transform ${animate ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
                }`}>
                <span className="text-white">CHESS</span>
                <span className="text-aqua">WARMUP</span>
            </div>
        </div>
    );
};

export default SplashScreen;
