import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Send,
  MapPin,
  Clock,
  CheckCircle2,
  Mail,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { submitContactMessage, setActiveRoute } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'general' | 'parent_support' | 'tutor_support' | 'callback' | 'telegram'>('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    submitContactMessage({
      name,
      email: email || 'not_provided@protutorial.et',
      phone,
      category,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Customer Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          We’re Here to Help Your Child Succeed
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Contact our team in Addis Ababa for tutor consultations, callback requests, or agency partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Details Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0D3B66] via-blue-900 to-[#0A2540] text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white">Direct Office Contacts</h2>
            <p className="text-xs text-blue-200 mt-1">
              Serving Addis Ababa and all regional cities in Ethiopia.
            </p>
          </div>

          <div className="space-y-6 text-xs">
            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="text-blue-200 block text-[11px] uppercase tracking-wider font-semibold">
                  Direct Telephone
                </span>
                <a
                  href="tel:0987226440"
                  className="text-lg font-bold text-white hover:text-[#06B6D4] transition-colors"
                >
                  0987226440
                </a>
                <p className="text-blue-300 text-[11px] mt-0.5">
                  Available Mon–Sat: 8:00 AM – 7:00 PM (Ethiopian Local Time)
                </p>
              </div>
            </div>

            {/* Telegram */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="text-blue-200 block text-[11px] uppercase tracking-wider font-semibold">
                  Official Telegram Bot
                </span>
                <a
                  href="https://t.me/pro_tutorbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-[#06B6D4] underline hover:text-white transition-colors"
                >
                  @pro_tutorbot
                </a>
                <p className="text-blue-300 text-[11px] mt-0.5">
                  Instant inquiries, bot applications & tutor requests
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#06B6D4]" />
              </div>
              <div>
                <span className="text-blue-200 block text-[11px] uppercase tracking-wider font-semibold">
                  Headquarters & Coverage
                </span>
                <p className="text-white font-semibold">
                  Addis Ababa, Ethiopia
                </p>
                <p className="text-blue-300 text-[11px] mt-0.5">
                  In-Home Tutoring: All Addis Ababa Sub-Cities.
                  Online Tutoring: Hawassa, Adama, Bahir Dar, Mekelle, Bishoftu, Dire Dawa & Nationwide.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/15 flex gap-3">
            <a
              href="tel:0987226440"
              className="flex-1 py-2.5 rounded-xl bg-white text-[#0D3B66] font-bold text-xs text-center hover:bg-blue-50 transition-colors"
            >
              Call 0987226440
            </a>
            <a
              href="https://t.me/pro_tutorbot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-[#06B6D4] text-slate-950 font-bold text-xs text-center hover:bg-[#0891b2] transition-colors"
            >
              Telegram Bot
            </a>
          </div>
        </div>

        {/* Contact & Callback Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Message Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Pro Tutorial Service. Our customer support coordinator will call you back at <strong>{phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-4 px-6 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-xl hover:bg-[#1E3A8A]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Send a Message or Request a Callback
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  We reply within a few hours on business days.
                </p>
              </div>

              {/* Inquiry Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inquiry Purpose
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'general', label: 'General Inquiry' },
                    { id: 'parent_support', label: 'Parent Support' },
                    { id: 'tutor_support', label: 'Tutor Support' },
                    { id: 'callback', label: 'Request Callback' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`py-2 px-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                        category === cat.id
                          ? 'border-[#0D3B66] bg-[#0D3B66]/10 text-[#0D3B66] font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. W/ro Almaz Kebede"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (Ethiopia) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0911234567"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Message or Question *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help your student? Include student grade and city/sub-city if requesting a tutor..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-md transition-all"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
