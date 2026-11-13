import { ArrowRight } from 'lucide-react';
import type { Course } from '../types.ts';
import { CourseIcon } from './CourseIcon.tsx';
import { MediaFrame } from './MediaFrame.tsx';

interface CourseCardProps {
  course: Course;
  onViewDetails: (slug: string) => void;
  onEnroll: (course: Course) => void;
}

export function CourseCard({
  course,
  onViewDetails,
  onEnroll,
}: CourseCardProps) {
  return (
    <article className="group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-colors duration-200 hover:border-[#1D4ED8]/50">
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
        <MediaFrame
          imageKey={course.imageKey}
          alt={`${course.title} practical lab training at Himalaya NetTech Institute`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B1B36]/60 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 w-9 h-9 rounded-lg bg-[#0B1B36]/90 text-white flex items-center justify-center">
          <CourseIcon name={course.iconName} className="w-4 h-4" />
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Zero-pill unboxed metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium tabular-nums">
          <span>{course.duration}</span>
          <span aria-hidden="true">·</span>
          <span>{course.level}</span>
        </div>

        <h3 className="mt-2 font-display text-lg font-bold text-[#0B1B36] leading-snug">
          {course.title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
          {course.shortDescription}
        </p>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onViewDetails(course.slug)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1B36] hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0"
          >
            View Details
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onEnroll(course)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </article>
  );
}
