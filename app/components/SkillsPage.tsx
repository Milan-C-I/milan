"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
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
  SiLinux, 
  SiFigma 
} from "react-icons/si"
import { FaServer } from "react-icons/fa"
import { VscVscode } from "react-icons/vsc"

interface Skill {
  id: number
  name: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  description: string
}

interface SkillsPageProps {
  isVisible?: boolean
}

const SkillsPage: React.FC<SkillsPageProps> = ({ isVisible = true }) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartProgress, setDragStartProgress] = useState(0)

  // Updated skills data with icons
  const skills: Skill[] = [
    { id: 1, name: "React.js", icon: SiReact, category: "Frontend", description: "Component-based UI library" },
    { id: 2, name: "Next.js", icon: SiNextdotjs, category: "Framework", description: "Full-stack React framework" },
    { id: 3, name: "TypeScript", icon: SiTypescript, category: "Language", description: "Typed JavaScript superset" },
    { id: 4, name: "Tailwind CSS", icon: SiTailwindcss, category: "Styling", description: "Utility-first CSS framework" },
    { id: 5, name: "Vue.js", icon: SiVuedotjs, category: "Frontend", description: "Progressive JavaScript framework" },
    { id: 6, name: "Node.js", icon: SiNodedotjs, category: "Backend", description: "JavaScript runtime environment" },
    { id: 7, name: "Express.js", icon: SiExpress, category: "Backend", description: "Web application framework" },
    { id: 8, name: "Python", icon: SiPython, category: "Language", description: "High-level programming language" },
    { id: 9, name: "Django", icon: SiDjango, category: "Framework", description: "Python web framework" },
    { id: 10, name: "REST APIs", icon: FaServer, category: "API", description: "RESTful web services" },
    { id: 11, name: "MongoDB", icon: SiMongodb, category: "Database", description: "NoSQL document database" },
    { id: 12, name: "PostgreSQL", icon: SiPostgresql, category: "Database", description: "Relational database system" },
    { id: 13, name: "Firebase", icon: SiFirebase, category: "Backend", description: "Backend-as-a-Service platform" },
    { id: 14, name: "AWS", icon: SiAwsamplify, category: "Cloud", description: "Cloud computing services" },
    { id: 15, name: "Redis", icon: SiRedis, category: "Database", description: "In-memory data structure store" },
    { id: 16, name: "Git", icon: SiGit, category: "DevOps", description: "Version control system" },
    { id: 17, name: "Docker", icon: SiDocker, category: "DevOps", description: "Containerization platform" },
    { id: 18, name: "VS Code", icon: VscVscode, category: "Tools", description: "Source code editor" },
    { id: 19, name: "Linux", icon: SiLinux, category: "OS", description: "Open-source operating system" },
    { id: 20, name: "Figma", icon: SiFigma, category: "Design", description: "Design and prototyping tool" },
  ]

  const totalSkills = skills.length
  // Semi-circle: 180 degrees total
  const totalAngle = 180
  const angleStep = totalAngle / (totalSkills - 1)

  // Handle progress bar drag functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragStartProgress(currentSkillIndex / (totalSkills - 1))
    e.preventDefault()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!isDragging || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const deltaX = e.clientX - dragStartX
    const deltaProgress = deltaX / rect.width
    const newProgress = Math.max(0, Math.min(1, dragStartProgress + deltaProgress))
    const newIndex = Math.round(newProgress * (totalSkills - 1))

    setCurrentSkillIndex(newIndex)
    // Rotate the entire semi-circle structure
    setRotation(-newIndex * angleStep)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    setDragStartProgress(currentSkillIndex / (totalSkills - 1))
    e.preventDefault()
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !progressRef.current) return

    const rect = progressRef.current.getBoundingClientRect()
    const deltaX = e.touches[0].clientX - dragStartX
    const deltaProgress = deltaX / rect.width
    const newProgress = Math.max(0, Math.min(1, dragStartProgress + deltaProgress))
    const newIndex = Math.round(newProgress * (totalSkills - 1))

    setCurrentSkillIndex(newIndex)
    setRotation(-newIndex * angleStep)
    e.preventDefault()
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Global mouse events for drag continuation
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e)
      const handleGlobalMouseUp = () => setIsDragging(false)

      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove)
        document.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, dragStartX, dragStartProgress])

  // Auto-rotate functionality (optional - disabled during drag)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentSkillIndex((prev) => {
          const next = (prev + 1) % totalSkills
          setRotation(-next * angleStep)
          return next
        })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [isDragging, totalSkills, angleStep])

  const currentSkill = skills[currentSkillIndex]
  const progressPercentage = (currentSkillIndex / (totalSkills - 1)) * 100

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Edge fade effects */}
      {/* Header */}
        <div className="text-center mb-8 sm:mb-12 z-20 relative">
          <h1 className="text-white text-shadow font-black text-4xl sm:text-6xl lg:text-7xl mb-4 tracking-tight">
            Skills
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Technologies and tools I work with to create amazing digital experiences
          </p>
        </div>
      <div className="absolute inset-0 pointer-events-none">
        {/* Top fade */}
        {/* <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" /> */}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" />
        {/* Left fade */}
        {/* <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" /> */}
        {/* Right fade */}
        {/* <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent backdrop-blur-sm z-10" /> */}
      </div>

      <div
        className={`absolute bottom-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-8 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}
      >
        

        {/* Semi-circular Skills Display */}
        <div className="absolute -top-10 md:top-40 lg:top-80 transform translate-y-128 w-full h-full flex-1 flex items-center justify-center">
          <div className="relative w-full h-full max-w-6xl max-h-[70vh]">
            {/* Current Skill Name Display - Above Progress Bar */}
            <div className="absolute top-48 md:top-20 lg:-top-16 left-1/2 transform -translate-x-1/2 -translate-y-96 z-30">
              <div className="text-center p-4 sm:p-6 sm:px-16 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <currentSkill.icon className="text-3xl sm:text-4xl lg:text-5xl text-white" />
                  <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-shadow">
                    {currentSkill.name}
                  </h2>
                </div>
                <p className="text-orange-300 text-lg sm:text-xl font-medium">{currentSkill.category}</p>
              </div>
            </div>

            {/* Rotating Semi-circular Skills Container */}
            <div
              className="absolute transform translate-x-4 inset-0 flex items-center justify-center transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div className="relative w-96 h-96 sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px]">
                {skills.map((skill, index) => {
                  // Position skills along the semi-circle arc
                  const angle = -90 + index * angleStep // From -90° (top) to +90° (bottom)
                  const radian = (angle * Math.PI) / 180
                  const radius = 480 // Distance from center
                  const x = 50 + (radius / 3) * Math.cos(radian) // Percentage position
                  const y = 50 + (radius / 3) * Math.sin(radian)

                  const isActive = index === currentSkillIndex
                  const distanceFromActive = Math.abs(index - currentSkillIndex)
                  const opacity = Math.max(0.4, 1 - distanceFromActive * 0.1)

                  return (
                    <div
                      key={skill.id}
                      className={`absolute transition-all duration-700 cursor-pointer group ${
                        isActive ? "scale-125 translate-1/12 z-30" : "scale-100 hover:scale-110 z-10"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: `translate(-50%, -50%) rotate(${-rotation}deg)`, // Counter-rotate to keep cards upright
                        opacity: opacity,
                      }}
                      onClick={() => {
                        setCurrentSkillIndex(index)
                        setRotation(-index * angleStep)
                      }}
                    >
                      <div //card size
                        className={`w-32 h-32 sm:w-38 sm:h-48 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-black/40 backdrop-blur-xl rounded-full border border-white/20 shadow-xl flex flex-col items-center justify-center p-3 transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-br from-black via-black to-orange-500 border-blue-400/60 shadow-2xl"
                            : "bg-gradient-to-br from-white via-white to-orange-500 hover:border-orange-500"
                        }`}
                      >
                        {/* Icon */}
                        <skill.icon 
                          className={`transition-all duration-500  mb-2 ${
                            isActive ? "text-4xl sm:text-5xl md:text-6xl text-orange-500" : "text-2xl text-black/50 sm:text-3xl md:text-4xl"
                          }`} 
                        />
                        
                        {/* Show name and description only when active */}
                        {isActive && (
                          <div className="text-center">
                            <h3 className="text-orange-500 font-semibold text-xs sm:text-sm md:text-base mb-1">
                              {skill.name}
                            </h3>
                            <p className="text-orange-300 text-xs sm:text-sm leading-tight">
                              {skill.description}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Skill name tooltip for non-active items */}
                      {!isActive && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-40">
                          <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                            {skill.name}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar - Simple design */}
        <div className="w-full max-w-2xs md:max-w-xl lg:max-w-xl mx-auto mb-8 z-20 absolute bottom-60 md:bottom-48">
          <div className="mb-4 text-center">
            <span className="text-white/70 text-sm font-medium">
              {currentSkillIndex + 1} of {totalSkills}
            </span>
          </div>

          <div
            ref={progressRef}
            className="relative h-1 sm:h-2 bg-white/20 rounded-full cursor-pointer group select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Simple progress track */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-black to-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />

            {/* Progress handle */}
            <div
              className={`absolute top-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gray-500 rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-300 cursor-grab ${
                isDragging ? "scale-125 cursor-grabbing shadow-2xl" : "group-hover:scale-110"
              }`}
              style={{ left: `${progressPercentage}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-black via-black to-orange-400 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsPage