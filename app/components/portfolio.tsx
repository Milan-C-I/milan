"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import LandingPage from "./LandingPage";
import PlaceholderPage from "./PlaceholderPage";

const Portfolio: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  // const [bgStyle, setBgStyle] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window?.scrollY);

      const glowIntensity = Math.min(0.9, 0.6 + window.scrollY * 0.001);
      document
        .querySelector(".animated-gradient")
        ?.setAttribute("style", `opacity: ${glowIntensity}`);
    };
    handleScroll();
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Reset animations when changing tabs
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 100);
  };

  const renderCurrentPage = () => {
    switch (activeTab) {
      case "home":
        return <LandingPage isVisible={isVisible} />;
      case "summary":
        return (
          <PlaceholderPage
            title="Summary"
            description="A comprehensive overview of my professional journey, key achievements, and career highlights."
            isVisible={isVisible}
          />
        );
      case "experience":
        return (
          <PlaceholderPage
            title="Experience"
            description="Detailed breakdown of my work experience, projects, and professional accomplishments."
            isVisible={isVisible}
          />
        );
      case "skills":
        return (
          <PlaceholderPage
            title="Skills"
            description="Technical skills, programming languages, frameworks, and tools I work with."
            isVisible={isVisible}
          />
        );
      case "links":
        return (
          <PlaceholderPage
            title="Links"
            description="Connect with me on various platforms and explore my work across the web."
            isVisible={isVisible}
          />
        );
      default:
        return <LandingPage isVisible={isVisible} />;
    }
  };

  return (
    <>
      {/* Custom Styles */}
      {/* <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

        .animated-gradient {
          background: linear-gradient(
            -45deg,
            #ff8800,
            #ff0044,
            #3300ff,
            #00c0ff
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          transition: opacity 0.3s ease;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
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
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%,
          50% {
            border-color: transparent;
          }
          51%,
          100% {
            border-color: white;
          }
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
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style> */}

      <div className="relative min-h-screen overflow-hidden font-inter">
        {/* Animated Background */}
        <div
          className="fixed inset-0 -z-10 animated-gradient"
          style={{ opacity: 0.9 }}
        />

        {/* Header */}
        <Header isVisible={isVisible} />

        {/* Main Content */}
        <div className="relative">
          {renderCurrentPage()}

          {/* Navigation Bar */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10">
            <Navbar
              activeTab={activeTab}
              onTabChange={handleTabChange}
              isVisible={isVisible}
            />
          </div>
        </div>

        {/* Scroll Indicator - Only show on home page */}
        {activeTab === "home" && (
          <div
            className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 ${
              isVisible ? "fade-in" : "opacity-0"
            }`}
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
  );
};

export default Portfolio;
