import React from 'react';
import { TutorProfile } from '../types';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Star, MapPin, Clock, BookOpen, GraduationCap } from 'lucide-react';

interface TutorCardProps {
  tutor: TutorProfile;
}

export const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const { setSelectedTutorModal, setRequestModalOpen, setPrefilledRequestData } = useApp();

  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrefilledRequestData({
      subjects: tutor.subjects.slice(0, 2),
      proposedTutorId: tutor.id,
      city: tutor.cities[0] || 'Addis Ababa',
    });
    setRequestModalOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedTutorModal(tutor)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-[#2563EB]/40 p-5.5 hover-lift flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Header with Photo & Basic Info */}
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={tutor.avatar}
              alt={tutor.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-slate-100 bg-slate-100 shadow-xs"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            {tutor.verificationStatus === 'approved' && (
              <span
                className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm"
                title="Verified Tutor by Pro Tutorial Service"
              >
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] fill-[#16A34A] text-white" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-[#1F2937] truncate group-hover:text-[#2563EB] transition-colors">
                {tutor.fullName}
              </h3>
              {tutor.rating > 0 && (
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-[#F4B400] text-[#F4B400]" />
                  <span className="tabular-nums font-bold">{tutor.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({tutor.reviewCount})</span>
                </div>
              )}
            </div>

            {/* University & Degree */}
            <p className="text-xs font-semibold text-[#0D3B66] truncate mt-0.5">
              {tutor.academicStatus}
            </p>
            <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{tutor.university}</span>
            </p>
          </div>
        </div>

        {/* Subjects & Metadata (Constitution: Zero-Pill Discipline, text with separators) */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <BookOpen className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
            <span className="font-semibold text-slate-800">Subjects:</span>
            <span className="truncate font-medium">{tutor.subjects.join(', ')}</span>
          </div>

          {/* Location & Format */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate font-medium">{tutor.cities.join(', ')}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="capitalize text-slate-600 font-medium">
              {tutor.deliveryOptions.join(' & ').replace('_', '-')}
            </span>
          </div>

          {/* Bio snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1 font-normal">
            {tutor.bio}
          </p>
        </div>
      </div>

      {/* Footer Card Action */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium text-slate-400 block">Starting Service Fee</span>
          <span className="text-sm font-extrabold text-[#0D3B66] tabular-nums">
            {tutor.hourlyServiceFeeETB} ETB
            <span className="text-[11px] font-normal text-slate-500 ml-1">/session</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedTutorModal(tutor)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0D3B66] hover:bg-slate-50 rounded-xl transition-colors border border-slate-200 cursor-pointer"
          >
            View Profile
          </button>
          <button
            onClick={handleRequest}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#F25C54] hover:bg-[#e04a42] rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
};
