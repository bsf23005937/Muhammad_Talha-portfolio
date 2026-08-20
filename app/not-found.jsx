import Link from 'next/link';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Page Not Found - Muhammad Talha Portfolio',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-white via-[#F8F9FF] to-[#E6E9FF] px-4 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-purple-100 bg-white p-8 shadow-2xl shadow-purple-100/70 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#A47DFF]">404 / Not found</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
            This portfolio page does not exist.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            The link may be outdated or the project slug may be incorrect. Use the portfolio or contact page to continue.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/portfolio" className="rounded-full bg-[#A47DFF] px-8 py-4 font-bold text-white transition-all hover:bg-purple-600">
              View portfolio
            </Link>
            <Link href="/contact" className="rounded-full border-2 border-[#A47DFF] px-8 py-4 font-bold text-[#A47DFF] transition-all hover:bg-[#A47DFF] hover:text-white">
              Contact Muhammad
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
