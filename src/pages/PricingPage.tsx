import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  HelpCircle,
  Calculator,
  ArrowRight,
  Shield,
  Info,
} from 'lucide-react';

export const PricingPage: React.FC = () => {
  const { pricingTiers, setRequestModalOpen, setPrefilledRequestData } = useApp();

  // Interactive Fee Calculator State
  const [calcGrade, setCalcGrade] = useState<'KG-4' | '5-8' | '9-12'>('5-8');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3);
  const [weeksCount, setWeeksCount] = useState(4); // 1 month

  const getRate = () => {
    if (calcGrade === 'KG-4') {
      return pricingTiers.find((t) => t.id === 'tier-kg-4')?.serviceFeeETB || 300;
    }
    if (calcGrade === '5-8') {
      return pricingTiers.find((t) => t.id === 'tier-5-8')?.serviceFeeETB || 350;
    }
    return pricingTiers.find((t) => t.id === 'tier-9-12')?.serviceFeeETB || 400;
  };

  const calculatedTotal = getRate() * sessionsPerWeek * weeksCount;

  const handleSelectTier = (tierGrade: string) => {
    setPrefilledRequestData({
      grade: tierGrade,
    });
    setRequestModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Page Title */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
          Transparent Tutoring Fees
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Clear, Competitive Educational Service Fees
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          We pride ourselves on transparent, predictable service fees for families in Addis Ababa and all regional cities in Ethiopia.
        </p>
      </div>

      {/* Official Fee Structure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl p-8 bg-white border flex flex-col justify-between hover-lift transition-all ${
              tier.isPopular
                ? 'border-[#2563EB] ring-2 ring-[#2563EB]/25 shadow-2xl relative md:-translate-y-2'
                : 'border-slate-200/90 shadow-sm'
            }`}
          >
            {tier.isPopular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F4B400] text-[#0D3B66] text-[11px] font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md">
                Recommended / Most Popular
              </span>
            )}

            <div>
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
                  {tier.recommendedFor}
                </span>
                <h3 className="text-xl font-extrabold text-[#1F2937] mt-1">
                  {tier.gradeLevel}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-[#0D3B66] tabular-nums">
                    {tier.serviceFeeETB}
                  </span>
                  <span className="text-sm font-bold text-slate-800">ETB</span>
                  <span className="text-xs text-slate-500 font-normal">
                    / starting session fee
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {tier.billingPeriod}
                </p>
              </div>

              {/* Features */}
              <div className="py-6 space-y-3">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Included in this Program:
                </p>
                <ul className="space-y-3 text-xs text-slate-600">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] fill-[#16A34A]/10 shrink-0 mt-0.5" />
                      <span className="font-medium text-[#1F2937]">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => handleSelectTier(tier.gradeLevel)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                  tier.isPopular
                    ? 'bg-[#F25C54] hover:bg-[#e04a42] text-white shadow-[#F25C54]/25 hover:scale-[1.02]'
                    : 'bg-[#0D3B66] hover:bg-[#2563EB] text-white shadow-[#0D3B66]/15'
                }`}
              >
                <span>Request Tutoring for {tier.gradeLevel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transparent Disclaimer Box */}
      <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-4 text-xs text-[#0D3B66]">
        <Info className="w-5 h-5 text-[#06B6D4] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-sm">Transparent Service Fee Policy</p>
          <p className="leading-relaxed text-slate-700">
            The starting service fees above (300 ETB for KG–Grade 4, 350 ETB for Grades 5–8, and 400 ETB for Grades 9–12) represent our stated agency tutoring service rates. Any separate tutor session packages, travel arrangements for specialized in-home locations, or intensive weekend schedules are agreed upon with family consent prior to commencing lessons. No hidden fees or automatic billing.
          </p>
        </div>
      </div>

      {/* Interactive Fee Estimator Calculator */}
      <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3B66]/10 text-[#0D3B66] flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#0D3B66]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Interactive Tutoring Investment Estimator
              </h2>
              <p className="text-xs text-slate-500">
                Plan your weekly or monthly tutoring sessions in Ethiopian Birr (ETB).
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg self-start md:self-auto">
            Estimator (ETB)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Grade selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              1. Select Grade Level Tier
            </label>
            <div className="space-y-2">
              {[
                { id: 'KG-4', label: 'KG – Grade 4 (300 ETB / session)' },
                { id: '5-8', label: 'Grades 5 – 8 (350 ETB / session)' },
                { id: '9-12', label: 'Grades 9 – 12 (400 ETB / session)' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setCalcGrade(g.id as 'KG-4' | '5-8' | '9-12')}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    calcGrade === g.id
                      ? 'border-[#0D3B66] bg-[#0D3B66]/10 text-[#0D3B66] font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sessions per week slider */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>2. Sessions per Week</span>
                <span className="text-[#0D3B66] tabular-nums font-extrabold">{sessionsPerWeek} sessions</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={sessionsPerWeek}
                onChange={(e) => setSessionsPerWeek(Number(e.target.value))}
                className="w-full accent-[#0D3B66] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>1 day</span>
                <span>3 days (Recommended)</span>
                <span>6 days</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>3. Duration in Weeks</span>
                <span className="text-[#0D3B66] tabular-nums font-extrabold">{weeksCount} weeks ({weeksCount / 4} month)</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="2"
                value={weeksCount}
                onChange={(e) => setWeeksCount(Number(e.target.value))}
                className="w-full accent-[#0D3B66] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>2 weeks</span>
                <span>4 weeks (1 mo)</span>
                <span>12 weeks (Quarter)</span>
              </div>
            </div>
          </div>

          {/* Estimated Total Display */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between text-center">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Estimated Total Investment
              </span>
              <p className="text-3xl font-extrabold text-[#0D3B66] tabular-nums mt-3">
                {calculatedTotal.toLocaleString()} ETB
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                for {sessionsPerWeek * weeksCount} total sessions ({getRate()} ETB/session)
              </p>
            </div>

            <button
              onClick={() => {
                setPrefilledRequestData({
                  grade: calcGrade === 'KG-4' ? 'KG – Grade 4' : calcGrade === '5-8' ? 'Grades 5 – 8' : 'Grades 9 – 12',
                  preferredSchedule: `${sessionsPerWeek} sessions/week for ${weeksCount} weeks`,
                });
                setRequestModalOpen(true);
              }}
              className="mt-4 w-full py-3 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs transition-colors shadow-md shadow-[#F25C54]/20 cursor-pointer"
            >
              Request This Plan
            </button>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#0D3B66]" />
          <span>Frequently Asked Pricing Questions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              How are payments handled in Ethiopia?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              We facilitate transparent payment through Ethiopian banking transfer channels (Commercial Bank of Ethiopia, Telebirr, Awash Bank). Fees are agreed upon in advance with zero hidden recurring debits.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              Can I change or reschedule sessions?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Yes. With at least 24 hours prior notice to your assigned tutor or academic coordinator, sessions can be rescheduled at no extra charge.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              Is there a discount for multiple children?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Families enrolling more than one child or scheduling 4+ weekly sessions can request custom family package terms through our academic coordinator.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">
              What if the tutor is not a good fit?
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Your child’s comfort and confidence are our utmost priority. If the assigned tutor does not match your student’s learning style, our coordinator will provide a replacement educator without penalty.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
