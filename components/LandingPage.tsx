"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Skills from "./skills"
import Projects from "./projects"
import WorkExperience from "./workexperience"
import GetInTouch from "./getintouch"
import { FaHandshakeAngle, FaLocationDot } from "react-icons/fa6"
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

interface LandingPageProps {
  name?: string
  jobTitle?: string
  email?: string
  linkedin?: string
  phone?: string
  location?: string
  isVisible?: boolean
}

const LandingPage: React.FC<LandingPageProps> = ({
  name = "Milan C I",
  jobTitle = "Full-Stack",
  email = "milancheriyamanep@gmail.com",
  linkedin = "linkedin.com/in/milan-ci",
  phone = "+91 7019085645",
  location = "Bengaluru, IN",
  isVisible = true,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const socialLinks = [
    {
      icon: FaEnvelope,
      label: "Email",
      href: `mailto:${email}`,
      color: "hover:text-orange-300",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/milan-ci",
      color: "hover:text-gray-300",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/milan-ci",
      color: "hover:text-blue-400",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://instagram.com/milan_ci",
      color: "hover:text-pink-400",
    },
  ]

  if (!mounted) {
    return <div className="min-h-screen" />
  }

  return (
    <>
      <div className="min-h-[80vh] overflow-hidden flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 my-16 sm:my-28">
        {/* Job Title */}
        <div className={`mb-4 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-orange-300/90 text-xl sm:text-2xl lg:text-3xl font-light tracking-wide">
            {jobTitle}
            <span className="text-white/90 font-bold"> Developer</span>
          </h2>
        </div>

        {/* Name with Typewriter Effect */}
        <div className="mb-8">
          <h1
            className={`text-white text-shadow font-black text-6xl sm:text-6xl lg:text-8xl xl:text-9xl leading-none tracking-tight ${
              isVisible ? "typewriter" : "opacity-0"
            }`}
          >
            {name}
          </h1>
        </div>

        {/* Description */}
        <div className={`mb-12 max-w-2xl ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}>
          <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
            Passionate Full Stack Developer building efficient, scalable, and user-friendly web applications. I
            specialize in crafting seamless experiences from front-end interfaces to back-end systems. Let's bring ideas
            to life with clean code and thoughtful design.
          </p>
        </div>

        <a
          href={"#connect"}
          rel="noopener noreferrer"
          className={`w-fit mb-6 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}
            group flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent
            transition-all duration-300 transform-gpu border-2 border-white
            bg-gradient-to-br from-white via-white/80 to-orange-400
            scale-110 hover:shadow-xl shadow-orange-500/50
          `}
        >
          <FaHandshakeAngle className="text-orange-500 text-xl group-hover:text-orange-500 transition-all duration-300 group-hover:scale-120" />
          <span className="text-sm font-semibold text-black group-hover:text-black">Connect</span>
        </a>

        {/* Contact Information */}
        <div className={`mb-12 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-wrap gap-4 mb-6">
            <div
              className={`group relative w-fit h-fit flex items-start gap-2 py-0 sm:py-1 md:py-2 transition-all duration-300`}
            >
              <FaLocationDot
                className={`text-2xl text-orange-500 group-hover:text-orange-300 transition-colors duration-300 hover:text-orange-300`}
              />
              <span className="text-sm sm:text-base my-auto text-orange-200 font-bold">{location}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group cursor-pointer relative w-12 h-12 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800 flex items-center justify-center transition-all duration-300 hover:border-orange-500/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-2 hover:scale-110`}
              >
                <social.icon
                  className={`text-lg text-gray-400 group-hover:text-orange-300 transition-colors duration-300 ${social.color}`}
                />
                {/* Tooltip */}
                <div
                  className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}
                >
                  {social.label}
                </div>
              </a>
            ))}
          </div>
        </div>

        <Skills />
        <Projects />
        <WorkExperience />
        <div id="connect">
          <GetInTouch />
        </div>
      </div>
    </>
  )
}

export default LandingPage
