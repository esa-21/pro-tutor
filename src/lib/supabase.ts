import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bjkhtjcyxqoizrzcupfx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Checks whether Supabase is configured with a valid URL and publishable/anon key.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY');
};

/**
 * Official Supabase client instance.
 * If credentials are not yet provided in the environment, a mock-safe client is created.
 */
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder-anon-key-configure-in-env',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Database record interfaces matching our SQL schema
export interface DbProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  role: 'student' | 'parent' | 'tutor' | 'admin';
  city?: string | null;
  sub_city?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbTutorProfile {
  id: string;
  user_id: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
  gender?: 'male' | 'female' | 'other' | null;
  university: string;
  department: string;
  academic_status: string;
  experience_years: number;
  grade_levels: string[];
  subjects: string[];
  cities: string[];
  sub_cities: string[];
  delivery_options: string[];
  weekly_availability: string[];
  bio?: string | null;
  teaching_methodology?: string | null;
  hourly_service_fee_etb: number;
  verification_status: 'pending' | 'approved' | 'rejected' | 'more_info';
  rating: number;
  review_count: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbStudentRequest {
  id: string;
  requester_id?: string | null;
  requester_name: string;
  requester_email: string;
  requester_phone: string;
  student_name: string;
  grade: string;
  subjects: string[];
  city: string;
  sub_city?: string | null;
  learning_format: 'in_home' | 'online' | 'hybrid';
  preferred_schedule: string;
  special_requirements?: string | null;
  status: 'submitted' | 'under_review' | 'matching' | 'tutor_proposed' | 'accepted' | 'active' | 'completed' | 'cancelled';
  decision_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbTutorMatch {
  id: string;
  request_id: string;
  tutor_id: string;
  matched_by?: string | null;
  status: 'proposed' | 'accepted' | 'declined' | 'active' | 'completed' | 'cancelled';
  notes?: string | null;
  created_at: string;
  updated_at: string;
}
