import {
  Camera,
  Code2,
  Cpu,
  Globe,
  Network,
  Server,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export function CourseIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case 'Network':
      return <Network className={className} aria-hidden="true" />;
    case 'Cpu':
      return <Cpu className={className} aria-hidden="true" />;
    case 'Camera':
      return <Camera className={className} aria-hidden="true" />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'Terminal':
      return <Terminal className={className} aria-hidden="true" />;
    case 'Code2':
      return <Code2 className={className} aria-hidden="true" />;
    case 'Globe':
      return <Globe className={className} aria-hidden="true" />;
    case 'Server':
    default:
      return <Server className={className} aria-hidden="true" />;
  }
}
