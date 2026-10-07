import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import { TutorCard } from './TutorCard';
import {
  X,
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
} from 'lucide-react';

export const InteractiveTutorFinder: React.FC = () => {
  const {
    interactiveFinderOpen,
    setInteractiveFinderOpen,
    tutors,
    setRequestModalOpen,
    setPrefilledRequestData,
  } = useApp();

  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState('Grade 11 (Natural Science)');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Physics', 'Mathematics']);
  const [selectedCity, setSelectedCity] = useState('Addis Ababa');
  const [selectedSubCity, setSelectedSubCity] = useState('Bole');
  const [selectedFormat, setSelectedFormat] = useState<'in_home' | 'online' | 'hybrid'>('in_home');
  const [preferredSchedule, setPreferredSchedule] = useState('3 days/week after 4:30 PM');

  if (!interactiveFinderOpen) return null;

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  // Filter approved tutors matching criteria
  const matchedTutors = tutors.filter((t) => {
    if (t.verificationStatus !== 'approved') return false;
    const matchesSubject =
      selectedSubjects.length === 0 ||
      selectedSubjects.some((s) => t.subjects.includes(s));
    const matchesCity = t.cities.includes(selectedCity);
    const matchesFormat =
      selectedFormat === 'hybrid' ||
      t.deliveryOptions.includes(selectedFormat as 'online' | 'in_home');
    return matchesSubject && (matchesCity || t.deliveryOptions.includes('online'));
  });

  const handleFinishAndRequest = () => {
    setPrefilledRequestData({
      grade: selectedGrade,
      subjects: selectedSubjects,
      city: selectedCity,
      subCity: selectedSubCity,
      learningFormat: selectedFormat,
      preferredSchedule,
    });
    setInteractiveFinderOpen(false);
    setRequestModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0D3B66] text-white flex items-center justify-center">
              <Compass className="w-5 h-5 text-[#06B6D4]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Interactive Tutor Finder
              </h2>
              <p className="text-xs text-slate-500">
                Step {step} of 5 · Personalized Academic Matching
              </p>
            </div>
          </div>

          <button
            onClick={() => setInteractiveFinderOpen(false)}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div
            className="bg-[#0D3B66] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="p-6 sm:p-8 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                What grade level is the student currently in?
              </h3>
              <p className="text-xs text-slate-500">
                We cater from Kindergarten through Grade 12 National University Entrance Exam candidates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {ETHIOPIAN_LOCATIONS.grades.map((grade) => (
                  <button
                    key={grade}
                    type="button"
                    onClick={() => setSelectedGrade(grade)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedGrade === grade
                        ? 'border-[#0D3B66] bg-[#0D3B66]/5 text-[#0D3B66] ring-1 ring-[#0D3B66]'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Which subjects does the student need assistance with?
              </h3>
              <p className="text-xs text-slate-500">
                Select one or more subjects. You can choose specific science streams, languages, or foundational subjects.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {ETHIOPIAN_LOCATIONS.subjects.map((sub) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#06B6D4] bg-[#06B6D4]/10 text-[#0D3B66] ring-1 ring-[#06B6D4]'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{sub}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#06B6D4] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Where is the student located in Ethiopia?
              </h3>
              <p className="text-xs text-slate-500">
                Our in-home tutors cover all sub-cities in Addis Ababa and major regional centers.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white"
                  >
                    {ETHIOPIAN_LOCATIONS.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedCity === 'Addis Ababa' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sub-City (Addis Ababa)
                    </label>
                    <select
                      value={selectedSubCity}
                      onChange={(e) => setSelectedSubCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white"
                    >
                      {ETHIOPIAN_LOCATIONS.addisAbabaSubCities.map((sc) => (
                        <option key={sc} value={sc}>
                          {sc} Sub-City
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Which delivery format suits your family best?
              </h3>
              <p className="text-xs text-slate-500">
                Choose between face-to-face in-home lessons or live interactive online sessions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  {
                    id: 'in_home',
                    title: 'In-Home Tutoring',
                    desc: 'A qualified tutor visits your residence for direct hands-on study.',
                  },
                  {
                    id: 'online',
                    title: 'Online Tutoring',
                    desc: 'Live interactive video sessions with digital whiteboard annotations.',
                  },
                  {
                    id: 'hybrid',
                    title: 'Flexible / Hybrid',
                    desc: 'Combination of in-home and online sessions based on schedule.',
                  },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => setSelectedFormat(fmt.id as 'in_home' | 'online' | 'hybrid')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedFormat === fmt.id
                        ? 'border-[#0D3B66] bg-[#0D3B66]/5 ring-1 ring-[#0D3B66]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-900 mb-1">{fmt.title}</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{fmt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Preferred Schedule & Matched Verified Tutors
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Here are top verified educators matching your requirements:
                </p>
              </div>

              {/* Schedule input */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Weekly Timing:
                </label>
                <input
                  type="text"
                  value={preferredSchedule}
                  onChange={(e) => setPreferredSchedule(e.target.value)}
                  placeholder="e.g. 3 sessions per week (Mon, Wed, Fri after 4:30 PM)"
                  className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>

              {/* Matched Tutors Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    {matchedTutors.length} Verified Tutors Found
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {selectedGrade} · {selectedSubjects.join(', ')}
                  </span>
                </div>

                {matchedTutors.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50">
                    <p className="text-xs font-semibold text-slate-700">
                      No direct automated matches in this immediate filter.
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Don’t worry! Submit your tutor request and our coordinator will custom-match an educator for you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                    {matchedTutors.map((tut) => (
                      <TutorCard key={tut.id} tutor={tut} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl shadow-md transition-all"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinishAndRequest}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-white bg-[#06B6D4] hover:bg-[#0891b2] text-slate-900 rounded-xl shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span className="text-slate-900">Submit Tutoring Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
