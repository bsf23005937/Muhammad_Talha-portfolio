import Link from 'next/link';

export const metadata = {
  title: 'Careers - Muhammad Talha Portfolio',
  description: 'Careers information for Muhammad Talha Portfolio. The page is static and does not collect applications.',
  alternates: {
    canonical: '/careers',
  },
  robots: {
    index: false,
    follow: true,
  },
};

const roles = [
  'Web Developer',
  'App Developer',
  'UI/UX Designer',
  'SEO Specialist',
  'Video Editor',
  'Graphic Designer',
  'Digital Marketing Expert',
  'Content Writer',
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50 px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Link href="/" className="mb-6 inline-flex items-center justify-center gap-3" aria-label="Back to Muhammad Talha Portfolio home">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A47DFF] text-base font-bold text-white shadow-lg shadow-purple-100">
              MT
            </span>
            <span className="text-left">
              <span className="block text-xl font-bold tracking-tight text-gray-900">Muhammad Talha</span>
              <span className="block text-xs font-bold uppercase tracking-[0.24em] text-gray-500">Portfolio</span>
            </span>
          </Link>
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-bold text-[#A47DFF] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#A47DFF]"></span>
            Static careers information
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Careers are not collecting applications right now.
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            This route remains available for direct visits, but the previous simulated application form has been removed so the only public dynamic submission flow is the Formspree contact form.
          </p>
        </div>

        <section className="rounded-3xl border border-purple-100 bg-white p-8 shadow-xl md:p-12">
          <h2 className="text-2xl font-bold text-gray-900">Roles previously listed</h2>
          <p className="mt-3 leading-relaxed text-gray-600">
            These role labels are kept as static reference content only. They do not represent active openings or a live hiring workflow.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {roles.map((role) => (
              <div key={role} className="rounded-2xl border border-purple-100 bg-[#F8F9FF] px-4 py-3 text-sm font-bold text-gray-700">
                {role}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="inline-flex justify-center rounded-full bg-[#A47DFF] px-8 py-4 font-bold text-white transition-all hover:bg-purple-600">
              Use contact form
            </Link>
            <Link href="/" className="inline-flex justify-center rounded-full border-2 border-[#A47DFF] px-8 py-4 font-bold text-[#A47DFF] transition-all hover:bg-[#A47DFF] hover:text-white">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
