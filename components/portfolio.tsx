"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Header from "./Header"
import Navbar from "./Navbar"
import LandingPage from "./LandingPage"
import PlaceholderPage from "./PlaceholderPage"
import SkillsPage from "./SkillsPage"
import About from "./About"
import ProjectsPage from "./ProjectsPage"

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  // const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window?.scrollY)

      const glowIntensity = Math.min(0.9, 0.6 + window.scrollY * 0.001)
      document.querySelector(".animated-gradient")?.setAttribute("style", `opacity: ${glowIntensity}`)
    }
    handleScroll()
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    // Reset animations when changing tabs
    setIsVisible(false)
    setTimeout(() => setIsVisible(true), 100)
  }

  const renderCurrentPage = () => {
    switch (activeTab) {
      case "home":
        return <LandingPage isVisible={isVisible} />
      case "about":
        return <About/>
      case "projects":
        return <ProjectsPage/>
      case "skills":
        return <SkillsPage isVisible={isVisible} />
      case "links":
        return (
          <PlaceholderPage
            title="Links"
            description="Connect with me on various platforms and explore my work across the web."
            isVisible={isVisible}
          />
        )
      default:
        return <LandingPage isVisible={isVisible} />
    }
  }

  return (
    <>
      <div className="relative scroll-smooth min-h-screen overflow-hidden font-inter">
        {/* Animated Background */}
        
        {/* <div className="fixed inset-0 -z-10 animated-gradient1" style={{opacity: 0.9}}/> */}
        {/* Header */}
        <Header/>

        {/* Main Content */}
        <div className="relative">
          {renderCurrentPage()}

          {/* Navigation Bar */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10">
            <Navbar/>
          </div>
        </div>

        {/* Scroll Indicator - Only show on home page */}
        {activeTab === "home" && (
          <div
            className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 ${isVisible ? "fade-in" : "opacity-0"}`}
            style={{ animationDelay: "2s" }}
          >
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Portfolio
