import { useState } from 'react';
import { MonitorCheck } from 'lucide-react';
import { resolveImageSrc } from '../lib/images.ts';

interface MediaFrameProps {
  imageKey: string;
  alt: string;
  className?: string;
}

export function MediaFrame({ imageKey, alt, className = '' }: MediaFrameProps) {
  const [failed, setFailed] = useState(false);
  const src = resolveImageSrc(imageKey);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1B36] via-[#102A52] to-[#1D4ED8] text-white p-6 text-center ${className}`}
      >
        <MonitorCheck className="w-8 h-8 mb-2 opacity-85" aria-hidden="true" />
        <p className="text-xs font-medium text-slate-200 max-w-[220px]">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
