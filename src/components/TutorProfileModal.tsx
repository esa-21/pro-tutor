import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const TutorProfileModal: React.FC = () => {
  const {
    selectedTutorModal,
    setSelectedTutorModal,
    setRequestModalOpen,
    setPrefilledRequestData,
  } = useApp();

  if (!selectedTutorModal) return null;
  const tutor = selectedTutorModal;

  const handleBook = () => {
    setPrefilledRequestData({
      subjects: tutor.subjects.slice(0, 2),
      proposedTutorId: tutor.id,
      city: tutor.cities[0] || 'Addis Ababa',
    });
    setSelectedTutorModal(null);
    setRequestModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-[#0D3B66] to-[#0F2A4A] text-white rounded-t-3xl">
          <button
            onClick={() => setSelectedTutorModal(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative">
              <img
                src={tutor.avatar}
                alt={tutor.fullName}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border-2 border-white/20 bg-slate-800 shadow-md"
              />
              {tutor.verificationStatus === 'approved' && (
                <span className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow">
                  <CheckCircle2 className="w-5 h-5 text-[#06B6D4] fill-[#06B6D4] text-white" />
                </span>
              )}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {tutor.fullName}
                </h2>
                {tutor.verificationStatus === 'approved' && (
                  <span className="text-xs font-semibold text-[#06B6D4] bg-[#06B6D4]/15 px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
                    Verified Educator
                  </span>
                )}
              </div>

              <p className="text-sm text-blue-200 font-medium mt-1">
                {tutor.academicStatus} · {tutor.department}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-300">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-4 h-4 text-[#06B6D4]" />
                  <span>{tutor.university}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{tutor.experienceYears} Years Experience</span>
                </span>
                {tutor.rating > 0 && (
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{tutor.rating.toFixed(1)} ({tutor.reviewCount} reviews)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Biography */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Professional Biography
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">{tutor.bio}</p>
          </div>

          {/* Teaching Methodology */}
          {tutor.teachingMethodology && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0D3B66] mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                <span>Teaching Methodology</span>
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                {tutor.teachingMethodology}
              </p>
            </div>
          )}

          {/* Subjects & Grade Levels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <BookOpen className="w-4 h-4 text-[#0D3B66]" />
                <span>Specialized Subjects</span>
              </h4>
              <div className="text-xs text-slate-700 space-y-1">
                {tutor.subjects.map((sub) => (
                  <div key={sub} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></span>
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4 text-[#0D3B66]" />
                <span>Eligible Grade Levels</span>
              </h4>
              <div className="text-xs text-slate-700 space-y-1">
                {tutor.gradeLevels.map((lvl) => (
                  <div key={lvl} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D3B66]"></span>
                    <span>{lvl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability & Location */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0D3B66]" />
              <span>Location & Delivery Options</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              <div>
                <span className="font-semibold text-slate-900 block">Service Locations:</span>
                <span>{tutor.cities.join(', ')} {tutor.subCities?.length ? `(${tutor.subCities.join(', ')})` : ''}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Delivery Format:</span>
                <span className="capitalize">{tutor.deliveryOptions.join(' and ').replace('_', '-')}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <span className="font-semibold text-xs text-slate-900 block mb-1">
                Weekly Schedule Availability:
              </span>
              <div className="flex flex-wrap gap-2">
                {tutor.weeklyAvailability.map((slot) => (
                  <span
                    key={slot}
                    className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy statement: No private phone/email shown */}
          <p className="text-[11px] text-slate-500 italic text-center">
            * Direct tutor contact and initial phone consultation are facilitated by Pro Tutorial Service upon request confirmation.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-500 block">Stated Starting Service Fee</span>
            <span className="text-lg font-extrabold text-[#0D3B66] tabular-nums">
              {tutor.hourlyServiceFeeETB} ETB
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setSelectedTutorModal(null)}
              className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleBook}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl shadow-md transition-all"
            >
              <span>Request Tutoring with {tutor.fullName.split(' ')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
