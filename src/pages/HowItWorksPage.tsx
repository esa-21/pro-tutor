import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  Search,
  CalendarCheck,
  GraduationCap,
  ShieldCheck,
  Send,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setActiveRoute, setInteractiveFinderOpen, setRequestModalOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Simple, Transparent Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Pro Tutorial Service Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Whether you are a parent seeking guidance for your child or an educator looking to teach, our process is designed for clarity, safety, and mutual success.
        </p>
      </div>

      {/* Part 1: For Parents & Students */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-[#0D3B66] uppercase tracking-wider">
            For Families & Students
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            4 Easy Steps to Your Ideal Tutor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 1',
              title: 'Submit Your Tutoring Request',
              desc: 'Select your student’s grade level (KG to Grade 12), subject needs, location (Addis Ababa sub-city or regional city), and preferred format (in-home or online).',
              icon: Search,
            },
            {
              step: 'Step 2',
              title: 'Academic Coordinator Review',
              desc: 'Our coordinator analyzes your syllabus requirements, reviews verified candidate profiles, and matches you with the best educator.',
              icon: UserCheck,
            },
            {
              step: 'Step 3',
              title: 'Review Tutor & Set Schedule',
              desc: 'View your proposed tutor’s profile, verify their university credentials, and agree on a convenient weekly timetable.',
              icon: CalendarCheck,
            },
            {
              step: 'Step 4',
              title: 'Begin Learning & Track Progress',
              desc: 'Start weekly sessions! Track homework completion, practice exam performance, and review progress on your dashboard.',
              icon: GraduationCap,
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#0D3B66] tracking-wider uppercase block mb-3">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#0D3B66] text-white flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Need urgent assistance? Call our coordination team at <strong>0987226440</strong>.
          </p>
          <button
            onClick={() => setInteractiveFinderOpen(true)}
            className="px-6 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl transition-colors shadow-sm"
          >
            Start Tutor Finder Wizard →
          </button>
        </div>
      </section>

      {/* Part 2: For Tutors & Applicants */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
            For University Students & Teachers
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            How to Join Pro Tutorial Service as an Educator
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: 'Step 1',
              title: 'Submit Application',
              desc: 'Fill out the tutor registration form with your university, department, GPA, subject expertise, and availability.',
            },
            {
              step: 'Step 2',
              title: 'Verification & Screening',
              desc: 'Our academic administrators audit transcripts and evaluate your ability to teach Ethiopian school syllabi effectively.',
            },
            {
              step: 'Step 3',
              title: 'Approval & Directory Listing',
              desc: 'Once approved, your profile receives the Verified badge and becomes eligible for family matching.',
            },
            {
              step: 'Step 4',
              title: 'Receive Assignments',
              desc: 'Accept tutoring requests matching your neighborhood or online preferences, and receive prompt, secure compensation.',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-blue-50/40 border border-blue-100 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#06B6D4] tracking-wider uppercase block mb-3">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#0D3B66] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold">Ready to apply today?</h4>
            <p className="text-xs text-blue-200 mt-0.5">
              You can apply either through our online registration or through the Telegram bot.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveRoute('tutor-register')}
              className="px-5 py-2 text-xs font-bold text-slate-900 bg-[#06B6D4] hover:bg-[#0891b2] rounded-xl transition-colors"
            >
              Online Registration
            </button>
            <a
              href="https://t.me/pro_tutorbot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Telegram Bot</span>
            </a>
          </div>
        </div>
      </section>

      {/* Safety & Quality Guarantee */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <ShieldCheck className="w-6 h-6 text-[#0D3B66]" />
          <h4 className="text-sm font-bold text-slate-900">Safety & Family Trust</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            All in-home tutors submit national identification, current university or employer references, and sign strict conduct agreements.
          </p>
        </div>

        <div className="space-y-2">
          <CheckCircle2 className="w-6 h-6 text-[#06B6D4]" />
          <h4 className="text-sm font-bold text-slate-900">Tutor Replacement Guarantee</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            If the assigned tutor does not match your child’s learning rhythm after the first session, we arrange an alternative educator immediately.
          </p>
        </div>

        <div className="space-y-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
          <h4 className="text-sm font-bold text-slate-900">Progress Monitoring</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Coordinators check in monthly with both families and tutors to ensure measurable improvements in school grades and exam readiness.
          </p>
        </div>
      </section>
    </div>
  );
};
