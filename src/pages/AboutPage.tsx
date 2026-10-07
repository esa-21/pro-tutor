import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Target,
  Eye,
  HeartHandshake,
  CheckCircle2,
  Users,
  Compass,
  Award,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveRoute, setInteractiveFinderOpen } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          About Pro Tutorial Service
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Empowering Ethiopian Students Through Mentorship and Academic Dedication
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          &quot;Your Success, Our Commitment.&quot; / &quot;ለትምህርትዎ ስኬት፣ የእኛ ቁርጠኝነት!&quot;
        </p>
      </div>

      {/* Who We Are */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0D3B66]">
            Who We Are
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            A Trusted Bridge Between Passionate Educators and Striving Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pro Tutorial Service is an educational tutoring agency committed to connecting students and families with qualified, dedicated, and competitive teachers and university students.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We provide personalized educational support from Kindergarten through Grade 12 through flexible online and in-home tutoring services across Addis Ababa and regional cities in Ethiopia.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>Rigorous Tutor Verification</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>KG – Grade 12 Curriculum Alignment</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" />
              <span>In-Home & Online Delivery</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D3B66] to-[#0A2540] rounded-2xl p-6 text-white space-y-4">
          <h3 className="text-sm font-bold text-[#06B6D4] uppercase tracking-wider">
            Agency Highlights
          </h3>
          <ul className="space-y-3 text-xs text-blue-100">
            <li className="flex items-start gap-2">
              <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>Tutors from AAU, AASTU, Kotebe Education University and regional universities.</span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
              <span>Specialized support for Grade 8 Regional and Grade 12 National University Entrance exams.</span>
            </li>
            <li className="flex items-start gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Family-centric coordinator matching with ongoing progress monitoring.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0D3B66] flex items-center justify-center">
            <Target className="w-5 h-5 text-[#0D3B66]" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Our Mission</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To make quality, personalized education more accessible by connecting learners with capable tutors and creating supportive learning experiences that encourage academic excellence.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#06B6D4] flex items-center justify-center">
            <Eye className="w-5 h-5 text-[#06B6D4]" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Our Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            To become a trusted and recognized tutoring service in Ethiopia, empowering students and families through accessible, innovative, and high-quality educational support.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Our Values</h3>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>· Academic excellence & Integrity</li>
            <li>· Commitment to student growth</li>
            <li>· Accessibility across Ethiopia</li>
            <li>· Trust and continuous improvement</li>
          </ul>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Our Commitment to Families
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            How We Evaluate Tutors & Protect Quality
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-700">
          <div className="space-y-2">
            <p className="font-bold text-slate-900">1. Academic Screening</p>
            <p className="text-slate-600 leading-relaxed">
              We verify university degrees, GPA transcripts, and subject competency in the Ethiopian national syllabus.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900">2. Needs Assessment</p>
            <p className="text-slate-600 leading-relaxed">
              We consult with parents to understand the student’s learning style, timetable, and specific school curriculum challenges.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900">3. Facilitated Matching</p>
            <p className="text-slate-600 leading-relaxed">
              Rather than automated cold matchmaking, our academic coordinator proposes tutors with proven track records in the subject.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-slate-900">4. Ongoing Check-Ins</p>
            <p className="text-slate-600 leading-relaxed">
              We track attendance, student progress, and collect parent feedback after every learning milestone.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Academic Team */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Team & Leadership
          </span>
          <h2 className="text-2xl font-bold text-slate-900">
            Dedicated Academic Coordinators
          </h2>
          <p className="text-xs text-slate-500">
            Passionate educators and coordinators based in Addis Ababa, Ethiopia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Esayas Hailu',
              role: 'Founder & Program Director',
              bio: 'Educational technologist dedicated to scaling accessible, top-quality tutoring across Ethiopian cities.',
            },
            {
              name: 'Dr. Tadesse Bekele',
              role: 'Senior Academic Advisor',
              bio: 'Former university faculty advisor specializing in STEM pedagogy and national entrance curriculum.',
            },
            {
              name: 'Rahel Assefa',
              role: 'Tutor Operations Coordinator',
              bio: 'Manages tutor verification, credential audits, and family satisfaction in Addis Ababa.',
            },
            {
              name: 'Yohannes Getu',
              role: 'Regional Services Lead',
              bio: 'Coordinates online and hybrid tutoring programs for students in Adama, Hawassa, and Bahir Dar.',
            },
          ].map((m, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#0D3B66] text-white flex items-center justify-center font-bold text-lg mx-auto">
                {m.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{m.name}</h4>
                <p className="text-xs text-[#06B6D4] font-semibold">{m.role}</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#0D3B66] rounded-3xl p-8 text-center text-white space-y-4">
        <h3 className="text-xl font-bold">Ready to Start Learning With Us?</h3>
        <p className="text-xs text-blue-200 max-w-md mx-auto">
          Connect with our team via Telegram channel <strong>@pro_tutorial21241</strong>, group <strong>@pro_tutorial2124</strong>, or request a tutor through our interactive finder.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setInteractiveFinderOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-[#06B6D4] text-slate-900 font-bold text-xs"
          >
            Find a Tutor
          </button>
          <button
            onClick={() => setActiveRoute('contact')}
            className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-xs border border-white/20"
          >
            Contact Office
          </button>
        </div>
      </div>
    </div>
  );
};
