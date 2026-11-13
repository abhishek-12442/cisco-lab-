import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import type { BlogPost } from '../types.ts';
import { MediaFrame } from '../components/MediaFrame.tsx';

interface BlogPageProps {
  posts: BlogPost[];
  loading: boolean;
  onNavigate: (path: string) => void;
}

export function BlogPage({ posts, loading, onNavigate }: BlogPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ['All', ...unique];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCat =
        selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [posts, search, selectedCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-[75vh] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Institute Journal &amp; Announcements
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Blog &amp; Technical News
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            Networking guides, cybersecurity briefings, Nepal IT career insights, and
            batch admission updates published by our faculty.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, topics, or tags..."
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-[#0B1B36] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B36]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-96 rounded-xl bg-white border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="font-display text-lg font-bold text-[#0B1B36]">
              No published articles match your filter
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
            >
              View All Posts
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
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
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-[#1D4ED8]">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.authorName}</span>
                  </div>

                  <h2 className="mt-2 font-display text-lg font-bold text-[#0B1B36] leading-snug">
                    {post.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="mt-4 text-xs text-slate-500">
                      {post.tags.join(' · ')}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onNavigate(`/blog/${post.slug}`)}
                    className="mt-4 pt-4 border-t border-slate-100 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1B36] hover:text-[#1D4ED8]"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
