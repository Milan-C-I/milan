"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiVuedotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiDjango, 
  SiMongodb, 
  SiPostgresql, 
  SiFirebase, 
  SiAwsamplify, 
  SiRedis, 
  SiGit, 
  SiDocker, 
  SiVsco, 
  SiLinux, 
  SiFigma 
} from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; description: string } | null>(null);
  const [skillsInView, setSkillsInView] = useState<boolean[]>([]);
  const skillsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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

  // Initialize skills visibility array
  useEffect(() => {
    setSkillsInView(new Array(allSkills.length).fill(false));
  }, []);

  // Intersection Observer for slide animations
  useEffect(() => {
    if (!skillsRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setSkillsInView(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const skillElements = skillsRef.current.querySelectorAll('.skill-card');
    skillElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const allSkills = [
    { name: "React.js", icon: SiReact, description: "Component-based UI library" },
    { name: "Next.js", icon: SiNextdotjs, description: "Full-stack React framework" },
    { name: "TypeScript", icon: SiTypescript, description: "Typed JavaScript superset" },
    { name: "Tailwind CSS", icon: SiTailwindcss, description: "Utility-first CSS framework" },
    { name: "Vue.js", icon: SiVuedotjs, description: "Progressive JavaScript framework" },
    { name: "Node.js", icon: SiNodedotjs, description: "JavaScript runtime environment" },
    { name: "Express.js", icon: SiExpress, description: "Web application framework" },
    { name: "Python", icon: SiPython, description: "High-level programming language" },
    { name: "Django", icon: SiDjango, description: "Python web framework" },
    { name: "REST APIs", icon: FaServer, description: "RESTful web services" },
    { name: "MongoDB", icon: SiMongodb, description: "NoSQL document database" },
    { name: "PostgreSQL", icon: SiPostgresql, description: "Relational database system" },
    { name: "Firebase", icon: SiFirebase, description: "Backend-as-a-Service platform" },
    { name: "AWS", icon: SiAwsamplify, description: "Cloud computing services" },
    { name: "Redis", icon: SiRedis, description: "In-memory data structure store" },
    { name: "Git", icon: SiGit, description: "Version control system" },
    { name: "Docker", icon: SiDocker, description: "Containerization platform" },
    { name: "VS Code", icon: VscVscode, description: "Source code editor" },
    { name: "Linux", icon: SiLinux, description: "Open-source operating system" },
    { name: "Figma", icon: SiFigma, description: "Design and prototyping tool" },
  ];

  return (
    <div className="bg-none text-white overflow-hidden">
      <div className="py-6 overflow-hidden">
        <div className="mb-12">
          <h2
            className={`text-2xl sm:text-4xl mb-8 font-extrabold md:font-semibold leading-none tracking-tight text-white transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            TECHNICAL SKILLS
          </h2>

          <div className={`transition-opacity duration-300 ${hoveredSkill ? "opacity-100" : "opacity-0"} h-12 mb-4`}>
            {hoveredSkill && (
              <div>
                <h4 className="text-sm font-semibold text-orange-300 mb-1">{hoveredSkill.name}</h4>
                <p className="text-xs text-gray-400">{hoveredSkill.description}</p>
              </div>
            )}
          </div>

          <div ref={skillsRef} className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide flex-wrap overflow-hidden">
            {allSkills.map((skill, skillIndex) => {
              const IconComponent = skill.icon;
              const isInView = skillsInView[skillIndex];
              
              return (
                <div
                  key={skill.name}
                  data-index={skillIndex}
                  className={`skill-card ml-1 group relative flex-shrink-0 w-40 sm:w-52 sm:h-32 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800 transition-all duration-700 hover:scale-[1.05] overflow-hidden transform ${
                    isInView 
                      ? 'opacity-100 translate-x-0 translate-y-0' 
                      : 'opacity-0 translate-x-[-100px] translate-y-8'
                  }`}
                  style={{ 
                    transitionDelay: `${skillIndex * 10}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                  onMouseEnter={() => setHoveredSkill({ name: skill.name, description: skill.description })}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="absolute inset-[-2px] bg-gradient-to-r from-gray-900 via-orange-500 to-white rounded-lg animate-spin-slow opacity-75"></div>
                      <div className="absolute inset-[4px] bg-gradient-to-br from-black via-black to-orange-400 rounded-lg"></div>
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col justify-center items-center h-full p-3">
                    <IconComponent 
                      className="text-2xl group-hover:scale-110 transition-all duration-300 mr-2 flex-shrink-0 text-gray-400 group-hover:text-orange-300"
                    />
                    <h4 className="text-xs font-semibold text-gray-400 group-hover:text-orange-300 transition-colors duration-300 truncate mt-2 text-center">
                      {skill.name}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes slideOutToLeft {
          from {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100px) translateY(20px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
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
          background: conic-gradient(from 0deg, #3b82f6, #f97316, #000000, #3b82f6);
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
          background: #1b1c1f;
          border-radius: 0.375rem;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};

export default Skills;