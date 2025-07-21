'use client';

import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  isVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isVisible = true }) => {
  return (
    <div className="inset-0 flex items-center justify-between text-center px-6 sm:px-12 py-6">
      {/* Status Indicator */}
      <div className={`flex items-center ${isVisible ? 'slide-in-left' : 'opacity-0'}`} 
           >
        <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <span className="text-white font-medium text-sm sm:text-base">Open to work</span>
      </div>
      
      {/* Download CV Button */}
      <div className={`z-10 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold flex items-center gap-2 hover-lift transition-all duration-300 shadow-lg text-sm sm:text-base">
          <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden sm:inline">Download CV</span>
          <span className="sm:hidden">CV</span>
        </button>
      </div>
    </div>
  );
};

export default Header;