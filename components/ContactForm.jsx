'use client';

import { useRef, useState } from 'react';
import { CONTACT_LIMITS, normalizeContactFormValues, validateContactForm } from '../lib/contactValidation.mjs';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mdenpklk';
const SUCCESS_MESSAGE = 'Message sent successfully!';
const ERROR_MESSAGE = 'Something went wrong. Please try again.';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const submitLockRef = useRef(false);
  const honeypotRef = useRef(null);

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

    if (submitLockRef.current) return;

    const validation = validateContactForm(values);
    const nextErrors = validation.errors;
    setErrors(nextErrors);

    if (!validation.valid) {
      setStatus('error');
      setStatusMessage('Please fix the highlighted fields.');
      return;
    }

    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === 'YOUR_FORMSPREE_ENDPOINT') {
      setStatus('error');
      setStatusMessage(`${ERROR_MESSAGE} Formspree endpoint is not configured yet.`);
      return;
    }

    submitLockRef.current = true;
    setStatus('submitting');
    setStatusMessage('');

    try {
      const normalizedValues = normalizeContactFormValues(values);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: normalizedValues.name,
          email: normalizedValues.email,
          message: normalizedValues.message,
          _subject: 'New portfolio contact form message',
          _gotcha: honeypotRef.current?.value || '',
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
    } finally {
      submitLockRef.current = false;
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company website</label>
        <input ref={honeypotRef} id="company" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

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
          minLength={CONTACT_LIMITS.nameMin}
          maxLength={CONTACT_LIMITS.nameMax}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-hint name-error' : 'name-hint'}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        <p id="name-hint" className="mt-2 text-xs font-semibold text-slate-500">
          Use 2–100 characters.
        </p>
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
          maxLength={CONTACT_LIMITS.emailMax}
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-hint email-error' : 'email-hint'}
          className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        <p id="email-hint" className="mt-2 text-xs font-semibold text-slate-500">
          Use a valid address such as name@example.com.
        </p>
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
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.messageMax}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-hint message-error' : 'message-hint'}
          className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-[#A47DFF] focus:ring-4 focus:ring-slate-100"
        />
        <p id="message-hint" className="mt-2 text-xs font-semibold text-slate-500">
          Use 10–2,000 characters. HTML-like text is sent as plain text.
        </p>
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
