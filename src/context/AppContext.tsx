import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  User,
  TutorProfile,
  TutorRequest,
  TutoringSession,
  AcademicGoal,
  Testimonial,
  BlogPost,
  SiteNotification,
  PricingTier,
  AuditLog,
  ContactMessage,
  Language,
  RequestStatus,
  SessionStatus,
  UserRole,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_TUTORS,
  INITIAL_REQUESTS,
  INITIAL_SESSIONS,
  INITIAL_GOALS,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOG_POSTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_PRICING_TIERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_CONTACT_MESSAGES,
} from '../data/mockData';
import { translations } from '../translations';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  tutors: TutorProfile[];
  requests: TutorRequest[];
  sessions: TutoringSession[];
  goals: AcademicGoal[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  notifications: SiteNotification[];
  pricingTiers: PricingTier[];
  auditLogs: AuditLog[];
  contactMessages: ContactMessage[];
  language: Language;
  setLanguage: (lang: Language) => void;
  activeRoute: string;
  setActiveRoute: (route: string) => void;
  selectedTutorModal: TutorProfile | null;
  setSelectedTutorModal: (tutor: TutorProfile | null) => void;
  interactiveFinderOpen: boolean;
  setInteractiveFinderOpen: (open: boolean) => void;
  requestModalOpen: boolean;
  setRequestModalOpen: (open: boolean) => void;
  prefilledRequestData: Partial<TutorRequest> | null;
  setPrefilledRequestData: (data: Partial<TutorRequest> | null) => void;
  
  // Auth
  loginAs: (user: User) => void;
  loginWithEmail: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  registerUser: (
    role: UserRole,
    name: string,
    email: string,
    phone: string,
    city: string,
    subCity?: string,
    extraFields?: Record<string, unknown>
  ) => User;

  // Tutor workflows
  createTutorRequest: (data: Omit<TutorRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => TutorRequest;
  updateRequestStatus: (requestId: string, status: RequestStatus, decisionNotes?: string) => void;
  proposeTutor: (requestId: string, tutorId: string) => void;
  acceptTutorProposal: (requestId: string) => void;
  approveTutor: (tutorId: string) => void;
  rejectTutor: (tutorId: string) => void;
  requestMoreTutorInfo: (tutorId: string) => void;
  updateTutorProfile: (tutorId: string, updates: Partial<TutorProfile>) => void;

  // Sessions
  createSession: (session: Omit<TutoringSession, 'id'>) => void;
  updateSessionStatus: (sessionId: string, status: SessionStatus, feedback?: string) => void;

  // Goals
  addGoal: (goal: Omit<AcademicGoal, 'id' | 'isCompleted'>) => void;
  toggleGoal: (goalId: string) => void;
  deleteGoal: (goalId: string) => void;

  // Reviews
  addTestimonial: (test: Omit<Testimonial, 'id' | 'date' | 'published' | 'verified'>) => void;
  moderateTestimonial: (id: string, published: boolean) => void;

  // Pricing & Site Admin
  updatePricing: (tierId: string, newFee: number) => void;
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateContactMessageStatus: (id: string, status: 'reviewed' | 'resolved') => void;

  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Translation helper
  t: (key: keyof typeof translations.en) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'protutorial_v1_';

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

const getInitialRoute = (): string => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const validRoutes = [
      'about',
      'services',
      'find-tutor',
      'pricing',
      'how-it-works',
      'testimonials',
      'become-tutor',
      'contact',
      'faq',
      'blog',
      'learning-tips',
      'careers',
      'privacy',
      'terms',
      'refund',
      'help',
      'login',
      'student-register',
      'parent-register',
      'tutor-register',
      'dashboard',
      'admin-dashboard',
    ];
    if (validRoutes.includes(path)) return path;
  }
  return loadFromStorage<string>('route', 'home');
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() =>
    loadFromStorage<Language>('language', 'en')
  );
  const [activeRoute, setActiveRouteState] = useState<string>(getInitialRoute);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const loaded = loadFromStorage<User | null>('currentUser', INITIAL_USERS[0]);
    if (loaded && loaded.role === 'admin' && (loaded.name.includes('Esayas') || loaded.name.includes('Hailu'))) {
      return { ...loaded, name: 'PRO TUTORIAL' };
    }
    return loaded;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const loaded = loadFromStorage<User[]>('users', INITIAL_USERS);
    return loaded.map((u) =>
      u.role === 'admin' && (u.name.includes('Esayas') || u.name.includes('Hailu'))
        ? { ...u, name: 'PRO TUTORIAL' }
        : u
    );
  });
  const [tutors, setTutors] = useState<TutorProfile[]>(() =>
    loadFromStorage<TutorProfile[]>('tutors', INITIAL_TUTORS)
  );
  const [requests, setRequests] = useState<TutorRequest[]>(() =>
    loadFromStorage<TutorRequest[]>('requests', INITIAL_REQUESTS)
  );
  const [sessions, setSessions] = useState<TutoringSession[]>(() =>
    loadFromStorage<TutoringSession[]>('sessions', INITIAL_SESSIONS)
  );
  const [goals, setGoals] = useState<AcademicGoal[]>(() =>
    loadFromStorage<AcademicGoal[]>('goals', INITIAL_GOALS)
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() =>
    loadFromStorage<Testimonial[]>('testimonials', INITIAL_TESTIMONIALS)
  );
  const [blogPosts] = useState<BlogPost[]>(() =>
    loadFromStorage<BlogPost[]>('blogPosts', INITIAL_BLOG_POSTS)
  );
  const [notifications, setNotifications] = useState<SiteNotification[]>(() =>
    loadFromStorage<SiteNotification[]>('notifications', INITIAL_NOTIFICATIONS)
  );
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>(() =>
    loadFromStorage<PricingTier[]>('pricingTiers', INITIAL_PRICING_TIERS)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const loaded = loadFromStorage<AuditLog[]>('auditLogs', INITIAL_AUDIT_LOGS);
    return loaded.map((l) =>
      l.adminName.includes('Esayas') || l.adminName.includes('Hailu')
        ? { ...l, adminName: 'PRO TUTORIAL' }
        : l
    );
  });
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() =>
    loadFromStorage<ContactMessage[]>('contactMessages', INITIAL_CONTACT_MESSAGES)
  );

  const [selectedTutorModal, setSelectedTutorModal] = useState<TutorProfile | null>(null);
  const [interactiveFinderOpen, setInteractiveFinderOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [prefilledRequestData, setPrefilledRequestData] = useState<Partial<TutorRequest> | null>(null);

  // Sync to local storage
  useEffect(() => saveToStorage('language', language), [language]);
  useEffect(() => saveToStorage('route', activeRoute), [activeRoute]);
  useEffect(() => saveToStorage('currentUser', currentUser), [currentUser]);
  useEffect(() => saveToStorage('users', users), [users]);
  useEffect(() => saveToStorage('tutors', tutors), [tutors]);
  useEffect(() => saveToStorage('requests', requests), [requests]);
  useEffect(() => saveToStorage('sessions', sessions), [sessions]);
  useEffect(() => saveToStorage('goals', goals), [goals]);
  useEffect(() => saveToStorage('testimonials', testimonials), [testimonials]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('pricingTiers', pricingTiers), [pricingTiers]);
  useEffect(() => saveToStorage('auditLogs', auditLogs), [auditLogs]);
  useEffect(() => saveToStorage('contactMessages', contactMessages), [contactMessages]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '') || 'home';
      setActiveRouteState(path);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setActiveRoute = (route: string) => {
    setActiveRouteState(route);
    if (typeof window !== 'undefined') {
      const newPath = route === 'home' ? '/' : `/${route}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, '', newPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recordAudit = (
    action: string,
    targetType: 'tutor' | 'request' | 'pricing' | 'content' | 'user',
    targetId: string,
    details: string
  ) => {
    const newLog: AuditLog = {
      id: 'log-' + Date.now(),
      adminName: currentUser?.name || 'Administrator',
      adminEmail: currentUser?.email || 'admin@protutorial.et',
      action,
      targetType,
      targetId,
      details,
      timestamp: new Date().toLocaleString(),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const notifyUser = (
    userId: string,
    title: string,
    message: string,
    type: 'request' | 'match' | 'session' | 'announcement' | 'system'
  ) => {
    const newNotif: SiteNotification = {
      id: 'notif-' + Date.now(),
      userId,
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      read: false,
      type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const loginAs = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveRoute('admin-dashboard');
    } else {
      setActiveRoute('dashboard');
    }
  };

  const loginWithEmail = (email: string, preferredRole?: UserRole) => {
    const matched = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (matched) {
      setCurrentUser(matched);
      setActiveRoute(matched.role === 'admin' ? 'admin-dashboard' : 'dashboard');
      return true;
    }
    // Create new login session if email is not pre-registered
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0],
      email: email.trim(),
      role: preferredRole || 'student',
      createdAt: new Date().toISOString().split('T')[0],
      city: 'Addis Ababa',
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setActiveRoute('dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveRoute('home');
  };

  const registerUser = (
    role: UserRole,
    name: string,
    email: string,
    phone: string,
    city: string,
    subCity?: string,
    extraFields?: Record<string, unknown>
  ): User => {
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      phone,
      role,
      city,
      subCity,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    if (role === 'tutor') {
      // Create pending tutor profile
      const newTutor: TutorProfile = {
        id: 'tut-' + Date.now(),
        userId: newUser.id,
        fullName: name,
        email,
        phone,
        avatar: '/src/assets/images/tutor_male_instructor_1791018914380.jpg',
        gender: (extraFields?.gender as 'male' | 'female' | 'other') || 'female',
        university: (extraFields?.university as string) || 'Addis Ababa University',
        department: (extraFields?.department as string) || 'General Education',
        academicStatus: (extraFields?.academicStatus as string) || 'Degree Graduate',
        experienceYears: Number(extraFields?.experienceYears || 1),
        gradeLevels: (extraFields?.gradeLevels as string[]) || ['Grades 5–8'],
        subjects: (extraFields?.subjects as string[]) || ['Mathematics'],
        cities: [city],
        subCities: subCity ? [subCity] : ['Bole'],
        deliveryOptions: (extraFields?.deliveryOptions as ('online' | 'in_home')[]) || ['online', 'in_home'],
        weeklyAvailability: ['Weekdays Afternoons', 'Saturday Full Day'],
        bio: (extraFields?.bio as string) || 'Passionate educator committed to student success in Ethiopia.',
        verificationStatus: 'pending',
        rating: 0,
        reviewCount: 0,
        hourlyServiceFeeETB: 350,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setTutors((prev) => [newTutor, ...prev]);

      // Notify admin
      notifyUser(
        'user-admin-1',
        'New Tutor Application Submitted',
        `${name} has registered and submitted an application for review.`,
        'request'
      );
    }

    notifyUser(
      newUser.id,
      'Welcome to Pro Tutorial Service',
      `Welcome ${name}! Your account has been created. Explore available tutors or post a tutorial request.`,
      'system'
    );

    setActiveRoute('dashboard');
    return newUser;
  };

  const createTutorRequest = (
    data: Omit<TutorRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
  ): TutorRequest => {
    const newReq: TutorRequest = {
      ...data,
      id: 'req-' + Date.now(),
      status: 'submitted',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRequests((prev) => [newReq, ...prev]);

    notifyUser(
      'user-admin-1',
      'New Tutoring Request Received',
      `Request for ${data.studentName} (${data.grade}, ${data.subjects.join(', ')}) in ${data.city}.`,
      'request'
    );

    if (data.requesterId) {
      notifyUser(
        data.requesterId,
        'Tutoring Request Submitted',
        `Your request for ${data.studentName} has been received. Our coordinator will match a verified tutor shortly.`,
        'request'
      );
    }

    return newReq;
  };

  const updateRequestStatus = (
    requestId: string,
    status: RequestStatus,
    decisionNotes?: string
  ) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status,
              decisionNotes: decisionNotes || r.decisionNotes,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : r
      )
    );
    recordAudit('UPDATE_REQUEST_STATUS', 'request', requestId, `Status changed to ${status}. ${decisionNotes || ''}`);
  };

  const proposeTutor = (requestId: string, tutorId: string) => {
    const tutor = tutors.find((t) => t.id === tutorId);
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'tutor_proposed',
              proposedTutorId: tutorId,
              updatedAt: new Date().toISOString().split('T')[0],
              decisionNotes: `Proposed ${tutor?.fullName || 'tutor'}. Awaiting client acceptance.`,
            }
          : r
      )
    );

    const targetReq = requests.find((r) => r.id === requestId);
    if (targetReq && targetReq.requesterId) {
      notifyUser(
        targetReq.requesterId,
        'Tutor Proposed for Your Request',
        `We have matched your request with ${tutor?.fullName || 'a qualified tutor'} (${tutor?.university || 'University'}). Review and accept on your dashboard!`,
        'match'
      );
    }

    recordAudit('PROPOSE_TUTOR', 'request', requestId, `Proposed tutor ${tutor?.fullName || tutorId}`);
  };

  const acceptTutorProposal = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    const tutorId = req.proposedTutorId;
    const tutor = tutors.find((t) => t.id === tutorId);

    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'active',
              assignedTutorId: tutorId,
              updatedAt: new Date().toISOString().split('T')[0],
              decisionNotes: `Client accepted ${tutor?.fullName || 'tutor'}. Tutoring active.`,
            }
          : r
      )
    );

    // Create initial tutoring session
    const newSession: TutoringSession = {
      id: 'sess-' + Date.now(),
      requestId,
      studentName: req.studentName,
      tutorName: tutor?.fullName || 'Assigned Tutor',
      tutorId: tutorId || 'tut-1',
      studentId: req.requesterId,
      subject: req.subjects[0] || 'Tutoring',
      date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
      time: '4:30 PM (10:30 Ethiopian Time)',
      durationHours: 1.5,
      format: req.learningFormat === 'in_home' ? 'in_home' : 'online',
      locationOrLink:
        req.learningFormat === 'in_home'
          ? `${req.subCity || req.city}, In-Home Residence`
          : 'Google Meet / Zoom Private Classroom Link',
      status: 'confirmed',
      notes: 'Initial introductory diagnostic and learning goal alignment session.',
    };
    setSessions((prev) => [newSession, ...prev]);

    notifyUser(
      req.requesterId,
      'Tutor Assignment Confirmed!',
      `You are matched with ${tutor?.fullName}! An introductory session has been scheduled.`,
      'session'
    );

    if (tutor && tutor.userId) {
      notifyUser(
        tutor.userId,
        'New Tutoring Assignment Assigned',
        `You have been assigned to student ${req.studentName} for ${req.subjects.join(', ')}. Check your dashboard schedule.`,
        'match'
      );
    }

    recordAudit('ACCEPT_PROPOSAL', 'request', requestId, `Accepted tutor match with ${tutor?.fullName}`);
  };

  const approveTutor = (tutorId: string) => {
    setTutors((prev) =>
      prev.map((t) =>
        t.id === tutorId ? { ...t, verificationStatus: 'approved' } : t
      )
    );
    const tutor = tutors.find((t) => t.id === tutorId);
    if (tutor && tutor.userId) {
      notifyUser(
        tutor.userId,
        'Congratulations! Your Tutor Application is Approved',
        'Your profile is now verified and publicly discoverable on the Pro Tutorial Service directory.',
        'announcement'
      );
    }
    recordAudit('APPROVE_TUTOR', 'tutor', tutorId, `Approved tutor application for ${tutor?.fullName}`);
  };

  const rejectTutor = (tutorId: string) => {
    setTutors((prev) =>
      prev.map((t) =>
        t.id === tutorId ? { ...t, verificationStatus: 'rejected' } : t
      )
    );
    const tutor = tutors.find((t) => t.id === tutorId);
    if (tutor && tutor.userId) {
      notifyUser(
        tutor.userId,
        'Tutor Application Update',
        'Thank you for applying. We are unable to accept your application at this time based on current agency requirements.',
        'system'
      );
    }
    recordAudit('REJECT_TUTOR', 'tutor', tutorId, `Rejected tutor application for ${tutor?.fullName}`);
  };

  const requestMoreTutorInfo = (tutorId: string) => {
    setTutors((prev) =>
      prev.map((t) =>
        t.id === tutorId ? { ...t, verificationStatus: 'more_info' } : t
      )
    );
    const tutor = tutors.find((t) => t.id === tutorId);
    if (tutor && tutor.userId) {
      notifyUser(
        tutor.userId,
        'Additional Information Requested',
        'Please update your profile with university transcripts or teaching experience documentation.',
        'system'
      );
    }
    recordAudit('REQUEST_MORE_INFO', 'tutor', tutorId, `Requested more info from ${tutor?.fullName}`);
  };

  const updateTutorProfile = (tutorId: string, updates: Partial<TutorProfile>) => {
    setTutors((prev) =>
      prev.map((t) => (t.id === tutorId ? { ...t, ...updates } : t))
    );
  };

  const createSession = (session: Omit<TutoringSession, 'id'>) => {
    const newSess: TutoringSession = {
      ...session,
      id: 'sess-' + Date.now(),
    };
    setSessions((prev) => [newSess, ...prev]);
  };

  const updateSessionStatus = (
    sessionId: string,
    status: SessionStatus,
    feedback?: string
  ) => {
    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status,
              parentFeedback: feedback !== undefined ? feedback : s.parentFeedback,
            }
          : s
      )
    );
  };

  const addGoal = (goal: Omit<AcademicGoal, 'id' | 'isCompleted'>) => {
    const newG: AcademicGoal = {
      ...goal,
      id: 'goal-' + Date.now(),
      isCompleted: false,
    };
    setGoals((prev) => [newG, ...prev]);
  };

  const toggleGoal = (goalId: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const addTestimonial = (
    test: Omit<Testimonial, 'id' | 'date' | 'published' | 'verified'>
  ) => {
    const newT: Testimonial = {
      ...test,
      id: 'test-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      published: currentUser?.role === 'admin', // Auto-publish if admin, else pending moderation
      verified: true,
      isSamplePlaceholder: false,
    };
    setTestimonials((prev) => [newT, ...prev]);
  };

  const moderateTestimonial = (id: string, published: boolean) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published } : t))
    );
  };

  const updatePricing = (tierId: string, newFee: number) => {
    setPricingTiers((prev) =>
      prev.map((tier) =>
        tier.id === tierId ? { ...tier, serviceFeeETB: newFee } : tier
      )
    );
    recordAudit('UPDATE_PRICING', 'pricing', tierId, `Updated fee to ${newFee} ETB`);
  };

  const submitContactMessage = (
    msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
  ) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toLocaleString(),
      status: 'new',
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const updateContactMessageStatus = (id: string, status: 'reviewed' | 'resolved') => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    if (!currentUser) return;
    setNotifications((prev) =>
      prev.map((n) => (n.userId === currentUser.id ? { ...n, read: true } : n))
    );
  };

  const t = (key: keyof typeof translations.en): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || '';
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        tutors,
        requests,
        sessions,
        goals,
        testimonials,
        blogPosts,
        notifications,
        pricingTiers,
        auditLogs,
        contactMessages,
        language,
        setLanguage,
        activeRoute,
        setActiveRoute,
        selectedTutorModal,
        setSelectedTutorModal,
        interactiveFinderOpen,
        setInteractiveFinderOpen,
        requestModalOpen,
        setRequestModalOpen,
        prefilledRequestData,
        setPrefilledRequestData,
        loginAs,
        loginWithEmail,
        logout,
        registerUser,
        createTutorRequest,
        updateRequestStatus,
        proposeTutor,
        acceptTutorProposal,
        approveTutor,
        rejectTutor,
        requestMoreTutorInfo,
        updateTutorProfile,
        createSession,
        updateSessionStatus,
        addGoal,
        toggleGoal,
        deleteGoal,
        addTestimonial,
        moderateTestimonial,
        updatePricing,
        submitContactMessage,
        updateContactMessageStatus,
        markNotificationRead,
        markAllNotificationsRead,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
