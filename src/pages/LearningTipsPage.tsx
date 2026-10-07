import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Lightbulb,
  CheckCircle2,
  Clock,
  BookOpen,
  Brain,
  Compass,
} from 'lucide-react';

export const LearningTipsPage: React.FC = () => {
  const { setInteractiveFinderOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Study Skills & Best Practices
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Practical Learning Strategies for Ethiopian Students & Parents
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Actionable advice to maximize retention, overcome academic anxiety, and build sustainable study habits.
        </p>
      </div>

      {/* For Students */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#0D3B66]" />
          <h2 className="text-xl font-bold text-slate-900">
            For Students: High-Performance Study Habits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Active Recall vs. Passive Reading',
              desc: 'Instead of re-reading textbook chapters repeatedly, close the book and summarize key concepts from memory. Solve sample equations without looking at steps.',
            },
            {
              title: 'The 45/15 Pomodoro Focus Block',
              desc: 'Focus deeply for 45 minutes without phone notifications, followed by a 15-minute break. This prevents mental fatigue during evening Ethiopian school prep.',
            },
            {
              title: 'Teach What You Learn (Feynman Method)',
              desc: 'Explain complex physics laws or biological mechanisms out loud in simple Amharic or English as if explaining to a 5th grader. You will instantly detect gaps.',
            },
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For Parents */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#06B6D4]" />
          <h2 className="text-xl font-bold text-slate-900">
            For Parents: Creating an Inspiring Home Study Environment
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Dedicated, Well-Lit Study Space',
              desc: 'Designate a quiet desk with good lighting away from living room televisions. Consistent space triggers mental focus.',
            },
            {
              title: 'Encouraging Effort Over Sole Scores',
              desc: 'Praise disciplined study routines and problem-solving resilience rather than just final test marks. Children who feel safe taking challenges learn faster.',
            },
            {
              title: 'Collaborating With Your Tutor',
              desc: 'Take 5 minutes after each weekly tutoring session to review what homework was assigned and what milestones were achieved.',
            },
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <div className="p-8 rounded-3xl bg-blue-50 border border-blue-200 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Want a tutor to guide these study habits 1-on-1?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Our verified educators mentor students not only in subject content but also in disciplined learning skills.
        </p>
        <button
          onClick={() => setInteractiveFinderOpen(true)}
          className="px-6 py-2.5 rounded-xl bg-[#0D3B66] text-white font-bold text-xs hover:bg-[#1E3A8A] transition-colors"
        >
          Find a Dedicated Mentor
        </button>
      </div>
    </div>
  );
};
