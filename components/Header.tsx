"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { MdOutlineFileDownload } from "react-icons/md"

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const handleNameClick = () => {
    router.push("/")
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0 })
    }, 100)
  }

  const isHomePage = pathname === "/"

  return (
    <header
      className={`fixed w-[100vw] top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 sm:px-12 py-4">
        {/* Left side - Status and Name */}
        <div className="flex items-center gap-6">
          {/* Status Indicator - Always visible */}
          <div
            className={`flex items-center transition-all duration-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span className="text-white font-medium text-sm sm:text-base">Open to work</span>
          </div>

          {/* Name - Always visible, clickable */}
          <div
            className={`transition-all duration-500 cursor-pointer ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            onClick={handleNameClick}
            style={{ transitionDelay: "100ms" }}
          >
            <h1 className="text-white font-black text-xl sm:text-2xl lg:text-3xl hover:text-orange-300 transition-colors duration-300">
              Milan C I
            </h1>
          </div>
        </div>

        {/* Download Resume Button */}
        <div
          className={`transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <a href="/Milan-Resume.pdf" download>
          <button
            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent
              transition-all duration-300 transform-gpu cursor-pointer
              bg-gradient-to-br from-black via-black/80 to-orange-400 
              hover:scale-110 hover:shadow-xl hover:shadow-orange-500/50"
          >
            <MdOutlineFileDownload className="w-4 h-4 text-orange-500 sm:w-5 sm:h-5 transition-all duration-300 group-hover:scale-110" />
            <span className="font-bold text-white transition-all duration-300 group-hover:text-white text-sm sm:text-base">
              Resume
            </span>
          </button>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
