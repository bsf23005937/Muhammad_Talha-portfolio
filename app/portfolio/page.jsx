import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { caseStudyProjects, moreWorkProjects, portfolioProjects, stillNeedToGather } from '../../data/portfolioProjects';

export const metadata = {
  title: 'Portfolio - Muhammad Talha',
  description: 'Selected Muhammad Talha portfolio projects with real screenshots, case studies, and proof still to gather.',
};

const stats = [
  { value: String(caseStudyProjects.length), label: 'Lead case studies' },
  { value: String(portfolioProjects.length), label: 'Portfolio images' },
  { value: String(moreWorkProjects.length), label: 'More work items' },
  { value: '1', label: 'Primary CTA' },
];

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F8F9FF] to-[#E6E9FF] py-16 md:py-24">
        <div className="absolute left-8 top-12 h-72 w-72 rounded-full bg-[#A47DFF]/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-8 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-semibold text-[#A47DFF] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#A47DFF]"></span>
                Muhammad Talha Portfolio
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
                Real project screenshots, clean case studies, and selected work.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
                The strongest software projects lead first, followed by the same image-focused portfolio grid style from the original site.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm backdrop-blur transition-all hover:shadow-xl">
                  <div className="text-3xl font-bold text-[#A47DFF] md:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-sm font-semibold text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Selected Work</span>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-5xl">
              Portfolio image gallery
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Real screenshots are displayed directly in the cards. Missing details are kept in the project notes, not invented in the UI.
            </p>
          </div>

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3 lg:gap-8">
            {portfolioProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                className={`group block overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  index === 0 ? 'md:col-span-2 xl:col-span-2' : ''
                }`}
              >
                <article>
                  <div className={`relative overflow-hidden bg-[#F8F9FF] ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes={index === 0 ? '(min-width: 1280px) 66vw, (min-width: 768px) 100vw, 100vw' : '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-75"></div>
                    <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#A47DFF] shadow-sm backdrop-blur">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#A47DFF]">
                          {project.title}
                        </h3>
                        <p className="mt-3 leading-relaxed text-gray-600">
                          {project.description}
                        </p>
                      </div>
                      <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-gray-900 transition-all group-hover:rotate-45 group-hover:bg-[#A47DFF] group-hover:text-white sm:flex">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="more-work" className="bg-[#F8F9FF] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Project Notes</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Proof-first portfolio content with the original visual style.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                The page keeps the soft purple Synix-style UI while converting the content into Muhammad Talha’s developer portfolio.
              </p>
              <Link href="/contact" className="mt-7 inline-flex rounded-full bg-[#A47DFF] px-7 py-3 font-semibold text-white transition-all hover:bg-purple-600">
                Start a project
              </Link>
            </div>

            <div className="grid gap-5">
              {stillNeedToGather.slice(0, 5).map((item) => (
                <div key={item} className="rounded-[2rem] border border-purple-100 bg-white p-6 text-sm font-medium leading-relaxed text-gray-600 shadow-sm transition-all hover:shadow-xl md:p-7">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
