'use client';
import { useState } from 'react';

export default function FeaturesSection() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Select A Project',
      description: 'We have the technology and industry expertise to develop solutions that can connect people and businesses across variety of when tasks need mobile devices.'
    },
    {
      number: 2,
      title: 'Project Analysis',
      description: 'We have the technology and industry expertise to develop solutions that can connect people and businesses across variety of when tasks need mobile devices.'
    },
    {
      number: 3,
      title: 'Deliver The Result',
      description: 'We have the technology and industry expertise to develop solutions that can connect people and businesses across variety of when tasks need mobile devices.'
    }
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[rgb(164,125,255)] font-semibold tracking-wide uppercase text-sm mb-3 block">
            Features Case
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 leading-tight">
            Our Latest Case Study<br className="hidden sm:block" />
            For Your Business
          </h2>
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="w-12 h-1 bg-[rgb(164,125,255)] rounded-full"></div>
            <div className="w-3 h-3 rounded-full bg-[rgb(164,125,255)]"></div>
            <div className="w-12 h-1 bg-[rgb(164,125,255)] rounded-full"></div>
          </div>
        </div>

        {/* Steps Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Desktop View - Horizontal Layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connecting Dashed Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-16 lg:top-20 left-1/2 w-full h-0.5 z-0">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <line 
                        x1="50%" 
                        y1="0" 
                        x2="100%" 
                        y2="0" 
                        stroke="rgb(164,125,255)" 
                        strokeWidth="2" 
                        strokeDasharray="8,8"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                )}

                <div 
                  className="relative z-10 text-center cursor-pointer group"
                  onMouseEnter={() => setActiveStep(step.number)}
                >
                  {/* Number Circle with Glow */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Purple Glow Background */}
                    <div className="absolute inset-0 w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-[rgb(164,125,255)] opacity-25 blur-3xl"></div>
                    
                    {/* Purple Circle */}
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-[rgb(164,125,255)] flex items-center justify-center text-white text-2xl lg:text-3xl font-bold shadow-xl transform group-hover:scale-110 transition-all duration-300">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold text-black mb-4 group-hover:text-[rgb(164,125,255)] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed px-2">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet View - Vertical Layout */}
          <div className="md:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connecting Vertical Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-16 z-0">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <line 
                        x1="0" 
                        y1="0" 
                        x2="0" 
                        y2="100%" 
                        stroke="rgb(164,125,255)" 
                        strokeWidth="2" 
                        strokeDasharray="8,8"
                        opacity="0.4"
                      />
                    </svg>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Number Circle with Glow */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    {/* Purple Glow Background */}
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-[rgb(164,125,255)] opacity-25 blur-3xl"></div>
                    
                    {/* Purple Circle */}
                    <div className="relative w-16 h-16 rounded-full bg-[rgb(164,125,255)] flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <button className="inline-flex items-center gap-3 bg-[rgb(164,125,255)] text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
            View All Portfolio
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
