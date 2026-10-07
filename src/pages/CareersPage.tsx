import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  ArrowRight,
  Send,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  const { setActiveRoute } = useApp();

  const openings = [
    {
      title: 'Secondary Physics & Mathematics Tutor',
      type: 'Part-time / Flexible',
      location: 'Addis Ababa (Bole, Yeka, Arada) & Online',
      dept: 'Secondary STEM Education',
      desc: 'Deliver 1-on-1 Grade 11-12 physics and mathematics tutoring for National University Entrance Exam candidates.',
    },
    {
      title: 'Kindergarten & Primary Literacy Educator',
      type: 'Part-time / Afternoon',
      location: 'Addis Ababa (In-Home)',
      dept: 'Early Childhood Education',
      desc: 'Teach English and Amharic phonics, early reading fluency, and foundational math for KG–Grade 4 students.',
    },
    {
      title: 'Chemistry & Biology Preparatory Tutor',
      type: 'Part-time / Weekend',
      location: 'Addis Ababa & Regional Online',
      dept: 'Natural Sciences',
      desc: 'Help Grade 9-12 high schoolers grasp organic chemistry, cell biology, and laboratory concepts.',
    },
    {
      title: 'Academic Tutor Coordinator (Intern)',
      type: 'Full-time / Hybrid',
      location: 'Addis Ababa Office',
      dept: 'Operations & Family Services',
      desc: 'Assist in vetting tutor applications, coordinating client matches, and managing customer communications.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Work With Us
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Join the Pro Tutorial Service Team
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Empower Ethiopian students while advancing your teaching career, earning competitive compensation, and making a lasting educational difference.
        </p>
      </div>

      {/* Openings Grid */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-slate-900">Current Open Positions</h2>
        {openings.map((pos, idx) => (
          <div
            key={idx}
            className="p-6 bg-white rounded-2xl border border-slate-200/90 hover:border-[#0D3B66]/30 shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider">
                {pos.dept}
              </span>
              <h3 className="text-base font-bold text-slate-900">{pos.title}</h3>
              <p className="text-xs text-slate-600 max-w-xl">{pos.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{pos.type}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{pos.location}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setActiveRoute('tutor-register')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl transition-colors shrink-0 self-start md:self-auto"
            >
              Apply Online
            </button>
          </div>
        ))}
      </div>

      {/* Alternative Telegram callout */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-cyan-50 border border-cyan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#06B6D4] text-slate-900 flex items-center justify-center">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Apply via Telegram Bot
            </h4>
            <p className="text-xs text-slate-600">
              You can also submit your tutor credentials directly to <strong>@pro_tutorbot</strong>.
            </p>
          </div>
        </div>
        <a
          href="https://t.me/pro_tutorbot"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white font-bold text-xs hover:bg-[#1E3A8A] transition-colors"
        >
          Open @pro_tutorbot
        </a>
      </div>
    </div>
  );
};
