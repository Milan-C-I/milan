"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FaArrowUp } from "react-icons/fa"

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    setIsAnimating(true)

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Reset animation after scroll completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 1000)
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-28 sm:bottom-24 right-6 sm:right-8 z-40 group cursor-pointer transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      aria-label="Scroll to top"
    >
      {/* Outer circle with fill animation */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14">
        {/* Background circle */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-full border border-orange-500/30 transition-all duration-300 group-hover:border-orange-500/60 group-hover:bg-black/80"></div>

        {/* Fill animation circle */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ease-out ${
            isAnimating
              ? "bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 scale-100"
              : "bg-transparent scale-0"
          }`}
        ></div>

        {/* Hover fill circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-400/20 to-orange-600/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>

        {/* Arrow icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaArrowUp
            className={`transition-all duration-300 ${
              isAnimating
                ? "text-white text-lg sm:text-xl scale-110"
                : "text-orange-400 group-hover:text-orange-300 text-base sm:text-lg group-hover:scale-110"
            }`}
          />
        </div>

        {/* Pulse effect on hover */}
        <div className="absolute inset-0 rounded-full bg-orange-500/30 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Back to top
      </div>
    </button>
  )
}

export default ScrollToTop
