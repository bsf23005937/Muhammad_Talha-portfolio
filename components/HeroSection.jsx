'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16 lg:py-20">
      <div className="absolute left-8 top-16 h-72 w-72 rounded-full bg-[#A47DFF]/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-10 h-96 w-96 rounded-full bg-[#E6E9FF]/70 blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-6">
            <div className="inline-flex animate-fadeIn items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-semibold text-[#A47DFF] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#A47DFF]"></span>
              Muhammad Talha Portfolio
            </div>

            <h1 className="max-w-4xl animate-fadeInUp text-[2.5rem] font-bold leading-[1.12] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              I build the software small businesses run their operations on — solo, start to finish.
            </h1>

            <p className="max-w-2xl animate-fadeInUp text-lg leading-relaxed text-gray-600 animation-delay-200 sm:text-xl">
              Portfolio focused on clinic systems, POS workflows, supply platforms, dashboards, and real project screenshots.
            </p>

            <div className="grid animate-fadeInUp gap-3 animation-delay-400 sm:max-w-xl sm:grid-cols-3">
              {[
                ['3', 'Lead cases'],
                ['13', 'Project images'],
                ['1', 'Main CTA'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-purple-100 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
                  <div className="text-2xl font-bold text-[#A47DFF]">{value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex animate-fadeInUp flex-col gap-4 animation-delay-600 sm:flex-row">
              <Link 
                href="/contact" 
                className="group flex items-center justify-center gap-2 rounded-full bg-[#B480FF] px-8 py-3.5 text-center font-semibold text-white shadow-lg shadow-purple-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-600"
              >
                Start a project
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="group flex items-center justify-center gap-2 rounded-full border-2 border-[#B480FF] px-8 py-3.5 text-center font-semibold text-[#B480FF] transition-all duration-300 hover:bg-[#B480FF] hover:text-white"
              >
                View portfolio
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative flex animate-slideInRight justify-center">
            <div className="absolute -inset-4 rotate-3 rounded-[3rem] bg-white shadow-xl shadow-purple-100/60"></div>
            <div className="relative w-full max-w-[460px] overflow-hidden rounded-[2.25rem] border-8 border-white bg-white shadow-2xl shadow-purple-100/70">
              <Image 
                src="/team-talha.png" 
                alt="Muhammad Talha professional profile photo" 
                width={768}
                height={960}
                className="h-[460px] w-full object-cover object-top sm:h-[560px]"
                priority
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-wide text-[#A47DFF]">Developer Portfolio</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">Muhammad Talha</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
