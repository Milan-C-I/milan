"use client";

import React, { useState, useEffect, useRef } from "react";

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<{name: string, description: string} | null>(null);
  const [categoriesInView, setCategoriesInView] = useState<boolean[]>([]);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const letters = "SKILLS".length;
      let currentLetter = 0;
      const letterTimer = setInterval(() => {
        if (currentLetter < letters) {
          setVisibleLetters(currentLetter + 1);
          currentLetter++;
        } else {
          clearInterval(letterTimer);
        }
      }, 150);

      return () => clearInterval(letterTimer);
    }
  }, [isVisible]);

  // Intersection Observer for category animations
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    categoryRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setCategoriesInView(prev => {
                const newState = [...prev];
                newState[index] = entry.isIntersecting;
                return newState;
              });
            });
          },
          { threshold: 0.2 }
        );
        
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React.js", icon: "⚛️", description: "Component-based UI library" },
        { name: "Next.js", icon: "▲", description: "Full-stack React framework" },
        { name: "TypeScript", icon: "🔷", description: "Typed JavaScript superset" },
        { name: "Tailwind CSS", icon: "💨", description: "Utility-first CSS framework" },
        { name: "Vue.js", icon: "💚", description: "Progressive JavaScript framework" },
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", icon: "💚", description: "JavaScript runtime environment" },
        { name: "Express.js", icon: "🚀", description: "Web application framework" },
        { name: "Python", icon: "🐍", description: "High-level programming language" },
        { name: "Django", icon: "🎯", description: "Python web framework" },
        { name: "REST APIs", icon: "🔗", description: "RESTful web services" },
      ]
    },
    {
      title: "Database & Cloud",
      skills: [
        { name: "MongoDB", icon: "🍃", description: "NoSQL document database" },
        { name: "PostgreSQL", icon: "🐘", description: "Relational database system" },
        { name: "Firebase", icon: "🔥", description: "Backend-as-a-Service platform" },
        { name: "AWS", icon: "☁️", description: "Cloud computing services" },
        { name: "Redis", icon: "🔴", description: "In-memory data structure store" },
      ]
    },
    {
      title: "Development Tools",
      skills: [
        { name: "Git", icon: "📚", description: "Version control system" },
        { name: "Docker", icon: "🐳", description: "Containerization platform" },
        { name: "VS Code", icon: "💙", description: "Source code editor" },
        { name: "Linux", icon: "🐧", description: "Open-source operating system" },
        { name: "Figma", icon: "🎨", description: "Design and prototyping tool" },
      ]
    }
  ];

  // Initialize categoriesInView array
  useEffect(() => {
    setCategoriesInView(new Array(skillCategories.length).fill(false));
  }, []);

  return (
    <div className="min-h-screen bg-none text-white overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Skills Content */}
        <div className="flex-1 p-8 xl:p-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-16">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                ref={el => {categoryRefs.current[categoryIndex] = el}}
                className={`transform transition-all duration-700 ease-out ${
                  categoriesInView[categoryIndex] 
                    ? "opacity-0 translate-x-12" 
                    : "opacity-100 -translate-x-0"
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl xl:text-3xl font-bold text-gray-300 border-b border-gray-700 pb-3">
                    {category.title}
                  </h3>
                  {/* Hovered skill info */}
                  <div className={`transition-opacity duration-300 ${hoveredSkill ? 'opacity-100' : 'opacity-0'}`}>
                    {hoveredSkill && (
                      <div className="text-right">
                        <h4 className="text-lg font-semibold text-blue-300 mb-1">
                          {hoveredSkill.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {hoveredSkill.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className={`skill-card group relative bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 transition-all duration-300 hover:scale-[1.05] cursor-pointer overflow-hidden h-16 transform ${
                        categoriesInView[categoryIndex] 
                          ? "opacity-0 translate-y-8" 
                          : "opacity-100 translate-y-0"
                      }`}
                      style={{ 
                        transitionDelay: `${skillIndex * 100}ms`
                      }}
                      onMouseEnter={() => setHoveredSkill({name: skill.name, description: skill.description})}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Moving border light effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 rounded-lg overflow-hidden">
                          <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg animate-spin-slow opacity-75"></div>
                          <div className="absolute inset-[2px] bg-gray-900 rounded-lg"></div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center h-full px-3">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-300 mr-2 flex-shrink-0">
                          {skill.icon}
                        </span>
                        <h4 className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 truncate">
                          {skill.name}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Vertical Skills Header with Abstract Background */}
        <div className="w-80 xl:w-96 relative bg-gray-900 flex items-center justify-center">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full">
              {/* Geometric shapes */}
              <div className="absolute top-20 left-10 w-16 h-32 bg-white/10 transform rotate-12 animate-float"></div>
              <div className="absolute top-40 right-8 w-24 h-16 bg-white/5 transform -rotate-6 animate-float-delayed"></div>
              <div className="absolute bottom-40 left-6 w-20 h-20 bg-white/10 transform rotate-45 animate-float"></div>
              <div className="absolute bottom-20 right-12 w-28 h-12 bg-white/5 transform rotate-12 animate-float-delayed"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 transform -translate-x-1/2 -translate-y-1/2 rotate-30 animate-float"></div>
              
              {/* Lines */}
              <div className="absolute top-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Vertical Skills Text with slide animation */}
          <div className="relative z-10 flex flex-col items-center">
            {"SKILLS".split("").map((letter, index) => (
              <div
                key={index}
                className={`text-7xl xl:text-8xl font-black text-white transform transition-all duration-700 ease-out mb-2 ${
                  visibleLetters > index 
                    ? "opacity-100 translate-x-0 scale-100" 
                    : "opacity-0 translate-x-8 scale-75"
                }`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  textShadow: "0 0 30px rgba(255,255,255,0.3)",
                  letterSpacing: "0.1em"
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen p-6">
        {/* Mobile Header - Horizontal at top left */}
        <div className="mb-12">
          <h2 
            className={`text-4xl sm:text-5xl font-black text-white transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{ 
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
              letterSpacing: "0.1em"
            }}
          >
            SKILLS
          </h2>
          <div 
            className={`w-16 h-1 bg-gradient-to-r from-white to-gray-600 mt-2 rounded-full transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          />
        </div>

        {/* Mobile Skills Content */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              ref={el => {categoryRefs.current[categoryIndex] = el}}
              className={`transform transition-all duration-700 ease-out ${
                categoriesInView[categoryIndex] 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-300 border-b border-gray-700 pb-2 mb-2">
                  {category.title}
                </h3>
                {/* Hovered skill info for mobile */}
                <div className={`transition-opacity duration-300 ${hoveredSkill ? 'opacity-100' : 'opacity-0'} h-12`}>
                  {hoveredSkill && (
                    <div>
                      <h4 className="text-sm font-semibold text-blue-300 mb-1">
                        {hoveredSkill.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {hoveredSkill.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Horizontal scroll for mobile */}
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`skill-card group relative flex-shrink-0 w-32 h-12 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 transition-all duration-300 hover:scale-[1.05] overflow-hidden transform ${
                      categoriesInView[categoryIndex] 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ 
                      transitionDelay: `${skillIndex * 100}ms`
                    }}
                    onMouseEnter={() => setHoveredSkill({name: skill.name, description: skill.description})}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Moving border light effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-lg overflow-hidden">
                        <div className="absolute inset-[-2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg animate-spin-slow opacity-75"></div>
                        <div className="absolute inset-[2px] bg-gray-900 rounded-lg"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center h-full px-3">
                      <span className="text-lg group-hover:scale-110 transition-transform duration-300 mr-2 flex-shrink-0">
                        {skill.icon}
                      </span>
                      <h4 className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors duration-300 truncate">
                        {skill.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-2deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .skill-card {
          position: relative;
        }

        .skill-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          border-radius: 0.5rem;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: -1;
        }

        .skill-card:hover::before {
          opacity: 0.7;
          animation: spin-slow 3s linear infinite;
        }

        .skill-card::after {
          content: '';
          position: absolute;
          inset: 2px;
          background: rgb(17 24 39);
          border-radius: 0.375rem;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default Skills;