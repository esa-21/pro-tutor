import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  AlertCircle,
  BookOpen,
  Edit3,
  Star,
  DollarSign,
  UserCheck,
} from 'lucide-react';

export const TutorDashboard: React.FC = () => {
  const { currentUser, tutors, sessions, updateTutorProfile, updateSessionStatus } = useApp();

  // Find current tutor profile
  const tutorProfile =
    tutors.find((t) => t.userId === currentUser?.id || t.email === currentUser?.email) ||
    tutors[0]; // fallback for demo purposes

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(tutorProfile.bio);
  const [weeklyAvailability, setWeeklyAvailability] = useState(
    tutorProfile.weeklyAvailability.join(', ')
  );

  const assignedSessions = sessions.filter((s) => s.tutorId === tutorProfile.id);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateTutorProfile(tutorProfile.id, {
      bio,
      weeklyAvailability: weeklyAvailability.split(',').map((s) => s.trim()),
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0D3B66] to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src={tutorProfile.avatar}
            alt={tutorProfile.fullName}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 bg-slate-800"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {tutorProfile.fullName}
              </h1>
              {tutorProfile.verificationStatus === 'approved' && (
                <span className="text-xs bg-[#06B6D4]/20 text-[#06B6D4] px-2 py-0.5 rounded font-bold border border-[#06B6D4]/40">
                  Verified Tutor
                </span>
              )}
            </div>
            <p className="text-xs text-blue-200 mt-0.5">
              {tutorProfile.university} · {tutorProfile.department}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Editing' : 'Edit Availability & Bio'}</span>
        </button>
      </div>

      {/* Verification Status Banner */}
      <div
        className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
          tutorProfile.verificationStatus === 'approved'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
            : tutorProfile.verificationStatus === 'pending'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {tutorProfile.verificationStatus === 'approved' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <div>
            <span className="font-bold">Application Status: </span>
            <span className="capitalize">{tutorProfile.verificationStatus.replace('_', ' ')}</span>
            <p className="text-[11px] text-slate-600 mt-0.5">
              {tutorProfile.verificationStatus === 'approved'
                ? 'Your profile is fully verified and listed on our public directory. You are eligible for family matching.'
                : 'Our academic administrators are reviewing your submitted transcripts. We will notify you once approved.'}
            </p>
          </div>
        </div>

        <span className="text-xs font-bold shrink-0">
          Fee: {tutorProfile.hourlyServiceFeeETB} ETB
        </span>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 text-xs"
        >
          <h3 className="text-sm font-bold text-slate-900">Edit Profile & Availability</h3>
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Professional Biography
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Weekly Availability (comma-separated slots)
            </label>
            <input
              type="text"
              value={weeklyAvailability}
              onChange={(e) => setWeeklyAvailability(e.target.value)}
              placeholder="e.g. Mon & Wed Afternoons, Friday Evening, Saturday Mornings"
              className="w-full p-2.5 rounded-xl border border-slate-300"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-[#0D3B66] text-white font-bold rounded-xl hover:bg-[#1E3A8A]"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Dashboard Metrics & Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scheduled Sessions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0D3B66]" />
                <span>My Assigned Tutoring Sessions</span>
              </h2>
              <span className="text-xs text-slate-500">{assignedSessions.length} total</span>
            </div>

            {assignedSessions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">
                No active tutoring sessions assigned yet.
              </p>
            ) : (
              <div className="space-y-3">
                {assignedSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{sess.subject}</span>
                      <p className="text-slate-600">Student: <strong>{sess.studentName}</strong></p>
                      <p className="text-slate-500">{sess.date} · {sess.time}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sess.locationOrLink}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          sess.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sess.status}
                      </span>
                      {sess.status === 'confirmed' && (
                        <button
                          onClick={() => updateSessionStatus(sess.id, 'completed')}
                          className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 font-bold"
                        >
                          Mark Done
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Teaching Overview */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Teaching Profile Summary</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Subjects:</strong> {tutorProfile.subjects.join(', ')}</p>
              <p><strong>Grades:</strong> {tutorProfile.gradeLevels.join(', ')}</p>
              <p><strong>Locations:</strong> {tutorProfile.cities.join(', ')}</p>
              <p><strong>Experience:</strong> {tutorProfile.experienceYears} Years</p>
              {tutorProfile.rating > 0 && (
                <p className="flex items-center gap-1 font-semibold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{tutorProfile.rating.toFixed(1)} rating ({tutorProfile.reviewCount} reviews)</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
