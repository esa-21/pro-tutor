import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import { TutorCard } from '../components/TutorCard';
import {
  Search,
  CheckCircle2,
  Compass,
  RefreshCw,
  GraduationCap,
  BookOpen,
  SlidersHorizontal,
  MapPin,
  X,
  Sparkles,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface EducationalLevelTier {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  subDescription: string;
}

const EDUCATIONAL_LEVELS: EducationalLevelTier[] = [
  {
    id: 'all',
    name: 'All Educational Levels',
    shortLabel: 'All Levels',
    description: 'Kindergarten through Grade 12',
    subDescription: 'Complete Ethiopian curriculum',
  },
  {
    id: 'kg_primary',
    name: 'KG – Grade 4',
    shortLabel: 'KG – Grade 4',
    description: 'Early Childhood & Lower Primary',
    subDescription: 'Phonics, reading, Amharic & foundational math',
  },
  {
    id: 'middle_school',
    name: 'Grades 5–8',
    shortLabel: 'Grades 5–8',
    description: 'Middle School (Junior)',
    subDescription: 'General science, math & Grade 8 Ministry Exam',
  },
  {
    id: 'high_school',
    name: 'Grades 9–10',
    shortLabel: 'Grades 9–10',
    description: 'General Secondary School',
    subDescription: 'High school core sciences, algebra & geometry',
  },
  {
    id: 'preparatory',
    name: 'Grades 11–12',
    shortLabel: 'Grades 11–12',
    description: 'Preparatory & University Entrance',
    subDescription: 'Natural & Social science streams, ESLCE Exam prep',
  },
];

type SubjectCategory = 'all' | 'stem' | 'languages' | 'social';

const SUBJECT_CATEGORIES: { id: SubjectCategory; label: string }[] = [
  { id: 'all', label: 'All Subjects' },
  { id: 'stem', label: 'STEM & Natural Sciences' },
  { id: 'languages', label: 'Languages' },
  { id: 'social', label: 'Social Sciences & Commerce' },
];

const POPULAR_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Amharic',
  'Economics',
  'General Science',
  'Computer Science / ICT',
  'History',
  'Geography',
  'Accounting',
];

const STEM_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'General Science',
  'Computer Science / ICT',
];

const LANGUAGE_SUBJECTS = ['English', 'Amharic', 'French'];

const SOCIAL_SUBJECTS = [
  'Economics',
  'Accounting',
  'Business',
  'History',
  'Geography',
  'Civics',
];

export const FindTutorPage: React.FC = () => {
  const { tutors, setInteractiveFinderOpen, setRequestModalOpen, setPrefilledRequestData } =
    useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [subjectCategory, setSubjectCategory] = useState<SubjectCategory>('all');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'online' | 'in_home'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee_asc' | 'fee_desc'>('rating');
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);

  // Helper function to check if tutor's grade levels match target level
  const matchesLevel = (tutorLevels: string[], targetLevel: string): boolean => {
    if (!targetLevel || targetLevel === 'all') return true;

    if (targetLevel === 'kg_primary') {
      return tutorLevels.some(
        (l) =>
          l.toLowerCase().includes('kg') ||
          l.toLowerCase().includes('primary') ||
          l.includes('Grade 4') ||
          l.includes('Grade 1') ||
          l.includes('Grade 2') ||
          l.includes('Grade 3')
      );
    }
    if (targetLevel === 'middle_school') {
      return tutorLevels.some(
        (l) =>
          l.includes('5–8') ||
          l.includes('5-8') ||
          l.toLowerCase().includes('middle') ||
          l.includes('Grade 8')
      );
    }
    if (targetLevel === 'high_school') {
      return tutorLevels.some(
        (l) =>
          l.includes('9–12') ||
          l.includes('9-12') ||
          l.includes('9–10') ||
          l.includes('9-10') ||
          l.toLowerCase().includes('high school') ||
          l.toLowerCase().includes('secondary')
      );
    }
    if (targetLevel === 'preparatory') {
      return tutorLevels.some(
        (l) =>
          l.includes('9–12') ||
          l.includes('9-12') ||
          l.includes('11–12') ||
          l.includes('11-12') ||
          l.toLowerCase().includes('prep') ||
          l.toLowerCase().includes('entrance') ||
          l.includes('Grade 12') ||
          l.includes('Grade 11')
      );
    }

    return tutorLevels.some((l) => l.toLowerCase().includes(targetLevel.toLowerCase()));
  };

  // Helper function to match subjects
  const matchesSubject = (tutorSubjects: string[], targetSubject: string): boolean => {
    if (!targetSubject || targetSubject === 'all') return true;
    const target = targetSubject.toLowerCase().trim();
    return tutorSubjects.some((s) => {
      const sLower = s.toLowerCase().trim();
      if (sLower === target) return true;
      if (
        target === 'computer science / ict' &&
        (sLower.includes('computer') || sLower.includes('ict') || sLower.includes('programming'))
      )
        return true;
      if (
        target === 'general science' &&
        (sLower.includes('general science') || sLower.includes('science'))
      )
        return true;
      if (target === 'history' && sLower.includes('history')) return true;
      if (target === 'geography' && sLower.includes('geography')) return true;
      return sLower.includes(target) || target.includes(sLower);
    });
  };

  // Approved tutors pool
  const approvedTutors = useMemo(
    () => tutors.filter((t) => t.verificationStatus === 'approved'),
    [tutors]
  );

  // Compute tutor counts for each level
  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    EDUCATIONAL_LEVELS.forEach((tier) => {
      counts[tier.id] = approvedTutors.filter((tutor) =>
        matchesLevel(tutor.gradeLevels, tier.id)
      ).length;
    });
    return counts;
  }, [approvedTutors]);

  // Compute tutor counts for popular subjects
  const subjectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    POPULAR_SUBJECTS.forEach((subj) => {
      counts[subj] = approvedTutors.filter((tutor) =>
        matchesSubject(tutor.subjects, subj)
      ).length;
    });
    return counts;
  }, [approvedTutors]);

  // Filter approved tutors
  const filteredTutors = useMemo(() => {
    return approvedTutors.filter((tutor) => {
      // 1. Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = tutor.fullName.toLowerCase().includes(q);
        const matchUni = tutor.university.toLowerCase().includes(q);
        const matchDept = tutor.department.toLowerCase().includes(q);
        const matchBio = tutor.bio.toLowerCase().includes(q);
        const matchSubj = tutor.subjects.some((s) => s.toLowerCase().includes(q));
        const matchCities = tutor.cities.some((c) => c.toLowerCase().includes(q));
        if (!matchName && !matchUni && !matchDept && !matchBio && !matchSubj && !matchCities) {
          return false;
        }
      }

      // 2. Subject Filter
      if (selectedSubject && !matchesSubject(tutor.subjects, selectedSubject)) {
        return false;
      }

      // 3. Level Filter
      if (selectedLevel && !matchesLevel(tutor.gradeLevels, selectedLevel)) {
        return false;
      }

      // 4. City Filter
      if (selectedCity && !tutor.cities.includes(selectedCity)) {
        // If searching a specific city, allow online tutors if tutor supports online
        if (!tutor.deliveryOptions.includes('online')) return false;
      }

      // 5. Delivery Format Filter
      if (selectedFormat !== 'all') {
        if (!tutor.deliveryOptions.includes(selectedFormat)) return false;
      }

      return true;
    });
  }, [approvedTutors, searchQuery, selectedSubject, selectedLevel, selectedCity, selectedFormat]);

  // Sort filtered tutors
  const sortedTutors = useMemo(() => {
    return [...filteredTutors].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      if (sortBy === 'fee_asc') return a.hourlyServiceFeeETB - b.hourlyServiceFeeETB;
      if (sortBy === 'fee_desc') return b.hourlyServiceFeeETB - a.hourlyServiceFeeETB;
      return 0;
    });
  }, [filteredTutors, sortBy]);

  // Get active level object
  const activeLevelObj = useMemo(
    () => EDUCATIONAL_LEVELS.find((l) => l.id === selectedLevel),
    [selectedLevel]
  );

  // Filter displayed subjects by category
  const displayedSubjects = useMemo(() => {
    if (subjectCategory === 'stem') return STEM_SUBJECTS;
    if (subjectCategory === 'languages') return LANGUAGE_SUBJECTS;
    if (subjectCategory === 'social') return SOCIAL_SUBJECTS;
    return POPULAR_SUBJECTS;
  }, [subjectCategory]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedLevel('all');
    setSubjectCategory('all');
    setSelectedCity('');
    setSelectedFormat('all');
    setSortBy('rating');
  };

  const handleRequestForCurrentFilters = () => {
    setPrefilledRequestData({
      subjects: selectedSubject ? [selectedSubject] : ['Mathematics'],
      city: selectedCity || 'Addis Ababa',
    });
    setRequestModalOpen(true);
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(selectedSubject) ||
    selectedLevel !== 'all' ||
    Boolean(selectedCity) ||
    selectedFormat !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Tutor Marketplace
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">KG to Grade 12</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight mt-1">
            Find a Home Tutor Near Me | Private Tutors in Addis Ababa &amp; Ethiopia
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Browse vetted private tutors for in-home tutoring across Addis Ababa neighborhoods (Bole, CMC, Sarbet, Kazanchis, Lebu, Ayat, Megenagna, Piassa, Bethel) and online tutoring across Ethiopia for KG to Grade 12.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setInteractiveFinderOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 text-[#0D3B66] border border-blue-200 hover:bg-blue-100 font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#2563EB]" />
            <span>5-Step Matcher</span>
          </button>
          <button
            onClick={() => {
              setPrefilledRequestData({
                subjects: selectedSubject ? [selectedSubject] : ['Mathematics'],
                city: selectedCity || 'Addis Ababa',
              });
              setRequestModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs shadow-md shadow-[#F25C54]/20 transition-colors cursor-pointer"
          >
            <span>Request a Custom Tutor</span>
          </button>
        </div>
      </div>

      {/* Main Filter Section */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tutor name, subject (Physics, Calculus, English...), university (AAU, AASTU...), or keyword"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0D3B66] focus:ring-2 focus:ring-[#0D3B66]/10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 1. FILTER BY LEVEL (Ethiopian Curriculum Tiers) */}
        <div className="p-4 sm:p-5 bg-slate-50/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#0D3B66]" />
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Filter by Level
              </h2>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-[11px] text-slate-500">
                Ethiopian School Curriculum Tiers
              </span>
            </div>

            {selectedLevel !== 'all' && (
              <button
                onClick={() => setSelectedLevel('all')}
                className="text-[11px] font-semibold text-[#2563EB] hover:text-[#0D3B66] self-start sm:self-auto flex items-center gap-1 cursor-pointer"
              >
                <span>Reset to All Levels</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Level Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {EDUCATIONAL_LEVELS.map((tier) => {
              const isSelected = selectedLevel === tier.id;
              const count = levelCounts[tier.id] ?? 0;

              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedLevel(isSelected && tier.id !== 'all' ? 'all' : tier.id)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0D3B66] text-white border-[#0D3B66] shadow-sm shadow-[#0D3B66]/20'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-[#0D3B66]/40 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`text-xs font-bold leading-tight ${
                          isSelected ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {tier.shortLabel}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold tabular-nums ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </div>

                    <p
                      className={`text-[11px] font-medium leading-tight ${
                        isSelected ? 'text-blue-100' : 'text-slate-600'
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>

                  <p
                    className={`text-[10px] line-clamp-1 mt-2 pt-1 border-t ${
                      isSelected
                        ? 'border-white/20 text-blue-200'
                        : 'border-slate-100 text-slate-400'
                    }`}
                  >
                    {tier.subDescription}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. FILTER BY SUBJECT */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2563EB]" />
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                Filter by Subject
              </h2>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-[11px] text-slate-500">
                Select a specialized subject to match qualified Ethiopian educators
              </span>
            </div>

            {selectedSubject && (
              <button
                onClick={() => setSelectedSubject('')}
                className="text-[11px] font-semibold text-[#2563EB] hover:text-[#0D3B66] self-start sm:self-auto flex items-center gap-1 cursor-pointer"
              >
                <span>Reset to All Subjects</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Subject Category Segments */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            {SUBJECT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSubjectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  subjectCategory === cat.id
                    ? 'bg-blue-50 text-[#0D3B66] border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Popular Subject Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <button
              onClick={() => setSelectedSubject('')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                !selectedSubject
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              <span>All Subjects</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded font-bold tabular-nums ${
                  !selectedSubject ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {approvedTutors.length}
              </span>
            </button>

            {displayedSubjects.map((sub) => {
              const isSelected = selectedSubject.toLowerCase() === sub.toLowerCase();
              const count = subjectCounts[sub] ?? 0;

              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(isSelected ? '' : sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  <span>{sub}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold tabular-nums ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Full Subject Dropdown Option */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium shrink-0">
              Need another subject from national curriculum?
            </span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="p-1.5 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs max-w-xs focus:outline-none focus:border-[#0D3B66]"
            >
              <option value="">Choose any subject...</option>
              {ETHIOPIAN_LOCATIONS.subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. ADDITIONAL FILTERS TOOLBAR: Location, Format, Sort */}
        <div className="p-4 sm:p-5 bg-slate-50/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {/* City filter */}
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 font-medium">City:</span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="p-1.5 px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs focus:outline-none focus:border-[#0D3B66]"
                >
                  <option value="">All Ethiopia</option>
                  {ETHIOPIAN_LOCATIONS.cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Format filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium">Format:</span>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as 'all' | 'online' | 'in_home')}
                  className="p-1.5 px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs focus:outline-none focus:border-[#0D3B66]"
                >
                  <option value="all">In-Home & Online</option>
                  <option value="in_home">In-Home Only</option>
                  <option value="online">Online Only</option>
                </select>
              </div>

              {/* Sort by */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as 'rating' | 'experience' | 'fee_asc' | 'fee_desc')
                  }
                  className="p-1.5 px-2.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-800 text-xs focus:outline-none focus:border-[#0D3B66]"
                >
                  <option value="rating">Top Rated</option>
                  <option value="experience">Most Experience</option>
                  <option value="fee_asc">Fee: Low to High</option>
                  <option value="fee_desc">Fee: High to Low</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* 4. ACTIVE APPLIED FILTERS SUMMARY BAR */}
        {hasActiveFilters && (
          <div className="px-4 py-3 bg-blue-50/50 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-semibold">Active Filters:</span>

              {selectedSubject && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-blue-200 text-[#0D3B66] font-medium shadow-2xs">
                  <span>Subject: <strong>{selectedSubject}</strong></span>
                  <button
                    onClick={() => setSelectedSubject('')}
                    className="hover:text-red-500 p-0.5"
                    aria-label="Remove subject filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedLevel !== 'all' && activeLevelObj && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-blue-200 text-[#0D3B66] font-medium shadow-2xs">
                  <span>Level: <strong>{activeLevelObj.shortLabel}</strong></span>
                  <button
                    onClick={() => setSelectedLevel('all')}
                    className="hover:text-red-500 p-0.5"
                    aria-label="Remove level filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCity && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                  <span>City: <strong>{selectedCity}</strong></span>
                  <button
                    onClick={() => setSelectedCity('')}
                    className="hover:text-red-500 p-0.5"
                    aria-label="Remove city filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedFormat !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                  <span>
                    Format:{' '}
                    <strong>{selectedFormat === 'in_home' ? 'In-Home' : 'Online'}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedFormat('all')}
                    className="hover:text-red-500 p-0.5"
                    aria-label="Remove format filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                  <span>Search: "{searchQuery}"</span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-red-500 p-0.5"
                    aria-label="Remove search query"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="text-[#2563EB] hover:underline font-semibold text-[11px]"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="text-slate-900">{sortedTutors.length}</strong> qualified educator{sortedTutors.length === 1 ? '' : 's'}
            {selectedSubject && (
              <>
                {' '}for <span className="font-semibold text-[#0D3B66]">{selectedSubject}</span>
              </>
            )}
            {selectedLevel !== 'all' && activeLevelObj && (
              <>
                {' '}in <span className="font-semibold text-[#0D3B66]">{activeLevelObj.name}</span>
              </>
            )}
            {selectedCity && (
              <>
                {' '}in <span className="font-semibold text-slate-800">{selectedCity}</span>
              </>
            )}
          </span>
        </div>

        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>All profiles vetted by Pro Tutorial Service</span>
        </span>
      </div>

      {/* Tutor Cards Grid or Empty State */}
      {sortedTutors.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-dashed border-slate-300 space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0D3B66] flex items-center justify-center mx-auto shadow-xs">
            <Search className="w-7 h-7 text-[#2563EB]" />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              No Approved Tutors Match This Combination
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              We couldn't find educators specifically teaching{' '}
              {selectedSubject && <strong className="text-slate-700">{selectedSubject}</strong>}
              {selectedSubject && selectedLevel !== 'all' && ' for '}
              {selectedLevel !== 'all' && activeLevelObj && (
                <strong className="text-slate-700">{activeLevelObj.shortLabel}</strong>
              )}
              {selectedCity && (
                <>
                  {' '}in <strong className="text-slate-700">{selectedCity}</strong>
                </>
              )}
              . Try broadening your level or subject selection, or submit a custom request.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            {selectedLevel !== 'all' && (
              <button
                onClick={() => setSelectedLevel('all')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Clear Level Filter
              </button>
            )}

            {selectedSubject && (
              <button
                onClick={() => setSelectedSubject('')}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 cursor-pointer"
              >
                Clear Subject Filter
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200 cursor-pointer"
            >
              Reset All Filters
            </button>

            <button
              onClick={handleRequestForCurrentFilters}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0D3B66] rounded-xl hover:bg-[#1E3A8A] cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Request a Custom Tutor for this Subject</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              selectedSubject={selectedSubject}
              selectedLevel={selectedLevel}
            />
          ))}
        </div>
      )}

      {/* Bottom Assistance Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-[#0D3B66] to-slate-900 p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
            Personalized Tutor Placement
          </span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight">
            Can't find the exact educator or schedule you need?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Our placement coordinators match certified teachers tailored to your child's specific school curriculum, grade tier, and home location within 24 hours.
          </p>
        </div>

        <button
          onClick={() => {
            setPrefilledRequestData({
              subjects: selectedSubject ? [selectedSubject] : ['Mathematics'],
              city: selectedCity || 'Addis Ababa',
            });
            setRequestModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F25C54] hover:bg-[#e04a42] text-white font-bold text-xs shadow-md shrink-0 transition-colors cursor-pointer"
        >
          <span>Request Custom Tutor Matching</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
