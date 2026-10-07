import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Plus,
  Star,
  UserCheck,
} from 'lucide-react';

interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
}

export const ParentDashboard: React.FC = () => {
  const {
    currentUser,
    requests,
    sessions,
    tutors,
    acceptTutorProposal,
    setRequestModalOpen,
    setPrefilledRequestData,
  } = useApp();

  // Multi-child management state
  const [children, setChildren] = useState<Child[]>([
    {
      id: 'child-1',
      name: 'Kaleb Bekele',
      grade: 'Grade 11 (Natural Science)',
      school: 'Sandford International School / Bole',
    },
    {
      id: 'child-2',
      name: 'Liya Bekele',
      grade: 'Grade 4',
      school: 'St. Joseph School / Addis Ababa',
    },
  ]);

  const [activeChildId, setActiveChildId] = useState<string>('child-1');
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildGrade, setNewChildGrade] = useState('Grade 7');
  const [newChildSchool, setNewChildSchool] = useState('');

  const activeChild = children.find((c) => c.id === activeChildId) || children[0];

  // Filter requests matching active child
  const childRequests = requests.filter((r) =>
    r.studentName.toLowerCase().includes(activeChild.name.toLowerCase().split(' ')[0])
  );

  const childSessions = sessions.filter((s) =>
    s.studentName.toLowerCase().includes(activeChild.name.toLowerCase().split(' ')[0])
  );

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    const newC: Child = {
      id: 'child-' + Date.now(),
      name: newChildName,
      grade: newChildGrade,
      school: newChildSchool || 'Addis Ababa School',
    };
    setChildren([...children, newC]);
    setActiveChildId(newC.id);
    setNewChildName('');
    setShowAddChild(false);
  };

  const handleRequestForChild = () => {
    setPrefilledRequestData({
      studentName: activeChild.name,
      grade: activeChild.grade,
      city: 'Addis Ababa',
      subCity: 'Bole',
    });
    setRequestModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#0D3B66] to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
            Family Management Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, {currentUser?.name || 'Parent'}!
          </h1>
          <p className="text-xs text-blue-200">
            Managing academic progress & verified tutors across your children.
          </p>
        </div>

        <button
          onClick={handleRequestForChild}
          className="px-5 py-2.5 rounded-xl bg-[#06B6D4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs transition-colors shadow-sm self-start md:self-auto"
        >
          + Request Tutor for {activeChild.name.split(' ')[0]}
        </button>
      </div>

      {/* Multi-Child Profile Switcher Tabs */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            Child Profiles:
          </span>
          {children.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChildId(ch.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeChildId === ch.id
                  ? 'bg-[#0D3B66] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {ch.name} ({ch.grade.split(' ')[0]})
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddChild(!showAddChild)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0D3B66] hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Another Child</span>
        </button>
      </div>

      {/* Add Child Form */}
      {showAddChild && (
        <form
          onSubmit={handleAddChild}
          className="bg-slate-50 rounded-2xl p-5 border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs animate-in fade-in duration-150"
        >
          <div>
            <label className="block font-bold text-slate-700 mb-1">Child’s Full Name</label>
            <input
              type="text"
              required
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="e.g. Dawit Bekele"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Grade Level</label>
            <input
              type="text"
              required
              value={newChildGrade}
              onChange={(e) => setNewChildGrade(e.target.value)}
              placeholder="e.g. Grade 8"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">School Name</label>
            <input
              type="text"
              value={newChildSchool}
              onChange={(e) => setNewChildSchool(e.target.value)}
              placeholder="e.g. Cathedral School"
              className="w-full p-2 rounded-lg border border-slate-300 bg-white"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-[#0D3B66] text-white font-bold rounded-lg hover:bg-[#1E3A8A]"
            >
              Save Profile
            </button>
            <button
              type="button"
              onClick={() => setShowAddChild(false)}
              className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Main Content for Active Child */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Child Overview & Requests */}
        <div className="lg:col-span-8 space-y-8">
          {/* Requests for Active Child */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0D3B66]" />
                <span>Tutoring Requests for {activeChild.name}</span>
              </h2>
              <span className="text-xs text-slate-500">{activeChild.grade}</span>
            </div>

            {childRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed rounded-2xl space-y-3">
                <p>No active tutoring requests found for {activeChild.name}.</p>
                <button
                  onClick={handleRequestForChild}
                  className="px-4 py-2 bg-[#0D3B66] text-white rounded-xl font-bold"
                >
                  Submit Tutor Request for {activeChild.name.split(' ')[0]}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {childRequests.map((req) => {
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
                            {req.subjects.join(', ')}
                          </h3>
                          <p className="text-xs text-slate-500">
                            {req.learningFormat.replace('_', '-')} · {req.preferredSchedule}
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
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>

                      {req.status === 'tutor_proposed' && proposedTutor && (
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                          <p className="font-bold text-amber-900">
                            Proposed Verified Tutor: {proposedTutor.fullName}
                          </p>
                          <p className="text-slate-700">
                            {proposedTutor.university} ({proposedTutor.department}) · {proposedTutor.experienceYears} Years Experience
                          </p>
                          <button
                            onClick={() => acceptTutorProposal(req.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs"
                          >
                            Accept Tutor Proposal
                          </button>
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

          {/* Sessions for Active Child */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0D3B66]" />
                <span>Scheduled Sessions for {activeChild.name}</span>
              </h2>
              <span className="text-xs text-slate-500">Addis Ababa Time</span>
            </div>

            {childSessions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                No sessions scheduled yet.
              </div>
            ) : (
              <div className="space-y-3">
                {childSessions.map((sess) => (
                  <div
                    key={sess.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{sess.subject}</span>
                      <p className="text-slate-600">Assigned Tutor: <strong>{sess.tutorName}</strong></p>
                      <p className="text-slate-500">{sess.date} · {sess.time} ({sess.format})</p>
                      {sess.parentFeedback && (
                        <p className="text-emerald-700 italic mt-1 font-medium">
                          Your Feedback: &quot;{sess.parentFeedback}&quot;
                        </p>
                      )}
                    </div>

                    <span
                      className={`self-start sm:self-auto text-xs font-semibold px-2.5 py-1 rounded-full ${
                        sess.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
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

        {/* Right Column: Support & Coordinator Contact */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Academic Coordinator Desk
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your assigned coordinator monitors all lesson arrangements, handles schedule changes, and ensures tutor punctuality.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p><strong>Telegram Support:</strong> @pr_tutor12</p>
              <p><strong>Official Channel:</strong> @pro_tutorial21241</p>
              <p><strong>Community Group:</strong> @pro_tutorial2124</p>
              <p><strong>Office Hours:</strong> Mon–Sat 8:00 AM – 7:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
