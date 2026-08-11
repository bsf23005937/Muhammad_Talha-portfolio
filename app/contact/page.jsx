import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Contact - Muhammad Talha Portfolio',
  description: 'Start a project with Muhammad Talha. Contact method is currently marked as still need to gather for the Week 4 portfolio shell.',
};

const contactCards = [
  {
    title: 'Personal email',
    value: 'Still need to gather',
    note: 'Add the preferred email before final launch.',
    icon: 'mail',
  },
  {
    title: 'Contact form destination',
    value: 'Still need to gather',
    note: 'Connect the form to email, a form provider, or another chosen destination.',
    icon: 'form',
  },
  {
    title: 'Work focus',
    value: 'Internship / project conversations',
    note: 'The message should stay focused on practical business software and verified portfolio work.',
    icon: 'briefcase',
  },
];

const projectTypes = ['Clinic software', 'POS / supply workflow', 'CMS dashboard', 'Inventory or stock system', 'Other business software'];

const nextSteps = [
  {
    title: 'Share the workflow',
    description: 'Describe the business process, who uses it, and what currently happens in paper, spreadsheets, or manual tools.',
  },
  {
    title: 'Clarify the proof',
    description: 'Confirm what can be shown publicly: screenshots, screen recordings, links, repository access, or anonymized examples.',
  },
  {
    title: 'Plan the build',
    description: 'Turn the workflow into screens, features, technology choices, and the next practical development step.',
  },
];

function ContactIcon({ type }) {
  if (type === 'mail') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l8.4 5.6a1 1 0 001.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }

  if (type === 'phone') {
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a1.125 1.125 0 01-1.21.38 12.035 12.035 0 01-7.143-7.143 1.125 1.125 0 01.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102A1.125 1.125 0 005.872 2.25H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    );
  }

  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 14.15v4.25A2.6 2.6 0 0117.65 21H6.35a2.6 2.6 0 01-2.6-2.6V5.6A2.6 2.6 0 016.35 3h6.4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3h5v5M21 3l-9 9" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-[#EEF3F8] py-16 md:py-24">
        <div className="absolute left-10 top-16 h-72 w-72 rounded-full bg-[#B480FF]/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#A47DFF]/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#A47DFF] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#B480FF]"></span>
              Contact / Start a project
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
              Start with the workflow, then gather the right contact details.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
              The portfolio’s single primary action is “Start a project.” The final personal email/form destination is still missing, so this page keeps that requirement visible instead of inventing one.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div className="space-y-8">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">Get in touch</span>
                <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                  A focused intake for business software projects.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  Use this page as the live structure for contact. Before launch, replace the placeholder with the real email, form provider, or preferred direct link.
                </p>
              </div>

              <div className="grid gap-4">
                {contactCards.map((card) => (
                  <div key={card.title} className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#A47DFF]/30 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-[#A47DFF] transition-colors group-hover:bg-[#A47DFF] group-hover:text-white">
                        <ContactIcon type={card.icon} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">{card.title}</h3>
                        <p className="mt-1 break-all font-bold text-[#A47DFF]">{card.value}</p>
                        <p className="mt-2 text-sm text-slate-500">{card.note}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-2xl shadow-slate-200/60 md:p-8">
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-700">Your Name</label>
                    <input id="name" type="text" placeholder="Enter your name" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
                    <input id="email" type="email" placeholder="Enter your email" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="project-type" className="mb-2 block text-sm font-bold text-slate-700">Project Type</label>
                    <select id="project-type" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100">
                      <option>Select project type</option>
                      {projectTypes.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="proof" className="mb-2 block text-sm font-bold text-slate-700">Proof available?</label>
                    <input id="proof" type="text" placeholder="Screenshots, demo, repo, or still missing" className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-700">Project Details</label>
                  <textarea id="message" rows={6} placeholder="Tell me what workflow you want to build or improve..." className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"></textarea>
                </div>

                <button type="button" className="w-full rounded-2xl bg-[#A47DFF] px-8 py-4 font-bold text-white transition-all hover:scale-[1.01] hover:bg-[#A47DFF] hover:shadow-xl active:scale-[0.99]">
                  Start a project
                </button>
                <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-center text-sm font-bold text-slate-500">
                  Form destination: Still need to gather.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-[#B480FF]">How this contact page works</span>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-950 md:text-5xl">
                Keep the invitation clear and internship/work-focused.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                The page supports one action only: starting a project conversation around real business software, with no unrelated goals or fake availability claims.
              </p>
            </div>

            <div className="grid gap-5">
              {nextSteps.map((step, index) => (
                <div key={step.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl md:p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A47DFF] font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">{step.title}</h3>
                      <p className="mt-3 leading-relaxed text-slate-600">{step.description}</p>
                    </div>
                  </div>
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
