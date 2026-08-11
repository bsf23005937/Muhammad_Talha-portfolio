import Image from 'next/image';

export default function WhyChooseUsSection() {
  const features = [
    {
      title: "Economic",
      description: "Cost-effective solutions tailored to your business budget and goals.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      position: "left"
    },
    {
      title: "Time",
      description: "Fast-track delivery schedules to get your products to market sooner.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      position: "right"
    },
    {
      title: "Professional",
      description: "Highly skilled experts dedicated to delivering top-tier digital results.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      position: "left"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock technical assistance whenever you need help.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 9v2m0 4h.01" />
        </svg>
      ),
      position: "right"
    },
    {
      title: "Security",
      description: "Industrial-grade measures to protect your data and digital assets.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      position: "left"
    },
    {
      title: "User Satisfaction",
      description: "Our primary focus is ensuring exceptional experiences for your users.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      position: "right"
    }
  ];

  const leftFeatures = features.filter(f => f.position === "left");
  const rightFeatures = features.filter(f => f.position === "right");

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why <span className="text-[#B480FF]">Choose Us</span>
          </h2>
          <div className="w-24 h-1 bg-[#B480FF] mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 items-center gap-12">
          {/* Left Features */}
          <div className="space-y-12 order-2 lg:order-1">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center lg:items-end text-center lg:text-right gap-4 group animate-fadeInLeft">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#B480FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#B480FF] group-hover:bg-[#B480FF] group-hover:text-white transition-all duration-300 shadow-sm border border-purple-100 flex-shrink-0">
                  {feature.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Central Image */}
          <div className="relative order-1 lg:order-2 flex justify-center py-10 lg:py-0">
            <div className="absolute inset-0 bg-purple-100/30 rounded-full blur-3xl scale-125 -z-10 animate-pulse"></div>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl z-10 animate-float">
              <Image 
                src="/about.jpg"
                alt="Why Choose Muhammad Talha Portfolio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#B480FF]/20 to-transparent"></div>
            </div>
            
            {/* Visual connector circles (desktop only) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[2px] border-t-2 border-dashed border-purple-100 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Right Features */}
          <div className="space-y-12 order-3">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center text-center lg:text-left gap-4 group animate-fadeInRight">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#B480FF] group-hover:bg-[#B480FF] group-hover:text-white transition-all duration-300 shadow-sm border border-purple-100 flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#B480FF] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
