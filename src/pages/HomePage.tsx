import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers,
  Users,
} from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import type { BlogPost, Course } from '../types.ts';
import { CourseCard } from '../components/CourseCard.tsx';
import { MediaFrame } from '../components/MediaFrame.tsx';

interface HomePageProps {
  courses: Course[];
  posts: BlogPost[];
  loadingCourses: boolean;
  onNavigate: (path: string) => void;
  onSelectCourseForEnroll: (course: Course) => void;
}

const CORE_PILLARS = [
  {
    number: '01',
    title: 'Expert Trainers',
    description:
      'Learn directly from senior network engineers, Linux system administrators, and cybersecurity practitioners with 8+ years of Nepali ISP and banking infrastructure experience.',
    icon: Users,
    span: 'lg:col-span-2',
  },
  {
    number: '02',
    title: 'Hands-on Practical Labs',
    description:
      'Work on physical Cisco Catalyst switches, routers, Hikvision PoE NVR racks, and live Linux servers—never limited to PowerPoint slides.',
    icon: Cpu,
    span: 'lg:col-span-1',
  },
  {
    number: '03',
    title: 'Industry-Oriented Training',
    description:
      'Syllabi updated quarterly to match technical assessments at Nepali ISPs, commercial banks, software companies, and INGO IT departments.',
    icon: Layers,
    span: 'lg:col-span-1',
  },
  {
    number: '04',
    title: 'Certification',
    description:
      'Structured exam prep aligned with Cisco CCNA, CompTIA A+/Security+, Red Hat RHCSA, plus verifiable institute practical completion credentials.',
    icon: Award,
    span: 'lg:col-span-1',
  },
  {
    number: '05',
    title: 'Career Support',
    description:
      'Technical CV reviews, mock CLI & coding interviews, and direct internship referrals with partner technology employers across Kathmandu Valley.',
    icon: Briefcase,
    span: 'lg:col-span-1',
  },
];

const TESTIMONIALS = [
  {
    name: 'Bikram Thapa Magar',
    role: 'NOC Engineer · Kathmandu Fiber ISP',
    outcome:
      'Started with zero CLI experience; after 12 weeks of physical rack labs in CCNA & Linux, cleared a live OSPF/VLAN technical interview within three weeks of graduation.',
  },
  {
    name: 'Shristi Shrestha',
    role: 'Junior Security Analyst · Commercial Bank IT Wing',
    outcome:
      'Transitioned from BSc CSIT coursework to SOC operations by practicing Wireshark packet triage and Wazuh SIEM alerts in the isolated Cyber Range.',
  },
  {
    name: 'Dipesh Kumar Yadav',
    role: 'IT Infrastructure & CCTV Specialist · Birgunj Medical Center',
    outcome:
      'Combined Computer Hardware and CCTV & Security Systems training to design and deploy a 32-camera PoE surveillance and VLAN-segmented clinic network.',
  },
];

export function HomePage({
  courses,
  posts,
  loadingCourses,
  onNavigate,
  onSelectCourseForEnroll,
}: HomePageProps) {
  const [trackFilter, setTrackFilter] = useState<'all' | 'networking' | 'systems' | 'dev'>('all');

  const filteredCourses = useMemo(() => {
    if (trackFilter === 'all') return courses;
    if (trackFilter === 'networking') {
      return courses.filter((c) =>
        ['ccna-and-networking', 'cctv-and-security-systems', 'computer-hardware-and-troubleshooting'].includes(
          c.slug
        )
      );
    }
    if (trackFilter === 'systems') {
      return courses.filter((c) =>
        ['cybersecurity', 'linux-administration', 'it-support-and-system-administration'].includes(
          c.slug
        )
      );
    }
    return courses.filter((c) =>
      ['python-programming', 'web-development'].includes(c.slug)
    );
  }, [courses, trackFilter]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#071429] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-16 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-xs font-medium tracking-wide text-blue-300">
                {INSTITUTE_CONFIG.city}, {INSTITUTE_CONFIG.country} · Putalisadak Technical Campus
              </p>

              <h1
                className="mt-3 font-display font-extrabold tracking-tight text-white leading-[1.12]"
                style={{
                  fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                Build Your Career in IT &amp; Networking
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                Learn practical IT skills from experienced trainers and build
                job-ready technical knowledge.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/enroll')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Enroll Now
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/courses')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-slate-100 border border-slate-600 hover:border-slate-400 hover:bg-white/5 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-full min-h-[260px] lg:min-h-[380px] rounded-xl overflow-hidden border border-slate-700/80 bg-[#0B1B36]">
                <MediaFrame
                  imageKey="hero-lab"
                  alt="Students and instructor configuring enterprise network switches in Kathmandu training lab"
                  className="w-full h-full lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071429]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span>Cisco, Linux &amp; Security Rack Wing</span>
                  <span className="font-mono tabular-nums text-blue-300">
                    Max 16 Trainees / Batch
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-column Institutional Proof Strip below hero split */}
          <div className="mt-10 pt-8 border-t border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                75%+
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Dedicated Hands-on Lab &amp; Rack Time
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                8 Tracks
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Job-Oriented Networking, Security &amp; Dev Programs
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                1,400+
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Graduates Trained Since {INSTITUTE_CONFIG.establishedYear}
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-bold text-white tabular-nums">
                4 Shifts
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Morning, Day, Afternoon &amp; Evening Batches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Training Pillars */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B36]"
              style={{ textWrap: 'balance' }}
            >
              Practical Technical Education Built for Real Engineering Roles
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Every cohort combines structured architectural theory with daily hardware,
              CLI, and troubleshooting exercises inside our Putalisadak campus labs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className={`p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] flex flex-col justify-between ${pillar.span}`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                        {pillar.number}.
                      </span>
                      <Icon className="w-5 h-5 text-[#0B1B36]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-[#0B1B36]">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B36]"
                style={{ textWrap: 'balance' }}
              >
                Career-Track IT &amp; Networking Courses
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Choose a specialized training program with live lab access and career
                mentorship.
              </p>
            </div>

            {/* Interactive Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter courses by track"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg shrink-0"
            >
              {[
                { id: 'all', label: 'All Courses' },
                { id: 'networking', label: 'Networking & Hardware' },
                { id: 'systems', label: 'Security & Linux' },
                { id: 'dev', label: 'Programming & Web' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setTrackFilter(tab.id as 'all' | 'networking' | 'systems' | 'dev')
                  }
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    trackFilter === tab.id
                      ? 'bg-white text-[#0B1B36] shadow-xs'
                      : 'text-slate-600 hover:text-[#0B1B36]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {loadingCourses ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-xl border border-slate-200 bg-white animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={(slug) => onNavigate(`/courses/${slug}`)}
                  onEnroll={onSelectCourseForEnroll}
                />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('/courses')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B1B36] border border-slate-300 bg-white hover:border-[#1D4ED8] hover:text-[#1D4ED8] rounded-lg transition-colors"
            >
              Compare Full Syllabi &amp; Schedules
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* About & Lab Infrastructure Split + Adjacent Placement Outcomes */}
      <section className="py-16 lg:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-5">
              <div className="h-full min-h-[280px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <MediaFrame
                  imageKey="ccna-rack"
                  alt="Enterprise Cisco switches and patch cabling inside Putalisadak networking lab"
                  className="w-full h-full lg:h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-xs font-semibold text-[#1D4ED8]">
                About {INSTITUTE_CONFIG.name}
              </p>
              <h2
                className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B36]"
                style={{ textWrap: 'balance' }}
              >
                Trained on Real Hardware, Prepared for Nepal’s IT Workforce
              </h2>
              <p className="mt-4 text-base text-slate-600 leading-relaxed">
                Located in the academic hub of Putalisadak, Kathmandu, we bridge the
                gap between university theory and day-one engineering duties. Our
                trainees cable switches, harden Linux servers, install PoE IP cameras,
                and deploy full-stack applications under direct mentor supervision.
              </p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
                {[
                  'Dedicated physical Cisco & MikroTik lab racks',
                  'Small batches capped at 16 students',
                  'Real-world capstone troubleshooting projects',
                  'Direct internship & job interview placement desk',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B1B36] hover:bg-[#102A52] rounded-lg transition-colors"
                >
                  About Our Institute
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/services')}
                  className="px-5 py-2.5 text-sm font-semibold text-[#0B1B36] border border-slate-300 hover:border-[#0B1B36] rounded-lg transition-colors"
                >
                  Explore Corporate &amp; Lab Services
                </button>
              </div>
            </div>
          </div>

          {/* Attributable Alumni Outcomes adjacent to Career Support claims */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0B1B36]">
                  Graduate Career Outcomes
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Alumni working across ISPs, commercial banks, and healthcare facilities
                  in Nepal.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item) => (
                <div
                  key={item.name}
                  className="p-6 rounded-xl border border-slate-200 bg-[#F8FAFC] flex flex-col justify-between"
                >
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “{item.outcome}”
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <p className="font-display text-sm font-bold text-[#0B1B36]">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog / News */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1B36]">
                Latest Technical Articles &amp; Institute News
              </h2>
              <p className="mt-2 text-base text-slate-600">
                Career guides, lab walkthroughs, and upcoming batch announcements.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] whitespace-nowrap shrink-0"
            >
              Read All Articles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:border-[#1D4ED8]/50 transition-colors"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <MediaFrame
                    imageKey={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-medium text-[#1D4ED8]">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-[#0B1B36] leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1B36] hover:text-[#1D4ED8] text-left"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final Enrollment CTA */}
      <section className="bg-[#0B1B36] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-blue-300">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Free Counseling &amp; Campus Lab Tour in Putalisadak</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Start Your Practical IT Training?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300">
              Reserve your seat in our upcoming Morning, Day, or Evening batch or talk
              to our instructors to select the right career track.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/enroll')}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap"
            >
              Enroll Now
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-6 py-3 text-sm font-semibold text-white border border-slate-500 hover:border-white rounded-lg transition-colors whitespace-nowrap"
            >
              Contact Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
