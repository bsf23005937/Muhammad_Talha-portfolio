'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after 3 seconds and close popup
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        message: '',
        resume: null,
      });
    }, 3000);
  };

  const positions = [
    'Web Developer',
    'App Developer',
    'UI/UX Designer',
    'SEO Specialist',
    'Video Editor',
    'Graphic Designer',
    'Digital Marketing Expert',
    'Content Writer',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="Muhammad Talha Portfolio Logo"
              width={240}
              height={71}
              className="w-44 sm:w-56 md:w-60 h-auto object-contain"
              priority
            />
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are always looking for talented individuals to join our growing team. 
            Fill out the application form below and we will get back to you soon.
          </p>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                  placeholder="03XX XXXXXXX"
                />
              </div>
            </div>

            {/* Position & Experience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                  Position Applied For <span className="text-red-500">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                >
                  <option value="">Select a position</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-2">1-2 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter / Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
                placeholder="Tell us about yourself and why you want to join our team..."
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resume (PDF, DOC, DOCX)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#A47DFF] focus:ring-2 focus:ring-purple-100 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-[#A47DFF] hover:file:bg-purple-100"
                />
              </div>
              {formData.resume && (
                <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {formData.resume.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#A47DFF] text-white py-4 rounded-xl font-semibold text-lg hover:bg-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#A47DFF] hover:text-purple-600 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center animate-scaleIn">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for applying. We have received your application and will review it shortly. 
              Our team will contact you soon.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-[#A47DFF] text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
