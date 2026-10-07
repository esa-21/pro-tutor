import React from 'react';
import { useApp } from '../context/AppContext';
import { TutorCard } from '../components/TutorCard';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Users,
  BookOpen,
  MapPin,
  Sparkles,
  Send,
  Star,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  Clock,
  Home as HomeIcon,
  Laptop,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    t,
    setActiveRoute,
    setInteractiveFinderOpen,
    setRequestModalOpen,
    tutors,
    testimonials,
    language,
  } = useApp();

  const approvedTutors = tutors.filter((t) => t.verificationStatus === 'approved');
  const featuredTutors = approvedTutors.slice(0, 3);
  const featuredTestimonials = testimonials.filter((t) => t.published).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-[#0D3B66] to-[#0A2540] text-white pt-10 sm:pt-16 pb-20 sm:pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Amharic / English Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>
                  {language === 'am'
                    ? 'ለትምህርትዎ ስኬት፣ የእኛ ቁርጠኝነት!'
                    : 'Your Success, Our Commitment.'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                {t('heroHeadline')}
              </h1>

              <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('heroSubheadline')}
              </p>

              <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl mx-auto lg:mx-0">
                {t('heroSupporting')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => setInteractiveFinderOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4 text-slate-950" />
                  <span>{t('findTutorCTA')}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <button
                  onClick={() => setRequestModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-colors"
                >
                  <span>Request a Tutor Directly</span>
                </button>

                <button
                  onClick={() => setActiveRoute('become-tutor')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs text-blue-200 hover:text-white transition-colors"
                >
                  <span>{t('becomeTutorCTA')} →</span>
                </button>
              </div>

              {/* Telegram quick option */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-blue-200/80">
                <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Prefer Telegram? Apply or request via </span>
                <a
                  href="https://t.me/pro_tutorbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline hover:text-[#06B6D4]"
                >
                  @pro_tutorbot
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-slate-900 aspect-16/10">
                  <img
                    src="/src/assets/images/hero_ethiopian_tutor_student_1791018894030.jpg"
                    alt="Ethiopian student and tutor during a personalized learning session"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">100% Vetted Educators</p>
                      <p className="text-[11px] text-blue-200">
                        Top university students & certified teachers
                      </p>
                    </div>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </span>
                  </div>
                </div>

                {/* Decorative floating badge */}
                <div className="hidden sm:flex absolute -top-4 -left-4 bg-white text-slate-900 rounded-2xl p-3 shadow-xl border border-slate-100 items-center gap-2.5 text-xs font-bold">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#0D3B66] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[#0D3B66]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-normal">Verified Agency</span>
                    <span>Addis Ababa & Regional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators & Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-14 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="text-center pt-2 sm:pt-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0D3B66] tabular-nums block">
                500+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statStudents')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0D3B66] tabular-nums block">
                120+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statTutors')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0D3B66] tabular-nums block">
                15+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statSubjects')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#06B6D4] tabular-nums block">
                98.4%
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statSatisfaction')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Families Choose Us (6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Academic Excellence & Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Families Across Ethiopia Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We bridge the gap between classroom teaching and individual student potential through structured, caring mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Carefully Selected Tutors',
              desc: 'Every educator is strictly vetted for subject mastery, university transcript standing, and child-safe communication skills.',
            },
            {
              icon: Sparkles,
              title: 'Personalized 1-on-1 Learning',
              desc: 'Custom study plans adapted to your child’s specific learning pace, strengths, and Ethiopian school curriculum.',
            },
            {
              icon: Clock,
              title: 'Flexible Learning Schedules',
              desc: 'Tutoring sessions arranged around family timetables, after school, or over weekends at convenient times.',
            },
            {
              icon: Laptop,
              title: 'Online and In-Home Tutoring',
              desc: 'Face-to-face in-home tutoring in Addis Ababa or interactive online sessions across regional cities in Ethiopia.',
            },
            {
              icon: Award,
              title: 'Competitive Teaching Services',
              desc: 'High-caliber instruction from top AAU, AASTU graduates and licensed teachers at transparent starting fees.',
            },
            {
              icon: Layers,
              title: 'Continuous Learning Support',
              desc: 'Regular academic milestone tracking, session feedback, and ongoing coordinator oversight for peace of mind.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#0D3B66]/30 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0D3B66]/5 text-[#0D3B66] flex items-center justify-center mb-4">
                  <card.icon className="w-6 h-6 text-[#0D3B66]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Services Preview */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
                Educational Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Tutoring for Every Stage of Learning
              </h2>
            </div>
            <button
              onClick={() => setActiveRoute('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3B66] hover:text-[#1E3A8A]"
            >
              <span>View all educational programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Kindergarten & Early Literacy',
                subtitle: 'KG & Grades 1–4',
                fee: '300 ETB',
                desc: 'Phonics, bilingual Amharic and English reading fluency, and foundational numeracy.',
              },
              {
                title: 'Middle School & Ministry Prep',
                subtitle: 'Grades 5–8',
                fee: '350 ETB',
                desc: 'Mathematics, General Science, and Grade 8 Regional Ministry Examination preparation.',
              },
              {
                title: 'High School & University Entrance',
                subtitle: 'Grades 9–12',
                fee: '400 ETB',
                desc: 'Natural & Social Science streams, physics, chemistry, calculus, and national entrance exams.',
              },
              {
                title: 'Exam Preparation & Recovery',
                subtitle: 'Targeted Boost',
                fee: 'Custom',
                desc: 'Intensive practice drills, conceptual review, and past paper question analysis.',
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-[11px] font-bold text-[#06B6D4] uppercase tracking-wider block mb-1">
                    {srv.subtitle}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0D3B66]">
                    Starting at {srv.fee}
                  </span>
                  <button
                    onClick={() => {
                      setActiveRoute('services');
                    }}
                    className="text-xs font-semibold text-[#0D3B66] hover:underline"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works (Four-Step Process for Families & Tutors) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Transparent Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How Pro Tutorial Service Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A seamless journey designed for families seeking trusted educational support.
          </p>
        </div>

        {/* 4 Steps for Families */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Register & Share Needs',
              desc: 'Submit student grade, subjects, location (Addis Ababa sub-city or regional city), and preferred format.',
            },
            {
              step: '02',
              title: 'Coordinator Match',
              desc: 'Our academic team reviews your requirements and pairs you with a verified, qualified educator.',
            },
            {
              step: '03',
              title: 'Confirm & Schedule',
              desc: 'Review tutor profile, accept the proposal, and set weekly schedule (in-home or online).',
            },
            {
              step: '04',
              title: 'Learn & Track Progress',
              desc: 'Begin lessons, track academic improvements through your dashboard, and give feedback.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 relative"
            >
              <span className="text-3xl font-black text-slate-200 block mb-2 font-mono">
                {item.step}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tutor Application Track */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[#0D3B66]/5 border border-[#0D3B66]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#0D3B66] uppercase tracking-wider">
              For University Students & Teachers
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Want to tutor with Pro Tutorial Service?
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Submit your academic transcripts, complete agency verification, and earn competitive compensation while empowering the next generation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveRoute('become-tutor')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl transition-colors shadow-sm"
            >
              Apply as a Tutor
            </button>
            <a
              href="https://t.me/pro_tutorbot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
              <span>Telegram Bot</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Featured Approved Tutors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
              Top Educators
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Verified Tutors
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Only verified university students and teachers with approved credentials appear in our directory.
            </p>
          </div>
          <button
            onClick={() => setActiveRoute('find-tutor')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0D3B66] hover:text-[#1E3A8A]"
          >
            <span>Browse all available tutors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutors.map((tut) => (
            <TutorCard key={tut.id} tutor={tut} />
          ))}
        </div>
      </section>

      {/* 7. Family Testimonials Preview */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
              Family Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What Parents & Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((tst) => (
              <div
                key={tst.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < tst.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                    {tst.isSamplePlaceholder && (
                      <span className="ml-2 text-[10px] text-slate-400 font-medium italic">
                        (Sample Review)
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    &quot;{tst.quote}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{tst.authorName}</p>
                  <p className="text-[11px] text-slate-500">
                    {tst.grade} · {tst.subject} · {tst.city}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveRoute('testimonials')}
              className="text-xs font-bold text-[#0D3B66] hover:underline"
            >
              Read more parent and student testimonials →
            </button>
          </div>
        </div>
      </section>

      {/* 8. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0D3B66] via-blue-900 to-[#0F2A4A] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Every Great Achievement Begins with the Right Guidance.
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Let us help you find the right tutor and make learning more effective, engaging, and successful for your child.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setInteractiveFinderOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                Find a Tutor
              </button>
              <button
                onClick={() => setActiveRoute('become-tutor')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Apply as a Tutor
              </button>
              <button
                onClick={() => setActiveRoute('contact')}
                className="px-6 py-3 rounded-xl bg-white text-[#0D3B66] font-bold text-xs hover:bg-slate-100 transition-colors"
              >
                Contact Us (0987226440)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
