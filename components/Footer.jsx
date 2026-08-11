'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-slate-50 to-[#EEF3F8] pt-20 pb-10">
      <div className="absolute bottom-0 left-0 right-0 z-0 w-full select-none overflow-hidden text-center pointer-events-none">
        <h2 className="inline-block whitespace-nowrap text-[11vw] font-bold uppercase leading-none tracking-tight text-[#A47DFF] opacity-[0.05]">
          Muhammad Talha
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="relative mb-16 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200/70 sm:p-8 md:mb-24 md:p-12 lg:p-14">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 via-white to-[#EEF3F8] opacity-90"></div>
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#B480FF]/20 blur-3xl"></div>
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#A47DFF 1.2px, transparent 1.2px)', backgroundSize: '26px 26px' }}></div>

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_0.42fr] lg:gap-12">
            <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#A47DFF] shadow-sm sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#B480FF]"></span>
                Evidence-first portfolio
              </div>
              <h2 className="mt-5 text-3xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
                Need a practical system for a real business workflow?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-relaxed text-slate-600 md:text-lg lg:mx-0">
                This portfolio keeps the focus on confirmed work: clinic software, POS workflows, CMS dashboards, and proof that still needs to be gathered before publishing.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
                {['Start a project', 'Show real proof', 'No fake results'].map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur sm:p-5">
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#A47DFF] px-7 py-4 font-bold text-white transition-all hover:scale-[1.02] hover:bg-[#A47DFF] hover:shadow-xl active:scale-95">
                Start a project
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-7 py-4 font-bold text-slate-900 transition-all hover:text-[#A47DFF] hover:shadow-lg">
                View case studies
              </Link>
              <p className="text-center text-xs font-bold leading-relaxed text-slate-500">
                Contact destination: Still need to gather.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16 grid grid-cols-1 items-start gap-10 md:mb-24 md:grid-cols-[1fr_0.8fr] lg:gap-12">
          <div className="flex flex-col items-center space-y-6 text-center md:items-start md:text-left">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A47DFF] text-sm font-bold text-white transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                MT
              </span>
              <span>
                <span className="block text-xl font-bold tracking-tight text-slate-950">Muhammad Talha</span>
                <span className="block text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Portfolio</span>
              </span>
            </Link>
            <p className="max-w-lg text-sm font-semibold leading-relaxed text-slate-600 md:text-base">
              I build the software small businesses run their operations on — solo, start to finish.
            </p>
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-600">
              Personal contact method: Still need to gather.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-right">
            <nav className="grid grid-cols-2 gap-x-4 gap-y-4 md:flex md:flex-col md:gap-5">
              <Link href="/" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-[#A47DFF] md:text-xl">Home</Link>
              <Link href="/portfolio" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-[#A47DFF] md:text-xl">Portfolio</Link>
              <Link href="/portfolio#more-work" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-[#A47DFF] md:text-xl">More Work</Link>
              <Link href="/about" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-[#A47DFF] md:text-xl">About</Link>
              <Link href="/contact" className="text-lg font-bold tracking-tight text-slate-800 transition-colors hover:text-[#A47DFF] md:text-xl">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-8 text-xs font-semibold text-slate-500 md:flex-row md:gap-8 md:pt-12 md:text-sm">
          <div>
            © 2026 <span className="font-extrabold text-slate-800">Muhammad Talha</span>. Personal developer portfolio.
          </div>
          <div className="text-center">
            Real screenshots only for project proof. Missing evidence stays labeled.
          </div>
        </div>
      </div>
    </footer>
  );
}

