import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  ShieldCheck,
  UserCheck,
  BookOpen,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Inbox,
  FileText,
  Search,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    tutors,
    requests,
    pricingTiers,
    auditLogs,
    contactMessages,
    approveTutor,
    rejectTutor,
    requestMoreTutorInfo,
    proposeTutor,
    updatePricing,
    updateContactMessageStatus,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'tutors' | 'matching' | 'pricing' | 'inquiries' | 'audit'
  >('overview');

  // Matching tool state
  const [selectedRequestId, setSelectedRequestId] = useState<string>(
    requests[0]?.id || ''
  );
  const selectedRequest = requests.find((r) => r.id === selectedRequestId);

  // Pricing edit state
  const [editingTierId, setEditingTierId] = useState<string | null>(null);
  const [newFee, setNewFee] = useState<number>(300);

  // Metrics
  const pendingTutors = tutors.filter((t) => t.verificationStatus === 'pending');
  const approvedTutors = tutors.filter((t) => t.verificationStatus === 'approved');
  const activeRequests = requests.filter(
    (r) => r.status === 'submitted' || r.status === 'under_review' || r.status === 'matching'
  );
  const completedMatches = requests.filter(
    (r) => r.status === 'active' || r.status === 'completed'
  );

  // Candidate tutors for selected request
  const candidateTutors = selectedRequest
    ? approvedTutors.filter((t) => {
        const matchesSubject = selectedRequest.subjects.some((s) =>
          t.subjects.includes(s)
        );
        return matchesSubject;
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D3B66] via-blue-900 to-[#0F2A4A] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
              Administration & Operations
            </span>
            <span className="bg-[#06B6D4]/20 text-[#06B6D4] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#06B6D4]/40">
              Super Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Central Management System
          </h1>
          <p className="text-xs text-blue-200">
            Audit verifications, manage educational matches, update service fees, and review inquiries.
          </p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
        {[
          { id: 'overview', label: 'Overview Metrics' },
          {
            id: 'tutors',
            label: `Tutor Approvals (${pendingTutors.length} pending)`,
          },
          { id: 'matching', label: 'Tutor Matching Engine' },
          { id: 'pricing', label: 'Pricing Manager' },
          { id: 'inquiries', label: `Inquiries (${contactMessages.length})` },
          { id: 'audit', label: 'Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-[#0D3B66] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Pending Tutor Applications
              </span>
              <span className="text-3xl font-black text-amber-600 tabular-nums mt-1 block">
                {pendingTutors.length}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Awaiting review</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Approved Tutors
              </span>
              <span className="text-3xl font-black text-[#0D3B66] tabular-nums mt-1 block">
                {approvedTutors.length}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Verified educators</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Active Family Requests
              </span>
              <span className="text-3xl font-black text-[#06B6D4] tabular-nums mt-1 block">
                {activeRequests.length}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">In matching phase</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Confirmed Matches
              </span>
              <span className="text-3xl font-black text-emerald-600 tabular-nums mt-1 block">
                {completedMatches.length}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">Active tutoring</span>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Pending Applications Requiring Audit
                </h3>
                <button
                  onClick={() => setActiveTab('tutors')}
                  className="text-xs font-bold text-[#0D3B66] hover:underline"
                >
                  View All ({pendingTutors.length})
                </button>
              </div>

              {pendingTutors.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  All tutor applications have been processed!
                </p>
              ) : (
                <div className="space-y-3">
                  {pendingTutors.map((tut) => (
                    <div
                      key={tut.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{tut.fullName}</span>
                        <p className="text-slate-500">{tut.university} · {tut.department}</p>
                      </div>
                      <button
                        onClick={() => approveTutor(tut.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                      >
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Recent Administrative Audit Activity
                </h3>
                <button
                  onClick={() => setActiveTab('audit')}
                  className="text-xs font-bold text-[#0D3B66] hover:underline"
                >
                  View Logs
                </button>
              </div>

              <div className="space-y-2.5">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="text-xs border-b border-slate-50 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Tutor Approvals Tab */}
      {activeTab === 'tutors' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tutor Application Review & Credentials Audit
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review university background and teaching qualifications before publishing profiles publicly.
              </p>
            </div>

            {tutors.map((tut) => (
              <div
                key={tut.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={tut.avatar}
                      alt={tut.fullName}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">{tut.fullName}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            tut.verificationStatus === 'approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tut.verificationStatus === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {tut.verificationStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {tut.university} · {tut.department} ({tut.academicStatus})
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Email: {tut.email} · Phone: {tut.phone || 'N/A'} · Joined: {tut.joinedDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {tut.verificationStatus !== 'approved' && (
                      <button
                        onClick={() => approveTutor(tut.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Approve Profile
                      </button>
                    )}
                    {tut.verificationStatus === 'pending' && (
                      <button
                        onClick={() => requestMoreTutorInfo(tut.id)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors"
                      >
                        Request More Info
                      </button>
                    )}
                    {tut.verificationStatus !== 'rejected' && (
                      <button
                        onClick={() => rejectTutor(tut.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold transition-colors"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800 block">Subjects:</span>
                    <span>{tut.subjects.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Grade Levels:</span>
                    <span>{tut.gradeLevels.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 block">Preferred Locations:</span>
                    <span>{tut.cities.join(', ')}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-lg">
                  &quot;{tut.bio}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Tutor Matching Engine Tab */}
      {activeTab === 'matching' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tutor Matching Engine
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review active family requests and propose qualified candidate tutors.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Requests list */}
              <div className="lg:col-span-5 space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Select Family Request:
                </span>
                {requests.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRequestId(r.id)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      selectedRequestId === r.id
                        ? 'border-[#0D3B66] bg-[#0D3B66]/5 text-[#0D3B66] font-bold shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{r.studentName}</span>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-100">
                        {r.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5 font-normal">
                      {r.grade} · {r.subjects.join(', ')} ({r.city})
                    </p>
                  </button>
                ))}
              </div>

              {/* Match candidate recommendation */}
              <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                {selectedRequest ? (
                  <>
                    <div className="border-b border-slate-200 pb-3">
                      <span className="text-xs font-bold text-[#06B6D4] uppercase tracking-wider">
                        Request Details
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {selectedRequest.studentName} ({selectedRequest.grade})
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        <strong>Subjects:</strong> {selectedRequest.subjects.join(', ')} ·{' '}
                        <strong>Format:</strong> {selectedRequest.learningFormat} ·{' '}
                        <strong>Schedule:</strong> {selectedRequest.preferredSchedule}
                      </p>
                      {selectedRequest.specialRequirements && (
                        <p className="text-xs text-slate-500 mt-1 italic">
                          Notes: {selectedRequest.specialRequirements}
                        </p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Suggested Matching Tutors ({candidateTutors.length})
                      </h4>

                      {candidateTutors.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4">
                          No direct subject matches found in active verified pool.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {candidateTutors.map((cand) => (
                            <div
                              key={cand.id}
                              className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <span className="font-bold text-slate-900">{cand.fullName}</span>
                                <p className="text-slate-500">
                                  {cand.university} · {cand.experienceYears} Years Exp · {cand.rating}★
                                </p>
                              </div>
                              <button
                                onClick={() => proposeTutor(selectedRequest.id, cand.id)}
                                className="px-3.5 py-1.5 bg-[#0D3B66] hover:bg-[#1E3A8A] text-white rounded-lg font-bold text-xs"
                              >
                                Propose to Family
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-10">
                    Select a request from the left column to view matched tutors.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Pricing Manager Tab */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Service Fee & Package Management
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Update the official agency starting service fees displayed across public pricing pages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <span className="text-xs font-bold text-[#06B6D4] uppercase">
                    {tier.gradeLevel}
                  </span>
                  <p className="text-2xl font-black text-[#0D3B66]">
                    {tier.serviceFeeETB} ETB
                  </p>
                  <p className="text-xs text-slate-600">{tier.recommendedFor}</p>

                  {editingTierId === tier.id ? (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="number"
                        value={newFee}
                        onChange={(e) => setNewFee(Number(e.target.value))}
                        className="w-24 p-1.5 border border-slate-300 rounded text-xs"
                      />
                      <button
                        onClick={() => {
                          updatePricing(tier.id, newFee);
                          setEditingTierId(null);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-bold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingTierId(null)}
                        className="px-2 py-1.5 text-xs text-slate-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingTierId(tier.id);
                        setNewFee(tier.serviceFeeETB);
                      }}
                      className="text-xs font-bold text-[#0D3B66] hover:underline block pt-2"
                    >
                      Edit Stated Fee
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Inquiries & Callback Inbox Tab */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Customer Inquiries & Callback Requests
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Incoming communications from prospective families and tutors in Addis Ababa.
              </p>
            </div>

            <div className="space-y-4">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                      <p className="text-slate-500">
                        Phone: <strong className="text-slate-800">{msg.phone}</strong> · Email: {msg.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                        {msg.category.replace('_', ' ')}
                      </span>
                      <span className="text-slate-400">{msg.createdAt}</span>
                    </div>
                  </div>

                  <p className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 leading-relaxed">
                    &quot;{msg.message}&quot;
                  </p>

                  <div className="flex justify-end gap-2 pt-1">
                    <a
                      href={`tel:${msg.phone}`}
                      className="px-3 py-1 bg-[#0D3B66] text-white rounded-lg font-bold text-[11px]"
                    >
                      Call Back ({msg.phone})
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Administrative Audit Trail
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Immutable security logs of administrative approvals, rejections, fee changes, and matching assignments.
              </p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-900">{log.action}</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{log.details}</p>
                    <p className="text-slate-400 text-[10px]">By {log.adminName} ({log.adminEmail})</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
