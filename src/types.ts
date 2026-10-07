export type UserRole = 'guest' | 'student' | 'parent' | 'tutor' | 'admin';

export type Language = 'en' | 'am';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  subCity?: string;
  createdAt: string;
  avatar?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  grade: string;
  schoolName?: string;
  learningFormat: 'online' | 'in_home' | 'hybrid';
  preferredSubjects: string[];
  city: string;
  subCity?: string;
  notes?: string;
}

export interface TutorProfile {
  id: string;
  userId?: string;
  fullName: string;
  email?: string;
  phone?: string;
  avatar: string;
  gender?: 'male' | 'female' | 'other';
  university: string;
  department: string;
  academicStatus: string; // e.g., "Graduate", "4th Year Engineering", "MSc Candidate"
  experienceYears: number;
  gradeLevels: string[]; // e.g., ["KG–Grade 4", "Grades 5–8", "Grades 9–12"]
  subjects: string[];
  cities: string[]; // e.g., ["Addis Ababa", "Adama", "Hawassa"]
  subCities?: string[]; // e.g., ["Bole", "Yeka", "Kirkos"]
  deliveryOptions: ('online' | 'in_home')[];
  weeklyAvailability: string[]; // e.g., ["Mon Afternoon", "Wed Evening", "Saturday All Day"]
  bio: string;
  teachingMethodology?: string;
  verificationStatus: 'pending' | 'approved' | 'rejected' | 'more_info';
  rating: number;
  reviewCount: number;
  hourlyServiceFeeETB: number; // e.g. 350
  featured?: boolean;
  certificates?: string[];
  joinedDate: string;
}

export type RequestStatus =
  | 'submitted'
  | 'under_review'
  | 'matching'
  | 'tutor_proposed'
  | 'accepted'
  | 'active'
  | 'completed'
  | 'cancelled';

export interface TutorRequest {
  id: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  studentName: string;
  grade: string;
  subjects: string[];
  city: string;
  subCity?: string;
  learningFormat: 'online' | 'in_home' | 'hybrid';
  preferredSchedule: string;
  specialRequirements?: string;
  proposedTutorId?: string;
  assignedTutorId?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  decisionNotes?: string;
}

export type SessionStatus =
  | 'requested'
  | 'awaiting_confirmation'
  | 'confirmed'
  | 'completed'
  | 'rescheduling'
  | 'cancelled';

export interface TutoringSession {
  id: string;
  requestId?: string;
  studentName: string;
  tutorName: string;
  tutorId: string;
  studentId: string;
  subject: string;
  date: string;
  time: string; // E.g. "4:00 PM (10:00 Ethiopian Time)"
  durationHours: number;
  format: 'online' | 'in_home';
  locationOrLink: string;
  status: SessionStatus;
  notes?: string;
  parentFeedback?: string;
}

export interface AcademicGoal {
  id: string;
  studentId: string;
  subject: string;
  title: string;
  targetMetric: string; // e.g. "Scored 85%+ in Grade 12 National Physics"
  currentLevel: string;
  deadline: string;
  isCompleted: boolean;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: 'parent' | 'student' | 'tutor';
  grade?: string;
  subject?: string;
  city?: string;
  quote: string;
  rating: number;
  isSamplePlaceholder?: boolean;
  verified: boolean;
  published: boolean;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleAm?: string;
  summary: string;
  summaryAm?: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  tags: string[];
}

export interface SiteNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'request' | 'match' | 'session' | 'announcement' | 'system';
  linkTarget?: string;
}

export interface AuditLog {
  id: string;
  adminName: string;
  adminEmail: string;
  action: string;
  targetType: 'tutor' | 'request' | 'pricing' | 'content' | 'user';
  targetId: string;
  details: string;
  timestamp: string;
}

export interface PricingTier {
  id: string;
  gradeLevel: string;
  serviceFeeETB: number;
  billingPeriod: string;
  features: string[];
  recommendedFor: string;
  isPopular?: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: 'general' | 'parent_support' | 'tutor_support' | 'callback' | 'telegram';
  message: string;
  status: 'new' | 'reviewed' | 'resolved';
  createdAt: string;
}
