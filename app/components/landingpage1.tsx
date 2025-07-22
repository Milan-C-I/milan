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

//skills page

//"use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"

// interface Skill {
//   id: number
//   name: string
//   image: string
//   category: string
// }

// interface SkillsPageProps {
//   isVisible?: boolean
// }

// const SkillsPage: React.FC<SkillsPageProps> = ({ isVisible = true }) => {
//   const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
//   const [rotation, setRotation] = useState(0)
//   const progressRef = useRef<HTMLDivElement>(null)
//   const [isDragging, setIsDragging] = useState(false)

//   // Dummy skills data - can be easily modified
//   const skills: Skill[] = [
//     { id: 1, name: "React", image: "/placeholder.svg?height=80&width=80", category: "Frontend" },
//     { id: 2, name: "Node.js", image: "/placeholder.svg?height=80&width=80", category: "Backend" },
//     { id: 3, name: "TypeScript", image: "/placeholder.svg?height=80&width=80", category: "Language" },
//     { id: 4, name: "Python", image: "/placeholder.svg?height=80&width=80", category: "Language" },
//     { id: 5, name: "MongoDB", image: "/placeholder.svg?height=80&width=80", category: "Database" },
//     { id: 6, name: "AWS", image: "/placeholder.svg?height=80&width=80", category: "Cloud" },
//     { id: 7, name: "Docker", image: "/placeholder.svg?height=80&width=80", category: "DevOps" },
//     { id: 8, name: "GraphQL", image: "/placeholder.svg?height=80&width=80", category: "API" },
//     { id: 9, name: "Next.js", image: "/placeholder.svg?height=80&width=80", category: "Framework" },
//     { id: 10, name: "PostgreSQL", image: "/placeholder.svg?height=80&width=80", category: "Database" },
//   ]

//   const totalSkills = skills.length
//   const angleStep = 360 / totalSkills

//   // Handle progress bar interaction
//   const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!progressRef.current) return

//     const rect = progressRef.current.getBoundingClientRect()
//     const x = e.clientX - rect.left
//     const percentage = Math.max(0, Math.min(1, x / rect.width))
//     const newIndex = Math.floor(percentage * totalSkills)

//     setCurrentSkillIndex(newIndex)
//     setRotation(-newIndex * angleStep)
//   }

//   const handleMouseDown = () => setIsDragging(true)
//   const handleMouseUp = () => setIsDragging(false)

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDragging) return
//     handleProgressChange(e)
//   }

//   // Touch events for mobile
//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!progressRef.current) return

//     const rect = progressRef.current.getBoundingClientRect()
//     const x = e.touches[0].clientX - rect.left
//     const percentage = Math.max(0, Math.min(1, x / rect.width))
//     const newIndex = Math.floor(percentage * totalSkills)

//     setCurrentSkillIndex(newIndex)
//     setRotation(-newIndex * angleStep)
//   }

//   // Auto-rotate functionality (optional)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isDragging) {
//         setCurrentSkillIndex((prev) => {
//           const next = (prev + 1) % totalSkills
//           setRotation(-next * angleStep)
//           return next
//         })
//       }
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [isDragging, totalSkills, angleStep])

//   const currentSkill = skills[currentSkillIndex]
//   const progressPercentage = (currentSkillIndex / (totalSkills - 1)) * 100

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8">
//       <div className={`w-full max-w-4xl mx-auto ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}>
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-12">
//           <h1 className="text-white text-shadow font-black text-4xl sm:text-6xl lg:text-7xl mb-4 tracking-tight">
//             Skills
//           </h1>
//           <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
//             Technologies and tools I work with to create amazing digital experiences
//           </p>
//         </div>

//         {/* Circular Skills Display */}
//         <div className="relative w-full max-w-2xl mx-auto mb-8 sm:mb-12">
//           <div className="relative w-full aspect-square max-w-lg mx-auto">
//             {/* Center Content */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
//               <div className="text-center p-4 sm:p-6 bg-black/20 backdrop-blur-lg rounded-full border border-white/10 shadow-2xl">
//                 <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-shadow">
//                   {currentSkill.name}
//                 </h2>
//                 <p className="text-white/70 text-sm sm:text-base font-medium">{currentSkill.category}</p>
//               </div>
//             </div>

//             {/* Circular Skills Container */}
//             <div
//               className="absolute inset-0 transition-transform duration-700 ease-out"
//               style={{ transform: `rotate(${rotation}deg)` }}
//             >
//               {skills.map((skill, index) => {
//                 const angle = index * angleStep
//                 const radian = (angle * Math.PI) / 180
//                 const radius = 45 // Percentage of container
//                 const x = 50 + radius * Math.cos(radian - Math.PI / 2)
//                 const y = 50 + radius * Math.sin(radian - Math.PI / 2)

//                 const isActive = index === currentSkillIndex

//                 return (
//                   <div
//                     key={skill.id}
//                     className={`absolute w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 transition-all duration-500 cursor-pointer group ${
//                       isActive ? "scale-125 z-20" : "scale-100 hover:scale-110"
//                     }`}
//                     style={{
//                       left: `${x}%`,
//                       top: `${y}%`,
//                       transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
//                     }}
//                     onClick={() => {
//                       setCurrentSkillIndex(index)
//                       setRotation(-index * angleStep)
//                     }}
//                   >
//                     <div
//                       className={`w-full h-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl flex items-center justify-center transition-all duration-300 ${
//                         isActive
//                           ? "bg-gradient-to-br from-blue-500/30 to-purple-600/30 border-blue-400/50 shadow-2xl"
//                           : "hover:bg-white/20 hover:border-white/30"
//                       }`}
//                     >
//                       <Image
//                         src={skill.image || "/placeholder.svg"}
//                         alt={skill.name}
//                         width={40}
//                         height={40}
//                         className={`transition-all duration-300 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
//                       />
//                     </div>

//                     {/* Skill name tooltip */}
//                     <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                       <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
//                         {skill.name}
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full max-w-md mx-auto">
//           <div className="mb-4 text-center">
//             <span className="text-white/70 text-sm font-medium">
//               {currentSkillIndex + 1} of {totalSkills}
//             </span>
//           </div>

//           <div
//             ref={progressRef}
//             className="relative h-2 bg-white/20 rounded-full cursor-pointer group"
//             onClick={handleProgressChange}
//             onMouseDown={handleMouseDown}
//             onMouseUp={handleMouseUp}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseUp}
//             onTouchMove={handleTouchMove}
//           >
//             {/* Progress track */}
//             <div
//               className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
//               style={{ width: `${progressPercentage}%` }}
//             />

//             {/* Progress handle */}
//             <div
//               className="absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-300 group-hover:scale-110"
//               style={{ left: `${progressPercentage}%`, transform: "translate(-50%, -50%)" }}
//             >
//               <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
//             </div>
//           </div>

//           {/* Progress indicators */}
//           <div className="flex justify-between mt-2">
//             {skills.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
//                   index === currentSkillIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/50"
//                 }`}
//                 onClick={() => {
//                   setCurrentSkillIndex(index)
//                   setRotation(-index * angleStep)
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Skills Grid for Mobile (Alternative View) */}
//         <div className="sm:hidden mt-12">
//           <div className="grid grid-cols-3 gap-4">
//             {skills.map((skill, index) => (
//               <div
//                 key={skill.id}
//                 className={`p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 text-center transition-all duration-300 ${
//                   index === currentSkillIndex
//                     ? "bg-gradient-to-br from-blue-500/30 to-purple-600/30 border-blue-400/50 scale-105"
//                     : "hover:bg-white/20"
//                 }`}
//                 onClick={() => {
//                   setCurrentSkillIndex(index)
//                   setRotation(-index * angleStep)
//                 }}
//               >
//                 <Image
//                   src={skill.image || "/placeholder.svg"}
//                   alt={skill.name}
//                   width={32}
//                   height={32}
//                   className="mx-auto mb-2"
//                 />
//                 <p className="text-white text-xs font-medium">{skill.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SkillsPage

// "use client"

// import type React from "react"
// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"

// interface Skill {
//   id: number
//   name: string
//   image: string
//   category: string
//   description?: string
// }

// interface SkillsPageProps {
//   isVisible?: boolean
// }

// const SkillsPage: React.FC<SkillsPageProps> = ({ isVisible = true }) => {
//   const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
//   const [rotation, setRotation] = useState(0)
//   const progressRef = useRef<HTMLDivElement>(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [dragStartX, setDragStartX] = useState(0)
//   const [dragStartProgress, setDragStartProgress] = useState(0)

//   // Dummy skills data - can be easily modified
//   const skills: Skill[] = [
//     {
//       id: 1,
//       name: "React",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Frontend",
//       description: "JavaScript library for building user interfaces",
//     },
//     {
//       id: 2,
//       name: "Node.js",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Backend",
//       description: "JavaScript runtime for server-side development",
//     },
//     {
//       id: 3,
//       name: "TypeScript",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Language",
//       description: "Typed superset of JavaScript",
//     },
//     {
//       id: 4,
//       name: "Python",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Language",
//       description: "High-level programming language",
//     },
//     {
//       id: 5,
//       name: "MongoDB",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Database",
//       description: "NoSQL document database",
//     },
//     {
//       id: 6,
//       name: "AWS",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Cloud",
//       description: "Amazon Web Services cloud platform",
//     },
//     {
//       id: 7,
//       name: "Docker",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "DevOps",
//       description: "Containerization platform",
//     },
//     {
//       id: 8,
//       name: "GraphQL",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "API",
//       description: "Query language for APIs",
//     },
//     {
//       id: 9,
//       name: "Next.js",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Framework",
//       description: "React framework for production",
//     },
//     {
//       id: 10,
//       name: "PostgreSQL",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Database",
//       description: "Advanced open source relational database",
//     },
//     {
//       id: 11,
//       name: "Vue.js",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Frontend",
//       description: "Progressive JavaScript framework",
//     },
//     {
//       id: 12,
//       name: "Redis",
//       image: "/placeholder.svg?height=120&width=80",
//       category: "Database",
//       description: "In-memory data structure store",
//     },
//   ]

//   const totalSkills = skills.length
//   const angleStep = 180 / (totalSkills - 1) // Semi-circle: 180 degrees total

//   // Handle progress bar drag functionality
//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     setIsDragging(true)
//     setDragStartX(e.clientX)
//     setDragStartProgress(currentSkillIndex / (totalSkills - 1))
//     e.preventDefault()
//   }

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
//     if (!isDragging || !progressRef.current) return

//     const rect = progressRef.current.getBoundingClientRect()
//     const deltaX = e.clientX - dragStartX
//     const deltaProgress = deltaX / rect.width
//     const newProgress = Math.max(0, Math.min(1, dragStartProgress + deltaProgress))
//     const newIndex = Math.round(newProgress * (totalSkills - 1))

//     setCurrentSkillIndex(newIndex)
//     setRotation(-newIndex * angleStep + 90) // +90 to start from top
//   }

//   const handleMouseUp = () => {
//     setIsDragging(false)
//   }

//   // Touch events for mobile
//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     setIsDragging(true)
//     setDragStartX(e.touches[0].clientX)
//     setDragStartProgress(currentSkillIndex / (totalSkills - 1))
//     e.preventDefault()
//   }

//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!isDragging || !progressRef.current) return

//     const rect = progressRef.current.getBoundingClientRect()
//     const deltaX = e.touches[0].clientX - dragStartX
//     const deltaProgress = deltaX / rect.width
//     const newProgress = Math.max(0, Math.min(1, dragStartProgress + deltaProgress))
//     const newIndex = Math.round(newProgress * (totalSkills - 1))

//     setCurrentSkillIndex(newIndex)
//     setRotation(-newIndex * angleStep + 90)
//     e.preventDefault()
//   }

//   const handleTouchEnd = () => {
//     setIsDragging(false)
//   }

//   // Global mouse events for drag continuation
//   useEffect(() => {
//     if (isDragging) {
//       const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e)
//       const handleGlobalMouseUp = () => setIsDragging(false)

//       document.addEventListener("mousemove", handleGlobalMouseMove)
//       document.addEventListener("mouseup", handleGlobalMouseUp)

//       return () => {
//         document.removeEventListener("mousemove", handleGlobalMouseMove)
//         document.removeEventListener("mouseup", handleGlobalMouseUp)
//       }
//     }
//   }, [isDragging, dragStartX, dragStartProgress])

//   // Auto-rotate functionality (optional - disabled during drag)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isDragging) {
//         setCurrentSkillIndex((prev) => {
//           const next = (prev + 1) % totalSkills
//           setRotation(-next * angleStep + 90)
//           return next
//         })
//       }
//     }, 4000)

//     return () => clearInterval(interval)
//   }, [isDragging, totalSkills, angleStep])

//   const currentSkill = skills[currentSkillIndex]
//   const progressPercentage = (currentSkillIndex / (totalSkills - 1)) * 100

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
//       {/* Edge fade effects */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Top fade */}
//         <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" />
//         {/* Bottom fade */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" />
//         {/* Left fade */}
//         <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" />
//         {/* Right fade */}
//         <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" />
//       </div>

//       <div
//         className={`w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}
//       >
//         {/* Header */}
//         <div className="text-center mb-8 sm:mb-12 z-20 relative">
//           <h1 className="text-white text-shadow font-black text-4xl sm:text-6xl lg:text-7xl mb-4 tracking-tight">
//             Skills
//           </h1>
//           <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
//             Technologies and tools I work with to create amazing digital experiences
//           </p>
//         </div>

//         {/* Semi-circular Skills Display */}
//         <div className="relative w-full h-full flex-1 flex items-center justify-center">
//           <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
//             {/* Center Content */}
//             <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
//               <div className="text-center p-6 sm:p-8 bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl max-w-md">
//                 <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-shadow">
//                   {currentSkill.name}
//                 </h2>
//                 <p className="text-white/80 text-lg sm:text-xl font-medium mb-2">{currentSkill.category}</p>
//                 {currentSkill.description && (
//                   <p className="text-white/70 text-sm sm:text-base leading-relaxed">{currentSkill.description}</p>
//                 )}
//               </div>
//             </div>

//             {/* Semi-circular Skills Container */}
//             <div
//               className="absolute inset-0 transition-transform duration-700 ease-out"
//               style={{ transform: `rotate(${rotation}deg)` }}
//             >
//               {skills.map((skill, index) => {
//                 const angle = index * angleStep - 90 // Start from top (-90 degrees)
//                 const radian = (angle * Math.PI) / 180
//                 const radiusX = 45 // Horizontal radius percentage
//                 const radiusY = 35 // Vertical radius percentage
//                 const x = 50 + radiusX * Math.cos(radian)
//                 const y = 50 + radiusY * Math.sin(radian)

//                 const isActive = index === currentSkillIndex
//                 const distanceFromActive = Math.abs(index - currentSkillIndex)
//                 const opacity = Math.max(0.3, 1 - distanceFromActive * 0.15)

//                 return (
//                   <div
//                     key={skill.id}
//                     className={`absolute transition-all duration-700 cursor-pointer group ${
//                       isActive ? "scale-110 z-30" : "scale-100 hover:scale-105 z-10"
//                     }`}
//                     style={{
//                       left: `${x}%`,
//                       top: `${y}%`,
//                       transform: `translate(-50%, -50%) rotate(${-rotation}deg)`,
//                       opacity: opacity,
//                     }}
//                     onClick={() => {
//                       setCurrentSkillIndex(index)
//                       setRotation(-index * angleStep + 90)
//                     }}
//                   >
//                     <div
//                       className={`w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-40 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl flex flex-col items-center justify-center p-4 transition-all duration-500 ${
//                         isActive
//                           ? "bg-gradient-to-br from-blue-500/40 to-purple-600/40 border-blue-400/60 shadow-2xl"
//                           : "hover:bg-white/20 hover:border-white/30"
//                       }`}
//                     >
//                       <div className="flex-1 flex items-center justify-center mb-2">
//                         <Image
//                           src={skill.image || "/placeholder.svg"}
//                           alt={skill.name}
//                           width={isActive ? 60 : 48}
//                           height={isActive ? 60 : 48}
//                           className={`transition-all duration-500 ${isActive ? "scale-110" : "group-hover:scale-105"}`}
//                         />
//                       </div>
//                       <div className="text-center">
//                         <p
//                           className={`text-white font-semibold text-xs sm:text-sm leading-tight ${isActive ? "text-shadow" : ""}`}
//                         >
//                           {skill.name}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Skill name tooltip for non-active items */}
//                     {!isActive && (
//                       <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
//                         <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
//                           {skill.name}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Progress Bar - Always visible */}
//         <div className="w-full max-w-2xl mx-auto mt-8 mb-4 z-20 relative">
//           <div className="mb-4 text-center">
//             <span className="text-white/70 text-sm font-medium">
//               {currentSkillIndex + 1} of {totalSkills}
//             </span>
//           </div>

//           <div
//             ref={progressRef}
//             className="relative h-3 sm:h-4 bg-white/20 rounded-full cursor-pointer group select-none"
//             onMouseDown={handleMouseDown}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             {/* Progress track */}
//             <div
//               className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
//               style={{ width: `${progressPercentage}%` }}
//             />

//             {/* Progress handle */}
//             <div
//               className={`absolute top-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-300 cursor-grab ${
//                 isDragging ? "scale-125 cursor-grabbing shadow-2xl" : "group-hover:scale-110"
//               }`}
//               style={{ left: `${progressPercentage}%`, transform: "translate(-50%, -50%)" }}
//             >
//               <div className="absolute inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
//             </div>
//           </div>

//           {/* Progress indicators */}
//           <div className="flex justify-between mt-3 px-1">
//             {skills.map((_, index) => (
//               <div
//                 key={index}
//                 className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
//                   index === currentSkillIndex ? "bg-white scale-125 shadow-lg" : "bg-white/30 hover:bg-white/50"
//                 }`}
//                 onClick={() => {
//                   setCurrentSkillIndex(index)
//                   setRotation(-index * angleStep + 90)
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SkillsPage
