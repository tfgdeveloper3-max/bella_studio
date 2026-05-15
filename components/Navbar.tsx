import React from 'react';
import GooeyNav from '@/components/GooeyNav';

const items = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Studio", href: "#studio" },
    { label: "Contact", href: "#contact" },
];

const Navbar = () => {
    return (
        <div className="absolute top-0 left-0 w-full z-20 py-4 md:py-6 px-6 md:px-12 lg:px-20 flex justify-between items-center overflow-hidden">
            <a href="#" className="studio-logo text-white hover:text-purple-400 transition-colors duration-300 text-2xl md:text-3xl mr-4">
                Bella J
            </a>
            <div className="relative flex-shrink-0">
                <GooeyNav
                    items={items}
                    particleCount={15}
                    particleDistances={[90, 10]}
                    particleR={100}
                    initialActiveIndex={0}
                    animationTime={600}
                    timeVariance={300}
                    colors={[1, 2, 3, 4, 1, 2]}
                />
            </div>
        </div>
    );
};

export default Navbar;