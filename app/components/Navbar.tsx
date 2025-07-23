'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, isVisible = true }) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const navItems = [
    { icon: HomeIcon, label: 'Home', id: 'home' },
    { icon: BriefcaseIcon, label: 'Summary', id: 'summary' },
    { icon: UserIcon, label: 'Experience', id: 'experience' },
    { icon: WrenchScrewdriverIcon, label: 'Skills', id: 'skills' },
    { icon: LinkIcon, label: 'Links', id: 'links' },
  ];

  const updateIndicator = () => {
    const activeIndex = navItems.findIndex(item => item.id === activeTab);
    const activeElement = itemRefs.current[activeIndex];
    
    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();
      
      setIndicatorStyle({
        width: activeRect.width,
        left: activeRect.left - navRect.left - 15,
      });
    }
  };

  useEffect(() => {
    // Initial setup
    const timer = setTimeout(updateIndicator, 100);
    
    // Update on resize
    const handleResize = () => updateIndicator();
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div 
      className={`fixed w-[100vw] pt-2 pb-3 sm:w-auto bottom-0 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50 sm:backdrop-blur-none backdrop-blur-md transition-all duration-500 ${
        isVisible ? 'translate-y-0 sm:translate-y-0 opacity-100' : 'translate-y-0 opacity-0'
      }`}
    >

      <nav 
        ref={navRef}
        className="relative w-[90vw] m-auto sm:w-auto max-w-md sm:max-w-none bg-black/20 backdrop-blur-lg rounded-full mt-1 mb-0.5 px-3 py-3 sm:px-3 sm:py-3 border border-white/10 shadow-2xl"
      >
        {/* Sliding indicator */}
        <div
          className="absolute top-2 sm:top-3 bg-gradient-to-br from-black via-black to-orange-400 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{
            width: `${indicatorStyle.width + 5}px`, // slightly wider on mobile
            height: '70%', // taller on mobile
            transform: `translateX(${indicatorStyle.left}px)`,
            opacity: indicatorStyle.width > 0 ? 1 : 0,
          }}
        />

        
        {/* Navigation items */}
        <div className="relative flex items-center justify-around gap-1 sm:gap-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                ref={el => {itemRefs.current[index] = el}}
                onClick={() => handleTabClick(item.id)}
                className={`relative z-10 px-3 py-2 sm:px-4 sm:py-3 rounded-full font-medium flex items-center gap-1.5 sm:gap-2 transition-all duration-300 text-xs sm:text-sm md:text-base group ${
                  isActive 
                    ? 'text-orange-200 scale-105' 
                    : 'text-white/70 hover:text-white hover:scale-105'
                } hover:shadow-lg`}
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                <IconComponent 
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isActive 
                      ? 'scale-110 drop-shadow-sm' 
                      : 'group-hover:scale-110'
                  }`} 
                />
                <span 
                  className={`hidden sm:inline transition-all duration-300 ${
                    isActive 
                      ? 'font-semibold drop-shadow-sm' 
                      : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
                {/* Mobile label - shows only on active */}
                <span 
                  className={`sm:hidden text-[16px] transform absolute opacity-0`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl opacity-50" />
      </nav>
            <div className="sm:hidden text-orange-400 text-sm text-center font-medium">
          {navItems.find(item => item.id === activeTab)?.label}
        </div>
    </div>
  );
};

export default Navbar;