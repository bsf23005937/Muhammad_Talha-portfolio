'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    "Web Development",
    "AI Automation",
    "Mobile App Development",
    "SEO",
    "CMS",
    "All Inventory Systems"
  ];

  return (
    <section className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column - Image Composition */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Main Image Background Blob */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A47DFF]/20 to-blue-50/50 rounded-[2.5rem] transform -rotate-3 -z-10 animate-pulse"></div>

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#A47DFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                <Image
                  src="/hero1.jpg"
                  alt="About Muhammad Talha Portfolio"
                  width={600}
                  height={800}
                  className="object-cover w-full h-[500px] lg:h-[600px] group-hover:scale-105 transition-all duration-700"
                />

                {/* Overlay Card - Total Clients */}
                <div className="absolute bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl max-w-[200px] animate-fadeIn animation-delay-300 z-20 border border-purple-50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center text-[#A47DFF]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium">Projects Delivered</p>
                      <p className="text-2xl font-bold text-[#A47DFF]">100+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-green-500 flex items-center font-medium">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      35%
                    </span>
                    Faster delivery workflows
                  </div>
                </div>

                {/* Floating Image - Top Right */}
                <div className="absolute top-8 right-8 w-40 h-28 hidden sm:block animate-float z-20">
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border-2 border-white hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/inner_05.jpg"
                      alt="Team working"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-[#A47DFF]"></span>
                <span className="text-[#A47DFF] font-semibold tracking-wide uppercase text-sm">Our Expertise</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Empowering Business with <br />
                <span className="text-[#A47DFF] relative inline-block">
                  Muhammad Talha Portfolio Services
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                    <path d="M0 3C50 1 150 1 200 3" stroke="#A47DFF" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  </svg>
                </span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Discover the complete digital service suite from Muhammad Talha Portfolio. We combine design, development, automation, and SEO strategy to build websites and systems that are clean, fast, and ready to grow.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-[#A47DFF] flex items-center justify-center text-[#A47DFF] group-hover:bg-[#A47DFF] group-hover:text-white transition-colors duration-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-[#A47DFF] transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-8">
              <Link
                href="/about"
                className="group bg-[#A47DFF] text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Discover More
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <a href="tel:" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#A47DFF] group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us Now</p>
                  <p className="text-lg font-bold text-gray-900 group-hover:text-[#A47DFF] transition-colors">Still need to gather</p>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
