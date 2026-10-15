import {
  supabase,
  isSupabaseConfigured,
  getSupabaseConfig,
  DbProfile,
  DbTutorProfile,
  DbStudentRequest,
  DbTutorMatch,
} from '../lib/supabase';
export { isSupabaseConfigured, getSupabaseConfig };
import { User, TutorProfile, TutorRequest, UserRole } from '../types';

export interface AuthResponse {
  user: User | null;
  error: string | null;
  requiresEmailConfirmation?: boolean;
}

export interface SupabaseHealth {
  isConfigured: boolean;
  projectUrl: string;
  publishableKeyFound: boolean;
  isSwappedInEnv: boolean;
  authConnected: boolean;
  tables: {
    profiles: boolean;
    tutor_profiles: boolean;
    student_requests: boolean;
    tutor_matches: boolean;
  };
  allTablesReady: boolean;
  statusMessage: string;
}

/**
 * Real-time diagnostic check for Supabase connection, auth service, and table migrations.
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  const config = getSupabaseConfig();

  if (!config.isValidKey) {
    return {
      isConfigured: false,
      projectUrl: config.url,
      publishableKeyFound: false,
      isSwappedInEnv: false,
      authConnected: false,
      tables: {
        profiles: false,
        tutor_profiles: false,
        student_requests: false,
        tutor_matches: false,
      },
      allTablesReady: false,
      statusMessage: 'VITE_SUPABASE_ANON_KEY is not configured in the environment.',
    };
  }

  let authConnected = false;
  try {
    const { error } = await supabase.auth.getSession();
    authConnected = !error;
  } catch {
    authConnected = false;
  }

  const tableStatus = {
    profiles: false,
    tutor_profiles: false,
    student_requests: false,
    tutor_matches: false,
  };

  try {
    const pRes = await supabase.from('profiles').select('id').limit(1);
    tableStatus.profiles = !pRes.error || !pRes.error.message.includes('Could not find the table');
  } catch {
    tableStatus.profiles = false;
  }

  try {
    const tRes = await supabase.from('tutor_profiles').select('id').limit(1);
    tableStatus.tutor_profiles = !tRes.error || !tRes.error.message.includes('Could not find the table');
  } catch {
    tableStatus.tutor_profiles = false;
  }

  try {
    const sRes = await supabase.from('student_requests').select('id').limit(1);
    tableStatus.student_requests = !sRes.error || !sRes.error.message.includes('Could not find the table');
  } catch {
    tableStatus.student_requests = false;
  }

  try {
    const mRes = await supabase.from('tutor_matches').select('id').limit(1);
    tableStatus.tutor_matches = !mRes.error || !mRes.error.message.includes('Could not find the table');
  } catch {
    tableStatus.tutor_matches = false;
  }

  const allTablesReady =
    tableStatus.profiles &&
    tableStatus.tutor_profiles &&
    tableStatus.student_requests &&
    tableStatus.tutor_matches;

  let statusMessage = 'Supabase Auth & Database tables are fully connected and operational.';
  if (!allTablesReady) {
    statusMessage =
      'Supabase Auth is connected, but the 4 database tables have not been created yet in the SQL Editor.';
  }

  return {
    isConfigured: true,
    projectUrl: config.url,
    publishableKeyFound: true,
    isSwappedInEnv: config.wasSwapped,
    authConnected,
    tables: tableStatus,
    allTablesReady,
    statusMessage,
  };
}

/**
 * Checks for an existing active Supabase session on app launch
 */
export async function getSupabaseSessionUser(): Promise<User | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) return null;

    const u = session.user;
    let verifiedRole: UserRole = (u.user_metadata?.role as UserRole) || 'student';
    let verifiedName = u.user_metadata?.full_name || u.user_metadata?.name || 'User';
    let verifiedPhone = u.user_metadata?.phone;
    let verifiedCity = u.user_metadata?.city || 'Addis Ababa';
    let verifiedSubCity = u.user_metadata?.sub_city;

    // Check if profiles table is available to read verified role
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', u.id)
        .maybeSingle();

      if (profile) {
        verifiedRole = (profile.role as UserRole) || verifiedRole;
        verifiedName = profile.full_name || verifiedName;
        verifiedPhone = profile.phone || verifiedPhone;
        verifiedCity = profile.city || verifiedCity;
        verifiedSubCity = profile.sub_city || verifiedSubCity;
      }
    } catch {
      // Graceful fallback to user_metadata
    }

    return {
      id: u.id,
      email: u.email || '',
      name: verifiedName,
      role: verifiedRole,
      phone: verifiedPhone,
      city: verifiedCity,
      subCity: verifiedSubCity,
      createdAt: u.created_at,
    };
  } catch (err) {
    console.warn('Failed to recover Supabase session:', err);
    return null;
  }
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
      error: 'Supabase is not configured yet. Please check environment variables.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password || 'TemporaryPassword123!',
      options: {
        data: {
          role: params.role, // Enforced by DB trigger to NEVER be 'admin'
          full_name: params.fullName,
          name: params.fullName,
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

    const requiresEmailConfirmation = Boolean(data.user && !data.session);

    return {
      user: appUser,
      error: null,
      requiresEmailConfirmation,
    };
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

    let role: UserRole = (data.user.user_metadata?.role as UserRole) || 'student';
    let name: string = data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'User';
    let phone: string | undefined = data.user.user_metadata?.phone;
    let city: string = data.user.user_metadata?.city || 'Addis Ababa';
    let subCity: string | undefined = data.user.user_metadata?.sub_city;
    let createdAt: string = data.user.created_at;

    // Check profiles table for verified DB record (if migration has been run)
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile) {
        role = (profile.role as UserRole) || role;
        name = profile.full_name || name;
        phone = profile.phone || phone;
        city = profile.city || city;
        subCity = profile.sub_city || subCity;
        createdAt = profile.created_at || createdAt;
      }
    } catch {
      // Graceful fallback to user_metadata
    }

    const appUser: User = {
      id: data.user.id,
      email: data.user.email || email,
      name,
      role,
      phone,
      city,
      subCity,
      createdAt,
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
  try {
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message || 'Error signing out.' };
  }
}

/**
 * Fetch Approved Tutors from Supabase
 */
export async function fetchApprovedTutorsFromDb(): Promise<TutorProfile[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const { data, error } = await supabase
      .from('tutor_profiles')
      .select('*')
      .eq('verification_status', 'approved')
      .order('rating', { ascending: false });

    if (error || !data) {
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
      joinedDate: t.created_at ? t.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
    }));
  } catch {
    return [];
  }
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

  try {
    const { data, error } = await supabase
      .from('student_requests')
      .insert([
        {
          requester_id: request.requesterId || null,
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
      .maybeSingle();

    if (error) {
      return { id: null, error: error.message };
    }

    return { id: data?.id || null, error: null };
  } catch (err: any) {
    return { id: null, error: err.message || 'Database error' };
  }
}

/**
 * Admin action: Approve or reject tutor profile
 */
export async function updateTutorVerificationInDb(
  tutorProfileId: string,
  newStatus: 'approved' | 'rejected' | 'more_info'
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) return { error: null };

  try {
    const { error } = await supabase
      .from('tutor_profiles')
      .update({ verification_status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', tutorProfileId);

    return { error: error ? error.message : null };
  } catch (err: any) {
    return { error: err.message || 'Database error' };
  }
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

  try {
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
      .maybeSingle();

    if (error) return { id: null, error: error.message };

    // Also update student_request status to 'tutor_proposed'
    await supabase
      .from('student_requests')
      .update({ status: 'tutor_proposed', updated_at: new Date().toISOString() })
      .eq('id', requestId);

    return { id: data?.id || null, error: null };
  } catch (err: any) {
    return { id: null, error: err.message || 'Database error' };
  }
}
