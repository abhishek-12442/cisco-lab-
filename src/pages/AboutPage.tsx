import { Award, Briefcase, Compass, Cpu, Eye, Layers, Users } from 'lucide-react';
import { INSTITUTE_CONFIG } from '../config/institute.ts';
import { MediaFrame } from '../components/MediaFrame.tsx';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

const TRAINERS = [
  {
    name: 'Er. Ramesh Adhikari',
    title: 'Lead Network Architect · CCNP, CCNA',
    bio: '11 years designing MPLS, BGP, and enterprise campus topologies for Kathmandu ISPs and banking networks.',
  },
  {
    name: 'Prakash Gurung',
    title: 'Senior Linux & Cloud Instructor · RHCSA, CKA',
    bio: 'Production Linux systems engineer specializing in high-availability web stacks, LVM storage, and automation.',
  },
  {
    name: 'Sujan Maharjan',
    title: 'Hardware, CCTV & Security Lab Lead',
    bio: 'Specialist in PoE IP surveillance design, enterprise access control, and workstation component diagnostics.',
  },
  {
    name: 'Anjali KC',
    title: 'Cybersecurity & Python Trainer · Security+',
    bio: 'Blue-team SOC analyst and Python developer mentoring graduates on packet inspection and secure API design.',
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="bg-[#F8FAFC] pb-20">
      <section className="bg-[#071429] text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-blue-300">
            About {INSTITUTE_CONFIG.name}
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Practical, Career-Oriented IT &amp; Networking Training in Nepal
          </h1>
          <p className="mt-3 text-base text-slate-300 max-w-3xl leading-relaxed">
            Established in {INSTITUTE_CONFIG.establishedYear} in Putalisadak, Kathmandu,
            our institute trains students, fresh engineering graduates, and working
            professionals through intensive laboratory practice rather than rote theory.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="w-10 h-10 rounded-lg bg-[#0B1B36] text-white flex items-center justify-center">
              <Compass className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-[#0B1B36]">
              Our Mission
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              To bridge Nepal’s technical skill gap by delivering hands-on networking,
              hardware, cybersecurity, and software training on authentic enterprise
              equipment—empowering every graduate to perform confidently from their
              first day on the job.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8">
            <div className="w-10 h-10 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center">
              <Eye className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-[#0B1B36]">
              Our Vision
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              To serve as Nepal’s most trusted technical training institute recognized
              by ISPs, commercial banks, hospitals, and technology firms for producing
              disciplined, practical, and industry-certified engineers.
            </p>
          </div>
        </section>

        {/* Laboratory & Real-World Projects */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch bg-white border border-slate-200 rounded-xl p-6 sm:p-10">
          <div className="lg:col-span-6">
            <div className="h-full min-h-[260px] rounded-lg overflow-hidden bg-slate-100">
              <MediaFrame
                imageKey="classroom-training"
                alt="Practical classroom and lab training session at Himalaya NetTech Institute"
                className="w-full h-full lg:h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#0B1B36]">
              Modern Computer &amp; Networking Laboratory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every classroom is built around live execution. Rather than watching
              diagrams on a projector, trainees spend 75% of their hours building
              networks, diagnosing components, and writing production configurations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-200">
                <Cpu className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-bold text-[#0B1B36]">
                  Practical Training
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Physical Cisco switches, Cat6 crimping stations, Hikvision NVRs, and
                  Linux server VMs.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-200">
                <Layers className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-bold text-[#0B1B36]">
                  Real-World Projects
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Multi-branch OSPF topologies, 4-camera PoE deployments, and full-stack
                  web capstones.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-200">
                <Briefcase className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-bold text-[#0B1B36]">
                  Career Guidance
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Mock technical interviews, LinkedIn/CV engineering workshops, and job
                  referrals.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#F8FAFC] border border-slate-200">
                <Award className="w-4 h-4 text-[#1D4ED8]" aria-hidden="true" />
                <h3 className="mt-2 font-display text-sm font-bold text-[#0B1B36]">
                  Verified Credentials
                </h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Practical exam evaluation and verifiable certificate codes in our
                  Student Portal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experienced Trainers */}
        <section>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
            <Users className="w-4 h-4" aria-hidden="true" />
            <span>Faculty &amp; Lab Mentors</span>
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[#0B1B36]">
            Learn from Experienced Practitioners
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.name}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-[#0B1B36]">
                    {trainer.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#1D4ED8]">
                    {trainer.title}
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#0B1B36] text-white rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-bold">
              Visit Our Putalisadak Campus &amp; Lab Wing
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Drop in Sunday through Friday for a free lab walkthrough and career
              track consultation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/enroll')}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#1D4ED8] hover:bg-[#2563EB] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Enroll Now
          </button>
        </section>
      </div>
    </div>
  );
}
