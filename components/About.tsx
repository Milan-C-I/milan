"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiMongodb, 
  SiAwsamplify 
} from "react-icons/si";
import { FaGraduationCap, FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);
  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const [experienceProgress, setExperienceProgress] = useState(0);
  const [educationProgress, setEducationProgress] = useState(0);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceTimelineRef = useRef<HTMLDivElement>(null);
  const educationTimelineRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const experienceItemsRef = useRef<HTMLDivElement[]>([]);
  const educationItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Initialize sections visibility
  useEffect(() => {
    setVisibleSections(new Array(15).fill(false));
  }, []);

  // Enhanced timeline progress calculation
  useEffect(() => {
    const handleScroll = () => {
      // Experience timeline progress
      if (experienceTimelineRef.current && experienceItemsRef.current.length > 0) {
        const timelineRect = experienceTimelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        
        // Calculate which items are visible and adjust progress accordingly
        let visibleCount = 0;
        let totalItems = experienceItemsRef.current.length;
        
        experienceItemsRef.current.forEach((item) => {
          if (item) {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            
            if (itemCenter <= windowHeight * 0.8) {
              visibleCount++;
            }
          }
        });
        
        const progress = Math.max(0, Math.min(1, visibleCount / totalItems));
        setExperienceProgress(progress);
      }

      // Education timeline progress
      if (educationTimelineRef.current && educationItemsRef.current.length > 0) {
        const timelineRect = educationTimelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        let visibleCount = 0;
        let totalItems = educationItemsRef.current.length;
        
        educationItemsRef.current.forEach((item) => {
          if (item) {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.top + itemRect.height / 2;
            
            if (itemCenter <= windowHeight * 0.8) {
              visibleCount++;
            }
          }
        });
        
        const progress = Math.max(0, Math.min(1, visibleCount / totalItems));
        setEducationProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Intersection Observer for smoother animations
  useEffect(() => {
    if (!aboutRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleSections(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sectionElements = aboutRef.current.querySelectorAll('.animated-section');
    sectionElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 3D Tilt Effect Hook
  const useTilt = () => {
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -10; // Max 10 degrees
      const rotateY = (x - centerX) / centerX * 10;
      
      setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0 });
    };

    return { tilt, handleMouseMove, handleMouseLeave };
  };

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      location: "Bengaluru, Karnataka",
      period: "Jan 2024 - Present",
      description: "Led development of enterprise-level web applications serving 100K+ users. Implemented microservices architecture, optimized database queries reducing response time by 40%, and mentored junior developers in best practices.",
      achievements: [
        "Reduced application load time by 50%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "InnovateTech",
      location: "Bengaluru, Karnataka",
      period: "Jun 2022 - Dec 2023",
      description: "Developed and maintained multiple client projects using modern web technologies. Collaborated with cross-functional teams to deliver high-quality solutions on time and within budget.",
      achievements: [
        "Delivered 15+ successful projects",
        "Improved code quality by 60%",
        "Mentored 3 junior developers"
      ],
      technologies: ["React", "Node.js", "Python", "Django", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Junior Developer",
      company: "StartupHub",
      location: "Bengaluru, Karnataka",
      period: "Jan 2022 - May 2022",
      description: "Started my professional journey building responsive web applications and learning industry best practices.",
      achievements: [
        "Built 5+ responsive websites",
        "Learned modern development workflows",
        "Contributed to open source projects"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "React"]
    }
  ];

  const education = [
    {
      id: 1,
      qualification: "B.E in Computer Science Engineering",
      institution: "Visvesvaraya Technological University",
      location: "Bengaluru, Karnataka",
      period: "2018 - 2022",
      description: "Graduated with First Class Honours. Specialized in Software Engineering, Data Structures, and Web Development. Led multiple technical projects and participated in hackathons."
    },
    {
      id: 2,
      qualification: "Pre-University Course (PUC)",
      institution: "Delhi Public School",
      location: "Bengaluru, Karnataka",
      period: "2016 - 2018",
      description: "Completed with distinction in Science stream. Active member of computer club and robotics team."
    },
    {
      id: 3,
      qualification: "Secondary School Certificate (SSLC)",
      institution: "Delhi Public School",
      location: "Bengaluru, Karnataka", 
      period: "2015 - 2016",
      description: "Completed with excellent grades. Developed early interest in computer programming and technology."
    }
  ];

  const getTechIcon = (tech: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'React': SiReact,
      'Next.js': SiNextdotjs,
      'TypeScript': SiTypescript,
      'Node.js': SiNodedotjs,
      'MongoDB': SiMongodb,
      'AWS': SiAwsamplify,
    };
    return iconMap[tech] || SiReact;
  };

  const TiltCard: React.FC<{ children: React.ReactNode; className?: string; isLeft: boolean }> = ({ 
    children, 
    className = "", 
    isLeft 
  }) => {
    const { tilt, handleMouseMove, handleMouseLeave } = useTilt();

    return (
      <div
        className={`transform-gpu transition-all duration-300 ease-out perspective-1000 ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(0)`,
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div ref={aboutRef} className="min-h-screen text-white overflow-hidden mb-12">
      <div className="relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-orange-500/20 rounded-full animate-spin-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
          {/* Header Section */}
          <div 
            data-index={0}
            className={`animated-section mb-6 md:mb-20 transform transition-all duration-600 ease-out ${
              visibleSections[0] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-12 text-white">
              ABOUT
            </h1>
            <p className="md:text-xl text-gray-300 max-w-4xl leading-relaxed">
              Passionate Full Stack Developer building efficient, scalable, and user-friendly web applications
            </p>
          </div>

          {/* About Me Section */}
          <div 
            data-index={1}
            className={`animated-section mb-20 transform transition-all duration-600 ease-out ${
              visibleSections[1] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative py-8 md:py-12">
              <div className="absolute inset-0 rounded-2xl"></div>
              <div className="relative z-10">
                <h2 className="text-5xl w-fit font-extrabold mb-6 text-orange-400 transition-all duration-500 transform origin-left hover:tracking-widest hover:scale-110">Milan C I</h2>
                <p className="md:text-lg text-gray-300 leading-relaxed mb-6">
                  I specialize in crafting seamless experiences from front-end interfaces to back-end systems. 
                  With a passion for clean code and thoughtful design, I bring ideas to life through innovative 
                  web solutions that make a difference.
                </p>
                <p className="md:text-lg text-gray-300 leading-relaxed">
                  My journey in software development has been driven by curiosity and a desire to solve 
                  complex problems. I thrive in collaborative environments and enjoy mentoring fellow 
                  developers while continuously learning new technologies.
                </p>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div 
            data-index={2}
            className={`animated-section mb-32 transform transition-all duration-600 ease-out ${
              visibleSections[2] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-4xl font-bold mb-16 text-center">
              <FaBriefcase className="inline-block mr-4 text-orange-400" />
              Work Experience
            </h2>
            
            <div ref={experienceTimelineRef} className="relative">
              {/* Experience Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-600">
                <div 
                  className="w-full bg-gradient-to-b from-orange-500 via-white to-orange-500 transition-all duration-1000 ease-out"
                  style={{ height: `${experienceProgress * 100}%` }}
                ></div>
              </div>
              
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  ref={(el) => {
                    if (el) experienceItemsRef.current[index] = el;
                  }}
                  data-index={3 + index}
                  className={`animated-section relative mb-20 transform transition-all duration-600 ease-out ${
                    visibleSections[3 + index] 
                      ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
                      : `opacity-0 scale-95 ${
                          index % 2 === 0 
                            ? 'translate-y-12 md:-translate-x-8' 
                            : 'translate-y-12 md:translate-x-8'
                        }`
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                  onMouseEnter={() => setActiveTimelineItem(exp.id)}
                  onMouseLeave={() => setActiveTimelineItem(null)}
                >
                  {/* Timeline Node */}
                  <div className={`absolute w-6 h-6 bg-orange-500 rounded-full shadow-xl transition-all duration-500 z-20 ${
                    activeTimelineItem === exp.id ? 'scale-150 shadow-orange-500/50 bg-white border-4 border-orange-500' : 'border-4 border-white'
                  } left-5 md:left-1/2 md:transform md:-translate-x-1/2`}></div>
                  
                  {/* Content Card - Alternating Left/Right */}
                  <div className={`ml-16 md:ml-0 ${
                    index % 2 === 0 
                      ? 'md:w-[calc(50%-2rem)] md:mr-4' 
                      : 'md:w-[calc(50%-2rem)] md:ml-[calc(50%+2rem)]'
                  }`}>
                    <TiltCard isLeft={index % 2 === 0}>
                      <div className="p-6 bg-gradient-to-br from-gray-900/20 to-black/10 backdrop-blur-sm rounded-xl hover:shadow-2xl hover:shadow-orange-600/50 transition-all duration-300">
                        <div className={`flex flex-wrap items-start justify-between mb-4 ${
                          index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''
                        }`}>
                          <div>
                            <h3 className="text-2xl font-bold text-orange-400 mb-1">{exp.title}</h3>
                            <p className="text-xl text-white font-semibold">{exp.company}</p>
                          </div>
                          <div className={`text-sm text-gray-400 ${
                            index % 2 !== 0 ? 'md:text-left' : 'md:text-right'
                          }`}>
                            <div className="flex items-center mb-1">
                              <FaMapMarkerAlt className="mr-2" />
                              {exp.location}
                            </div>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2" />
                              {exp.period}
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-gray-300 mb-4 leading-relaxed ${
                          index % 2 !== 0 ? 'md:text-left' : ''
                        }`}>{exp.description}</p>
                        
                        <div className="mb-4">
                          <h4 className={`text-orange-300 font-semibold mb-2 ${
                            index % 2 !== 0 ? 'md:text-left' : ''
                          }`}>Key Achievements:</h4>
                          <ul className={`space-y-1 ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="text-gray-300 flex items-start">
                                <span className="text-orange-400 mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className={`text-orange-300 font-semibold mb-3 ${
                            index % 2 !== 0 ? 'md:text-left' : ''
                          }`}>Technologies Used:</h4>
                          <div className={`flex flex-wrap gap-2 ${
                            index % 2 !== 0 ? 'md:justify-start' : ''
                          }`}>
                            {exp.technologies.map((tech, i) => {
                              const IconComponent = getTechIcon(tech);
                              return (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm hover:bg-orange-500/30 hover:scale-110 hover:rotate-3 transition-all duration-300 transform"
                                >
                                  <IconComponent className="text-lg" />
                                  {tech}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div 
            data-index={6}
            className={`animated-section transform transition-all duration-600 ease-out ${
              visibleSections[6] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            
            <h2 className="text-4xl font-bold mb-16 text-center">
              <FaGraduationCap className="inline-block mr-4 text-orange-400" />
              Education
            </h2>
            
            <div ref={educationTimelineRef} className="relative">
              {/* Education Timeline Line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-600">
                <div 
                  className="w-full bg-gradient-to-b from-orange-500 via-white to-orange-500 transition-all duration-1000 ease-out"
                  style={{ height: `${educationProgress * 100}%` }}
                ></div>
              </div>
              
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  ref={(el) => {
                    if (el) educationItemsRef.current[index] = el;
                  }}
                  data-index={7 + index}
                  className={`animated-section relative mb-20 transform transition-all duration-600 ease-out ${
                    visibleSections[7 + index] 
                      ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
                      : `opacity-0 scale-95 ${
                          index % 2 === 0 
                            ? 'translate-y-12 md:-translate-x-8' 
                            : 'translate-y-12 md:translate-x-8'
                        }`
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  {/* Timeline Node */}
                  <div className={`absolute w-6 h-6 bg-white rounded-full border-4 border-orange-500 shadow-xl transition-all duration-500 hover:scale-125 z-20 left-5 md:left-1/2 md:transform md:-translate-x-1/2`}></div>
                  
                  {/* Content Card - Alternating Left/Right */}
                  <div className={`ml-16 md:ml-0 ${
                    index % 2 === 0 
                      ? 'md:w-[calc(50%-2rem)] md:mr-4' 
                      : 'md:w-[calc(50%-2rem)] md:ml-[calc(50%+2rem)]'
                  }`}>
                    <TiltCard isLeft={index % 2 === 0}>
                      <div className="p-6 bg-gradient-to-br from-white/5 to-orange-500/5 backdrop-blur-sm rounded-xl hover:shadow-2xl hover:shadow-orange-600/50 transition-all duration-300">
                        <div className={`flex flex-wrap items-start justify-between mb-4 ${
                          index % 2 !== 0 ? 'md:flex-row-reverse md:text-right' : ''
                        }`}>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{edu.qualification}</h3>
                            <p className="text-xl text-orange-300 font-semibold">{edu.institution}</p>
                          </div>
                          <div className={`text-sm text-gray-300 ${
                            index % 2 !== 0 ? 'md:text-left' : 'md:text-right'
                          }`}>
                            <div className="flex items-center mb-1">
                              <FaMapMarkerAlt className="mr-2" />
                              {edu.location}
                            </div>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2" />
                              {edu.period}
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-gray-200 leading-relaxed ${
                          index % 2 !== 0 ? 'md:text-left' : ''
                        }`}>{edu.description}</p>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        @media (max-width: 768px) {
          .md\\:text-right {
            text-align: left !important;
          }
          
          .md\\:text-left {
            text-align: left !important;
          }
          
          .md\\:justify-end {
            justify-content: flex-start !important;
          }
          
          .md\\:flex-row-reverse {
            flex-direction: row !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;