import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  ArrowRight,
  UserCheck,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    requests,
    sessions,
    goals,
    tutors,
    addGoal,
    toggleGoal,
    deleteGoal,
    acceptTutorProposal,
    setRequestModalOpen,
    setActiveRoute,
  } = useApp();

  const [newGoalSubject, setNewGoalSubject] = useState('Physics');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalMetric, setNewGoalMetric] = useState('');
  const [showGoalForm, setShowGoalForm] = useState(false);

  // Filter requests for current student or general active requests
  const myRequests = requests.filter(
    (r) => r.requesterId === currentUser?.id || r.studentName.includes(currentUser?.name || '')
  );

  const mySessions = sessions.filter(
    (s) => s.studentId === currentUser?.id || s.studentName.includes(currentUser?.name || '')
  );

  const myGoals = goals.filter((g) => g.studentId === currentUser?.id);

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    addGoal({
      studentId: currentUser?.id || 'user-student-1',
      subject: newGoalSubject,
      title: newGoalTitle,
      targetMetric: newGoalMetric || 'Target grade improvement',
      currentLevel: 'In progress',
      deadline: '2026-06-30',
    });

    setNewGoalTitle('');
    setNewGoalMetric('');
    setShowGoalForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0D3B66] to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
            Student Learning Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name || 'Student'}!
          </h1>
          <p className="text-xs text-blue-200">
            Grade 12 Candidate · Addis Ababa, Ethiopia
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRequestModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs transition-colors shadow-sm"
          >
            Request New Tutor
          </button>
        </div>
      </div>

      {/* Grid: Tutor Requests & Proposes Matches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: My Requests & Sessions */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Requests Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0D3B66]" />
                <span>My Tutor Requests & Matches</span>
              </h2>
              <span className="text-xs text-slate-500">{myRequests.length} active requests</span>
            </div>

            {myRequests.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                No active requests yet. Click &quot;Request New Tutor&quot; to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {myRequests.map((req) => {
                  const proposedTutor = req.proposedTutorId
                    ? tutors.find((t) => t.id === req.proposedTutorId)
                    : null;

                  return (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {req.subjects.join(', ')} · {req.grade}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {req.city} {req.subCity ? `(${req.subCity})` : ''} · {req.learningFormat.replace('_', '-')}
                          </p>
                        </div>

                        <span
                          className={`self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-full ${
                            req.status === 'active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'tutor_proposed'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          Status: {req.status.replace('_', ' ')}
                        </span>
                      </div>

                      {/* If Tutor Proposed */}
                      {req.status === 'tutor_proposed' && proposedTutor && (
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                          <div className="flex items-center gap-2 text-amber-900 font-bold">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span>Tutor Proposed by Pro Tutorial Service Coordinator:</span>
                          </div>
                          <p className="text-slate-700">
                            <strong>{proposedTutor.fullName}</strong> ({proposedTutor.university}, {proposedTutor.academicStatus}) has been matched for your timetable.
                          </p>
                          <div className="pt-1 flex items-center gap-2">
                            <button
                              onClick={() => acceptTutorProposal(req.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Accept Tutor & Start Lessons</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {req.decisionNotes && (
                        <p className="text-xs text-slate-600 italic">
                          Coordinator note: {req.decisionNotes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upcoming Sessions Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0D3B66]" />
                <span>Tutoring Sessions & Timetable</span>
              </h2>
              <span className="text-xs text-slate-500">Addis Ababa Local Time</span>
            </div>

            {mySessions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-2xl">
                No scheduled sessions yet.
              </div>
            ) : (
              <div className="space-y-3">
                {mySessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {sess.subject}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {sess.format}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Tutor: <strong>{sess.tutorName}</strong>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {sess.date} · {sess.time} · {sess.locationOrLink}
                      </p>
                    </div>

                    <span
                      className={`self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-full ${
                        sess.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : sess.status === 'completed'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {sess.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Academic Goal Tracker */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                <span>Academic Goal Tracker</span>
              </h3>
              <button
                onClick={() => setShowGoalForm(!showGoalForm)}
                className="text-xs font-bold text-[#0D3B66] hover:underline"
              >
                {showGoalForm ? 'Cancel' : '+ Add Goal'}
              </button>
            </div>

            {showGoalForm && (
              <form onSubmit={handleAddGoal} className="p-3 bg-slate-50 rounded-2xl space-y-2.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newGoalSubject}
                    onChange={(e) => setNewGoalSubject(e.target.value)}
                    placeholder="e.g. Mathematics"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Goal Title</label>
                  <input
                    type="text"
                    required
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="e.g. Master Calculus Limits"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Metric</label>
                  <input
                    type="text"
                    value={newGoalMetric}
                    onChange={(e) => setNewGoalMetric(e.target.value)}
                    placeholder="e.g. Score 85%+ in School Mock Exam"
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0D3B66] text-white font-bold rounded-lg hover:bg-[#1E3A8A]"
                >
                  Save Goal
                </button>
              </form>
            )}

            <div className="space-y-2.5">
              {myGoals.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">
                  No learning goals set yet. Set a target score to track progress!
                </p>
              ) : (
                myGoals.map((g) => (
                  <div
                    key={g.id}
                    className="p-3 rounded-xl border border-slate-200 flex items-start justify-between gap-2 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => toggleGoal(g.id)}
                        className="mt-0.5 focus:outline-none"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            g.isCompleted
                              ? 'text-emerald-600 fill-emerald-100'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            g.isCompleted
                              ? 'line-through text-slate-400'
                              : 'text-slate-900'
                          }`}
                        >
                          {g.title}
                        </p>
                        <p className="text-[11px] text-slate-500">{g.subject} · {g.targetMetric}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
