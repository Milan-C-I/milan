import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "../components/Header"
import ScrollToTop from "../components/ScrollToTop"
import Navbar from "@/components/Navbar"
import UnderConstructionBanner from "@/components/underconstruction"
import ParticleOrbitEffect from "@/components/particle-orbit-effect"

export const metadata: Metadata = {
  title: "Milan CI",
  description: "Portfolio of Milan CI – Web Developer showcasing modern projects and skills.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="scroll-smooth overflow-x-hidden">
        {/* Animated background particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="fixed w-2 h-2 bg-orange-400/30 rounded-full animate-twinkle floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}

        {/* Background gradient */}
        <div className="fixed -top-30 -left-30 -z-9   md:top-30 md:left-20 w-72 h-72 bg-orange-500/80 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed inset-0 -z-10 animated-gradient" style={{ opacity: 1 }} />

        <ParticleOrbitEffect className="hidden md:block" particleCount={20} particleSize={3} fadeOpacity={0.02} radiusScale={1.2} colorRange={[0,40]} intensity={0.7}/>
        {/* Fixed Header */}
        <Header />


        {/* Main content with top padding to account for fixed header */}
        <main className="pt-20">
          {children}
        </main>
        <Navbar />
        {/* <UnderConstructionBanner/> */}
        
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </body>
    </html>
  )
}
