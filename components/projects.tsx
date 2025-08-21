"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiMongodb, 
  SiFirebase, 
  SiPython, 
  SiDjango,
  SiJavascript,
  SiExpress,
  SiCss3,
  SiUnity,
  SiSocketdotio,
  SiPrisma,
  SiExpo,
  SiStorybook,
  SiOpenai,
  SiPostgresql
} from "react-icons/si";
import { FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectsInView, setProjectsInView] = useState<boolean[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const projectsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Initialize projects visibility array
  useEffect(() => {
    setProjectsInView(new Array(projects.length).fill(false));
    cardRefs.current = new Array(projects.length).fill(null);
  }, []);

  // Mouse move handler for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -15; // Max 15 degrees
    const rotateY = (mouseX / (rect.width / 2)) * 15;   // Max 15 degrees
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Intersection Observer for slide animations
  useEffect(() => {
    if (!projectsRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setProjectsInView(prev => {
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

    const projectElements = projectsRef.current.querySelectorAll('.project-card');
    projectElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getIconComponent = (tool: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'React': SiReact,
      'Next.js': SiNextdotjs,
      'TypeScript': SiTypescript,
      'Tailwind CSS': SiTailwindcss,
      'Node.js': SiNodedotjs,
      'MongoDB': SiMongodb,
      'JavaScript': SiJavascript,
      'CSS' : SiCss3,
      'C#': TbBrandCSharp,
      'Unity': SiUnity,
      'Unity Physics': SiUnity,
      'Visual Studio': VscVscode,
      'Socket.io': SiSocketdotio,
      'Prisma ORM': SiPrisma,
      'Expo': SiExpo,
      'Storybook': SiStorybook,
      'bcryptjs': SiNodedotjs,
      'openai': SiOpenai,
      'PostgreSQL': SiPostgresql,
      'npm package': SiNodedotjs,
    };
    return iconMap[tool] || SiReact;
  };

  const projects = [
    {
  id: 1,
  name: "genshin-web-info",
  image: "/genshinatlas.vercel.app_.png",
  description: "A fullstack web app displaying Genshin Impact data with dynamic routing, SSR, and Tailwind styling for seamless performance.",
  tools: ["React", "Next.js", "TypeScript", "JavaScript", "MongoDB", "Tailwind CSS"],
  github: "https://github.com/Milan-C-I/genshin-web-info",
  live: "https://genshinatlas.vercel.app"
},
{
  id: 2,
  name: "youtube watch party",
  image: "/youtubewatchparty.vercel.app_.png",
  description: "Enjoy watching YouTube videos with friends in sync. Create a room, share the code, and experience seamless group viewing.",
  tools: ["Socket.io","React","Next.js","TypeScript","JavaScript","Tailwind CSS",],
  github: "https://github.com/Milan-C-I/ytsync",
  live: "https://youtubewatchparty.vercel.app/"
},
{
  id: 3,
  name: "Cube_Game",
  image: "/Cube_game.png",
  description: "A Unity 3D game where players navigate a cube through obstacles. Built using Unity physics with C# scripting.",
  tools: ["Unity", "C#", "Unity Physics", "Visual Studio"],
  github: "https://github.com/Milan-C-I/Cube_Game",
  live: null
},
{
  id: 4,
  name: "elim-nation",
  image: "/elim-nation.vercel.app_.png",
  description: "Elim Nation is a dedicated event website created for Elim Nation, an event conducted under Enigma. The site provides event details, schedules, highlights, and visual branding to engage participants and visitors.",
  tools: ["React","Next.js","TypeScript","JavaScript","MongoDB","Prisma ORM","Tailwind CSS",],
  github: "https://github.com/Milan-C-I/elim-nation",
  live: "https://elim-nation.vercel.app"
},
{
  id: 5,
  name: "reactnativeepictrailsds",
  image: "/www.npmjs.com_package_reactnativeepictrailsds.png",
  description: "Epic Trails DS is a React Native design system built by the Flourish development team to ensure consistency, scalability, and efficiency in UI/UX development. Using Storybook, this project provides a structured approach to component-based design, making it easier to create and maintain visually cohesive applications.",
  tools: ["React Native","Node.js","npm package", "TypeScript", "Expo", "React", "Tailwind CSS", "Storybook"],
  github: "https://github.com/Milan-C-I/reactnativeepictrailsds",
  live: "https://www.npmjs.com/package/reactnativeepictrailsds"
},
{
  id: 6,
  name: "Habit Tracker",
  image: "/habitpulse-tracker.vercel.app_.png",
  description: "The Health Habit Tracker is a web app that helps users build and maintain healthy routines by providing a clear overview of their daily habits. It allows users to create and log habits, track total, completed, and active habits, and stay consistent with an easy-to-use logging system. With secure authentication, each user gets a personalized experience, while interactive graphs and visual insights showcase progress and overall consistency. Designed with a clean and responsive interface, the app makes tracking habits simple, engaging, and motivating.",
  tools: ["React","Next.js","TypeScript","openai","PostgreSQL","Prisma ORM","Tailwind CSS",],
  github: "https://github.com/Milan-C-I/health-habit-tracker",
  live: "https://habitpulse-tracker.vercel.app/"
}
];

  return (
    <div className="bg-none text-white">
      <div className="py-6">
        <div className="mb-12">
          <h2
            className={`text-2xl sm:text-4xl mb-8 font-extrabold md:font-semibold leading-none tracking-tight text-white transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            FEATURED PROJECTS
          </h2>

          <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const isInView = projectsInView[index];
              const isHovered = hoveredProject === index;
              
              return (
                <div
                  key={project.id}
                  data-index={index}
                  className={`project-card relative transform transition-all duration-700 ease-out ${
                    isInView 
                      ? 'opacity-100 translate-x-0 translate-y-0' 
                      : 'opacity-0 -translate-x-20 translate-y-20'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 50}ms`,
                    perspective: '1200px'
                  }}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => {
                    setHoveredProject(null);
                    handleMouseLeave();
                  }}
                  onMouseMove={(e) => isHovered && handleMouseMove(e, index)}
                >
                  {/* 3D Container */}
                  <div 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`relative w-full h-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-black/10  transition-all duration-300 transform-gpu ${
                      isHovered 
                        ? 'shadow-2xl shadow-orange-500/30' 
                        : 'shadow-lg shadow-black/20'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isHovered 
                        ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) translateZ(20px)` 
                        : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
                      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                    }}
                  >
                    {/* Glowing border effect */}
                    <div className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-[-2px] bg-gradient-to-r from-gray-900 via-orange-500 to-white rounded-xl animate-spin-slow opacity-75"></div>
                      <div className="absolute inset-[4px] bg-gradient-to-br from-black via-black to-orange-400 rounded-xl"></div>
                    </div>

                    {/* Image Section with Gradient Overlay */}
                    <div 
                      className="relative h-48"
                      style={{
                        transform: isHovered ? 'translateZ(60px)' : 'translateZ(0px)',
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                        <div className={`w-full h-full object-cover rounded-xl overflow-hidden`}>
                      <img
                        src={project.image}
                        alt={project.name}
                        className={`w-full h-full object-cover object-top transition-all duration-500 ${
                          isHovered ? 'scale-110 brightness-110' : 'scale-100'
                        }`}
                      />
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-black via-black/50 to-orange-500/30"></div>
                      
                      {/* Project Name on Image */}
                      <div 
                        className="absolute left-6 bottom-0 transform -translate-y-1/2"
                        style={{
                          transform: isHovered 
                            ? 'translateY(-50%) translateX(-10%) translateZ(80px)' 
                            : 'translateY(-50%) translateX(0%) translateZ(0px)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <h3 className={`text-2xl text-white  font-light drop-shadow-2xl transition-all duration-300 ${
                          isHovered ? ' scale-110' : 'scale-100'
                        }`}>
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div 
                      className="relative p-6"
                      style={{
                        transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)',
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {/* Description */}
                      <p 
                        className={` text-sm mb-4 transition-all duration-300 ${
                          isHovered ? 'text-white scale-105' : 'text-gray-300'
                        }`}
                        style={{
                          transform: isHovered ? 'translateZ(360px)' : 'translateZ(0px)',
                          transition: 'all 0.3s ease-out'
                        }}
                      >
                        {project.description}
                      </p>

                      {/* Tools Used */}
                      <div 
                        className="mb-6"
                        style={{
                          transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <div className="flex flex-wrap gap-2">
                          {project.tools.map((tool, toolIndex) => {
                            const IconComponent = getIconComponent(tool);
                            return (
                              <div
                                key={tool}
                                className={`flex items-center gap-1 px-2 py-1 hover:scale-110 hover:rotate-3  rounded-md text-xs transition-all duration-300 ${
                                  isHovered ? 'bg-orange-500/20 text-orange-300 scale-105' : 'bg-gray-800/50 text-gray-400'
                                }`}
                                style={{
                                  transitionDelay: `${toolIndex * 50}ms`,
                                  transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)'
                                }}
                              >
                                <IconComponent className="text-xl" />
                                <span>{tool}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div 
                        className="flex gap-4"
                        style={{
                          transform: isHovered ? 'translateZ(70px)' : 'translateZ(0px)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-4 border border-gray-600 py-2 bg-transparent rounded-lg transition-all duration-300 transform ${
                            isHovered 
                              ? ' bg-gradient-to-br from-white via-white/80 to-orange-400 scale-110 shadow-2xl shadow-orange-500/50 translateZ-90' 
                              : ''
                          }`}
                          style={{
                            transform: isHovered ? 'translateZ(90px) scale(1.05)' : 'translateZ(0px) scale(1)',
                            boxShadow: isHovered ? '0 20px 40px rgba(249, 115, 22, 0.4)' : 'none'
                          }}
                        >
                          <FaGithub className={`${isHovered ? 'text-orange-500 text-xl' : ' text-white text-sm' }`} />
                          <span className={`text-sm font-semibold ${isHovered ? 'text-black' : ' text-white' }`}>Code</span>
                        </a>
                        
                        {project.live && (
                          <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center border border-orange-500 bg-transparent gap-2 px-4 py-2 rounded-lg transition-all duration-300 transform ${
                            isHovered 
                              ? ' bg-gradient-to-br from-black via-black/80 to-orange-400 scale-110 shadow-2xl shadow-white/50 translateZ-90' 
                              : ' '
                          }`}
                          style={{
                            transform: isHovered ? 'translateZ(90px) translateX(10px) scale(1.05)' : 'translateZ(0px) scale(1)',
                            boxShadow: isHovered ? '0 20px 40px rgba(255, 255, 255, 0.3)' : 'none'
                          }}
                        >
                          <FaExternalLinkAlt className={` ${isHovered ? 'text-orange-500 text-xs' : ' text-white text-sm' }`} />
                          <span className={`text-sm font-semibold`}>Live Demo</span>
                        </a>
                        )}
                      </div>
                    </div>
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

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .project-card {
          transform-style: preserve-3d;
        }

        /* Enhanced 3D effects */
        .translateZ-90 {
          transform: translateZ(90px);
        }

        /* Smooth transitions for all 3D elements */
        .project-card * {
          backface-visibility: hidden;
        }

        /* Additional glow effects for hovered state */
        .project-card:hover {
          filter: drop-shadow(0 25px 50px rgba(249, 115, 22, 0.3));
        }

        /* Ensure smooth performance */
        .project-card,
        .project-card * {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default Projects;