'use client';

import React from 'react';
import { GoDownload } from 'react-icons/go';
import { MdOutlineFileDownload } from 'react-icons/md';

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
      
      {/* Download Resume Button */}
      <div className={`z-10 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
        <button 
        className={`w-fit mb-6 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"} cursor-pointer
    group flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent
    transition-all duration-300 transform-gpu
    bg-gradient-to-br from-black via-black/80 to-orange-400 
    scale-110 hover:shadow-xl shadow-orange-500/50
  `}
        >
          <MdOutlineFileDownload className="w-4 h-4 text-orange-500 sm:w-5 sm:h-5 transition-all duration-300 group-hover:scale-110" />
          <span className="sm:inline font-bold text-white transition-all duration-300 group-hover:text-white">Resume</span>
          {/* <span className="sm:hidden">CV</span> */}
        </button>
      </div>
    </div>
  );
};

export default Header;