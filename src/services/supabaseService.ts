import {
  supabase,
  isSupabaseConfigured,
  DbProfile,
  DbTutorProfile,
  DbStudentRequest,
  DbTutorMatch,
} from '../lib/supabase';
export { isSupabaseConfigured };
import { User, TutorProfile, TutorRequest, UserRole } from '../types';

/**
 * Authentication & Backend Integration with Supabase.
 * Respects Row Level Security and gracefully notifies the UI if keys are missing.
 */

export interface AuthResponse {
  user: User | null;
  error: string | null;
}

/**
 * Sign Up with Supabase Auth.
 * Metadata passed to raw_user_meta_data triggers public.handle_new_user()
 * which creates public.profiles and (if tutor) public.tutor_profiles.
 */
export async function signUpWithSupabase(params: {
  email: string;
  password?: string;
  fullName: string;
  phone: string;
  role: 'student' | 'parent' | 'tutor';
  city: string;
  subCity?: string;
  tutorDetails?: {
    university: string;
    department: string;
    academicStatus: string;
    experienceYears: number;
    subjects: string[];
    bio?: string;
  };
}): Promise<AuthResponse> {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      error: 'Supabase is not configured yet. Please set VITE_SUPABASE_ANON_KEY.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password || 'TemporaryPassword123!', // Standard pass if single-step signup
      options: {
        data: {
          role: params.role, // Enforced by trigger to NEVER be 'admin'
          full_name: params.fullName,
          phone: params.phone,
          city: params.city,
          sub_city: params.subCity || '',
          university: params.tutorDetails?.university,
          department: params.tutorDetails?.department,
          academic_status: params.tutorDetails?.academicStatus,
          experience_years: params.tutorDetails?.experienceYears,
          subjects: params.tutorDetails?.subjects?.join(', '),
          bio: params.tutorDetails?.bio,
        },
      },
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'User registration failed to create an auth record.' };
    }

    const appUser: User = {
      id: data.user.id,
      email: data.user.email || params.email,
      name: params.fullName,
      role: params.role,
      phone: params.phone,
      city: params.city,
      subCity: params.subCity,
      createdAt: data.user.created_at,
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'An unexpected registration error occurred.' };
  }
}

/**
 * Sign In with Supabase Auth
 */
export async function signInWithSupabase(
  email: string,
  password: string
): Promise<AuthResponse> {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      error: 'Supabase credentials are not configured.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: 'Sign in failed.' };
    }

    // Retrieve role from profiles table (guaranteed secure role)
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const appUser: User = {
      id: data.user.id,
      email: data.user.email || email,
      name: profile?.full_name || data.user.user_metadata?.full_name || 'User',
      role: (profile?.role as UserRole) || 'student',
      phone: profile?.phone || data.user.user_metadata?.phone,
      city: profile?.city || 'Addis Ababa',
      subCity: profile?.sub_city,
      createdAt: profile?.created_at || data.user.created_at,
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'An unexpected error occurred during sign in.' };
  }
}

/**
 * Sign Out from Supabase
 */
export async function signOutWithSupabase(): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { error: null };
  }
  const { error } = await supabase.auth.signOut();
  return { error: error ? error.message : null };
}

/**
 * Fetch Approved Tutors from Supabase
 */
export async function fetchApprovedTutorsFromDb(): Promise<TutorProfile[]> {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('tutor_profiles')
    .select('*')
    .eq('verification_status', 'approved')
    .order('rating', { ascending: false });

  if (error || !data) {
    console.warn('Could not fetch approved tutors from Supabase:', error);
    return [];
  }

  return data.map((t: DbTutorProfile) => ({
    id: t.id,
    userId: t.user_id,
    fullName: t.full_name,
    email: t.email || undefined,
    phone: t.phone || undefined,
    avatar: t.avatar_url || '/logo.svg',
    gender: (t.gender as any) || undefined,
    university: t.university,
    department: t.department,
    academicStatus: t.academic_status,
    experienceYears: t.experience_years,
    gradeLevels: t.grade_levels || [],
    subjects: t.subjects || [],
    cities: t.cities || ['Addis Ababa'],
    subCities: t.sub_cities || [],
    deliveryOptions: (t.delivery_options as any) || ['in_home', 'online'],
    weeklyAvailability: t.weekly_availability || [],
    bio: t.bio || '',
    teachingMethodology: t.teaching_methodology || undefined,
    verificationStatus: t.verification_status,
    rating: Number(t.rating) || 5.0,
    reviewCount: t.review_count || 0,
    hourlyServiceFeeETB: t.hourly_service_fee_etb || 350,
    featured: t.featured || false,
    joinedDate: t.created_at.split('T')[0],
  }));
}

/**
 * Submit a Student Request to Supabase
 */
export async function submitStudentRequestToDb(
  request: Omit<TutorRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>
): Promise<{ id: string | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { id: null, error: 'Supabase is not configured' };
  }

  const { data, error } = await supabase
    .from('student_requests')
    .insert([
      {
        requester_name: request.requesterName,
        requester_email: request.requesterEmail,
        requester_phone: request.requesterPhone,
        student_name: request.studentName,
        grade: request.grade,
        subjects: request.subjects,
        city: request.city,
        sub_city: request.subCity || null,
        learning_format: request.learningFormat,
        preferred_schedule: request.preferredSchedule,
        special_requirements: request.specialRequirements || null,
        status: 'submitted',
      },
    ])
    .select('id')
    .single();

  if (error) {
    return { id: null, error: error.message };
  }

  return { id: data.id, error: null };
}

/**
 * Admin action: Approve or reject tutor profile
 */
export async function updateTutorVerificationInDb(
  tutorProfileId: string,
  newStatus: 'approved' | 'rejected' | 'more_info'
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) return { error: null };

  const { error } = await supabase
    .from('tutor_profiles')
    .update({ verification_status: newStatus, updated_at: new Date().toISOString() })
    .eq('id', tutorProfileId);

  return { error: error ? error.message : null };
}

/**
 * Admin action: Create a match between request and tutor
 */
export async function createTutorMatchInDb(
  requestId: string,
  tutorId: string,
  adminId?: string,
  notes?: string
): Promise<{ id: string | null; error: string | null }> {
  if (!isSupabaseConfigured()) return { id: null, error: null };

  const { data, error } = await supabase
    .from('tutor_matches')
    .insert([
      {
        request_id: requestId,
        tutor_id: tutorId,
        matched_by: adminId || null,
        status: 'proposed',
        notes: notes || null,
      },
    ])
    .select('id')
    .single();

  if (error) return { id: null, error: error.message };

  // Also update student_request status to 'tutor_proposed'
  await supabase
    .from('student_requests')
    .update({ status: 'tutor_proposed', updated_at: new Date().toISOString() })
    .eq('id', requestId);

  return { id: data.id, error: null };
}
