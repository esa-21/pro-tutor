import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  Phone,
  Send,
  MessageCircle,
} from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  cat: 'general' | 'parents' | 'tutors' | 'pricing';
}

const FAQS: FAQItem[] = [
  {
    cat: 'general',
    q: 'What is Pro Tutorial Service?',
    a: 'Pro Tutorial Service is an educational tutoring agency operating in Ethiopia that connects families and students with qualified, competitive teachers and university students for personalized 1-on-1 tutoring from Kindergarten to Grade 12.',
  },
  {
    cat: 'general',
    q: 'Which cities do you serve in Ethiopia?',
    a: 'We provide in-home tutoring across all sub-cities of Addis Ababa (Bole, Yeka, Arada, Kirkos, Gulele, Lideta, Nifas Silk-Lafto, Kolfe Keranio, Akaki Kality) and online tutoring across all regional cities including Adama, Hawassa, Bahir Dar, Mekelle, Bishoftu, and Dire Dawa.',
  },
  {
    cat: 'parents',
    q: 'How are tutors selected and verified?',
    a: 'Every educator undergoes strict screening of their university credentials (AAU, AASTU, Kotebe, and regional universities), GPA transcripts, subject mastery, and background checks. Only verified tutors appear in our directory.',
  },
  {
    cat: 'parents',
    q: 'Can we switch tutors if the teaching style doesn’t fit my child?',
    a: 'Yes, absolutely. If after the introductory session you feel the educator does not match your child’s learning rhythm, our academic coordinator will arrange an alternative educator without any penalty.',
  },
  {
    cat: 'pricing',
    q: 'What are the tutoring service fees?',
    a: 'Our starting agency service fees are clearly stated: 300 ETB for KG–Grade 4, 350 ETB for Grades 5–8, and 400 ETB for Grades 9–12. All fees and schedules are agreed upon transparently with family consent prior to beginning lessons.',
  },
  {
    cat: 'pricing',
    q: 'How do families pay for sessions?',
    a: 'Payments are made securely via local Ethiopian bank transfers (CBE, Awash, Telebirr, etc.) after session confirmation. We do not engage in hidden charges or unauthorized recurring deductions.',
  },
  {
    cat: 'tutors',
    q: 'Who can apply to become a tutor with Pro Tutorial Service?',
    a: 'University students (3rd year and above with strong academic standing), recent university graduates, and licensed school teachers who are passionate about teaching Ethiopian curriculum can apply.',
  },
  {
    cat: 'tutors',
    q: 'Can I apply through Telegram?',
    a: 'Yes! You can apply directly through our official Telegram application bot at https://t.me/pro_tutorbot.',
  },
];

export const FAQPage: React.FC = () => {
  const { setActiveRoute } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'parents' | 'tutors' | 'pricing'>('all');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFAQs = FAQS.filter((item) => {
    if (activeCategory !== 'all' && item.cat !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Help & Frequently Asked Questions
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Find Quick Answers to Common Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Learn how Pro Tutorial Service evaluates tutors, coordinates schedules, and supports academic improvement in Ethiopia.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keywords: 'verification', 'pricing', 'Addis Ababa', 'Telegram'..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-medium text-slate-900 shadow-xs focus:outline-none focus:border-[#0D3B66]"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'All Questions' },
          { id: 'general', label: 'General & Service' },
          { id: 'parents', label: 'For Parents & Students' },
          { id: 'tutors', label: 'For Tutors & Applicants' },
          { id: 'pricing', label: 'Fees & Payment' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeCategory === cat.id
                ? 'bg-[#0D3B66] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No specific FAQ matches your query. Contact our coordinator directly at 0987226440.
          </div>
        ) : (
          filteredFAQs.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'rotate-180 text-[#0D3B66]' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still need help callout */}
      <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Still have questions?</h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Our support team in Addis Ababa is standing by to help.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:0987226440"
            className="px-4 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-xl hover:bg-[#1E3A8A] transition-colors"
          >
            Call 0987226440
          </a>
          <button
            onClick={() => setActiveRoute('contact')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
