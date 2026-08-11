'use client';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Muhammad Talha Portfolio provide?",
      answer: "We offer a wide range of digital services including AI Automation, SEO Optimization, Responsive Web Development, and robust Backend Solutions tailored to your business needs."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity. A standard website might take 4-6 weeks, while complex AI integrations or custom software can take 3-6 months. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer post-launch support?",
      answer: "Yes, we provide 24/7 technical support and maintenance packages to ensure your digital assets remain secure, updated, and performing optimally long after launch."
    },
    {
      question: "Can you help optimize my existing website's SEO?",
      answer: "Absolutely. We specialize in SEO audits and optimization strategies that help improve your search engine rankings, drive organic traffic, and increase conversion rates."
    },
    {
      question: "Is AI automation suitable for small businesses?",
      answer: "Yes! AI automation can significantly reduce operational costs and improve efficiency for businesses of all sizes by automating repetitive tasks and providing data-driven insights."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-[#B480FF]">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-[#B480FF] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 text-lg">
            Got questions about our services? Find the answers here.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
              >
                <span className={`text-lg font-semibold transition-colors duration-300 ${openIndex === index ? 'text-[#B480FF]' : 'text-gray-900 group-hover:text-[#B480FF]'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-[#B480FF] text-white rotate-180' : 'bg-purple-50 text-[#B480FF]'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}