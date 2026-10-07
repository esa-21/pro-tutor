import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  CheckCircle2,
  Quote,
  Plus,
  X,
  Sparkles,
} from 'lucide-react';

export const TestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'parent' | 'student' | 'tutor'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState(currentUser?.name || '');
  const [role, setRole] = useState<'parent' | 'student' | 'tutor'>('parent');
  const [grade, setGrade] = useState('Grade 11');
  const [subject, setSubject] = useState('Physics');
  const [city, setCity] = useState(currentUser?.city || 'Addis Ababa (Bole)');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const filteredTestimonials = testimonials.filter((t) => {
    if (!t.published) return false;
    if (activeTab !== 'all' && t.role !== activeTab) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !quote.trim()) return;

    addTestimonial({
      authorName,
      role,
      grade,
      subject,
      city,
      quote,
      rating,
    });

    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setModalOpen(false);
      setQuote('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
            Success Stories & Reviews
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Real Experiences from Ethiopian Families & Students
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Read authentic feedback from parents, university entrance exam achievers, and educators.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-sm transition-colors self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Feedback</span>
        </button>
      </div>

      {/* Filter Tabs (Constitution: functional button segmented controls) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-md">
        {[
          { id: 'all', label: 'All Reviews' },
          { id: 'parent', label: 'Parents' },
          { id: 'student', label: 'Students' },
          { id: 'tutor', label: 'Educators' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'all' | 'parent' | 'student' | 'tutor')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-white text-[#0D3B66] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                {item.verified && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              {item.isSamplePlaceholder && (
                <span className="text-[10px] text-slate-400 font-medium italic block mb-2">
                  Sample placeholder testimonial for design illustration
                </span>
              )}

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                &quot;{item.quote}&quot;
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-slate-900">{item.authorName}</p>
                <p className="text-[11px] text-slate-500 capitalize">
                  {item.role} · {item.grade} {item.subject ? `(${item.subject})` : ''}
                </p>
                {item.city && (
                  <p className="text-[10px] text-slate-400">{item.city}</p>
                )}
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-base font-bold text-slate-900">
                Submit Client Review & Feedback
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedFeedback ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  Thank You for Your Feedback!
                </h4>
                <p className="text-xs text-slate-500">
                  Your review has been recorded and will appear on the site.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Ato Henok Mamo"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as 'parent' | 'student' | 'tutor')}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                    >
                      <option value="parent">Parent</option>
                      <option value="student">Student</option>
                      <option value="tutor">Tutor / Educator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center gap-1 pt-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus:outline-none cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Grade Level
                    </label>
                    <input
                      type="text"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="e.g. Grade 12"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Physics & Math"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Testimonial / Feedback *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Share how tutoring helped improve academic understanding and grades..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-[#0D3B66] hover:bg-[#1E3A8A] rounded-xl"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
