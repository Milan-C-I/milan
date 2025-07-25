"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { GoHome } from "react-icons/go"
import { RiUserLine } from "react-icons/ri"
import { IoFolderOutline } from "react-icons/io5"
import { VscTools } from "react-icons/vsc"
import { MdOutlineLink } from "react-icons/md"

const Navbar: React.FC = () => {
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 })
  const [isVisible, setIsVisible] = useState(true)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { icon: GoHome, label: "Home", id: "home", path: "/" },
    { icon: RiUserLine, label: "About", id: "about", path: "/About" },
    { icon: IoFolderOutline, label: "Projects", id: "projects", path: "/Projects" },
    { icon: VscTools, label: "Skills", id: "skills", path: "/Skills" },
    { icon: MdOutlineLink, label: "Links", id: "links", path: "/Links" },
  ]

  // Get current active tab based on pathname
  const getActiveTab = () => {
    const currentItem = navItems.find((item) => item.path === pathname)
    return currentItem?.id || "home"
  }

  const activeTab = getActiveTab()

  const updateIndicator = () => {
    const activeIndex = navItems.findIndex((item) => item.id === activeTab)
    const activeElement = itemRefs.current[activeIndex]

    if (activeElement && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const activeRect = activeElement.getBoundingClientRect()

      setIndicatorStyle({
        width: activeRect.width,
        left: activeRect.left - navRect.left - 15,
      })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      updateIndicator()
    }, 100)

    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
    }
  }, [activeTab])

  const handleTabClick = (path: string) => {
    router.push(path)
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0})
    }, 100)
  }

  return (
    <div
      className={`fixed w-[100vw] pt-2 pb-3 sm:w-auto bottom-0 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-50 sm:backdrop-blur-none backdrop-blur-md transition-all duration-500 ${
        isVisible ? "translate-y-0 sm:translate-y-0 opacity-100" : "translate-y-0 opacity-0"
      }`}
    >
      <nav
        ref={navRef}
        className="relative w-[90vw] m-auto sm:w-auto max-w-md sm:max-w-none bg-black/20 backdrop-blur-lg rounded-full mt-1 mb-0.5 px-3 py-3 sm:px-3 sm:py-3 border border-white/10 shadow-2xl"
      >
        {/* Sliding indicator */}
        <div
          className="absolute top-2 sm:top-3 bg-gradient-to-br from-black via-black to-orange-400 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{
            width: `${indicatorStyle.width + 5}px`,
            height: "70%",
            transform: `translateX(${indicatorStyle.left}px)`,
            opacity: indicatorStyle.width > 0 ? 1 : 0,
          }}
        />

        {/* Navigation items */}
        <div className="relative flex items-center justify-around gap-1 sm:gap-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                onClick={() => handleTabClick(item.path)}
                className={`relative z-10 px-3 py-2 sm:px-4 sm:py-3 rounded-full font-medium flex items-center gap-1.5 sm:gap-2 transition-all duration-300 text-xs sm:text-sm md:text-base cursor-pointer group ${
                  isActive ? "text-orange-200 scale-105" : "text-white/70 hover:text-white hover:scale-105"
                } hover:shadow-lg`}
                style={{ animationDelay: `${1.4 + index * 0.1}s` }}
              >
                <IconComponent
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-110"
                  }`}
                />
                <span
                  className={`hidden sm:inline transition-all duration-300 ${
                    isActive ? "font-semibold drop-shadow-sm" : "font-medium"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl opacity-50" />
      </nav>

      {/* Mobile label */}
      <div className="sm:hidden text-orange-400 text-sm text-center font-medium">
        {navItems.find((item) => item.id === activeTab)?.label}
      </div>
    </div>
  )
}

export default Navbar
