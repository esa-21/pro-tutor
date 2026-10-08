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
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072442] via-[#0D3B66] to-[#082038] text-white pt-12 sm:pt-16 pb-20 sm:pb-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2563EB_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        {/* Subtle decorative background shapes */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#2563EB]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-[#F4B400]/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Amharic / English Tagline with Gold Accent */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100">
                <Sparkles className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>
                  {language === 'am'
                    ? 'ለትምህርትዎ ስኬት፣ የእኛ ቁርጠኝነት!'
                    : 'Your Success, Our Commitment.'}
                </span>
              </div>

              {/* Headline with Yellow Highlights */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
                Find the <span className="text-[#F4B400] underline decoration-[#F4B400]/40 decoration-wavy decoration-2">Best Tutors</span> in Ethiopia for <span className="text-blue-100">KG–Grade 12</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Connect with qualified tutors for in-home and online tutoring in Addis Ababa and cities across Ethiopia.
              </p>

              <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl mx-auto lg:mx-0">
                {t('heroSupporting')}
              </p>

              {/* CTAs: Tomato primary CTA + Bright secondary CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <button
                  onClick={() => setInteractiveFinderOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-sm shadow-xl shadow-[#F25C54]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-white" />
                  <span>{t('findTutorCTA')}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={() => setRequestModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/25 transition-colors cursor-pointer"
                >
                  <span>Request a Tutor Directly</span>
                </button>

                <button
                  onClick={() => setActiveRoute('become-tutor')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold text-[#F4B400] hover:text-white transition-colors cursor-pointer"
                >
                  <span>{t('becomeTutorCTA')} →</span>
                </button>
              </div>

              {/* Telegram quick option */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 text-xs text-blue-200/90">
                <span className="flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Channel: </span>
                  <a
                    href="https://t.me/pro_tutorial21241"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold underline hover:text-[#F4B400] transition-colors"
                  >
                    @pro_tutorial21241
                  </a>
                </span>
                <span aria-hidden="true" className="text-blue-300">·</span>
                <span>
                  Group:{' '}
                  <a
                    href="https://t.me/pro_tutorial2124"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold underline hover:text-[#F4B400] transition-colors"
                  >
                    @pro_tutorial2124
                  </a>
                </span>
                <span aria-hidden="true" className="text-blue-300">·</span>
                <span>
                  Contact:{' '}
                  <a
                    href="https://t.me/pr_tutor12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold underline hover:text-[#F4B400] transition-colors"
                  >
                    @pr_tutor12
                  </a>
                </span>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072442]/90 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] fill-[#16A34A] text-white" />
                        <span>100% Vetted Educators</span>
                      </p>
                      <p className="text-[11px] text-blue-200 mt-0.5">
                        Top university students & certified teachers
                      </p>
                    </div>
                    <span className="text-[#F4B400] font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#F4B400]" />
                      <span className="tabular-nums">4.9 / 5.0</span>
                    </span>
                  </div>
                </div>

                {/* Decorative floating badge */}
                <div className="hidden sm:flex absolute -top-4 -left-4 bg-white text-slate-900 rounded-2xl p-3.5 shadow-xl border border-slate-100 items-center gap-3 text-xs font-bold">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0D3B66] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#0D3B66]" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[#16A34A] font-bold uppercase tracking-wider">Verified Agency</span>
                    <span className="text-slate-800">Addis Ababa & Regional</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Indicators & Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            <div className="text-center pt-2 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#0D3B66] tabular-nums block">
                500+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statStudents')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] tabular-nums block">
                120+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statTutors')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#F4B400] tabular-nums block">
                15+
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statSubjects')}
              </span>
            </div>

            <div className="text-center pt-2 sm:pt-0 sm:pl-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#16A34A] tabular-nums block">
                98.4%
              </span>
              <span className="text-xs font-semibold text-slate-600 mt-1 block">
                {t('statSatisfaction')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Families Choose Us (Service Cards with lift effect) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Academic Excellence & Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            Why Families Across Ethiopia Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            We bridge the gap between classroom teaching and individual student potential through structured, caring mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              accent: 'bg-blue-50 text-[#0D3B66]',
              accentDot: 'bg-[#16A34A]',
              title: 'Carefully Selected Tutors',
              desc: 'Every educator is strictly vetted for subject mastery, university transcript standing, and child-safe communication skills.',
            },
            {
              icon: Sparkles,
              accent: 'bg-amber-50 text-[#F4B400]',
              accentDot: 'bg-[#F4B400]',
              title: 'Personalized 1-on-1 Learning',
              desc: 'Custom study plans adapted to your child’s specific learning pace, strengths, and Ethiopian school curriculum.',
            },
            {
              icon: Clock,
              accent: 'bg-emerald-50 text-[#16A34A]',
              accentDot: 'bg-[#16A34A]',
              title: 'Flexible Learning Schedules',
              desc: 'Tutoring sessions arranged around family timetables, after school, or over weekends at convenient times.',
            },
            {
              icon: Laptop,
              accent: 'bg-blue-50 text-[#2563EB]',
              accentDot: 'bg-[#2563EB]',
              title: 'Online and In-Home Tutoring',
              desc: 'Face-to-face in-home tutoring in Addis Ababa or interactive online sessions across regional cities in Ethiopia.',
            },
            {
              icon: Award,
              accent: 'bg-rose-50 text-[#F25C54]',
              accentDot: 'bg-[#F25C54]',
              title: 'Competitive Teaching Services',
              desc: 'High-caliber instruction from top AAU, AASTU graduates and licensed teachers at transparent starting fees.',
            },
            {
              icon: Layers,
              accent: 'bg-indigo-50 text-[#0D3B66]',
              accentDot: 'bg-[#0D3B66]',
              title: 'Continuous Learning Support',
              desc: 'Regular academic milestone tracking, session feedback, and ongoing coordinator oversight for peace of mind.',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="p-6.5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#2563EB]/40 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.accent}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className={`w-2 h-2 rounded-full ${card.accentDot}`}></span>
                </div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Services Preview: In-Home, Online, KG-12, Exam Prep */}
      <section className="bg-slate-50 py-18 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Educational Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
                Tutoring for Every Stage of Learning
              </h2>
            </div>
            <button
              onClick={() => setActiveRoute('services')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3B66] hover:text-[#2563EB] cursor-pointer"
            >
              <span>View all educational programs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'In-Home Tutoring',
                subtitle: 'Addis Ababa & Regional',
                fee: '300 ETB',
                desc: 'Face-to-face sessions in your own living room with screened, trusted local tutors for maximum focus.',
                badge: 'Popular',
                badgeColor: 'text-[#16A34A] bg-emerald-50',
              },
              {
                title: 'Online Tutoring',
                subtitle: 'Nationwide Ethiopia',
                fee: '300 ETB',
                desc: 'Interactive virtual whiteboard lessons for students anywhere in Ethiopia with top instructors.',
                badge: 'Flexible',
                badgeColor: 'text-[#2563EB] bg-blue-50',
              },
              {
                title: 'KG–Grade 12 Tutoring',
                subtitle: 'Foundational to High School',
                fee: '350 ETB',
                desc: 'Structured curriculum alignment for natural and social sciences, mathematics, and language arts.',
                badge: 'Core Program',
                badgeColor: 'text-[#0D3B66] bg-slate-100',
              },
              {
                title: 'Exam Preparation',
                subtitle: 'Grade 8 & Grade 12',
                fee: '400 ETB',
                desc: 'Targeted past-paper drills, exam techniques, and confidence building for university entrance.',
                badge: 'High Impact',
                badgeColor: 'text-[#F4B400] bg-amber-50',
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6.5 border border-slate-200/90 hover:border-[#2563EB]/40 flex flex-col justify-between hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block">
                      {srv.subtitle}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1F2937] mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#0D3B66]">
                    Starting at {srv.fee}
                  </span>
                  <button
                    onClick={() => setActiveRoute('services')}
                    className="text-xs font-bold text-[#F25C54] hover:text-[#e04a42] cursor-pointer"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works (Visual 3–4 Step Process with Numbered Circles) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Transparent Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            How Pro Tutorial Service Works
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            A seamless 4-step journey designed for families seeking trusted educational support.
          </p>
        </div>

        {/* 4 Steps with connecting visual rhythm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              num: 1,
              title: 'Register',
              desc: 'Create an account or submit student grade, subjects, location, and preferred learning format.',
            },
            {
              num: 2,
              title: 'Tell Us What You Need',
              desc: 'Share your child’s learning goals, schedule availability, and preferred tutor qualifications.',
            },
            {
              num: 3,
              title: 'We Match You with a Tutor',
              desc: 'Our academic coordinators evaluate verified educators and match you with the ideal instructor.',
            },
            {
              num: 4,
              title: 'Start Learning',
              desc: 'Begin in-home or online sessions, track milestone progress, and achieve academic excellence.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6.5 rounded-2xl bg-white border border-slate-200/90 relative hover-lift"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#0D3B66] text-[#F4B400] flex items-center justify-center font-extrabold text-lg mb-4 shadow-md shadow-[#0D3B66]/15">
                {item.num}
              </div>
              <h3 className="text-base font-bold text-[#1F2937] mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tutor Application Track */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-[#0D3B66] uppercase tracking-wider">
              For University Students & Teachers
            </span>
            <h3 className="text-lg font-bold text-[#1F2937]">
              Want to tutor with Pro Tutorial Service?
            </h3>
            <p className="text-xs text-[#64748B] max-w-xl">
              Submit your academic transcripts, complete agency verification, and earn competitive compensation while empowering the next generation.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveRoute('become-tutor')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#2563EB] rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Apply as a Tutor
            </button>
            <a
              href="https://t.me/pro_tutorial21241"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 text-xs font-bold text-[#0D3B66] bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Channel</span>
            </a>
            <a
              href="https://t.me/pro_tutorial2124"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Group</span>
            </a>
          </div>
        </div>
      </section>

      {/* 6. Featured Approved Tutors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Top Educators
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
              Featured Verified Tutors
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Only verified university students and teachers with approved credentials appear in our directory.
            </p>
          </div>
          <button
            onClick={() => setActiveRoute('find-tutor')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0D3B66] hover:text-[#2563EB] cursor-pointer"
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

      {/* 7. Family Testimonials Preview with subtle colorful accents */}
      <section className="bg-slate-50 py-18 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Family Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
              What Parents & Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTestimonials.map((tst, idx) => {
              const borderAccents = ['border-t-4 border-t-[#0D3B66]', 'border-t-4 border-t-[#F4B400]', 'border-t-4 border-t-[#16A34A]'];
              return (
                <div
                  key={tst.id}
                  className={`bg-white rounded-2xl p-6.5 border border-slate-200/90 ${borderAccents[idx % 3]} shadow-xs flex flex-col justify-between hover-lift`}
                >
                  <div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < tst.rating
                              ? 'fill-[#F4B400] text-[#F4B400]'
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
                    <p className="text-xs text-[#1F2937] leading-relaxed italic mb-4">
                      &quot;{tst.quote}&quot;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#1F2937]">{tst.authorName}</p>
                    <p className="text-[11px] text-[#64748B]">
                      {tst.grade} · {tst.subject} · {tst.city}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveRoute('testimonials')}
              className="text-xs font-bold text-[#0D3B66] hover:text-[#2563EB] cursor-pointer"
            >
              Read more parent and student testimonials →
            </button>
          </div>
        </div>
      </section>

      {/* 8. Final Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0D3B66] via-blue-900 to-[#0A2540] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
              Start Learning With the Right Tutor Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Find Your <span className="text-[#F4B400]">Dedicated Tutor</span>?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
              Every great achievement begins with the right guidance. Let us help you connect with qualified tutors in Addis Ababa and across Ethiopia.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setInteractiveFinderOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs shadow-lg shadow-[#F25C54]/25 transition-all hover:scale-[1.02] cursor-pointer"
              >
                Find a Tutor
              </button>
              <button
                onClick={() => setActiveRoute('become-tutor')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors cursor-pointer"
              >
                Apply as a Tutor
              </button>
              <button
                onClick={() => setActiveRoute('contact')}
                className="px-6 py-3.5 rounded-xl bg-white text-[#0D3B66] font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
