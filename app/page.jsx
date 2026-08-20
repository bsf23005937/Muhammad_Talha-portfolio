import Link from 'next/link';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import SafeImage from '../components/SafeImage';
import { caseStudyProjects, identityKit, skillsStack, supportingWebsiteProjects } from '../data/portfolioProjects';

const skillGroups = [
  {
    title: 'Business software',
    skills: ['Clinic systems', 'POS workflows', 'Supply tracking', 'Inventory screens'],
  },
  {
    title: 'Frontend & UI',
    skills: ['React', 'Next.js', 'Responsive UI', 'Dashboard layouts'],
  },
  {
    title: 'Desktop & backend',
    skills: ['Tauri v2', 'Rust', 'SQLite', 'Node.js'],
  },
  {
    title: 'CMS & websites',
    skills: ['Payload CMS', 'WordPress', 'Theme systems', 'Content workflows'],
  },
];

export default function Home() {
  const [leadProject, ...selectedProjects] = caseStudyProjects;
  const screenshotProjects = supportingWebsiteProjects.slice(0, 6);

  return (
    <main className="bg-white">
      <Navbar />
      <HeroSection />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Featured Project</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Strongest proof: {leadProject.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                The portfolio leads with the strongest business software case, then supports it with POS, CMS, and website project screenshots.
              </p>
            </div>
            <Link href={`/portfolio/${leadProject.slug}`} className="inline-flex items-center justify-center rounded-full bg-[#A47DFF] px-6 py-3 font-semibold text-white transition-all hover:bg-purple-600">
              View case study
            </Link>
          </div>

          <article className="grid overflow-hidden rounded-[2.5rem] border border-purple-100 bg-white shadow-2xl shadow-purple-100/70 lg:grid-cols-[1fr_0.9fr]">
            <div className="relative min-h-[320px] overflow-hidden bg-[#F8F9FF]">
              <SafeImage
                src={leadProject.image}
                alt={`${leadProject.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                fallbackLabel={`${leadProject.title} screenshot asset is missing from this build.`}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
              <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#A47DFF] shadow-sm">
                {leadProject.category}
              </div>
            </div>

            <div className="p-7 md:p-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Lead case study</p>
              <h3 className="mt-4 text-3xl font-bold leading-tight text-gray-900">{leadProject.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{leadProject.description}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {leadProject.keyFeatures.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-purple-100 bg-[#F8F9FF] px-4 py-3 text-sm font-medium text-gray-700">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="bg-[#F8F9FF] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Other Selected Work</span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              POS and CMS projects with real screenshots.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Same clean image-card style, converted into Muhammad Talha’s portfolio content.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-2">
            {selectedProjects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-100/70">
                <div className="relative aspect-[16/10] bg-[#F8F9FF]">
                  <SafeImage
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    fallbackLabel={`${project.title} screenshot asset is missing from this build.`}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#A47DFF]">{project.category}</p>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-[#A47DFF]">{project.title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">More Project Images</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Website and app screenshots from the portfolio.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                These cards keep the old image-first Synix layout while showing real project screenshots as proof.
              </p>
            </div>
            <Link href="/portfolio#more-work" className="inline-flex items-center justify-center rounded-full border-2 border-[#A47DFF] px-6 py-3 font-semibold text-[#A47DFF] transition-all hover:bg-[#A47DFF] hover:text-white">
              See more work
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {screenshotProjects.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-purple-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/70">
                <div className="relative aspect-[4/3] bg-[#F8F9FF]">
                  <SafeImage
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    fallbackLabel={`${project.title} screenshot asset is missing from this build.`}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#A47DFF] shadow-sm">
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-[#A47DFF]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="bg-[#F8F9FF] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">Skills / Stack</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                Skills mapped to the projects on this portfolio.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                This section supports the single portfolio goal: help visitors understand what kind of business software Muhammad Talha can build before they start a project.
              </p>
              <Link href="/contact" className="mt-7 inline-flex rounded-full bg-[#A47DFF] px-7 py-3 font-semibold text-white transition-all hover:bg-purple-600">
                Start a project
              </Link>
            </div>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-[2rem] border border-purple-100 bg-white p-5 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900">{group.title}</h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-[#F8F9FF] px-3 py-1.5 text-xs font-semibold text-gray-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {skillsStack.map((skill) => (
                  <div key={skill} className="rounded-2xl border border-purple-100 bg-white px-4 py-4 text-center text-sm font-semibold text-gray-800 shadow-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-white via-[#F8F9FF] to-[#E6E9FF] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] border border-purple-100 bg-white p-8 text-center shadow-2xl shadow-purple-100/70 md:p-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#A47DFF]">About Muhammad Talha</span>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              {identityKit.positioning}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              This portfolio uses real project images, clean case-study content, and one clear action: start a project.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/about" className="rounded-full border-2 border-[#A47DFF] px-7 py-3 font-semibold text-[#A47DFF] transition-all hover:bg-[#A47DFF] hover:text-white">
                About Muhammad
              </Link>
              <Link href="/contact" className="rounded-full bg-[#A47DFF] px-7 py-3 font-semibold text-white transition-all hover:bg-purple-600">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
