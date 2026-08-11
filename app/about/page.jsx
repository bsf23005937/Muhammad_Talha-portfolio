import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { caseStudyProjects, identityKit, skillsStack } from '../../data/portfolioProjects';

export const metadata = {
  title: 'About Muhammad Talha - Portfolio',
  description: 'About Muhammad Talha, a developer building business software for clinics, shops, supply workflows, and dashboards.',
};

const buildAreas = [
  {
    title: 'Operations software',
    description: 'Clinic, shop, supply, and inventory workflows that replace paper, notebooks, or spreadsheet-heavy processes.',
  },
  {
    title: 'Dashboards and admin systems',
    description: 'CMS dashboards, site-management views, and admin flows designed around the daily actions people actually take.',
  },
  {
    title: 'AI-augmented development',
    description: 'Using AI as part of the build workflow while keeping the portfolio proof focused on shipped software and real screenshots.',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#EEF3F8] py-16 md:py-24">
        <div className="absolute left-8 top-10 h-72 w-72 rounded-full bg-[#B480FF]/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-8 h-96 w-96 rounded-full bg-[#A47DFF]/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#A47DFF] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B480FF]"></span>
                About Muhammad Talha
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
                A developer portfolio built around real operational software.
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {identityKit.positioning} This Week 4 portfolio shell keeps the emphasis on confirmed projects, real screenshots, and the missing evidence that still needs to be gathered before the final case studies are complete.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="rounded-full bg-[#A47DFF] px-8 py-4 text-center font-bold text-white transition-all hover:bg-[#A47DFF] hover:shadow-xl">
                  Start a project
                </Link>
                <Link href="/portfolio" className="rounded-full border-2 border-[#A47DFF] px-8 py-4 text-center font-bold text-[#A47DFF] transition-all hover:bg-[#A47DFF] hover:text-white">
                  View case studies
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rotate-3 rounded-[3rem] bg-[#A47DFF]/10"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
                <Image
                  src="/team-talha.png"
                  alt="Muhammad Talha professional profile photo"
                  width={700}
                  height={780}
                  className="h-[520px] w-full object-cover object-top md:h-[620px]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#A47DFF]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-bold text-[#A47DFF]">Real photo</div>
                      <div className="mt-1 text-xs font-bold text-slate-500">Personal identity</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="text-sm font-bold text-[#A47DFF]">Proof-first</div>
                      <div className="mt-1 text-xs font-bold text-slate-500">No fake outcomes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">What I build</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                Practical systems for small-business operations.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                The strongest through-line in the portfolio is operational software: clinic records, retail sales, supplier tracking, and multi-site CMS management.
              </p>
              <p>
                This page intentionally avoids fake client statistics, testimonials, live links, or GitHub links. Missing information is labeled until real proof is available.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {buildAreas.map((value, index) => (
              <div key={value.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-xl font-bold text-[#A47DFF] transition-colors group-hover:bg-[#A47DFF] group-hover:text-white">
                  0{index + 1}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-950">{value.title}</h3>
                <p className="leading-relaxed text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
            <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">Skills / technologies</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
              Confirmed stack from the portfolio context.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              These tools come from the provided assignment context and confirmed project descriptions.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {skillsStack.map((skill) => (
              <div key={skill} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-sm font-bold text-slate-800 shadow-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">Experience / selected work</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                Portfolio that define the portfolio.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                The current portfolio order is Dental Clinic first, then Milk Shop POS, then Multi-Site CMS.
              </p>
            </div>
            <div className="grid gap-5">
              {caseStudyProjects.map((project) => (
                <Link key={project.slug} href={`/portfolio/${project.slug}`} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B480FF]">{project.category}</p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{project.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{project.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-14 rounded-[2.5rem] bg-[#A47DFF] p-7 text-center text-white md:p-10">
            <h2 className="text-3xl font-bold md:text-4xl">Ready to discuss a real workflow?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
              All page CTAs support the same primary action: Start a project.
            </p>
            <Link href="/contact" className="mt-7 inline-flex rounded-full bg-white px-8 py-4 font-bold text-[#A47DFF] transition-all hover:bg-slate-100">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
