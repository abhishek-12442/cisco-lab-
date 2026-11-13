import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import { api } from '../lib/api.ts';
import type { Course } from '../types.ts';

interface EnrollPageProps {
  courses: Course[];
  preselectedCourse: Course | null;
  onNavigate: (path: string) => void;
}

const PREFERRED_TIMES = [
  'Morning (7:00 AM – 9:00 AM)',
  'Day (11:00 AM – 1:00 PM)',
  'Afternoon (2:00 PM – 4:00 PM)',
  'Evening (5:30 PM – 7:30 PM)',
];

export function EnrollPage({
  courses,
  preselectedCourse,
  onNavigate,
}: EnrollPageProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(
    preselectedCourse?.title || courses[0]?.title || 'CCNA & Networking'
  );
  const [preferredTime, setPreferredTime] = useState(PREFERRED_TIMES[0]);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<{
    id: number;
    courseTitle: string;
    fullName: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedCourse) {
      setSelectedCourseTitle(preselectedCourse.title);
    } else if (courses.length > 0 && !selectedCourseTitle) {
      setSelectedCourseTitle(courses[0].title);
    }
  }, [preselectedCourse, courses, selectedCourseTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const matchedCourse = courses.find((c) => c.title === selectedCourseTitle);
      const created = await api.submitEnrollment({
        fullName,
        phone,
        email,
        address,
        courseId: matchedCourse?.id ?? null,
        courseTitle: selectedCourseTitle,
        preferredTime,
        message,
      });
      setSubmittedRef({
        id: created.id,
        courseTitle: created.courseTitle,
        fullName: created.fullName,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to submit enrollment form.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-[80vh] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Student Admissions &amp; Seat Reservation
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Course Enrollment Form
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            Submit your training registration below. Our academic counselor in
            Kathmandu will confirm your preferred batch schedule and lab orientation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {submittedRef ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold text-[#0B1B36]">
                  Enrollment Request Received
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Thank you, <strong className="text-[#0B1B36]">{submittedRef.fullName}</strong>.
                  Your application for{' '}
                  <strong className="text-[#0B1B36]">{submittedRef.courseTitle}</strong>{' '}
                  has been recorded in our admissions database.
                </p>
                <p className="mt-3 font-mono text-xs text-slate-500 tabular-nums">
                  Reference ID: HNT-ENR-{String(submittedRef.id).padStart(4, '0')}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRef(null);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setAddress('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 text-sm font-semibold text-[#0B1B36] border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Submit Another Application
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('/courses')}
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg"
                  >
                    Browse More Courses
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6"
              >
                <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                  Applicant Information
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="enroll-fullname"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="enroll-fullname"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Aarav Sharma"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enroll-phone"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="enroll-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+977-98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enroll-email"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="enroll-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enroll-address"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Address *
                    </label>
                    <input
                      id="enroll-address"
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g., Baneshwor, Kathmandu"
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="enroll-course"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Selected Course *
                    </label>
                    <select
                      id="enroll-course"
                      required
                      value={selectedCourseTitle}
                      onChange={(e) => setSelectedCourseTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#1D4ED8]"
                    >
                      {courses.map((course) => (
                        <option key={course.id} value={course.title}>
                          {course.title} ({course.duration} · {course.feeNpr})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="enroll-time"
                      className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                    >
                      Preferred Class Time *
                    </label>
                    <select
                      id="enroll-time"
                      required
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#1D4ED8]"
                    >
                      {PREFERRED_TIMES.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enroll-message"
                    className="block text-xs font-semibold text-[#0B1B36] mb-1.5"
                  >
                    Message or Background Notes (Optional)
                  </label>
                  <textarea
                    id="enroll-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share your current academic background, career goals, or questions about class timings..."
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <p className="text-xs text-slate-500">
                    No upfront payment required online. Pay at the campus desk after lab
                    orientation.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    {submitting ? 'Submitting...' : 'Submit Enrollment'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <h3 className="font-display text-base font-bold text-[#0B1B36]">
                Admissions Desk
              </h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{INSTITUTE_CONFIG.address}</span>
                </p>
                <p className="flex items-center gap-2.5 tabular-nums">
                  <Phone className="w-4 h-4 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                  <span>{INSTITUTE_CONFIG.phonePrimary}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#1D4ED8] shrink-0" aria-hidden="true" />
                  <span>{INSTITUTE_CONFIG.officeHours}</span>
                </p>
              </div>
            </div>

            <div className="bg-[#0B1B36] text-white rounded-xl p-6">
              <h3 className="font-display text-base font-bold">
                What Happens Next?
              </h3>
              <ol className="mt-3 space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li>1. Admissions team reviews your preferred batch shift.</li>
                <li>2. Receive a phone call within 1 business day to book a free lab tour.</li>
                <li>3. Complete registration and unlock your Student Portal account.</li>
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
