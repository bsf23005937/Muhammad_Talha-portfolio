'use client';

import { useState } from 'react';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mdenpklk';
const SUCCESS_MESSAGE = 'Message sent successfully!';
const ERROR_MESSAGE = 'Something went wrong. Please try again.';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitting = status === 'submitting';

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields.');
      return;
    }

    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT') {
      setStatus('error');
      setStatusMessage(`${ERROR_MESSAGE} Formspree endpoint is not configured yet.`);
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Formspree submission failed.');
      }

      setValues(initialValues);
      setErrors({});
      setStatus('success');
      setStatusMessage(SUCCESS_MESSAGE);
    } catch (error) {
      setStatus('error');
      setStatusMessage(ERROR_MESSAGE);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm font-semibold text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter your email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm font-semibold text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          placeholder="Tell me what you want to build..."
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm font-semibold text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-[#A47DFF] px-8 py-4 font-bold text-white transition-all hover:scale-[1.01] hover:bg-purple-600 hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {statusMessage && (
        <p
          role={status === 'success' ? 'status' : 'alert'}
          aria-live="polite"
          className={`rounded-2xl border px-4 py-3 text-center text-sm font-bold ${
            status === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {statusMessage}
        </p>
      )}
    </form>
  );
}
