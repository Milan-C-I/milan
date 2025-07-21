// components/LandingPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  HomeIcon,
  BriefcaseIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  LinkIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface LandingPageProps {
  name?: string;
  jobTitle?: string;
  email?: string;
  linkedin?: string;
  phone?: string;
  location?: string;
}

const LandingPage: React.FC<LandingPageProps> = ({
  name = "Milan C I",
  jobTitle = "Full-Stack Developer",
  email = "milancheriyamanep@gmail.com",
  linkedin = "linkedin.com/in/milan-ci",
  phone = "+91 7019085645",
  location = "Atlanta, US"
}) => {
  const [scrollY, setscrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setscrollY(window.scrollY);
    };

    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: HomeIcon, label: 'Home' },
    { icon: BriefcaseIcon, label: 'Summary' },
    { icon: UserIcon, label: 'Experience' },
    { icon: WrenchScrewdriverIcon, label: 'Skills' },
    { icon: LinkIcon, label: 'Links' },
  ];

  return (
    <>
      {/* Custom Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        .gradient-bg {
          background: linear-gradient(
            ${45 + scrollY * 0.1}deg,
            #ff6b6b,
            #ffa500,
            #ff8c42,
            #ff6b35,
            #f7931e,
            #ff4757,
            #ff3838
          );
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          transform: rotate(${scrollY * 0.02}deg) scale(${1 + scrollY * 0.0001});
          transition: transform 0.1s ease-out;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: white; }
        }
        
        .typewriter {
          overflow: hidden;
          border-right: 2px solid white;
          white-space: nowrap;
          animation: typewriter 3s steps(40) 1s forwards, blink 1s infinite;
          width: 0;
        }
        
        .slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .status-dot {
          animation: pulse 2s infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
        
        .glass {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .text-shadow {
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden font-inter">
        {/* Animated Background */}
        <div className="fixed inset-0 gradient-bg -z-10"></div>

        <div className="inset-0 flex items-center justify-between text-center px-12 py-6">
          {/* Status Indicator */}
          <div className={`flex items-center  ${isVisible ? 'slide-in-left' : 'opacity-0 translate-x-[-50px]'}`} 
               style={{ animationDelay: '0.2s' }}>
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 status-dot"></div>
            <span className="text-white font-medium text-sm sm:text-base">Open to work</span>
          </div>
        {/* Download CV Button */}
        <div className={`z-10 ${isVisible ? 'fade-in' : 'opacity-0'}`}>

          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift transition-all duration-300 shadow-lg">
            <ArrowDownTrayIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Download CV</span>
            <span className="sm:hidden">CV</span>
          </button>
        </div>
        </div>

        {/* Main Content */}
        <div className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32">
          
          {/* Job Title */}
          <div className={`mb-4 ${isVisible ? 'slide-up' : 'opacity-0 translate-y-8'}`} 
               style={{ animationDelay: '0.4s' }}>
            <h2 className="text-white/90 text-xl sm:text-2xl lg:text-3xl font-light tracking-wide">
              {jobTitle}
            </h2>
          </div>

          {/* Name with Typewriter Effect */}
          <div className="mb-8">
            <h1 className={`text-white text-shadow font-black text-4xl sm:text-6xl lg:text-8xl xl:text-9xl leading-none tracking-tight ${isVisible ? 'typewriter' : ''}`}>
              {name}
            </h1>
          </div>

          {/* Description */}
          <div className={`mb-12 max-w-2xl ${isVisible ? 'slide-up' : 'opacity-0 translate-y-8'}`} 
               style={{ animationDelay: '0.8s' }}>
            <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              Passionate Full Stack Developer building efficient, scalable, and user-friendly web applications. I specialize in crafting seamless experiences from front-end interfaces to back-end systems. Let’s bring ideas to life with clean code and thoughtful design.
            </p>
          </div>

          {/* Contact Information */}
          <div className={`mb-12 ${isVisible ? 'slide-up' : 'opacity-0 translate-y-8'}`} 
               style={{ animationDelay: '1s' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              <div className="flex items-center text-white/90 group">
                <EnvelopeIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base truncate">{email}</span>
              </div>
              <div className="flex items-center text-white/90 group">
                <LinkIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base truncate">{linkedin}</span>
              </div>
              <div className="flex items-center text-white/90 group">
                <PhoneIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">{phone}</span>
              </div>
              <div className="flex items-center text-white/90 group">
                <MapPinIcon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-base">{location}</span>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <div className={`${isVisible ? 'slide-up' : 'opacity-0 translate-y-8'}`} 
               style={{ animationDelay: '1.2s' }}>
            <div className="glass rounded-full p-2 inline-flex flex-wrap gap-2 border border-white/10">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.label}
                    className="text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium flex items-center gap-2 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base hover-lift group"
                    style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isVisible ? 'fade-in' : 'opacity-0'}`}
             style={{ animationDelay: '2s' }}>
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
