import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import { TutorCard } from '../components/TutorCard';
import {
  Search,
  Filter,
  CheckCircle2,
  Compass,
  ArrowUpDown,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const FindTutorPage: React.FC = () => {
  const { tutors, setInteractiveFinderOpen, setRequestModalOpen, t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'online' | 'in_home'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee_asc'>('rating');
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // Filter approved tutors
  const filteredTutors = tutors.filter((tutor) => {
    // Never show unapproved or pending tutor applications in public marketplace
    if (tutor.verificationStatus !== 'approved') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tutor.fullName.toLowerCase().includes(q);
      const matchUni = tutor.university.toLowerCase().includes(q);
      const matchBio = tutor.bio.toLowerCase().includes(q);
      const matchSubj = tutor.subjects.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchUni && !matchBio && !matchSubj) return false;
    }

    if (selectedSubject && !tutor.subjects.includes(selectedSubject)) {
      return false;
    }

    if (selectedGrade && !tutor.gradeLevels.some((g) => g.includes(selectedGrade))) {
      return false;
    }

    if (selectedCity && !tutor.cities.includes(selectedCity)) {
      // If student is looking in a specific city, allow online tutors if tutor supports online
      if (!tutor.deliveryOptions.includes('online')) return false;
    }

    if (selectedFormat !== 'all') {
      if (!tutor.deliveryOptions.includes(selectedFormat)) return false;
    }

    return true;
  });

  // Sort
  const sortedTutors = [...filteredTutors].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'fee_asc') return a.hourlyServiceFeeETB - b.hourlyServiceFeeETB;
    return 0;
  });

  const handleReset = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedCity('');
    setSelectedFormat('all');
    setSortBy('rating');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title & Discovery Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Tutor Marketplace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Find Qualified Tutors in Ethiopia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified educators from Addis Ababa University, AASTU, and recognized teachers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setInteractiveFinderOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs shadow-sm transition-colors"
          >
            <Compass className="w-4 h-4 text-slate-950" />
            <span>Interactive 5-Step Finder</span>
          </button>
          <button
            onClick={() => setRequestModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-sm transition-colors"
          >
            <span>Request a Custom Tutor</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tutor name, subject (Physics, Math, English...), university (AAU, AASTU...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0D3B66]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Subject */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="">All Subjects</option>
              {ETHIOPIAN_LOCATIONS.subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Grade */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Grade Level
            </label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="">All Grade Tiers</option>
              <option value="KG">KG – Grade 4</option>
              <option value="5–8">Grades 5–8</option>
              <option value="9–12">Grades 9–12 (High School / Prep)</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Location / City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="">All Cities in Ethiopia</option>
              {ETHIOPIAN_LOCATIONS.cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Delivery Format
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value as 'all' | 'online' | 'in_home')}
              className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800"
            >
              <option value="all">Any Format (Online & In-Home)</option>
              <option value="in_home">In-Home Only</option>
              <option value="online">Online Only</option>
            </select>
          </div>
        </div>

        {/* Bottom bar of filters: Sorting & Active filters */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'rating', label: 'Top Rated' },
                { id: 'experience', label: 'Experience' },
                { id: 'fee_asc', label: 'Fee: Low to High' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as 'rating' | 'experience' | 'fee_asc')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    sortBy === s.id
                      ? 'bg-[#0D3B66] text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>
          Showing <strong>{sortedTutors.length}</strong> verified tutors
        </span>
        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>All profiles vetted by Pro Tutorial Service</span>
        </span>
      </div>

      {/* Tutor Cards Grid */}
      {sortedTutors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-800">
              No Approved Tutors Match Your Specific Filter Criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Try adjusting your subject or city filter, or submit a custom tutor request. Our coordinators will match an educator for you.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setRequestModalOpen(true)}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-xl hover:bg-[#1E3A8A]"
            >
              Request a Tutor Directly
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};
