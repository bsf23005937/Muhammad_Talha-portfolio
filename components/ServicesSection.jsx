'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function ServicesSection() {
    const services = [
        {
            title: "Custom Software Development",
            description: "Tailor-made software solutions to address your specific business challenges and goals.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            )
        },
        {
            title: "Web Development",
            description: "Responsive, high-performance websites built with modern technologies for optimal user experience.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            )
        },
        {
            title: "Mobile App Development",
            description: "Native and cross-platform mobile applications that provide seamless mobile experiences.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "UI / UX Design",
            description: "Intuitive and visually stunning designs that prioritize user engagement and satisfaction.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            )
        },
        {
            title: "E-Commerce Solutions",
            description: "Robust e-commerce platforms designed to drive sales and streamline online business operations.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            )
        },
        {
            title: "Backend & API Development",
            description: "Scalable server-side logic and API integration to power your applications securely.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            )
        },
        {
            title: "Cloud & Hosting Services",
            description: "Reliable cloud infrastructure and hosting services ensuring high availability and performance.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
            )
        },
        {
            title: "Software Testing & QA",
            description: "Comprehensive testing services to ensure your software is bug-free and market-ready.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Maintenance & Support",
            description: "Ongoing support and maintenance to keep your systems updated and running smoothly.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        },
        {
            title: "Digital Marketing & SEO",
            description: "Strategic marketing and SEO services to boost your online visibility and reach.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        },
        {
            title: "DevOps & CI/CD",
            description: "Streamlined development operations and continuous integration/deployment pipelines for faster delivery.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        },
        {
            title: "Enterprise Solutions",
            description: "Large-scale enterprise software systems designed to handle complex business processes efficiently.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            )
        }
    ];

    return (
        <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
            {/* Background Image with Overlay */}
         

            {/* Decorative Background Elements on top of overlay */}
            <div className="absolute top-1/4 -left-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl animate-float-slow pointer-events-none z-0"></div>
            <div className="absolute bottom-1/4 -right-10 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl animate-float pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 1. TOP: Header Text */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeInDown">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="w-8 h-[2px] bg-[#A47DFF]"></span>
                        <span className="text-[#A47DFF] font-semibold tracking-wide uppercase text-sm">Our Expertise</span>
                        <span className="w-8 h-[2px] bg-[#A47DFF]"></span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        Empowering Business with <br />
                        <span className="text-[#A47DFF] relative inline-block">
                            Muhammad Talha Portfolio Services
                            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" fill="none">
                                <path d="M0 4C30 1 70 1 100 4" stroke="#A47DFF" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                            </svg>
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        Discover the comprehensive suite of digital services offered by Muhammad Talha Portfolio. We combine innovation, clean UI, reliable code, and conversion-focused strategy to deliver outstanding results.
                    </p>
                </div>

                {/* 2. MIDDLE: Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 animate-fadeInUp">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 group cursor-default h-full flex flex-col items-start"
                        >
                            <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-[#A47DFF] mb-6 group-hover:bg-[#A47DFF] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm flex-shrink-0">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#A47DFF] transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 mb-6 line-clamp-3 group-hover:text-gray-600 flex-grow">
                                {service.description}
                            </p>

                            <Link href={`/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`} className="inline-flex items-center text-sm font-semibold text-[#A47DFF] hover:text-purple-700 transition-colors group/link mt-auto">
                                Learn More
                                <svg className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
