"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram,
  FaPaperPlane,
  FaUser,
  FaComment
} from "react-icons/fa";

const GetInTouch: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [sectionsInView, setSectionsInView] = useState<boolean[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Initialize sections visibility array
  useEffect(() => {
    setSectionsInView(new Array(3).fill(false)); // Contact info, form, social links
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    if (!sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setSectionsInView(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    const sectionElements = sectionRef.current.querySelectorAll('.animate-section');
    sectionElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call for nodemailer
    try {
      // Here you would integrate with your nodemailer API endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulate success after 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "milancheriyamanep@gmail.com",
      href: "mailto:milancheriyamanep@gmail.com"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 7019085645",
      href: "tel:+917019085645"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Mangaluru, Karnataka, IN",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/Milan-C-I",
      color: "hover:text-gray-300"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/milan-ci",
      color: "hover:text-blue-400"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://instagram.com/_.m_ilan._",
      color: "hover:text-pink-400"
    }
  ];

  return (
    <div className="bg-none text-white">
      <div className="py-6">
        <div className="mb-8 sm:mb-0">
          <h2
            className={`text-2xl sm:text-4xl mb-8 font-extrabold md:font-semibold leading-none tracking-tight text-white transform transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
            }`}
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.3)",
            }}
          >
            GET IN TOUCH
          </h2>

          <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Section */}
            <div 
              data-index={0}
              className={`animate-section space-y-8 transform transition-all duration-700 ease-out ${
                sectionsInView[0] 
                  ? 'opacity-100 translate-x-0 translate-y-0' 
                  : 'opacity-0 -translate-x-20 translate-y-10'
              }`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-orange-300">Let's Connect</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm always interested in discussing new opportunities, creative projects, 
                  or just having a chat about technology. Feel free to reach out through 
                  any of the channels below.
                </p>
              </div>

              {/* Contact Info Cards - No Borders */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      className={`group block bg-gray-900/30 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-orange-500/10 transform hover:-translate-y-1`}
                      style={{
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-300">
                            <IconComponent className="text-orange-400 text-lg group-hover:text-orange-300 transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-400 group-hover:text-orange-300 transition-colors duration-300">
                            {info.label}
                          </h4>
                          <p className="text-white group-hover:text-gray-200 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div 
                data-index={2}
                className={`animate-section pt-8 transform transition-all duration-700 ease-out ${
                  sectionsInView[2] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                <h4 className="text-lg font-semibold mb-4 text-orange-300">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative w-12 h-12 bg-gray-900/30 backdrop-blur-sm rounded-lg border border-gray-800 flex items-center justify-center transition-all duration-300 hover:border-orange-500/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-orange-500/20 transform hover:-translate-y-2 hover:scale-110`}
                        style={{
                          transitionDelay: `${index * 50}ms`
                        }}
                        onMouseEnter={() => setHoveredSocial(social.label)}
                        onMouseLeave={() => setHoveredSocial(null)}
                      >
                        <IconComponent className={`text-lg text-gray-400 group-hover:text-orange-300 transition-colors duration-300 ${social.color}`} />
                        
                        {/* Tooltip */}
                        <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap`}>
                          {social.label}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div 
              data-index={1}
              className={`animate-section transform transition-all duration-700 ease-out ${
                sectionsInView[1] 
                  ? 'opacity-100 translate-x-0 translate-y-0' 
                  : 'opacity-0 translate-x-20 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="bg-gradient-to-tr from-black via-black to-orange-500/80 backdrop-blur-sm rounded-xl border border-gray-800 p-6 lg:p-8">
                <h3 className="text-xl font-bold mb-6 text-orange-300">Send a Message</h3>
                
                <div className="space-y-3 md:space-y-4">
                  {/* Name Field */}
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-orange-300 transition-colors duration-300">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-500 text-sm group-focus-within:text-orange-400 transition-colors duration-300" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-orange-300 transition-colors duration-300">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-500 text-sm group-focus-within:text-orange-400 transition-colors duration-300" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="group">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-orange-300 transition-colors duration-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2 group-focus-within:text-orange-300 transition-colors duration-300">
                      Message
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FaComment className="text-gray-500 text-sm group-focus-within:text-orange-400 transition-colors duration-300" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or just say hello..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                      isSubmitting
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 active:translate-y-0'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        Send Message
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm animate-pulse">
                      ✓ Message sent successfully! I'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm animate-pulse">
                      ✗ Failed to send message. Please try again or contact me directly.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Smooth focus transitions */
        .group:focus-within .absolute div {
          color: #fb923c;
        }

        /* Custom scrollbar for textarea */
        textarea::-webkit-scrollbar {
          width: 6px;
        }

        textarea::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 3px;
        }

        textarea::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 3px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background: #fb923c;
        }

        /* Loading spinner animation */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        /* Hover glow effect for social links */
        .group:hover {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.1);
        }
      `}</style>
    </div>
  );
};

export default GetInTouch;