'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "Muhammad Talha Portfolio transformed our digital presence completely. Their AI automation solutions saved us countless hours and significantly improved our efficiency. The team's expertise and dedication are truly unmatched!",
      company: "TechStart Inc"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Marketing Director, Growth Co",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      text: "Working with Muhammad Talha Portfolio was a game-changer for our business. Their SEO strategies increased our organic traffic by 300% in just 6 months. Highly professional and results-driven team!",
      company: "Growth Co"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Founder, StyleHub",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "The web development expertise at Muhammad Talha Portfolio is phenomenal. They built us a stunning, high-performance website that perfectly captures our brand. Our conversion rate has doubled since launch!",
      company: "StyleHub"
    },
    {
      id: 4,
      name: "David Park",
      position: "CTO, DataFlow Systems",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Their backend solutions are robust and scalable. Muhammad Talha Portfolio delivered a complex system ahead of schedule and under budget. Best development partner we've ever worked with!",
      company: "DataFlow Systems"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Operations Manager, EcoTech",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "Outstanding service from start to finish! The team at Muhammad Talha Portfolio is responsive, creative, and incredibly skilled. They truly understand business needs and deliver solutions that work.",
      company: "EcoTech"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#F8F9FF] via-white to-[#E6E9FF] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-[#B480FF]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[#B480FF]"></span>
            <span className="text-[#B480FF] font-semibold tracking-wide uppercase text-sm">Client Testimonials</span>
            <span className="w-8 h-[2px] bg-[#B480FF]"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            What Our <span className="text-[#B480FF] relative inline-block">
              Clients Say
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" fill="none">
                <path d="M0 4C30 1 70 1 100 4" stroke="#B480FF" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from businesses we've helped transform
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border border-purple-100/50 backdrop-blur-sm overflow-hidden">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 text-[#B480FF]/20">
              <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
              </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 pt-8">
              {/* Rating Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 text-base md:text-xl leading-relaxed text-center mb-8 max-w-3xl mx-auto font-medium">
                &ldquo;{testimonials[activeIndex].text}&rdquo;
              </p>

              {/* Client Info */}
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#B480FF]/20 mb-4 shadow-lg">
                  <Image 
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-[#B480FF] font-semibold mb-1">
                  {testimonials[activeIndex].position}
                </p>
                <p className="text-gray-500 text-sm">
                  {testimonials[activeIndex].company}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation — arrows + dots in a single row, always visible on mobile */}
          <div className="flex items-center justify-center gap-4 mt-8">
            {/* Prev Button */}
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#B480FF] hover:text-white active:scale-95 transition-all duration-300 hover:scale-110 hover:shadow-purple-200/50 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? 'w-8 h-3 bg-[#B480FF] shadow-md shadow-purple-200'
                      : 'w-3 h-3 bg-gray-300 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#B480FF] hover:text-white active:scale-95 transition-all duration-300 hover:scale-110 hover:shadow-purple-200/50 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Thumbnails */}
        <div className="flex justify-center gap-4 flex-wrap">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveIndex(index)}
              className={`relative group transition-all duration-300 ${
                index === activeIndex ? 'scale-110' : 'scale-90 opacity-50'
              }`}
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                index === activeIndex 
                  ? 'border-[#B480FF] shadow-xl' 
                  : 'border-gray-200 group-hover:border-purple-300'
              }`}>
                <Image 
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-200/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B480FF] mb-1">500+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B480FF] mb-1">98%</div>
              <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B480FF] mb-1">1000+</div>
              <div className="text-sm text-gray-600 font-medium">Projects Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#B480FF] mb-1">24/7</div>
              <div className="text-sm text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
