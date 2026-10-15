import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ETHIOPIAN_LOCATIONS } from '../data/mockData';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  Send,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2,
} from 'lucide-react';

import {
  signInWithSupabase,
  signUpWithSupabase,
  isSupabaseConfigured,
} from '../services/supabaseService';

export const LoginPage: React.FC = () => {
  const { loginWithEmail, loginAs, users, setActiveRoute } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError('');

    if (isSupabaseConfigured()) {
      setIsSubmitting(true);
      const res = await signInWithSupabase(email, password);
      setIsSubmitting(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      if (res.user) {
        loginAs(res.user);
        return;
      }
    }

    const ok = loginWithEmail(email);
    if (!ok) {
      setError('Invalid login details.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Brand Icon & Heading */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-[#0D3B66] text-white flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="w-7 h-7 text-[#06B6D4]" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Sign In to Pro Tutorial Service
        </h1>
        <p className="text-xs text-slate-500">
          Access your personal student, parent, tutor, or admin dashboard.
        </p>
      </div>

      {/* Demo Persona Quick-Login Box */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 space-y-2.5">
        <span className="text-[11px] font-bold text-[#0D3B66] uppercase tracking-wider block">
          One-Click Demo Personas:
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => loginAs(u)}
              className="p-2 rounded-xl bg-white border border-blue-200 hover:border-[#0D3B66] text-left hover:shadow-xs transition-all"
            >
              <span className="font-bold text-slate-900 block truncate">{u.name}</span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase">{u.role}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Standard Email Login */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@protutorial.et"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#0D3B66]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-[#0D3B66]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-md transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          Don’t have an account?{' '}
          <button
            onClick={() => setActiveRoute('student-register')}
            className="text-[#0D3B66] font-bold hover:underline"
          >
            Register Here
          </button>
        </div>
      </div>

      {/* Alternative Telegram banner */}
      <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 text-center space-y-2">
        <p className="text-xs text-slate-700">
          Prefer applying or managing requests via Telegram?
        </p>
        <a
          href="https://t.me/pro_tutorbot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D3B66] hover:underline"
        >
          <Send className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>Open @pro_tutorbot on Telegram</span>
        </a>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC<{ initialRole?: 'student' | 'parent' | 'tutor' }> = ({
  initialRole = 'student',
}) => {
  const { registerUser, setActiveRoute } = useApp();
  const [role, setRole] = useState<'student' | 'parent' | 'tutor'>(initialRole);

  // Common Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Addis Ababa');
  const [subCity, setSubCity] = useState('Bole');

  // Student/Parent Specific
  const [grade, setGrade] = useState('Grade 11 (Natural Science)');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Mathematics']);
  const [learningFormat, setLearningFormat] = useState<'in_home' | 'online' | 'hybrid'>('in_home');

  // Tutor Specific
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [academicStatus, setAcademicStatus] = useState('B.Sc. Graduate');
  const [experienceYears, setExperienceYears] = useState(2);
  const [bio, setBio] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  const getHeadingInfo = () => {
    if (role === 'tutor') {
      return {
        title: 'Tutor Registration Form | Join Pro Home Tutor Ethiopia',
        subtitle:
          'Apply to become a verified private tutor in Addis Ababa and Ethiopian regional cities. Share your education and qualifications to start receiving student matches.',
      };
    }
    if (role === 'parent') {
      return {
        title: 'Parent Registration | Hire Qualified Home Tutors in Addis Ababa',
        subtitle:
          'Register your family to request vetted one-on-one private educators for in-home tutoring in your Addis Ababa neighborhood or online across Ethiopia.',
      };
    }
    return {
      title: 'Student Registration | Find a Home Tutor in Ethiopia',
      subtitle:
        'Register as a student to connect with experienced private tutors in Addis Ababa and online tutors across Ethiopia for KG to Grade 12 subjects.',
    };
  };

  const headingInfo = getHeadingInfo();

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const APPS_SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbx0ZH85-fejv_sifnudZJZzT3nU-3uqjgoRYjPpxCJZ51WNLCFOjw5ORTmErlIpTeG4UQ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !phone.trim()) {
      setSubmitError('Please provide your full name and phone number.');
      return;
    }

    if (role === 'tutor') {
      if (!university.trim() || !department.trim()) {
        setSubmitError('Please specify your university/college and department.');
        return;
      }
      if (selectedSubjects.length === 0) {
        setSubmitError('Please select at least one subject you are qualified to tutor.');
        return;
      }

      setIsSubmitting(true);

      const educationSummary = [academicStatus, university, department]
        .filter(Boolean)
        .join(' - ');

      const payload = {
        fullName: name.trim(),
        phone: phone.trim(),
        education: educationSummary,
        subjects: selectedSubjects.join(', '),
        experience: `${experienceYears} ${experienceYears === 1 ? 'year' : 'years'}`,
        email: email.trim() || 'N/A',
        city,
        subCity: subCity || 'N/A',
        bio: bio.trim() || 'Qualified tutor applicant',
      };

      try {
        // 1. Post to Google Apps Script (Google Sheets persistence)
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        // 2. If Supabase is configured, also persist to Supabase Auth & Database
        if (isSupabaseConfigured() && email.trim()) {
          const authRes = await signUpWithSupabase({
            email: email.trim(),
            fullName: name.trim(),
            phone: phone.trim(),
            role: 'tutor',
            city,
            subCity,
            tutorDetails: {
              university,
              department,
              academicStatus,
              experienceYears,
              subjects: selectedSubjects,
              bio: bio.trim(),
            },
          });
          if (authRes.error) {
            console.warn('Supabase tutor signup notice:', authRes.error);
          }
        }

        // Register in client session
        registerUser('tutor', name, email, phone, city, subCity, {
          university,
          department,
          academicStatus,
          experienceYears,
          subjects: selectedSubjects,
          bio: bio || 'Passionate educator committed to student success in Ethiopia.',
        });

        setIsSubmitting(false);
        setSubmitSuccess(true);
      } catch (err) {
        console.error('Failed to submit tutor application:', err);
        registerUser('tutor', name, email, phone, city, subCity, {
          university,
          department,
          academicStatus,
          experienceYears,
          subjects: selectedSubjects,
          bio: bio || 'Passionate educator committed to student success in Ethiopia.',
        });
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }
    } else {
      setIsSubmitting(true);
      if (isSupabaseConfigured() && email.trim()) {
        const authRes = await signUpWithSupabase({
          email: email.trim(),
          fullName: name.trim(),
          phone: phone.trim(),
          role,
          city,
          subCity,
        });
        if (authRes.error) {
          setIsSubmitting(false);
          setSubmitError(authRes.error);
          return;
        }
      }

      registerUser(role, name, email, phone, city, subCity, {
        grade,
        preferredSubjects: selectedSubjects,
        learningFormat,
      });
      setIsSubmitting(false);
      setActiveRoute('dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      {/* Heading */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {headingInfo.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          {headingInfo.subtitle}
        </p>
      </div>

      {/* Role Switcher */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
        {[
          { id: 'student', label: 'Student' },
          { id: 'parent', label: 'Parent / Guardian' },
          { id: 'tutor', label: 'Tutor / Educator' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setRole(tab.id as any)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              role === tab.id
                ? 'bg-white text-[#0D3B66] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {submitSuccess ? (
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-md space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Submitted to Google Sheets
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Application Successfully Received!
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. Your tutor application has been recorded in our official Google Sheets spreadsheet via Google Apps Script. Our coordinator will review your qualifications within 48 business hours.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200 text-xs space-y-2 max-w-md mx-auto">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Recorded Application Details:
            </div>
            <div className="grid grid-cols-2 gap-1 text-slate-700">
              <span className="font-semibold text-slate-500">Applicant:</span>
              <span className="font-medium">{name}</span>
              <span className="font-semibold text-slate-500">Phone:</span>
              <span className="font-medium">{phone}</span>
              <span className="font-semibold text-slate-500">Education:</span>
              <span className="font-medium truncate">{academicStatus} ({university || 'Higher Institution'})</span>
              <span className="font-semibold text-slate-500">Experience:</span>
              <span className="font-medium">{experienceYears} years</span>
              <span className="font-semibold text-slate-500">Subjects:</span>
              <span className="font-medium truncate">{selectedSubjects.join(', ')}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveRoute('tutor-dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Open Tutor Dashboard
            </button>
            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setName('');
                setEmail('');
                setPhone('');
                setUniversity('');
                setDepartment('');
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 transition-colors cursor-pointer"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        /* Form Container */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        {/* Basic contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === 'parent' ? 'e.g. W/ro Almaz Kebede' : 'e.g. Selamawit Desta'}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
            />
          </div>

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
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0D3B66]"
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              City *
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
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
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
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
                Neighborhood / Kebele
              </label>
              <input
                type="text"
                value={subCity}
                onChange={(e) => setSubCity(e.target.value)}
                placeholder="e.g. Central zone"
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>
          )}
        </div>

        {/* Role-Specific Fields */}
        {role === 'tutor' ? (
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#06B6D4]">
              Tutor Qualifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  University / College *
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. Addis Ababa University, Kotebe, or Accredited Institution"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Major *
                </label>
                <input
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Mathematics, Natural Sciences, English"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Academic Status
                </label>
                <input
                  type="text"
                  value={academicStatus}
                  onChange={(e) => setAcademicStatus(e.target.value)}
                  placeholder="e.g. 4th Year Student / Graduate"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Teaching Experience (Years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subjects You Can Teach (Click to select)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ETHIOPIAN_LOCATIONS.subjects.map((s) => {
                  const isSel = selectedSubjects.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        isSel
                          ? 'bg-[#0D3B66] text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Short Professional Biography
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Mention your university achievements, teaching style, and passion for mentoring Ethiopian students..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 leading-relaxed">
              * Tutor applications undergo agency verification before appearing in our directory. You will be able to manage your schedule and pending requests from your tutor dashboard immediately.
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {role === 'parent' ? "Student's Current Grade Level" : 'Your Grade Level'}
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs bg-white font-medium"
              >
                {ETHIOPIAN_LOCATIONS.grades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Subjects
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ETHIOPIAN_LOCATIONS.subjects.map((s) => {
                  const isSel = selectedSubjects.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        isSel
                          ? 'bg-[#0D3B66] text-white font-semibold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Learning Format
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'in_home', label: 'In-Home' },
                  { id: 'online', label: 'Online' },
                  { id: 'hybrid', label: 'Hybrid' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setLearningFormat(f.id as any)}
                    className={`py-2 px-2 rounded-lg border text-center font-semibold ${
                      learningFormat === f.id
                        ? 'border-[#0D3B66] bg-[#0D3B66]/10 text-[#0D3B66]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {submitError && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl bg-[#0D3B66] hover:bg-[#1E3A8A] disabled:bg-slate-400 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Application to Google Sheets...</span>
            </>
          ) : (
            <>
              <span>{role === 'tutor' ? 'Submit Tutor Application' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 pt-2">
          Already registered?{' '}
          <button
            type="button"
            onClick={() => setActiveRoute('login')}
            className="text-[#0D3B66] font-bold hover:underline"
          >
            Sign In Here
          </button>
        </p>
      </form>
      )}
    </div>
  );
};
