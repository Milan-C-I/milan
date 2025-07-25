"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiMongodb,
  SiJavascript,
  SiUnity,
  SiPrisma,
  SiPhp,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiExpo,
} from "react-icons/si";
import { FaGithub, FaExternalLinkAlt, FaLaravel } from "react-icons/fa";
import { TbBrandCSharp, TbBrandReactNative } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

interface Project {
  id: number;
  name: string;
  image: string;
  description: string;
  tools: string[];
  github: string;
  live: string | null;
  features: string[];
  size: "large" | "medium";
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
      "React": SiReact,
      "Next.js": SiNextdotjs,
      "TypeScript": SiTypescript,
      "Tailwind CSS": SiTailwindcss,
      "Node.js": SiNodedotjs,
      "MongoDB": SiMongodb,
      "C#": TbBrandCSharp,
      "JavaScript": SiJavascript,
      "Unity": SiUnity,
      "Unity Physics": SiUnity,
      "Visual Studio": VscVscode,
      "Prisma ORM": SiPrisma,
      "Laravel": FaLaravel,
      "PHP": SiPhp,
      "Blade": FaLaravel,
      "MySQL": SiMysql,
      "2D Physics Engine": SiUnity,
      "Sprite Renderer": SiUnity,
      "HTML": SiHtml5,
      "CSS": SiCss3,
      "React Native": TbBrandReactNative,
      "Expo": SiExpo,
    };
    return iconMap[tool] || SiReact;
  };

  const projects: Project[] = [
    {
      id: 1,
      name: "genshin-web-info",
      image: "https://source.unsplash.com/random/600x400?game,web",
      description:
        "Embark on an epic journey through the breathtaking world of Genshin Impact — where your adventure begins, and destiny awaits. Built with Next.js as a fullstack framework, this project combines dynamic routing, server-side rendering, and modern styling with Tailwind CSS to deliver fast, responsive, and content-rich experiences. Ideal for showcasing in-depth game data and visuals with seamless performance.",
      tools: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "Tailwind CSS",
      ],
      github: "https://github.com/Milan-C-I/genshin-web-info",
      live: "https://genshinatlas.vercel.app/",
      features: ["Characters", "Visuals", "Elements", "Animated Transitions"],
      size: "large",
    },
    {
      id: 2,
      name: "Cube_Game",
      image: "https://source.unsplash.com/random/600x400?cube,game",
      description:
        "Cube Game is a simple and engaging 3D game built in Unity using C#. Players control a cube navigating through platforms while avoiding obstacles. The game features smooth controls, score tracking, and increasing difficulty over time.",
      tools: ["Unity", "C#", "Unity Physics", "Visual Studio"],
      github: "https://github.com/Milan-C-I/Cube_Game",
      live: null,
      features: ["Physics", "Levels", "Scoring", "Controls"],
      size: "medium",
    },
    {
      id: 3,
      name: "emp-recruiter-app",
      image: "https://source.unsplash.com/random/600x400?recruiter,app",
      description:
        "Emp-Recruiter is a cutting-edge web application designed to streamline the job application and recruitment process. Job seekers can easily browse and apply for a variety of job opportunities, creating personalized profiles to showcase their skills and experience. Recruiters and hiring managers can post job listings and search for potential candidates.",
      tools: ["React", "Next.js", "TypeScript", "JavaScript", "MongoDB", "CSS"],
      github: "https://github.com/Milan-C-I/emp-recruiter-app",
      live: "https://emp-recruiter-app.vercel.app",
      features: ["Applications", "Profiles", "Notifications", "Dashboard"],
      size: "large",
    },
    {
      id: 4,
      name: "elim-nation",
      image: "https://source.unsplash.com/random/600x400?minimal,design",
      description:
        "Elim Nation is a dedicated event website created for Elim Nation, an event conducted under Enigma. The site provides event details, schedules, highlights, and visual branding to engage participants and visitors.",
      tools: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "MongoDB",
        "Prisma ORM",
        "Tailwind CSS",
      ],
      github: "https://github.com/Milan-C-I/elim-nation",
      live: "https://elim-nation.vercel.app",
      features: [
        "Event Schedule",
        "Team Registration",
        "Live Updates",
        "Event Highlights",
      ],
      size: "medium",
    },
    {
      id: 5,
      name: "DevNation-CMS",
      image: "https://source.unsplash.com/random/600x400?cms,web",
      description:
        "This is a community-level open-source project that serves as a CMS (Content Management System) for our community DevNation.",
      tools: ["Laravel", "PHP", "Blade", "JavaScript", "MySQL"],
      github: "https://github.com/Milan-C-I/DevNation-CMS",
      live: null,
      features: [
        "Dynamic Content Management",
        "User Role Permissions",
        "Post & Page Builder",
        "Dashboard Analytics",
      ],
      size: "large",
    },
    {
      id: 6,
      name: "flappybirdy_game",
      image: "https://source.unsplash.com/random/600x400?flappy,bird",
      description:
        "Flappy Birdy is a Unity-based clone of the classic Flappy Bird game, developed using C#. Players tap to keep the bird airborne while navigating through challenging pipes. The game includes basic physics, collision detection, scoring, and a restart system.",
      tools: ["Unity", "C#", "2D Physics Engine", "Sprite Renderer"],
      github: "https://github.com/Milan-C-I/flappybirdy_game",
      live: null,
      features: [
        "Endless Scrolling",
        "Obstacle Collision",
        "Score Tracking",
        "Simple Tap Controls",
      ],
      size: "medium",
    },
    {
      id: 7,
      name: "onepiece",
      image: "https://source.unsplash.com/random/600x400?onepiece,fan",
      description:
        "This is a fan-made One Piece web app that showcases characters, story arcs, and visuals from the iconic anime series. Built with modern web technologies, it offers an interactive and visually engaging experience for fans. Users can explore character profiles, learn about arcs, and enjoy themed design inspired by the One Piece universe.",
      tools: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/Milan-C-I/onepiece",
      live: "https://onepiece-milan.vercel.app/",
      features: ["Character Showcase", "Visuals", "Animated Transitions"],
      size: "medium",
    },
    {
      id: 8,
      name: "Demo-react-native-epic-trails-ds",
      image: "https://source.unsplash.com/random/600x400?hiking,trails",
      description:
        "An Expo-powered demo React Native app that showcases a mobile experience for a hiking trail platform. Designed with smooth animations, responsive design, and strong cross-platform support. Features include episode highlights, character showcases, and intuitive navigation.",
      tools: ["React Native", "TypeScript", "Expo", "React", "Tailwind CSS"],
      github: "https://github.com/Milan-C-I/Demo-react-native-epic-trails-ds",
      live: "https://epictrails-demo.expo.app",
      features: [
        "Cross-Platform UI",
        "Smooth Navigation",
        "Responsive Design",
        "Type-Safe Components",
      ],
      size: "medium",
    },
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
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          setProjectsInView((prev) => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      }
    );

    const projectElements =
      projectsRef.current.querySelectorAll(".project-card");
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
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="min-h-screen text-white mb-28">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div> */}
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-600/30 rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))} */}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <div
          className={`mb-16 transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-12">PROJECTS</h1>
          <p className="md:text-xl text-gray-300 max-w-4xl leading-relaxed mb-12">
            A curated collection of my work spanning <span className="font-bold text-orange-400">full stack web applications</span>, visually engaging websites, and <span className="font-bold text-orange-400">interactive games built with Unity</span>, reflecting a strong focus on both functionality and design.
          </p>



        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-16 mt-24 md:mt-32 auto-rows-fr"
        >
          {projects.map((project, index) => {
            const isInView = projectsInView[index];
            const isHovered = hoveredProject === project.id;
            const isRightSide = index % 4 >= 2; // Determine if card is on right side of grid

            return (
              <div
                key={project.id}
                data-index={index}
                className={`project-card ${getGridClasses(
                  project.size
                )} transform transition-all duration-700 ease-out ${
                  isInView
                    ? "opacity-100 translate-x-0 translate-y-0"
                    : "opacity-0 translate-x-[-50px] translate-y-20"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  perspective: "1200px",
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* 3D Container */}
                <div
                  className={`relative w-full h-full bg-black/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 transition-all duration-500 transform-gpu flex flex-col ${
                    isHovered
                      ? "shadow-2xl shadow-orange-500/20 scale-105 border-orange-500/40"
                      : "shadow-lg shadow-black/20"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isHovered
                      ? `rotateY(${
                          isRightSide ? "-5deg" : "5deg"
                        }) rotateX(5deg) translateZ(20px)`
                      : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
                  }}
                >
                  {/* Glowing border effect */}
                  <div
                    className={`absolute inset-0 overflow-hidden rounded-2xl transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-[-2px] bg-gradient-to-r from-orange-500 via-white to-orange-500 rounded-2xl animate-spin-slow opacity-75"></div>
                    <div className="absolute inset-[2px] bg-gradient-to-br from-black/90 to-black/90 rounded-2xl"></div>
                  </div>

                  {/* Project Image */}
                  <div
                    className={`relative rounded-t-2xl ${
                      project.size === "large" ? "flex-1 max-h-[50%]" : "h-48"
                    }`}
                  >
                    <div
                      className={`w-full h-full object-cover rounded-t-2xl overflow-hidden`}
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className={`w-full h-full object-cover transition-all duration-700 ${
                          isHovered ? "scale-110 brightness-110" : "scale-100"
                        }`}
                      />
                    </div>
                    {/* Overlay */}
                    <div className="absolute rounded-t-2xl inset-0 bg-gradient-to-tr from-black via-black/50 to-orange-500/30"></div>

                    {/* Project Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3
                        className={`text-white font-light transition-all duration-300 ${
                          project.size === "large" ? "text-3xl" : "text-2xl"
                        } ${isHovered ? "scale-110" : "scale-100"}`}
                      >
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 flex-1 flex flex-col">
                    {/* Description */}
                    <p
                      className={`text-gray-300 mb-4 flex transition-all duration-300 ${
                        project.size === "large" ? "text-base" : "text-sm"
                      } ${isHovered ? "text-white scale-105" : ""}`}
                    >
                      {project.description}
                    </p>

                    {/* Features (for large cards) */}
                    {project.size === "large" && (
                      <div className="mb-4">
                        <h4 className="text-orange-300 font-semibold mb-2 text-sm">
                          Key Features:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {project.features.map((feature, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs"
                            >
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
                              className={`flex hover:scale-110 hover:rotate-3 items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 ${
                                isHovered
                                  ? "bg-orange-500/20 text-orange-300 scale-105"
                                  : "bg-gray-800/50 text-gray-400"
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
                          <span className="text-gray-500 text-xs">
                            +{project.tools.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div
                      className={`flex gap-3 ${
                        !project.live ? "justify-center" : ""
                      }`}
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center mx-5 gap-2 px-4 py-2 bg-transparent border border-gray-600 rounded-lg transition-all duration-300 transform ${
                          !project.live ? "flex-1" : "flex-1"
                        } justify-center ${
                          isHovered
                            ? "bg-gradient-to-br from-white via-white to-orange-500 text-orange-500 border-white scale-105 shadow-lg shadow-white/20"
                            : "text-white hover:border-gray-400"
                        }`}
                      >
                        <FaGithub className="text-base" />
                        <span
                          className={`font-semibold text-sm ${
                            isHovered ? "text-black" : ""
                          }`}
                        >
                          Code
                        </span>
                      </a>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center mx-5 gap-2 px-4 py-2 bg-transparent border border-orange-500 rounded-lg transition-all duration-300 transform flex-1 justify-center ${
                            isHovered
                              ? "bg-gradient-to-br from-black via-black/80 to-orange-400 text-orange-500 scale-105 shadow-lg shadow-orange-500/30"
                              : "text-white hover:bg-orange-500/10"
                          }`}
                        >
                          <FaExternalLinkAlt className="text-sm" />
                          <span
                            className={`font-semibold text-sm ${
                              isHovered ? "text-white" : ""
                            }`}
                          >
                            Live
                          </span>
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
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
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
