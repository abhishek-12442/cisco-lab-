import { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cpu,
  Wallet,
} from 'lucide-react';
import type { Course } from '../types.ts';
import { MediaFrame } from '../components/MediaFrame.tsx';
import { CourseIcon } from '../components/CourseIcon.tsx';

interface CourseDetailPageProps {
  course: Course | null;
  loading: boolean;
  onNavigate: (path: string) => void;
  onEnroll: (course: Course) => void;
}

export function CourseDetailPage({
  course,
  loading,
  onNavigate,
  onEnroll,
}: CourseDetailPageProps) {
  const [openModuleIdx, setOpenModuleIdx] = useState<number>(0);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-64 rounded-xl bg-white border border-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0B1B36]">
          Course Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The requested training program could not be located.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/courses')}
          className="mt-6 px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg"
        >
          Back to All Courses
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] pb-20">
      {/* Header Banner */}
      <section className="bg-[#071429] text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('/courses')}
            className="inline-flex items-center gap-2 text-xs font-medium text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Training Courses
          </button>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs text-blue-300 font-medium">
                <CourseIcon name={course.iconName} className="w-4 h-4" />
                <span>{course.level}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{course.duration}</span>
              </div>

              <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
                {course.title}
              </h1>

              <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-2xl">
                {course.shortDescription}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onEnroll(course)}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors"
                >
                  Enroll Now
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="px-5 py-3 text-sm font-semibold text-slate-100 border border-slate-600 hover:border-slate-400 rounded-lg transition-colors"
                >
                  Request Counseling
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-700 bg-[#0B1B36]">
                <MediaFrame
                  imageKey={course.imageKey}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content + Sidebar Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Detailed Syllabus & Curriculum */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                Course Overview
              </h2>
              <p className="mt-3 text-base text-slate-700 leading-relaxed">
                {course.overview}
              </p>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                Learning Objectives
              </h2>
              <ul className="mt-4 space-y-3">
                {course.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#0B1B36]">
                Complete Course Syllabus
              </h2>
              <div className="mt-4 divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
                {course.syllabus.map((mod, idx) => {
                  const isOpen = openModuleIdx === idx;
                  return (
                    <div key={mod.module} className="bg-white">
                      <button
                        type="button"
                        onClick={() => setOpenModuleIdx(isOpen ? -1 : idx)}
                        aria-expanded={isOpen}
                        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-display text-sm sm:text-base font-semibold text-[#0B1B36]">
                          {mod.module}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <ul className="px-5 pb-4 pt-1 space-y-2 text-sm text-slate-600 bg-slate-50/70">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2.5">
                              <span className="text-[#1D4ED8] font-mono text-xs mt-1">
                                –
                              </span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-2.5 text-[#0B1B36]">
                  <Cpu className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold">
                    Practical Lab Information
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {course.labInfo}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-2.5 text-[#0B1B36]">
                  <Award className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                  <h3 className="font-display text-lg font-bold">
                    Certification Information
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {course.certificationInfo}
                </p>
              </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-[#0B1B36]">
                <Briefcase className="w-5 h-5 text-[#1D4ED8]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold">
                  Career Opportunities
                </h2>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.careerOpportunities.map((role) => (
                  <div
                    key={role}
                    className="px-4 py-3 rounded-lg bg-[#F8FAFC] border border-slate-200 text-sm font-medium text-[#0B1B36]"
                  >
                    {role}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Key Details Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <h2 className="font-display text-lg font-bold text-[#0B1B36]">
                Program Summary
              </h2>

              <dl className="divide-y divide-slate-100 text-sm">
                <div className="py-3 flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-slate-500">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>Duration</span>
                  </dt>
                  <dd className="font-semibold text-[#0B1B36] tabular-nums text-right">
                    {course.duration}
                  </dd>
                </div>

                <div className="py-3 flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-2 text-slate-500">
                    <Wallet className="w-4 h-4" aria-hidden="true" />
                    <span>Course Fee</span>
                  </dt>
                  <dd className="font-mono font-bold text-[#1D4ED8] tabular-nums text-right">
                    {course.feeNpr}
                  </dd>
                </div>

                <div className="py-3">
                  <dt className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <span>Class Schedule</span>
                  </dt>
                  <dd className="mt-1.5 font-medium text-[#0B1B36] text-xs leading-relaxed">
                    {course.schedule}
                  </dd>
                </div>

                <div className="py-3 flex items-start justify-between gap-4">
                  <dt className="text-slate-500">Course Level</dt>
                  <dd className="font-medium text-[#0B1B36] text-right">
                    {course.level}
                  </dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => onEnroll(course)}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors"
              >
                Enroll in This Course
              </button>

              <p className="text-xs text-slate-500 text-center">
                Includes lab manual PDFs, physical rack access, and certificate
                verification.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
