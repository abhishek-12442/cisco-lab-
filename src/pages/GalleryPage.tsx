import { useMemo, useState } from 'react';
import { X } from 'lucide-react';
import type { GalleryItem } from '../types.ts';
import { MediaFrame } from '../components/MediaFrame.tsx';

interface GalleryPageProps {
  items: GalleryItem[];
  loading: boolean;
}

export const GALLERY_CATEGORIES = [
  'All',
  'Networking Lab',
  'Computer Lab',
  'CCTV Training',
  'Practical Classes',
  'Students',
  'Events',
  'Certificate Distribution',
];

export function GalleryPage({ items, loading }: GalleryPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (selectedCategory === 'All') return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-[75vh] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Campus &amp; Facilities
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Training Labs &amp; Student Gallery
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            Take a look inside our Cisco networking racks, computer labs, CCTV
            installation benches, practical workshops, and graduation events.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl"
        >
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-[#0B1B36] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1B36]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-[4/3] rounded-xl bg-white border border-slate-200 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-10 bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="font-display text-lg font-bold text-[#0B1B36]">
              No photos in {selectedCategory} yet
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#1D4ED8] rounded-lg"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveItem(item)}
                className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-[#1D4ED8]/60 transition-colors"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <MediaFrame
                    imageKey={item.imageKey}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#1D4ED8]">
                    {item.category}
                  </p>
                  <h2 className="mt-1 font-display text-base font-bold text-[#0B1B36]">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-[#071429]/85 flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full overflow-hidden border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-slate-900">
              <MediaFrame
                imageKey={activeItem.imageKey}
                alt={activeItem.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                aria-label="Close image preview"
                className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-[#071429]/80 text-white flex items-center justify-center hover:bg-[#071429]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-[#1D4ED8]">
                {activeItem.category}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold text-[#0B1B36]">
                {activeItem.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
