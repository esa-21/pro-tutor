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
    <footer className="bg-[#0D3B66] text-slate-300 border-t border-blue-900/80">
      {/* Top Banner inside Footer: Telegram Community callout */}
      <div className="bg-[#092947] border-b border-blue-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F4B400]/20 flex items-center justify-center text-[#F4B400]">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <p className="text-white font-bold text-sm sm:text-base">
                Join our Telegram Community &amp; Connect Directly
              </p>
              <p className="text-blue-200 text-xs">
                Channel: @pro_tutorial21241 · Group: @pro_tutorial2124 · Direct Contact: @pr_tutor12
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://t.me/pro_tutorial21241"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs shadow-md transition-colors"
            >
              <span>Channel @pro_tutorial21241</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://t.me/pro_tutorial2124"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              <span>Group @pro_tutorial2124</span>
            </a>
            <a
              href="https://t.me/pr_tutor12"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white font-bold text-xs border border-white/15 transition-colors"
            >
              <span>Contact @pr_tutor12</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F4B400] text-[#0D3B66] flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                PRO TUTORIAL SERVICE
              </span>
            </div>

            <p className="text-sm text-slate-200 font-medium italic">
              &quot;Your Success, Our Commitment.&quot;
            </p>
            <p className="text-xs text-[#F4B400] font-amharic">
              &quot;ለትምህርትዎ ስኬት፣ የእኛ ቁርጠኝነት!&quot;
            </p>

            <p className="text-xs text-blue-100/80 leading-relaxed pr-6">
              Ethiopia’s premier tutoring agency connecting families with vetted teachers and university graduates for personalized academic excellence from KG to Grade 12.
            </p>

            {/* Direct Contacts */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-blue-100">
                <Send className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Telegram Channel: <a href="https://t.me/pro_tutorial21241" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4B400] font-semibold underline">@pro_tutorial21241</a></span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Send className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Telegram Group: <a href="https://t.me/pro_tutorial2124" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4B400] font-semibold underline">@pro_tutorial2124</a></span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Send className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Direct Telegram Contact: <a href="https://t.me/pr_tutor12" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4B400] font-semibold underline">@pr_tutor12</a></span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <Send className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Application Bot: <a href="https://t.me/pro_tutorbot" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#F4B400] font-semibold underline">@pro_tutorbot</a></span>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>Addis Ababa, Ethiopia (Serving All Regional Cities)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform & Services
            </h4>
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <button onClick={() => setActiveRoute('find-tutor')} className="hover:text-white transition-colors cursor-pointer">
                  Find a Tutor
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('services')} className="hover:text-white transition-colors cursor-pointer">
                  All Services (KG – Grade 12)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing & Service Fees
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('testimonials')} className="hover:text-white transition-colors cursor-pointer">
                  Client Success Stories
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('become-tutor')} className="hover:text-white transition-colors text-[#F4B400] font-semibold cursor-pointer">
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
            <ul className="space-y-2 text-xs text-blue-100/80">
              <li>
                <button onClick={() => setActiveRoute('blog')} className="hover:text-white transition-colors cursor-pointer">
                  Educational Blog & Guides
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('learning-tips')} className="hover:text-white transition-colors cursor-pointer">
                  Student Learning Tips
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('faq')} className="hover:text-white transition-colors cursor-pointer">
                  FAQ & Support Assistant
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('careers')} className="hover:text-white transition-colors cursor-pointer">
                  Careers & Educator Recruitment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveRoute('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stay Informed
            </h4>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Subscribe to educational guides, national exam updates, and learning advice in Ethiopia.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-700/50 text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <span>Thank you! You are subscribed.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#092947] border border-blue-800 text-white placeholder-blue-300/60 focus:outline-none focus:border-[#F4B400]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-3 text-xs font-bold bg-[#F25C54] hover:bg-[#e04a42] text-white rounded-xl transition-colors cursor-pointer shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Coverage note */}
            <div className="pt-2">
              <span className="text-[11px] text-blue-200 block font-semibold">Service Coverage:</span>
              <p className="text-[11px] text-blue-200/70 mt-0.5">
                Addis Ababa, Adama, Hawassa, Bahir Dar, Mekelle, Bishoftu, Dire Dawa & regional cities.
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Bottom bar */}
        <div className="mt-12 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/70">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-blue-300" />
            <span>&copy; {new Date().getFullYear()} PRO TUTORIAL SERVICE. Addis Ababa, Ethiopia.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setActiveRoute('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={() => setActiveRoute('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={() => setActiveRoute('refund')} className="hover:text-white transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
