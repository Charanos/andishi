import React from "react";
import { FaFileAlt, FaSearch, FaHandshake, FaRocket } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      icon: FaFileAlt,
      title: "Share Project Details",
      description:
        "Tell us about your project requirements and ideal developer profile",
    },
    {
      icon: FaSearch,
      title: "Match with Developers",
      description:
        "Our AI matches you with pre-vetted developers from our global talent pool",
    },
    {
      icon: FaHandshake,
      title: "Meet & Interview",
      description:
        "Connect with matched candidates through video calls and technical interviews",
    },
    {
      icon: FaRocket,
      title: "Start & Onboard",
      description:
        "Begin your project with seamless onboarding and ongoing support",
    },
  ];

  return (
    <section className="monty py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl lg:text-3xl font-medium text-white text-center mb-8">
          How We Do It in{" "}
          <span className="text-purple-400">4 Simple Steps</span>
        </h2>

        {/* Steps Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <div className="flex-1  relative group">
                <div
                  className="relative p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:scale-105 lg:min-h-[165px] min-w-full flex flex-col items-center text-center"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(59, 130, 246, 0.08) 0%, 
                      rgba(147, 51, 234, 0.04) 50%, 
                      rgba(236, 72, 153, 0.08) 100%)`,
                    boxShadow: `
                      0 4px 16px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `,
                  }}
                >
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-2">
                    <step.icon className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-md font-medium text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative">
                    {/* Static line */}
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400/30 to-purple-400/30"></div>

                    {/* Animated line */}
                    <div
                      className="absolute top-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 opacity-60"
                      style={{
                        animation: `flowRight 3s linear infinite`,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    ></div>

                    {/* Arrow */}
                    <div className="absolute -right-1 -top-1 w-2 h-2 border-r-2 border-t-2 border-blue-400 transform rotate-45 opacity-60"></div>
                  </div>
                </div>
              )}

              {/* Mobile connecting line */}
              {index < steps.length - 1 && (
                <div className="lg:hidden flex justify-center">
                  <div className="w-0.5 h-8 bg-gradient-to-b from-blue-400/30 to-purple-400/30 relative">
                    <div
                      className="absolute top-0 left-0 w-0.5 h-8 bg-gradient-to-b from-blue-400 to-purple-400 opacity-60"
                      style={{
                        animation: `flowDown 3s linear infinite`,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    ></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-blue-400 transform rotate-45 opacity-60"></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flowRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes flowDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
