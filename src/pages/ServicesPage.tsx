import React from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Laptop,
  Home as HomeIcon,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { setActiveRoute, setRequestModalOpen, setPrefilledRequestData } = useApp();

  const handleServiceSelect = (grade: string, subject?: string) => {
    setPrefilledRequestData({
      grade,
      subjects: subject ? [subject] : ['Mathematics'],
    });
    setRequestModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Comprehensive Educational Programs
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tailored Tutoring for Every Grade & Subject in Ethiopia
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          From early childhood phonics to rigorous Grade 12 National University Entrance Exam preparations, we connect learners with proven, qualified educators.
        </p>
      </div>

      {/* 1. Academic Grade Levels */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-[#1F2937] flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#0D3B66]" />
          <span>Academic Grade Levels</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              level: 'Kindergarten & Early Literacy',
              grades: 'KG – Grade 4',
              fee: '300 ETB',
              desc: 'Foundational reading, writing, and arithmetic. Play-based learning in Amharic and English to spark a lifelong love of discovery.',
              topics: ['Phonics & Pronunciation', 'Bilingual Literacy', 'Basic Arithmetic', 'Handwriting Practice'],
              accent: 'border-t-4 border-t-[#0D3B66]',
            },
            {
              level: 'Primary & Middle School',
              grades: 'Grades 5 – 8',
              fee: '350 ETB',
              desc: 'Building analytical reasoning and preparing middle school students for the pivotal Grade 8 Regional Ministry Examination.',
              topics: ['Mathematics Mastery', 'General Science', 'English Grammar & Composition', 'Ministry Exam Practice'],
              accent: 'border-t-4 border-t-[#2563EB]',
            },
            {
              level: 'Secondary High School',
              grades: 'Grades 9 – 10',
              fee: '400 ETB',
              desc: 'Mastering the transition to secondary science and social subjects. Establishing strong homework habits and conceptual depth.',
              topics: ['Algebra & Geometry', 'Introductory Physics & Chemistry', 'Biology Fundamentals', 'Effective Study Habits'],
              accent: 'border-t-4 border-t-[#F4B400]',
            },
            {
              level: 'Preparatory & University Entrance',
              grades: 'Grades 11 – 12',
              fee: '400 ETB',
              desc: 'High-stakes preparation for Natural Science and Social Science stream national university admissions exams.',
              topics: ['Calculus & Advanced Math', 'Mechanics & Electromagnetism', 'Organic Chemistry & Genetics', 'Economics & Business'],
              accent: 'border-t-4 border-t-[#16A34A]',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl p-6.5 border border-slate-200/90 ${item.accent} hover:border-[#2563EB]/40 hover-lift flex flex-col justify-between`}
            >
              <div>
                <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block mb-1">
                  {item.grades}
                </span>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">
                  {item.level}
                </h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                    Key Focus Areas:
                  </p>
                  {item.topics.map((t, tIdx) => (
                    <div key={tIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                      <span className="font-medium text-slate-700">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Starting Service Fee</span>
                  <span className="text-sm font-black text-[#0D3B66] tabular-nums">{item.fee}</span>
                </div>
                <button
                  onClick={() => handleServiceSelect(item.grades)}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-[#F25C54] hover:bg-[#e04a42] rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Request Tutor
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Subject Directory */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/90 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Subject Directory
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Subjects Taught by Verified Educators
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Click any subject to find matching approved tutors or request a custom learning plan.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ETHIOPIAN_LOCATIONS.subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setActiveRoute('find-tutor');
              }}
              className="p-3.5 rounded-xl border border-slate-200 hover:border-[#0D3B66] hover:bg-slate-50 transition-all text-left flex items-center justify-between group"
            >
              <span className="text-xs font-semibold text-slate-800 group-hover:text-[#0D3B66] truncate">
                {sub}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0D3B66] transition-colors shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* 3. Delivery Options: In-Home vs Online */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0D3B66] flex items-center justify-center">
            <HomeIcon className="w-6 h-6 text-[#0D3B66]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">In-Home Tutoring</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            A vetted tutor visits your home in Addis Ababa or eligible regional neighborhoods for focused, uninterrupted learning.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Direct, hands-on supervision for worksheets and textbooks</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Safe environment in your family home</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Available in all Addis Ababa sub-cities</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center">
            <Laptop className="w-6 h-6 text-[#06B6D4]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Online Interactive Tutoring</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Live 1-on-1 tutoring sessions with digital whiteboards, screen sharing, and recorded lesson recaps accessible across Ethiopia.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Connect with top Addis Ababa University graduates from anywhere</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Flexible scheduling with zero commute delays</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Digital question banks and exam archive reviews</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Specialized Academic Support */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Targeted Programs
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Specialized Academic Interventions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <Award className="w-5 h-5 text-[#0D3B66]" />
            <h4 className="text-sm font-bold text-slate-900">Exam Preparation Drills</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Targeted practice for Grade 8 Regional and Grade 12 National University Entrance exams with timed past exam questions.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <Layers className="w-5 h-5 text-[#0D3B66]" />
            <h4 className="text-sm font-bold text-slate-900">Academic Recovery & Catch-Up</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diagnostic review to identify learning gaps and bring struggling students back to grade-level proficiency quickly.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <Sparkles className="w-5 h-5 text-[#0D3B66]" />
            <h4 className="text-sm font-bold text-slate-900">Summer & Holiday Tutoring</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Constructive holiday programs to reinforce language fluency and preview the upcoming academic year syllabus.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center p-8 sm:p-12 bg-gradient-to-r from-[#0D3B66] via-blue-900 to-[#0A2540] rounded-3xl text-white space-y-4 shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
          Personalized Academic Matching
        </span>
        <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Which Program Fits Best?</h3>
        <p className="text-xs sm:text-sm text-blue-100/90 max-w-lg mx-auto">
          Our coordinators are ready to advise you on tutor availability in your neighborhood. Contact us on Telegram channel <strong>@pro_tutorial21241</strong>, group <strong>@pro_tutorial2124</strong>, or request a tutor directly.
        </p>
        <button
          onClick={() => setRequestModalOpen(true)}
          className="px-6 py-3.5 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs shadow-md shadow-[#F25C54]/25 transition-colors cursor-pointer"
        >
          Request Tutoring Now
        </button>
      </div>
    </div>
  );
};
