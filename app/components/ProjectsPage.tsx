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
  SiExpress
} from "react-icons/si";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  id: number;
  name: string;
  image: string;
  description: string;
  tools: string[];
  github: string;
  live: string | null;
  features: string[];
  size: "large" | "medium" | "small";
}

const ProjectsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectsInView, setProjectsInView] = useState<boolean[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const getIconComponent = (tool: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'React': SiReact,
      'Next.js': SiNextdotjs,
      'TypeScript': SiTypescript,
      'Tailwind CSS': SiTailwindcss,
      'Node.js': SiNodedotjs,
      'MongoDB': SiMongodb,
      'Firebase': SiFirebase,
      'Python': SiPython,
      'Django': SiDjango,
      'JavaScript': SiJavascript,
      'Express': SiExpress,
    };
    return iconMap[tool] || SiReact;
  };

  const projects: Project[] = [
    {
      id: 1,
      name: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "A comprehensive full-stack e-commerce platform featuring user authentication, payment integration, admin dashboard, and real-time notifications. Built with modern technologies for optimal performance.",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
      features: ["User Authentication", "Payment Integration", "Admin Dashboard", "Real-time Updates"],
      size: "large"
    },
    {
      id: 2,
      name: "Task Management App",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced filtering options.",
      tools: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/username/task-manager",
      live: null,
      features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking"],
      size: "medium"
    },
    {
      id: 3,
      name: "Social Media Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Analytics dashboard for social media management with data visualization, scheduled posting, engagement tracking, and comprehensive reporting features.",
      tools: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
      github: "https://github.com/username/social-dashboard",
      live: "https://social-dashboard-demo.vercel.app",
      features: ["Analytics", "Scheduled Posting", "Multi-platform", "Reporting"],
      size: "large"
    },
    {
      id: 4,
      name: "Weather Forecast App",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      description: "Real-time weather application with location-based forecasts, interactive maps, weather alerts, and detailed meteorological data visualization.",
      tools: ["React", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/username/weather-app",
      live: "https://weather-demo.vercel.app",
      features: ["Real-time Data", "Location-based", "Weather Alerts", "Interactive Maps"],
      size: "medium"
    },
    {
      id: 5,
      name: "Learning Management System",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      description: "Comprehensive LMS with course creation, student enrollment, progress tracking, interactive quizzes, and certificate generation features.",
      tools: ["Python", "Django", "JavaScript", "Tailwind CSS"],
      github: "https://github.com/username/lms-platform",
      live: null,
      features: ["Course Creation", "Progress Tracking", "Quizzes", "Certificates"],
      size: "large"
    },
    {
      id: 6,
      name: "Portfolio Website",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      description: "Modern portfolio website with animated components, responsive design, contact forms, blog integration, and performance optimization.",
      tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/username/portfolio",
      live: "https://portfolio-demo.vercel.app",
      features: ["Animations", "Responsive", "Blog Integration", "SEO Optimized"],
      size: "medium"
    },
    {
      id: 7,
      name: "Chat Application",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
      description: "Real-time chat application with group messaging, file sharing, emoji reactions, and end-to-end encryption.",
      tools: ["React", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com/username/chat-app",
      live: "https://chat-demo.vercel.app",
      features: ["Real-time Messaging", "File Sharing", "Group Chats", "Encryption"],
      size: "medium"
    },
    {
      id: 8,
      name: "Expense Tracker",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      description: "Personal finance management app with expense tracking, budget planning, and financial insights.",
      tools: ["React", "Firebase", "JavaScript"],
      github: "https://github.com/username/expense-tracker",
      live: "https://expense-demo.vercel.app",
      features: ["Expense Tracking", "Budget Planning", "Financial Insights", "Goal Setting"],
      size: "medium"
    }
  ];

  // Initialize projects visibility
  useEffect(() => {
    setProjectsInView(new Array(projects.length).fill(false));
  }, []);

  // Intersection Observer
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

  const getGridClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="min-h-screen text-white mb-28">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-600/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className={`mb-16 transform transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h1 className="text-6xl md:text-8xl font-black mb-12">
            PROJECTS
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl leading-relaxed mb-12">
            A showcase of my technical expertise and creative problem-solving through innovative web applications
          </p>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-16 auto-rows-fr"
        >
          {projects.map((project, index) => {
            const isInView = projectsInView[index];
            const isHovered = hoveredProject === project.id;
            const isRightSide = (index % 4) >= 2; // Determine if card is on right side of grid
            
            return (
              <div
                key={project.id}
                data-index={index}
                className={`project-card ${getGridClasses(project.size)} transform transition-all duration-700 ease-out ${
                  isInView 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : 'opacity-0 translate-x-[-50px] translate-y-20'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  perspective: '1200px'
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* 3D Container */}
                <div 
                  className={`relative w-full h-full bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 transition-all duration-500 transform-gpu flex flex-col ${
                    isHovered 
                      ? 'shadow-2xl shadow-orange-500/20 scale-105 border-orange-500/40' 
                      : 'shadow-lg shadow-black/20'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isHovered 
                      ? `rotateY(${isRightSide ? '-5deg' : '5deg'}) rotateX(5deg) translateZ(20px)` 
                      : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
                  }}
                >
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-orange-500 via-white to-orange-500 rounded-2xl animate-spin-slow opacity-75"></div>
                    <div className="absolute inset-[2px] bg-gradient-to-br from-black/90 to-black/90 rounded-2xl"></div>
                  </div>

                  {/* Project Image */}
                  <div className={`relative rounded-t-2xl ${project.size === 'large' ? 'flex-1 max-h-[50%]' : 'h-48'}`}>
                    <div className={`w-full h-full object-cover rounded-t-2xl overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-110 brightness-110' : 'scale-100'
                      }`}
                    />
                    </div>
                    {/* Overlay */}
                    <div className="absolute rounded-t-2xl inset-0 bg-gradient-to-tr from-black via-black/50 to-orange-500/30"></div>

                    {/* Project Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`text-white font-light transition-all duration-300 ${
                        project.size === 'large' ? 'text-3xl' : 'text-2xl'
                      } ${isHovered ? 'scale-110' : 'scale-100'}`}>
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 flex-1 flex flex-col">
                    {/* Description */}
                    <p className={`text-gray-300 mb-4 flex transition-all duration-300 ${
                      project.size === 'large' ? 'text-base' : 'text-sm'
                    } ${isHovered ? 'text-white scale-105' : ''}`}>
                      {project.description}
                    </p>

                    {/* Features (for large cards) */}
                    {project.size === 'large' && (
                      <div className="mb-4">
                        <h4 className="text-orange-300 font-semibold mb-2 text-sm">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.map((feature, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tools Used */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tools.slice(0, 6).map((tool, toolIndex) => {
                          const IconComponent = getIconComponent(tool);
                          return (
                            <div
                              key={tool}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 ${
                                isHovered ? 'bg-orange-500/20 text-orange-300 scale-105' : 'bg-gray-800/50 text-gray-400'
                              }`}
                              style={{
                                transitionDelay: `${toolIndex * 50}ms`,
                              }}
                            >
                              <IconComponent className="text-base" />
                              <span className="text-xs">{tool}</span>
                            </div>
                          );
                        })}
                        {project.tools.length > 6 && (
                          <span className="text-gray-500 text-xs">+{project.tools.length - 6} more</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-3 ${!project.live ? 'justify-center' : ''}`}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center mx-5 gap-2 px-4 py-2 bg-transparent border border-gray-600 rounded-lg transition-all duration-300 transform ${!project.live ? 'flex-1' : 'flex-1'} justify-center ${
                          isHovered 
                            ? 'bg-gradient-to-br from-white via-white to-orange-500 text-orange-500 border-white scale-105 shadow-lg shadow-white/20' 
                            : 'text-white hover:border-gray-400'
                        }`}
                      >
                        <FaGithub className="text-base" />
                        <span className={`font-semibold text-sm ${isHovered ? 'text-black' : ''}`}>Code</span>
                      </a>
                      
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center mx-5 gap-2 px-4 py-2 bg-transparent border border-orange-500 rounded-lg transition-all duration-300 transform flex-1 justify-center ${
                            isHovered 
                              ? 'bg-gradient-to-br from-black via-black/80 to-orange-400 text-orange-500 scale-105 shadow-lg shadow-orange-500/30' 
                              : 'text-white hover:bg-orange-500/10'
                          }`}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          <span className={`font-semibold text-sm ${isHovered ? 'text-white' : ''}`}>Live</span>
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

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .project-card {
          transform-style: preserve-3d;
        }

        .project-card:hover {
          filter: drop-shadow(0 25px 50px rgba(249, 115, 22, 0.2));
        }

        .project-card,
        .project-card * {
          will-change: transform;
        }

        /* Custom grid auto-sizing */
        .auto-rows-fr {
          grid-auto-rows: minmax(400px, auto);
        }

        @media (min-width: 768px) {
          .auto-rows-fr {
            grid-auto-rows: minmax(300px, auto);
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;