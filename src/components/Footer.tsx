import { Globe, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import type { Course } from '../types.ts';

interface FooterProps {
  courses: Course[];
  onNavigate: (path: string) => void;
}

export function Footer({ courses, onNavigate }: FooterProps) {
  const topCourses = courses.slice(0, 6);

  return (
    <footer className="bg-[#071429] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="font-display text-lg font-bold tracking-tight text-white hover:text-blue-300 transition-colors text-left"
            >
              {INSTITUTE_CONFIG.name}
            </button>
            <p className="mt-1 text-xs font-medium text-blue-300">
              {INSTITUTE_CONFIG.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Practical, laboratory-driven IT, networking, security, and software
              engineering education in Kathmandu preparing Nepali youth for
              high-impact technical careers.
            </p>
            <div className="mt-5 flex items-center gap-4 text-xs font-medium text-slate-400">
              <a
                href={INSTITUTE_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Facebook
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={INSTITUTE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={INSTITUTE_CONFIG.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                YouTube
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Lab Gallery', path: '/gallery' },
                { label: 'Blog / News', path: '/blog' },
                { label: 'Enrollment Form', path: '/enroll' },
                { label: 'Student Login', path: '/student' },
                { label: 'Admin Dashboard', path: '/admin' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.path)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Training Programs
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {topCourses.map((course) => (
                <li key={course.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/courses/${course.slug}`)}
                    className="text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {course.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/courses')}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-left"
                >
                  View All Programs →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">
              Contact Information
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  {INSTITUTE_CONFIG.address}
                  <br />
                  <span className="text-xs text-slate-500">
                    {INSTITUTE_CONFIG.landmark}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span>
                  {INSTITUTE_CONFIG.phonePrimary} / {INSTITUTE_CONFIG.phoneSecondary}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${INSTITUTE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {INSTITUTE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
                <span className="text-xs">{INSTITUTE_CONFIG.officeHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {INSTITUTE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Campus Directions
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="hover:text-slate-300 transition-colors inline-flex items-center gap-1"
            >
              <Share2 className="w-3 h-3" aria-hidden="true" />
              Staff &amp; Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
