import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, Home, GraduationCap, ArrowRight, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { setActiveRoute } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-[#0D3B66] border border-blue-200/80 shadow-xs mb-2">
        <span className="text-3xl font-extrabold text-[#0D3B66]">404</span>
      </div>

      <div className="space-y-3 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
          The page you are looking for doesn’t exist, has been moved, or the URL was entered incorrectly.
        </p>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setActiveRoute('find-tutor')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D3B66] hover:bg-[#2563EB] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-[#F4B400]" />
          <span>Browse Qualified Tutors (/find-tutor)</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveRoute('home')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 transition-colors cursor-pointer"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Return to Homepage</span>
        </button>

        <button
          onClick={() => setActiveRoute('contact')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#0D3B66] font-bold text-xs border border-blue-200 transition-colors cursor-pointer"
        >
          <span>Contact Coordinators</span>
        </button>
      </div>

      <div className="pt-8 border-t border-slate-200/80 max-w-lg mx-auto">
        <p className="text-xs text-slate-500">
          Looking for tutoring in Addis Ababa or regional cities? Explore our{' '}
          <button
            onClick={() => setActiveRoute('services')}
            className="text-[#2563EB] font-semibold underline hover:text-[#0D3B66]"
          >
            educational programs
          </button>{' '}
          or view our{' '}
          <button
            onClick={() => setActiveRoute('pricing')}
            className="text-[#2563EB] font-semibold underline hover:text-[#0D3B66]"
          >
            transparent fees
          </button>
          .
        </p>
      </div>
    </div>
  );
};
