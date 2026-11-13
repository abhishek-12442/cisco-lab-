import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Course } from '../types.ts';
import { CourseCard } from '../components/CourseCard.tsx';

interface CoursesPageProps {
  courses: Course[];
  loading: boolean;
  onNavigate: (path: string) => void;
  onSelectCourseForEnroll: (course: Course) => void;
}

export function CoursesPage({
  courses,
  loading,
  onNavigate,
  onSelectCourseForEnroll,
}: CoursesPageProps) {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.shortDescription.toLowerCase().includes(q) ||
        c.overview.toLowerCase().includes(q);
      const matchesLevel =
        levelFilter === 'all' ||
        c.level.toLowerCase().includes(levelFilter.toLowerCase());
      return matchesQuery && matchesLevel;
    });
  }, [courses, query, levelFilter]);

  return (
    <div className="bg-[#F8FAFC] min-h-[75vh] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Academic &amp; Technical Curriculum
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            IT &amp; Networking Training Courses
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            Explore our industry-aligned programs featuring physical lab practice,
            structured syllabi, and job placement guidance in Kathmandu.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Search & Level Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses (e.g., CCNA, Linux, CCTV, Python)..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'Beginner', label: 'Beginner Friendly' },
              { id: 'Intermediate', label: 'Intermediate' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setLevelFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  levelFilter === tab.id
                    ? 'bg-white text-[#0B1B36] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B36]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-80 rounded-xl bg-white border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="font-display text-lg font-bold text-[#0B1B36]">
              No matching courses found
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Try clearing your search filter to view all available programs.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setLevelFilter('all');
              }}
              className="mt-5 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onViewDetails={(slug) => onNavigate(`/courses/${slug}`)}
                onEnroll={onSelectCourseForEnroll}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
