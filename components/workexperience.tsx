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
  SiAwsamplify,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiVuedotjs,
  SiPhp,
  SiMysql,
  SiHtml5,
  SiCss3
} from "react-icons/si";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt, FaLaravel } from "react-icons/fa";

const WorkExperience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [experiencesInView, setExperiencesInView] = useState<boolean[]>([]);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const experiencesRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Initialize experiences visibility array
  useEffect(() => {
    setExperiencesInView(new Array(workExperiences.length).fill(false));
    cardRefs.current = new Array(workExperiences.length).fill(null);
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
    
    const rotateX = (mouseY / (rect.height / 2)) * -10; // Max 10 degrees
    const rotateY = (mouseX / (rect.width / 2)) * 10;   // Max 10 degrees
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Intersection Observer for slide animations
  useEffect(() => {
    if (!experiencesRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setExperiencesInView(prev => {
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

    const experienceElements = experiencesRef.current.querySelectorAll('.experience-card');
    experienceElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getIconComponent = (tech: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'React': SiReact,
      'Next.js': SiNextdotjs,
      'TypeScript': SiTypescript,
      'Tailwind CSS': SiTailwindcss,
      'Node.js': SiNodedotjs,
      'MongoDB': SiMongodb,
      'JavaScript': SiJavascript,
      'Laravel': FaLaravel,
      'PHP': SiPhp,
      'Blade': FaLaravel,
      'MySQL': SiMysql,
      'HTML': SiHtml5,
      'CSS': SiCss3,
    };
    return iconMap[tech] || SiReact;
  };

  const workExperiences = [
    {
    id: 1,
    position: "Freelance Web Developer",
    company: "Kreekarvat Technologies",
    timePeriod: "Nov 2024 - Mar 2025",
    location: "Mangaluru, Karnataka",
    description:
      "Built responsive, high-quality UIs using React, Next.js, and Tailwind CSS. Collaborated with freelance teams to deliver projects on time while ensuring client satisfaction.",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
    achievements: [
      "Developed responsive and user-friendly web interfaces",
      "Delivered multiple client projects on time",
      "Implemented modern UI/UX best practices using Tailwind CSS"
    ]
  },
  {
    id: 2,
    position: "Full Stack Developer Intern",
    company: "A J Institute of Medical Sciences and Research Center",
    timePeriod: "Sept 2023 - Aug 2024",
    location: "Mangaluru, Karnataka",
    description:
      "Built full-stack healthcare management apps using modern frontend tools and collaborated with cross-functional teams to ensure timely delivery.",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Node.js", "HTML", "CSS"],
    achievements: [
      "Built responsive web apps for healthcare systems",
      "Collaborated with teams and clients to gather and implement requirements",
      "Improved user experience through modern UI techniques"
    ]
  },
  {
    id: 3,
    position: "Core Team Member",
    company: "DevNation",
    timePeriod: "Oct 2024 - Mar 2025",
    location: "Mangaluru, Karnataka",
    description:
      "Organized events and led open-source community projects. Focused on team coordination, project management, and community engagement through tech workshops.",
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js",
      "Laravel", "PHP", "Blade", "JavaScript",
      "MySQL", "MongoDB", "HTML", "CSS", "Tailwind CSS"
    ],
    achievements: [
      "Organized technical webinars and workshops",
      "Led and contributed to community-driven web projects",
      "Improved project management and collaboration skills"
    ]
  }
  ];

  return (
    <div className="min-h-screen bg-none text-white">
      <div className="min-h-screen py-6">
        <div className="mb-12">
          <h2
            className={`text-2xl sm:text-4xl mb-8 font-extrabold md:font-semibold leading-none tracking-tight text-white transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            WORK EXPERIENCE
          </h2>

          <div ref={experiencesRef} className="space-y-8">
            {workExperiences.map((experience, index) => {
              const isInView = experiencesInView[index];
              const isHovered = hoveredExperience === index;
              
              return (
                <div
                  key={experience.id}
                  data-index={index}
                  className={`experience-card relative transform transition-all duration-700 ease-out ${
                    isInView 
                      ? 'opacity-100 translate-x-0 translate-y-0' 
                      : 'opacity-0 -translate-x-20 translate-y-20'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 150}ms`,
                    perspective: '1200px'
                  }}
                  onMouseEnter={() => setHoveredExperience(index)}
                  onMouseLeave={() => {
                    setHoveredExperience(null);
                    handleMouseLeave();
                  }}
                  onMouseMove={(e) => isHovered && handleMouseMove(e, index)}
                >
                  {/* 3D Container */}
                  <div 
                    ref={(el) => { cardRefs.current[index] = el; }}
                    className={`relative w-full bg-gray-900/50 backdrop-blur-sm rounded-xl border border-black/10 transition-all duration-300 transform-gpu ${
                      isHovered 
                        ? 'shadow-2xl shadow-orange-500/30' 
                        : 'shadow-lg shadow-black/20'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isHovered 
                        ? `rotateY(${mousePosition.x}deg) rotateX(${mousePosition.y}deg) translateZ(10px)` 
                        : 'rotateY(0deg) rotateX(0deg) translateZ(0px)',
                      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
                    }}
                  >
                    {/* Glowing border effect */}
                    <div className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-[-2px] bg-gradient-to-r from-gray-900 via-orange-500 to-white rounded-xl animate-spin-slow opacity-75"></div>
                      <div className="absolute inset-[4px] bg-gradient-to-br from-black via-black to-orange-400 rounded-xl"></div>
                    </div>

                    {/* Content Section */}
                    <div 
                      className="relative p-6 lg:p-8"
                      style={{
                        transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {/* Header Section */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div 
                          className="flex-1"
                          style={{
                            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                            transition: 'transform 0.3s ease-out'
                          }}
                        >
                          <h3 className={`text-xl lg:text-2xl font-bold mb-2 transition-all duration-300 ${
                            isHovered ? 'text-orange-300 scale-105' : 'text-white'
                          }`}>
                            {experience.position}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <FaBuilding className={`text-sm transition-colors duration-300 ${
                              isHovered ? 'text-orange-400' : 'text-gray-400'
                            }`} />
                            <span className={`font-semibold transition-colors duration-300 ${
                              isHovered ? 'text-orange-300' : 'text-gray-300'
                            }`}>
                              {experience.company}
                            </span>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-xs" />
                              <span>{experience.timePeriod}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-xs" />
                              <span>{experience.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p 
                        className={`text-sm lg:text-base mb-6 leading-relaxed transition-all duration-300 ${
                          isHovered ? 'text-white scale-105' : 'text-gray-300'
                        }`}
                        style={{
                          transform: isHovered ? 'translateZ(25px)' : 'translateZ(0px)',
                          transition: 'all 0.3s ease-out'
                        }}
                      >
                        {experience.description}
                      </p>

                      {/* Achievements */}
                      <div 
                        className="mb-6"
                        style={{
                          transform: isHovered ? 'translateZ(20px)' : 'translateZ(0px)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                          isHovered ? 'text-orange-300' : 'text-gray-400'
                        }`}>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {experience.achievements.map((achievement, achIndex) => (
                            <li 
                              key={achIndex}
                              className={`text-sm flex items-center transition-all duration-300 ${
                                isHovered ? 'text-gray-200' : 'text-gray-400'
                              }`}
                              style={{
                                transitionDelay: `${achIndex * 50}ms`
                              }}
                            >
                              <span className={`w-1 h-1 rounded-full mr-3 transition-colors duration-300 ${
                                isHovered ? 'bg-orange-400' : 'bg-gray-500'
                              }`}></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Used */}
                      <div 
                        style={{
                          transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)',
                          transition: 'transform 0.3s ease-out'
                        }}
                      >
                        <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
                          isHovered ? 'text-orange-300' : 'text-gray-400'
                        }`}>
                          Technologies Used:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => {
                            const IconComponent = getIconComponent(tech);
                            return (
                              <div
                                key={tech}
                                className={`flex hover:scale-110 hover:rotate-3  items-center gap-1 px-3 py-1 rounded-md text-xs transition-all duration-300 ${
                                  isHovered ? 'bg-orange-500/20 text-orange-300 scale-105' : 'bg-gray-800/50 text-gray-400'
                                }`}
                                style={{
                                  transitionDelay: `${techIndex * 30}ms`,
                                  transform: isHovered ? 'translateZ(10px)' : 'translateZ(0px)'
                                }}
                              >
                                <IconComponent className="text-sm" />
                                <span>{tech}</span>
                              </div>
                            );
                          })}
                        </div>
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

        .experience-card {
          transform-style: preserve-3d;
        }

        /* Smooth transitions for all 3D elements */
        .experience-card * {
          backface-visibility: hidden;
        }

        /* Additional glow effects for hovered state */
        .experience-card:hover {
          filter: drop-shadow(0 25px 50px rgba(249, 115, 22, 0.2));
        }

        /* Ensure smooth performance */
        .experience-card,
        .experience-card * {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default WorkExperience;