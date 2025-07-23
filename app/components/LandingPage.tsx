"use client";

import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Skills from "./skills";

interface LandingPageProps {
  name?: string;
  jobTitle?: string;
  email?: string;
  linkedin?: string;
  phone?: string;
  location?: string;
  isVisible?: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({
  name = "Milan C I",
  jobTitle = "Full-Stack Developer",
  email = "milancheriyamanep@gmail.com",
  linkedin = "linkedin.com/in/milan-ci",
  phone = "+91 7019085645",
  location = "Bengaluru, IN",
  isVisible = true,
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-32 mt-28">
      {/* Job Title */}
      <div
        className={`mb-4 ${isVisible ? "slide-up" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-white/90 text-xl sm:text-2xl lg:text-3xl font-light tracking-wide">
          {jobTitle}
        </h2>
      </div>

      {/* Name with Typewriter Effect */}
      <div className="mb-8">
        <h1
          className={`text-white text-shadow font-black  text-6xl sm:text-6xl lg:text-8xl xl:text-9xl leading-none tracking-tight ${
            isVisible ? "typewriter" : "opacity-0"
          }`}
        >
          {name}
        </h1>
      </div>

      {/* Description */}
      <div
        className={`mb-12 max-w-2xl ${
          isVisible ? "slide-up" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
          Passionate Full Stack Developer building efficient, scalable, and
          user-friendly web applications. I specialize in crafting seamless
          experiences from front-end interfaces to back-end systems. Let's bring
          ideas to life with clean code and thoughtful design.
        </p>
      </div>

      {/* Contact Information */}
      <div
        className={`mb-12 ${
          isVisible ? "slide-up" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid w-fit grid-cols-1 sm:grid-cols-2 gap-4">
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
      <Skills/>
    </div>
  );
};

export default LandingPage;
