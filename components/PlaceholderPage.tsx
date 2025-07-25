'use client';

import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  isVisible?: boolean;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description, 
  isVisible = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 xl:px-32">
      <div className={`text-center ${isVisible ? 'slide-up' : 'opacity-0 translate-y-8'}`}>
        <h1 className="text-white text-shadow font-black text-4xl sm:text-6xl lg:text-7xl mb-8 tracking-tight">
          {title}
        </h1>
        <p className="text-white/85 text-lg sm:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
          {description}
        </p>
        <div className="mt-12">
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-10 rounded-full border border-white/20">
            <span className="text-white/70 text-sm">Coming Soon...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;