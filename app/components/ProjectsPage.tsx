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
import { FaGithub, FaExternalLinkAlt, FaFilter, FaSearch } from "react-icons/fa";

const ProjectsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectsInView, setProjectsInView] = useState<boolean[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
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

  const projects = [
    {
      id: 1,
      name: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      description: "A comprehensive full-stack e-commerce platform featuring user authentication, payment integration, admin dashboard, and real-time notifications. Built with modern technologies for optimal performance.",
      longDescription: "This enterprise-level e-commerce solution handles thousands of daily transactions with features including product catalog management, advanced search and filtering, shopping cart functionality, secure payment processing, order tracking, inventory management, and comprehensive analytics dashboard.",
      tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      category: "Full Stack",
      difficulty: "Advanced",
      github: "https://github.com/username/ecommerce-platform",
      live: "https://ecommerce-demo.vercel.app",
      features: ["User Authentication", "Payment Integration", "Admin Dashboard", "Real-time Updates"],
      size: "large" // For grid layout
    },
    {
      id: 2,
      name: "Task Management App",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced filtering options.",
      longDescription: "Professional project management tool designed for teams with features like real-time collaboration, task assignment, progress tracking, time logging, file attachments, and comprehensive reporting capabilities.",
      tools: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
      category: "Frontend",
      difficulty: "Intermediate",
      github: "https://github.com/username/task-manager",
      live: "https://taskmanager-demo.vercel.app",
      features: ["Real-time Collaboration", "Drag & Drop", "Team Management", "Progress Tracking"],
      size: "medium"
    },
    {
      id: 3,
      name: "Social Media Dashboard",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description: "Analytics dashboard for social media management with data visualization, scheduled posting, engagement tracking, and comprehensive reporting features.",
      longDescription: "Comprehensive social media management platform with advanced analytics, content scheduling, multi-platform integration, audience insights, and automated reporting for businesses and influencers.",
      tools: ["Next.js", "TypeScript", "Node.js", "Express", "MongoDB"],
      category: "Full Stack",
      difficulty: "Advanced",
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
      longDescription: "Advanced weather application providing accurate forecasts, severe weather alerts, historical data analysis, and beautiful data visualizations powered by multiple weather APIs.",
      tools: ["React", "JavaScript", "Tailwind CSS"],
      category: "Frontend",
      difficulty: "Beginner",
      github: "https://github.com/username/weather-app",
      live: "https://weather-demo.vercel.app",
      features: ["Real-time Data", "Location-based", "Weather Alerts", "Interactive Maps"],
      size: "small"
    },
    {
      id: 5,
      name: "Learning Management System",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
      description: "Comprehensive LMS with course creation, student enrollment, progress tracking, interactive quizzes, and certificate generation features.",
      longDescription: "Full-featured learning management system for educational institutions with course authoring tools, student progress analytics, automated grading, video streaming, and certificate management.",
      tools: ["Python", "Django", "JavaScript", "Tailwind CSS"],
      category: "Backend",
      difficulty: "Advanced",
      github: "https://github.com/username/lms-platform",
      live: "https://lms-demo.herokuapp.com",
      features: ["Course Creation", "Progress Tracking", "Quizzes", "Certificates"],
      size: "large"
    },
    {
      id: 6,
      name: "Portfolio Website",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      description: "Modern portfolio website with animated components, responsive design, contact forms, blog integration, and performance optimization.",
      longDescription: "Showcase portfolio with cutting-edge animations, optimized performance, SEO-friendly structure, integrated blog, and contact management system.",
      tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      category: "Frontend",
      difficulty: "Intermediate",
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
      longDescription: "Secure messaging platform with real-time communication, group chats, file sharing, voice messages, emoji reactions, and end-to-end encryption for privacy.",
      tools: ["React", "Node.js", "Socket.io", "MongoDB"],
      category: "Full Stack",
      difficulty: "Intermediate",
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
      longDescription: "Comprehensive personal finance tool with expense categorization, budget tracking, financial goal setting, and detailed spending analytics.",
      tools: ["React", "Firebase", "JavaScript"],
      category: "Frontend",
      difficulty: "Beginner",
      github: "https://github.com/username/expense-tracker",
      live: "https://expense-demo.vercel.app",
      features: ["Expense Tracking", "Budget Planning", "Financial Insights", "Goal Setting"],
      size: "small"
    }
  ];

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Initialize projects visibility
  useEffect(() => {
    setProjectsInView(new Array(projects.length).fill(false));
    setFilteredProjects(projects);
  }, []);

  // Filter projects based on search and category
  useEffect(() => {
    let filtered = projects;
    
    if (selectedFilter !== 'All') {
      filtered = filtered.filter(project => project.category === selectedFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredProjects(filtered);
  }, [selectedFilter, searchQuery]);

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
  }, [filteredProjects]);

  const getGridClasses = (size: string, index: number) => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'medium':
        return 'md:col-span-2 md:row-span-1';
      case 'small':
        return 'md:col-span-1 md:row-span-1';
      default:
        return 'md:col-span-1 md:row-span-1';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900/20 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full animate-twinkle"
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
        <div className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-orange-300 to-orange-500 bg-clip-text text-transparent">
            PROJECTS
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
            A showcase of my technical expertise and creative problem-solving through innovative web applications
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className={`mb-12 transform transition-all duration-1000 delay-200 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4">
              <FaFilter className="text-orange-400" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                      selectedFilter === category
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-fr"
        >
          {filteredProjects.map((project, index) => {
            const isInView = projectsInView[index];
            const isHovered = hoveredProject === project.id;
            
            return (
              <div
                key={project.id}
                data-index={index}
                className={`project-card ${getGridClasses(project.size, index)} transform transition-all duration-700 ease-out ${
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
                  className={`relative w-full h-full bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 transform-gpu ${
                    isHovered 
                      ? 'shadow-2xl shadow-orange-500/20 scale-105 border-orange-500/40' 
                      : 'shadow-lg shadow-black/20'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isHovered 
                      ? 'rotateY(5deg) rotateX(5deg) translateZ(20px)' 
                      : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
                  }}
                >
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-orange-500 via-white to-orange-500 rounded-2xl animate-spin-slow opacity-75"></div>
                    <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl"></div>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={project.image}
                      alt={project.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isHovered ? 'scale-110 brightness-110' : 'scale-100'
                      }`}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-orange-500/30"></div>
                    
                    {/* Difficulty Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm transition-all duration-300 ${
                      project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                      project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                      'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {project.difficulty}
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs font-semibold border border-orange-500/30 backdrop-blur-sm">
                      {project.category}
                    </div>

                    {/* Project Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className={`text-white font-bold transition-all duration-300 ${
                        project.size === 'large' ? 'text-2xl' : project.size === 'medium' ? 'text-xl' : 'text-lg'
                      } ${isHovered ? 'scale-105' : 'scale-100'}`}>
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 flex-1 flex flex-col">
                    {/* Description */}
                    <p className={`text-gray-300 mb-4 flex-1 transition-all duration-300 ${
                      project.size === 'large' ? 'text-base' : 'text-sm'
                    } ${isHovered ? 'text-white scale-105' : ''}`}>
                      {project.size === 'large' ? project.longDescription : project.description}
                    </p>

                    {/* Features (for large cards) */}
                    {project.size === 'large' && (
                      <div className="mb-4">
                        <h4 className="text-orange-300 font-semibold mb-2 text-sm">Key Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.map(({feature, i}: {feature: any, i: any}) => (
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
                        {project.tools.slice(0, project.size === 'small' ? 3 : 6).map(({tool, toolIndex}: {tool: string, toolIndex: number}) => {
                          const IconComponent = getIconComponent(tool);
                          return (
                            <div
                              key={tool}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 ${
                                isHovered ? 'bg-orange-500/20 text-orange-300 scale-105' : 'bg-gray-800/50 text-gray-400'
                              }`}
                              style={{
                                transitionDelay: `${toolIndex * 50}ms`,
                                fontSize: project.size === 'small' ? '10px' : '12px'
                              }}
                            >
                              <IconComponent className={project.size === 'small' ? 'text-sm' : 'text-base'} />
                              <span>{tool}</span>
                            </div>
                          );
                        })}
                        {project.tools.length > (project.size === 'small' ? 3 : 6) && (
                          <span className="text-gray-500 text-xs">+{project.tools.length - (project.size === 'small' ? 3 : 6)} more</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-transparent border border-gray-600 rounded-lg transition-all duration-300 transform flex-1 justify-center ${
                          isHovered 
                            ? 'bg-white text-black border-white scale-105 shadow-lg shadow-white/20' 
                            : 'text-white hover:border-gray-400'
                        }`}
                      >
                        <FaGithub className={project.size === 'small' ? 'text-sm' : 'text-base'} />
                        <span className={`font-semibold ${project.size === 'small' ? 'text-xs' : 'text-sm'}`}>Code</span>
                      </a>
                      
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-4 py-2 bg-transparent border border-orange-500 rounded-lg transition-all duration-300 transform flex-1 justify-center ${
                          isHovered 
                            ? 'bg-orange-500 text-white scale-105 shadow-lg shadow-orange-500/30' 
                            : 'text-orange-500 hover:bg-orange-500/10'
                        }`}
                      >
                        <FaExternalLinkAlt className={project.size === 'small' ? 'text-xs' : 'text-sm'} />
                        <span className={`font-semibold ${project.size === 'small' ? 'text-xs' : 'text-sm'}`}>Live</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
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