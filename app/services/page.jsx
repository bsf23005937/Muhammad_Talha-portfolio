import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Services - Muhammad Talha Portfolio',
  description: 'Muhammad Talha Portfolio provides website development, SEO, ecommerce, Python automation, UI/UX, video editing, graphic design, app development, custom software, POS, ERP, CMS, and shop management systems.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Services - Muhammad Talha Portfolio',
    description: 'Muhammad Talha Portfolio provides website development, SEO, ecommerce, Python automation, UI/UX, video editing, graphic design, app development, custom software, POS, ERP, CMS, and shop management systems.',
    url: '/services',
  },
};

const services = [
  {
    title: 'Website Development',
    id: 'website-development',
    description: 'Responsive business websites, landing pages, blogs, and company websites built for speed, trust, and conversions.',
    points: ['Responsive layout', 'Fast loading pages', 'Lead focused sections'],
  },
  {
    title: 'SEO Services',
    id: 'seo-services',
    description: 'Search engine optimization for better ranking, cleaner content structure, and more organic traffic.',
    points: ['Keyword strategy', 'On-page SEO', 'Technical SEO checks'],
  },
  {
    title: 'Ecommerce Development',
    id: 'ecommerce-development',
    description: 'Online stores with product pages, carts, checkout flow, order sections, and clean customer experience.',
    points: ['Product catalogs', 'Cart and checkout UI', 'Store management flow'],
  },
  {
    title: 'Python Automation',
    id: 'python-automation',
    description: 'Automation scripts and tools that reduce manual work, process data, and improve daily business operations.',
    points: ['Data automation', 'Task scripts', 'Workflow tools'],
  },
  {
    title: 'UI/UX Design',
    id: 'ui-ux-design',
    description: 'Modern interface design for websites, apps, dashboards, and digital products with clear user journeys.',
    points: ['Wireframes', 'High fidelity UI', 'User flow planning'],
  },
  {
    title: 'Video Editing',
    id: 'video-editing',
    description: 'Professional video editing for business promos, reels, social content, product videos, and brand campaigns.',
    points: ['Social videos', 'Promo edits', 'Brand visuals'],
  },
  {
    title: 'Graphic Design',
    id: 'graphic-design',
    description: 'Creative graphics for social media, banners, flyers, brand visuals, product posts, and marketing campaigns.',
    points: ['Social posts', 'Banners and flyers', 'Brand graphics'],
  },
  {
    title: 'App Development',
    id: 'app-development',
    description: 'Mobile app interfaces and development support for business apps, service apps, and custom digital products.',
    points: ['Android app UI', 'iOS ready layouts', 'App feature planning'],
  },
  {
    title: 'Custom Software Development',
    id: 'custom-software',
    description: 'Custom software systems built around your business process, team workflow, and daily operations.',
    points: ['Business portals', 'Admin panels', 'Custom workflows'],
  },
  {
    title: 'POS Systems',
    id: 'pos-systems',
    description: 'Point of sale systems for shops, restaurants, and retail businesses to manage billing and daily sales.',
    points: ['Billing screens', 'Sales records', 'Receipt flow'],
  },
  {
    title: 'ERP Solutions',
    id: 'erp-solutions',
    description: 'ERP style systems for managing departments, stock, sales, users, finance, and business reporting.',
    points: ['Inventory modules', 'Team roles', 'Business reports'],
  },
  {
    title: 'CMS & Shop Management',
    id: 'cms-and-shop-management',
    description: 'CMS, sales product management, and shop systems to add products, update content, track stock, and manage orders.',
    points: ['Product management', 'CMS dashboard', 'Stock and sales control'],
  },
];

const processSteps = [
  'Understand your business needs',
  'Plan pages, features, and content',
  'Design responsive UI screens',
  'Develop and test the project',
  'Launch with support and updates',
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      <Navbar />

      <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-[#F8F9FF] to-[#E6E9FF] overflow-hidden">
        <div className="absolute top-12 left-8 w-72 h-72 bg-[#A47DFF]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-8 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-[1fr_0.85fr] gap-12 items-center">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 text-[#A47DFF] font-bold text-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#A47DFF]"></span>
                Muhammad Talha Portfolio Services
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                Complete digital services for software companies and growing brands.
              </h1>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl">
                We provide website development, SEO, ecommerce, automation, design, apps, POS, ERP, CMS, and product management systems for shops and businesses.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-[#A47DFF] text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-600 hover:shadow-xl hover:scale-105 transition-all text-center">
                  Get Service Quote
                </Link>
                <Link href="/portfolio" className="border-2 border-[#A47DFF] text-[#A47DFF] px-8 py-4 rounded-full font-semibold hover:bg-[#A47DFF] hover:text-white transition-all text-center">
                  View Work
                </Link>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur rounded-[2rem] border border-purple-100 shadow-2xl shadow-purple-100/60 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How we work</h2>
              <div className="space-y-4">
                {processSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-2xl bg-[#F8F9FF] p-4 border border-purple-50">
                    <div className="w-10 h-10 rounded-full bg-[#A47DFF] text-white flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-bold text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[#A47DFF] font-bold uppercase tracking-widest text-sm">All Services</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
              Services we provide
            </h2>
            <p className="mt-5 text-gray-600 text-lg">
              Choose one service or combine multiple services to create a complete digital system for your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="group scroll-mt-32 bg-white rounded-[2rem] p-7 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-purple-100 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#A47DFF] flex items-center justify-center font-bold text-xl group-hover:bg-[#A47DFF] group-hover:text-white transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 group-hover:bg-[#A47DFF] group-hover:text-white group-hover:rotate-45 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#A47DFF] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                      <span className="w-5 h-5 rounded-full bg-purple-50 text-[#A47DFF] flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F8F9FF]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-14 border border-purple-100 shadow-xl shadow-purple-100/60">
            <span className="text-[#A47DFF] font-bold uppercase tracking-widest text-sm">Need software for your business?</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-900">
              Tell us your service requirement and we will plan the right solution.
            </h2>
            <p className="mt-5 text-gray-600 text-lg max-w-2xl mx-auto">
              From a simple website to a full POS, ERP, CMS, or product sales management system, Muhammad Talha Portfolio can create a responsive digital solution for your workflow.
            </p>
            <Link href="/contact" className="mt-8 inline-flex bg-[#A47DFF] text-white px-8 py-4 rounded-full font-bold hover:bg-purple-600 hover:shadow-xl hover:scale-105 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
