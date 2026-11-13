import {
  Briefcase,
  Camera,
  Cpu,
  Headphones,
  Layers,
  Network,
  Server,
  Terminal,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

const SERVICES = [
  {
    number: '01',
    title: 'IT Training',
    description:
      'Structured career-focused courses covering Python programming, full-stack web development, Linux servers, and enterprise office productivity systems.',
    icon: Terminal,
  },
  {
    number: '02',
    title: 'Networking Training',
    description:
      'Physical Cisco CCNA routing & switching, VLAN segmentation, OSPF, MikroTik router administration, and ISP network troubleshooting.',
    icon: Network,
  },
  {
    number: '03',
    title: 'Computer Hardware Training',
    description:
      'Bench-level desktop and laptop assembly, motherboard diagnostics, power supply testing, BIOS/UEFI tuning, and OS imaging workflows.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'CCTV Installation Training',
    description:
      'Analog HD and IP PoE surveillance architecture, Cat6 & BNC cabling, Hikvision/Dahua NVR setup, storage math, and mobile remote viewing.',
    icon: Camera,
  },
  {
    number: '05',
    title: 'Network Installation',
    description:
      'Structured LAN cabling, patch panel termination, rack organization, enterprise Wi-Fi deployment, and firewall segmentation for offices and schools.',
    icon: Server,
  },
  {
    number: '06',
    title: 'IT Support',
    description:
      'Workstation maintenance, Active Directory user administration, backup verification, and responsive technical support consulting for Nepali SMBs.',
    icon: Headphones,
  },
  {
    number: '07',
    title: 'Career Guidance',
    description:
      'Individual skill gap audits, technical resume engineering, mock CLI/coding interviews, and internship placement with Kathmandu tech employers.',
    icon: Briefcase,
  },
  {
    number: '08',
    title: 'Practical Lab Training',
    description:
      'Open lab rack bookings for Cisco, MikroTik, Linux virtualization, and IP surveillance testing so trainees master real equipment under mentor supervision.',
    icon: Layers,
  },
];

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            Training &amp; Technical Capabilities
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Our Services
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-2xl">
            From individual career certification tracks to corporate lab training and
            structured office network deployment across Nepal.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.number}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#1D4ED8]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                      {service.number}.
                    </span>
                    <Icon className="w-5 h-5 text-[#0B1B36]" aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 font-display text-lg font-bold text-[#0B1B36]">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-[#1D4ED8] hover:text-[#1E40AF] text-left"
                >
                  Inquire About Service →
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-14 bg-white border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0B1B36]">
              Corporate Team Upskilling &amp; Campus Infrastructure Setup
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Need customized Linux, Networking, or Cybersecurity workshops for your
              organization in Nepal? Contact our technical leads for a tailored plan.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('/contact')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B1B36] hover:bg-[#102A52] rounded-lg transition-colors whitespace-nowrap"
            >
              Contact Our Team
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/enroll')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#1E40AF] rounded-lg transition-colors whitespace-nowrap"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
