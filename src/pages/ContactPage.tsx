import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import { api } from '../lib/api.ts';

export function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await api.submitContact({ fullName, email, phone, subject, message });
      setSent(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Kathmandu Campus &amp; Support Desk
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            Visit our Putalisadak training center, call our admissions counselors, or
            send an inquiry directly using the form below.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                Campus Contact Details
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1B36]">Address</p>
                    <p className="mt-0.5">{INSTITUTE_CONFIG.address}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {INSTITUTE_CONFIG.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1B36]">Phone Numbers</p>
                    <p className="mt-0.5 tabular-nums">{INSTITUTE_CONFIG.phonePrimary}</p>
                    <p className="tabular-nums">{INSTITUTE_CONFIG.phoneSecondary}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1B36]">Email</p>
                    <p className="mt-0.5">{INSTITUTE_CONFIG.email}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Admissions: {INSTITUTE_CONFIG.admissionsEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#0B1B36]">Office Hours</p>
                    <p className="mt-0.5">{INSTITUTE_CONFIG.officeHours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-[#0B1B36]">
                  Connect With Us
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs font-medium text-[#1D4ED8]">
                  <a
                    href={INSTITUTE_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Facebook
                  </a>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <a
                    href={INSTITUTE_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <a
                    href={INSTITUTE_CONFIG.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    YouTube
                  </a>
                  <span aria-hidden="true" className="text-slate-300">
                    ·
                  </span>
                  <a
                    href={INSTITUTE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                Send Us a Message
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Have questions about batch timings, corporate training, or lab access?
              </p>

              {sent ? (
                <div className="mt-6 p-6 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2.5 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Message Sent Successfully</span>
                  </div>
                  <p className="mt-2 text-sm text-emerald-700">
                    Thank you for contacting {INSTITUTE_CONFIG.name}. Our team will
                    respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0B1B36] rounded-lg"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div
                      role="alert"
                      className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977-98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                      >
                        Subject *
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., CCNA Evening Batch Inquiry"
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your question or inquiry here..."
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-60 rounded-lg transition-colors"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-[#0B1B36]">
              Campus Location — Putalisadak, Kathmandu
            </h2>
            <span className="text-xs text-slate-500">
              {INSTITUTE_CONFIG.landmark}
            </span>
          </div>
          <div className="w-full h-80 bg-slate-100">
            <iframe
              title="Himalaya NetTech Institute Location Map"
              src={INSTITUTE_CONFIG.mapEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
