import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SafeImage from '../../../components/SafeImage';
import { getProjectBySlug, getRelatedProjects, portfolioProjects } from '../../../data/portfolioProjects';

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.slug,
  }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.id);

  if (!project) {
    return {
      title: 'Project Not Found - Muhammad Talha Portfolio',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${project.title} - Muhammad Talha Portfolio`,
    description: project.description,
    alternates: {
      canonical: `/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} - Muhammad Talha Portfolio`,
      description: project.description,
      url: `/portfolio/${project.slug}`,
    },
  };
}

function EvidenceFrame({ project }) {
  if (project.image) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-8 border-white bg-slate-50 shadow-2xl">
        <SafeImage
          src={project.image}
          alt={`${project.title} real project screenshot`}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          fallbackLabel={`${project.title} screenshot asset is missing from this build.`}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-6 shadow-2xl shadow-slate-200/60">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#A47DFF 1.1px, transparent 1.1px)', backgroundSize: '24px 24px' }}></div>
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-[#A47DFF] shadow-sm">Real proof slot</span>
        <h2 className="mt-5 text-2xl font-bold text-slate-950">Screenshot not added yet</h2>
        <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-slate-600">
          Expected asset: <span className="text-slate-950">{project.imageLabel}</span>. This portfolio does not use AI-generated fake screenshots as project proof.
        </p>
      </div>
    </div>
  );
}

function DetailCard({ title, children }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">{children}</div>
    </section>
  );
}

export default function PortfolioDetailPage({ params }) {
  const project = getProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project.slug);

  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#EEF3F8] py-16 md:py-24">
        <div className="absolute left-8 top-12 h-72 w-72 rounded-full bg-[#B480FF]/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-8 h-96 w-96 rounded-full bg-[#A47DFF]/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#A47DFF] transition-colors hover:text-slate-950">
            <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#A47DFF] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#B480FF]"></span>
                {project.category}
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">Live demo: {project.liveDemo}</span>
                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">Repository: {project.repository}</span>
              </div>
            </div>

            <EvidenceFrame project={project} />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <aside className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 md:p-8 lg:sticky lg:top-28">
              <h2 className="text-2xl font-bold text-slate-950">Case summary</h2>
              <div className="mt-6 space-y-3">
                {[
                  ['Purpose', project.purpose],
                  ['Role', project.role],
                  ['Proof status', project.realScreenshots.join(', ')],
                  ['CTA', 'Start a project'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#B480FF]">{label}</p>
                    <p className="mt-1 text-sm font-bold leading-relaxed text-slate-700">{value}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#A47DFF] px-6 py-4 font-bold text-white transition-all hover:bg-[#A47DFF]">
                Start a project
              </Link>
            </aside>

            <div className="space-y-8">
              <DetailCard title="Project introduction">
                <p>{project.overview}</p>
              </DetailCard>

              <DetailCard title="Problem / purpose">
                <div className="space-y-4">
                  <p><span className="font-bold text-slate-950">Problem:</span> {project.problem}</p>
                  <p><span className="font-bold text-slate-950">Purpose:</span> {project.purpose}</p>
                </div>
              </DetailCard>

              <DetailCard title="My role">
                <p>{project.role}</p>
              </DetailCard>

              <DetailCard title="Solution and implementation">
                <p>{project.solution}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {project.keyFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A47DFF] text-white">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm font-bold text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </DetailCard>

              <DetailCard title="Real screenshots / proof">
                <div className="grid gap-3">
                  {project.realScreenshots.map((screenshot) => (
                    <div key={screenshot} className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                      {screenshot}
                    </div>
                  ))}
                </div>
              </DetailCard>

              <DetailCard title="Technologies">
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700">
                      {technology}
                    </span>
                  ))}
                </div>
              </DetailCard>

              <DetailCard title="Results / proof">
                <div className="grid gap-3">
                  {project.resultsProof.map((result) => (
                    <div key={result} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
                      {result}
                    </div>
                  ))}
                </div>
              </DetailCard>

              <DetailCard title="Missing proof that still needs to be gathered">
                <div className="grid gap-3">
                  {project.missingProof.map((proof) => (
                    <div key={proof} className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#B480FF] text-slate-950">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                      </span>
                      <span className="text-sm font-bold text-slate-700">{proof}</span>
                    </div>
                  ))}
                </div>
              </DetailCard>

              <div className="rounded-[2rem] bg-[#A47DFF] p-8 text-white md:p-10">
                <h2 className="text-3xl font-bold md:text-4xl">Want something like this built?</h2>
                <p className="mt-4 text-lg leading-relaxed text-white/75">
                  The single portfolio action is to start a project. This button leads to the hardened Contact page and Formspree contact form.
                </p>
                <Link href="/contact" className="mt-7 inline-flex rounded-2xl bg-white px-7 py-4 font-bold text-[#A47DFF] transition-all hover:bg-slate-100">
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">Related work</span>
              <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-5xl">More projects in the portfolio</h2>
            </div>
            <Link href="/portfolio" className="font-bold text-[#A47DFF] transition-colors hover:text-slate-950">
              View all projects
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <Link key={relatedProject.slug} href={`/portfolio/${relatedProject.slug}`} className="group rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50">
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                    Proof pending
                  </div>
                </div>
                <div className="p-2 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#B480FF]">{relatedProject.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950 transition-colors group-hover:text-[#A47DFF]">{relatedProject.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{relatedProject.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
