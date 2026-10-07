import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import {
  X,
  CheckCircle2,
  Send,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';

export const TutorRequestModal: React.FC = () => {
  const {
    requestModalOpen,
    setRequestModalOpen,
    prefilledRequestData,
    currentUser,
    createTutorRequest,
    pricingTiers,
  } = useApp();

  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('Grade 11 (Natural Science)');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [city, setCity] = useState('Addis Ababa');
  const [subCity, setSubCity] = useState('Bole');
  const [format, setFormat] = useState<'online' | 'in_home' | 'hybrid'>('in_home');
  const [schedule, setSchedule] = useState('3 days a week after 4:30 PM');
  const [requirements, setRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setParentName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      if (currentUser.city) setCity(currentUser.city);
      if (currentUser.subCity) setSubCity(currentUser.subCity);
    }
    if (prefilledRequestData) {
      if (prefilledRequestData.grade) setGrade(prefilledRequestData.grade);
      if (prefilledRequestData.subjects) setSelectedSubjects(prefilledRequestData.subjects);
      if (prefilledRequestData.city) setCity(prefilledRequestData.city);
      if (prefilledRequestData.subCity) setSubCity(prefilledRequestData.subCity);
      if (prefilledRequestData.learningFormat) setFormat(prefilledRequestData.learningFormat);
      if (prefilledRequestData.preferredSchedule) setSchedule(prefilledRequestData.preferredSchedule);
    }
  }, [currentUser, prefilledRequestData, requestModalOpen]);

  if (!requestModalOpen) return null;

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const getEstimatedFee = () => {
    if (grade.includes('KG') || grade.includes('Grade 1') || grade.includes('Grade 2') || grade.includes('Grade 3') || grade.includes('Grade 4')) {
      return 300;
    }
    if (grade.includes('Grade 5') || grade.includes('Grade 6') || grade.includes('Grade 7') || grade.includes('Grade 8')) {
      return 350;
    }
    return 400;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || selectedSubjects.length === 0) return;

    createTutorRequest({
      requesterId: currentUser?.id || 'guest-' + Date.now(),
      requesterName: parentName || studentName,
      requesterEmail: email || 'family@protutorial.et',
      requesterPhone: phone || '',
      studentName,
      grade,
      subjects: selectedSubjects,
      city,
      subCity: city === 'Addis Ababa' ? subCity : undefined,
      learningFormat: format,
      preferredSchedule: schedule,
      specialRequirements: requirements,
      proposedTutorId: prefilledRequestData?.proposedTutorId,
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setRequestModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Tutor Request Successfully Received!
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you for choosing Pro Tutorial Service. Our academic coordinator will review your requirements for <strong>{studentName}</strong> and connect you with a verified tutor matching your schedule.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-700">
              <p><strong>Grade:</strong> {grade}</p>
              <p><strong>Subjects:</strong> {selectedSubjects.join(', ')}</p>
              <p><strong>Location:</strong> {city} {city === 'Addis Ababa' ? `(${subCity})` : ''} · {format.replace('_', '-')}</p>
              <p><strong>Agency Starting Service Fee:</strong> {getEstimatedFee()} ETB</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl transition-colors"
              >
                Done
              </button>
              <a
                href="https://t.me/pro_tutorial21241"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-[#0D3B66] bg-cyan-50 hover:bg-cyan-100 rounded-xl transition-colors border border-cyan-200"
              >
                <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Channel (@pro_tutorial21241)</span>
              </a>
              <a
                href="https://t.me/pro_tutorial2124"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
              >
                <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Group (@pro_tutorial2124)</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-3xl">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Request a Dedicated Tutor
                </h2>
                <p className="text-xs text-slate-500">
                  Personalized 1-on-1 learning matching your location and curriculum
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 sm:p-8 space-y-5">
              {/* Fee Transparency Note */}
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200/80 flex items-start gap-3 text-xs text-[#0D3B66]">
                <Info className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold">Transparent Stated Service Fees:</span> KG–Grade 4: 300 ETB · Grades 5–8: 350 ETB · Grades 9–12: 400 ETB. (Any tutor session arrangements are confirmed transparently prior to starting).
                </div>
              </div>

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Kaleb Bekele"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Parent / Requester Name
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. W/ro Almaz Kebede"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="family@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              {/* Grade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Grade Level *
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                >
                  {ETHIOPIAN_LOCATIONS.grades.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subjects Needed * (Click to select)
                </label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ETHIOPIAN_LOCATIONS.subjects.map((sub) => {
                    const isSelected = selectedSubjects.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-[#0D3B66] text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location & Sub-city */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                  >
                    {ETHIOPIAN_LOCATIONS.cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {city === 'Addis Ababa' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sub-City (Addis Ababa)
                    </label>
                    <select
                      value={subCity}
                      onChange={(e) => setSubCity(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium bg-white"
                    >
                      {ETHIOPIAN_LOCATIONS.addisAbabaSubCities.map((sc) => (
                        <option key={sc} value={sc}>
                          {sc} Sub-City
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Specific Neighborhood
                    </label>
                    <input
                      type="text"
                      value={subCity}
                      onChange={(e) => setSubCity(e.target.value)}
                      placeholder="e.g. Kebele 04"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                )}
              </div>

              {/* Delivery Format */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tutoring Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'in_home', label: 'In-Home (Home Visits)' },
                    { id: 'online', label: 'Online Video Session' },
                    { id: 'hybrid', label: 'Flexible / Hybrid' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id as 'in_home' | 'online' | 'hybrid')}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center ${
                        format === f.id
                          ? 'border-[#0D3B66] bg-[#0D3B66]/10 text-[#0D3B66] font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred schedule & requirements */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Schedule & Days
                </label>
                <input
                  type="text"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder="e.g. Mon, Wed, Fri from 4:30 PM to 6:00 PM"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Learning Goals or Weaknesses
                </label>
                <textarea
                  rows={2}
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="e.g. Needs help with Grade 12 physics calculus derivations and national exam test strategy."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Stated Starting Fee</span>
                <span className="text-base font-extrabold text-[#0D3B66]">
                  {getEstimatedFee()} ETB / session
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={selectedSubjects.length === 0 || !studentName.trim()}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                  <span>Submit Request</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
