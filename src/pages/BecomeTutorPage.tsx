import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Award,
  Clock,
  DollarSign,
  Send,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const BecomeTutorPage: React.FC = () => {
  const { setActiveRoute } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0D3B66] via-blue-900 to-[#0A2540] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-xl">
        <div className="max-w-2xl space-y-5 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Educator Recruitment
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Share Your Knowledge. Inspire Ethiopian Learners.
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Join Ethiopia’s most respected tutoring network. Connect with motivated students in Addis Ababa and regional cities, earn competitive hourly compensation, and build your professional teaching portfolio.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveRoute('tutor-register')}
              className="px-6 py-3 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              Start Online Application
            </button>
            <a
              href="https://t.me/pro_tutorial21241"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Send className="w-4 h-4 text-[#06B6D4]" />
              <span>Channel @pro_tutorial21241</span>
            </a>
            <a
              href="https://t.me/pro_tutorial2124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Send className="w-4 h-4 text-[#06B6D4]" />
              <span>Group @pro_tutorial2124</span>
            </a>
            <a
              href="https://t.me/pr_tutor12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-blue-200 hover:text-white text-xs border border-white/15 transition-colors"
            >
              <span>Contact @pr_tutor12</span>
            </a>
          </div>
        </div>
      </div>

      {/* Alternative Telegram callout banner */}
      <div className="p-6 rounded-2xl bg-cyan-50 border border-cyan-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#06B6D4] text-white flex items-center justify-center shrink-0">
            <Send className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Prefer applying through Telegram?
            </h4>
            <p className="text-xs text-slate-600">
              Join channel <strong>@pro_tutorial21241</strong>, discussion group <strong>@pro_tutorial2124</strong>, or message coordinator directly at <strong>@pr_tutor12</strong>.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="https://t.me/pro_tutorial21241"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#0D3B66] text-white font-bold text-xs hover:bg-[#1E3A8A] transition-colors shrink-0"
          >
            Channel (@pro_tutorial21241)
          </a>
          <a
            href="https://t.me/pro_tutorial2124"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs hover:bg-[#0891b2] transition-colors shrink-0"
          >
            Group (@pro_tutorial2124)
          </a>
          <a
            href="https://t.me/pr_tutor12"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white text-[#0D3B66] border border-slate-300 font-bold text-xs hover:bg-slate-50 transition-colors shrink-0"
          >
            Message @pr_tutor12
          </a>
        </div>
      </div>

      {/* Benefits */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900">
          Why Become a Tutor with Pro Tutorial Service?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D3B66] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Competitive & Guaranteed Earnings
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn competitive hourly rates with timely, secure bank or digital transfers directly to your account.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Flexible Timetables & Locations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set your own available hours. Choose between in-home tutoring in your preferred sub-city or convenient online sessions from home.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Professional Verification & Network
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive verified educator recognition, access pedagogical materials, and gain strong professional references for future opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Application Requirements */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Who Can Apply?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
          {[
            'University Students (3rd year or above) from AAU, AASTU, or recognized institutions with strong GPA.',
            'Graduated degree holders in Engineering, Natural Sciences, Mathematics, English, or Education.',
            'Experienced school teachers seeking supplementary weekend or after-school tutoring opportunities.',
            'Strong interpersonal communication, patience, and clear explanation of Ethiopian school curriculum.',
            'Commitment to academic integrity, punctuality, and student safety.',
            'Willingness to undergo background verification and credential verification.',
          ].map((req, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{req}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center p-8 bg-[#0D3B66] text-white rounded-3xl space-y-3">
        <h3 className="text-xl font-bold">Ready to Start Tutoring?</h3>
        <p className="text-xs text-blue-200 max-w-md mx-auto">
          Applications are reviewed within 48 business hours by our coordination team.
        </p>
        <button
          onClick={() => setActiveRoute('tutor-register')}
          className="px-6 py-2.5 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs hover:bg-[#0891b2] transition-colors"
        >
          Proceed to Tutor Registration Form
        </button>
      </div>
    </div>
  );
};
