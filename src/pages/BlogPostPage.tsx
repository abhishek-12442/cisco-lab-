import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '../types.ts';
import { MediaFrame } from '../components/MediaFrame.tsx';

interface BlogPostPageProps {
  post: BlogPost | null;
  loading: boolean;
  onNavigate: (path: string) => void;
}

export function BlogPostPage({ post, loading, onNavigate }: BlogPostPageProps) {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="h-80 rounded-xl bg-white border border-slate-200 animate-pulse" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0B1B36]">
          Article Not Found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          This article may have been unpublished or moved.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/blog')}
          className="mt-6 px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg"
        >
          Back to Blog / News
        </button>
      </div>
    );
  }

  const paragraphs = post.content.split(/\n\n+/);

  return (
    <article className="bg-[#F8FAFC] pb-20">
      <div className="bg-[#071429] text-white py-12 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="inline-flex items-center gap-2 text-xs font-medium text-blue-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            All Blog Articles
          </button>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-blue-300">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span aria-hidden="true">·</span>
            <span>By {post.authorName}</span>
          </div>

          <h1
            className="mt-3 font-display text-2xl sm:text-4xl font-bold tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="aspect-[16/9] bg-slate-100">
            <MediaFrame
              imageKey={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 sm:p-10 space-y-5">
            <p className="text-base sm:text-lg font-medium text-[#0B1B36] leading-relaxed">
              {post.excerpt}
            </p>
            <hr className="border-slate-200" />
            <div className="space-y-4 text-base text-slate-700 leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>

            {post.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-200 text-xs text-slate-500">
                Topics: {post.tags.join(' · ')}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-[#0B1B36] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold">
              Interested in Practical IT &amp; Networking Training?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Explore our upcoming cohorts in Putalisadak or apply directly online.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/enroll')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg whitespace-nowrap shrink-0"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </article>
  );
}
