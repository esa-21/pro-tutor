import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, FileText, RefreshCw, HelpCircle, Phone, Send } from 'lucide-react';

export const LegalPages: React.FC<{ initialTab?: string }> = ({ initialTab = 'privacy' }) => {
  const { activeRoute, setActiveRoute } = useApp();
  const [tab, setTab] = useState<'privacy' | 'terms' | 'refund' | 'help'>(
    (activeRoute === 'terms'
      ? 'terms'
      : activeRoute === 'refund'
      ? 'refund'
      : activeRoute === 'help'
      ? 'help'
      : 'privacy') as any
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
        {[
          { id: 'privacy', label: 'Privacy Policy', icon: Shield },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          { id: 'refund', label: 'Refund & Cancellation', icon: RefreshCw },
          { id: 'help', label: 'Help Center', icon: HelpCircle },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as any)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              tab === item.id
                ? 'bg-[#0D3B66] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xs prose prose-sm max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
        {tab === 'privacy' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 not-prose">
              Privacy & Child Information Protection Policy
            </h1>
            <p className="text-xs text-slate-500 not-prose">
              Last updated: March 2026 · Addis Ababa, Ethiopia
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              1. Commitment to Child & Family Safety
            </h3>
            <p>
              Pro Tutorial Service prioritizes the confidentiality and physical and digital safety of all students, parents, and educators. We do not publicly display sensitive student details, personal tutor government identification documents, private mobile numbers, or exact residential addresses on any public page of this platform.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              2. Information We Collect
            </h3>
            <p>
              We collect information provided during registration and tutor requests, including parent and student names, grade level, educational curriculum, general neighborhood or sub-city in Addis Ababa, and contact numbers strictly for the purpose of coordinating tutoring sessions.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              3. Tutor Document Confidentiality
            </h3>
            <p>
              Academic transcripts, university identification, and background credentials submitted by tutor applicants are accessed exclusively by verified academic administrators during the vetting process and are never shared with external third parties.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              4. Data Inquiries & Deletion Requests
            </h3>
            <p>
              Families and educators may contact our office at 0987226440 or support@protutorial.et at any time to request data updates, account suspension, or complete record deletion.
            </p>
          </div>
        )}

        {tab === 'terms' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 not-prose">
              Terms and Conditions of Service
            </h1>
            <p className="text-xs text-slate-500 not-prose">
              Effective across Addis Ababa and all regional cities in Ethiopia
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              1. Agency Role & Matching Service
            </h3>
            <p>
              Pro Tutorial Service operates as a licensed tutoring coordination agency. We vet, match, and oversee tutoring arrangements between clients (parents and adult students) and qualified educators.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              2. Stated Service Fees
            </h3>
            <p>
              Our starting service fees are 300 ETB for KG–Grade 4, 350 ETB for Grades 5–8, and 400 ETB for Grades 9–12. All session fees and schedules are agreed upon in advance with explicit family consent before tutoring commencement.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              3. Code of Conduct
            </h3>
            <p>
              Both clients and tutors agree to maintain professional, respectful, and punctual conduct. In-home tutoring sessions must occur in an open, family-supervised study area within the student’s residence.
            </p>
          </div>
        )}

        {tab === 'refund' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 not-prose">
              Refund & Rescheduling Policy
            </h1>
            <p className="text-xs text-slate-500 not-prose">
              Transparent, fair cancellation rules for Ethiopian families
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              1. Session Rescheduling
            </h3>
            <p>
              Families or tutors may reschedule a session with at least 24 hours prior notice to the coordinator or through the dashboard without penalty.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              2. Tutor Replacement Guarantee
            </h3>
            <p>
              If a matched tutor is unable to continue lessons or does not satisfy your child’s pedagogical requirements after the introductory session, Pro Tutorial Service will assign a qualified alternative tutor without additional matching fees.
            </p>

            <h3 className="text-base font-bold text-slate-900 not-prose mt-4">
              3. Refund Eligibility
            </h3>
            <p>
              Unused prepaid session blocks are refundable in full upon request through our coordinator within 7 business days via the original Ethiopian banking channel.
            </p>
          </div>
        )}

        {tab === 'help' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 not-prose">
                Pro Tutorial Service Help Center
              </h1>
              <p className="text-xs text-slate-500 not-prose mt-1">
                Frequently needed assistance and coordination contacts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <Phone className="w-5 h-5 text-[#0D3B66] mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Direct Phone Support</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Call our Addis Ababa coordination desk directly:
                </p>
                <a href="tel:0987226440" className="text-sm font-extrabold text-[#0D3B66] mt-2 block">
                  0987226440
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200">
                <Send className="w-5 h-5 text-[#06B6D4] mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Telegram Bot Help</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Connect 24/7 with our automated bot assistant:
                </p>
                <a
                  href="https://t.me/pro_tutorbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-extrabold text-[#06B6D4] mt-2 block underline"
                >
                  @pro_tutorbot
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
