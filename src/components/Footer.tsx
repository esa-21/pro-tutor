import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Phone,
  Send,
  MapPin,
  CheckCircle2,
  Mail,
  Shield,
  ArrowRight,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveRoute, t } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800">
      {/* Top Banner inside Footer: Telegram Bot callout */}
      <div className="bg-[#0D3B66] border-b border-blue-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">
                Prefer applying or requesting via Telegram?
              </p>
              <p className="text-blue-200 text-xs">
                Connect directly with our automated application and inquiry bot.
              </p>
            </div>
          </div>
          <a
            href="https://t.me/pro_tutorbot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#06B6D4] hover:bg-[#0891b2] text-[#0F172A] font-bold text-xs shadow-md transition-colors"
          >
            <span>Open @pro_tutorbot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#06B6D4] text-[#0D3B66] flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                PRO TUTORIAL SERVICE
              </span>
            </div>

            <p className="text-sm text-slate-300 font-medium italic">
              &quot;Your Success, Our Commitment.&quot;
            </p>
            <p className="text-xs text-amber-400 font-amharic">
              &quot;ለትምህርትዎ ስኬት፣ የእኛ ቁርጠኝነት!&quot;
            </p>

            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              Ethiopia’s premier tutoring agency connecting families with vetted teachers and university graduates for personalized academic excellence from KG to Grade 12.
            </p>

            {/* Direct Contacts */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Direct Call / Support: <strong className="text-white">0987226440</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Send className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Telegram Bot: <strong className="text-white">@pro_tutorbot</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-[#06B6D4] shrink-0" />
                <span>Addis Ababa, Ethiopia (Serving All Regional Cities)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveRoute('find-tutor')} className="hover:text-white transition-colors">
                  Find a Tutor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('services')} className="hover:text-white transition-colors">
                  All Services (KG – Grade 12)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('pricing')} className="hover:text-white transition-colors">
                  Pricing & Service Fees
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('testimonials')} className="hover:text-white transition-colors">
                  Client Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('become-tutor')} className="hover:text-white transition-colors text-[#06B6D4]">
                  Become a Tutor
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Resources & Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveRoute('blog')} className="hover:text-white transition-colors">
                  Educational Blog & Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('learning-tips')} className="hover:text-white transition-colors">
                  Student Learning Tips
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('faq')} className="hover:text-white transition-colors">
                  FAQ & Support Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('careers')} className="hover:text-white transition-colors">
                  Careers & Educator Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('help')} className="hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay Informed
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to educational guides, national exam updates, and learning advice in Ethiopia.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 text-xs font-bold bg-[#0D3B66] hover:bg-[#1E3A8A] text-white rounded-lg transition-colors border border-blue-600/40"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Coverage note */}
            <div className="pt-2">
              <span className="text-[11px] text-slate-400 block font-semibold">Service Coverage:</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Addis Ababa, Adama, Hawassa, Bahir Dar, Mekelle, Bishoftu, Dire Dawa & regional cities.
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>&copy; {new Date().getFullYear()} PRO TUTORIAL SERVICE. Addis Ababa, Ethiopia.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setActiveRoute('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => setActiveRoute('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => setActiveRoute('refund')} className="hover:text-white transition-colors">
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
