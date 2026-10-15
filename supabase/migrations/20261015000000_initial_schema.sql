-- ==============================================================================
-- Pro Home Tutor Database Schema & Security Migration
-- Project: https://bjkhtjcyxqoizrzcupfx.supabase.co
-- Production Website: https://prohometutor.vercel.app/
-- Description: Creates tables for profiles, tutor_profiles, student_requests,
--              and tutor_matches with Row Level Security (RLS) and anti-privilege-escalation.
-- ==============================================================================

-- 1. Enable UUID Extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- Table 1: profiles
-- Extends Supabase auth.users with public profile metadata and verified role
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'parent', 'tutor', 'admin')),
  city TEXT DEFAULT 'Addis Ababa',
  sub_city TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- Index for role lookups and email queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ==============================================================================
-- Table 2: tutor_profiles
-- Detailed academic credentials and verification status for tutors
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tutor_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT DEFAULT '/logo.svg',
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  university TEXT NOT NULL,
  department TEXT NOT NULL,
  academic_status TEXT NOT NULL, -- e.g. "Graduate", "B.Sc.", "AAU 4th Year", "Certified Teacher"
  experience_years INT NOT NULL DEFAULT 1,
  grade_levels TEXT[] NOT NULL DEFAULT ARRAY['Grades 9–10', 'Grades 11–12'],
  subjects TEXT[] NOT NULL DEFAULT ARRAY['Mathematics'],
  cities TEXT[] NOT NULL DEFAULT ARRAY['Addis Ababa'],
  sub_cities TEXT[] DEFAULT ARRAY['Bole', 'Yeka'],
  delivery_options TEXT[] NOT NULL DEFAULT ARRAY['in_home', 'online'],
  weekly_availability TEXT[] DEFAULT ARRAY['Weekday Afternoons', 'Weekends'],
  bio TEXT,
  teaching_methodology TEXT,
  hourly_service_fee_etb INT NOT NULL DEFAULT 350,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected', 'more_info')),
  rating NUMERIC(3, 2) NOT NULL DEFAULT 5.00,
  review_count INT NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_tutor_verification ON public.tutor_profiles(verification_status);
CREATE INDEX IF NOT EXISTS idx_tutor_user_id ON public.tutor_profiles(user_id);

-- ==============================================================================
-- Table 3: student_requests
-- Tutoring inquiries and custom placement requests submitted by parents/students
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.student_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  requester_name TEXT NOT NULL,
  requester_email TEXT NOT NULL,
  requester_phone TEXT NOT NULL,
  student_name TEXT NOT NULL,
  grade TEXT NOT NULL,
  subjects TEXT[] NOT NULL,
  city TEXT NOT NULL DEFAULT 'Addis Ababa',
  sub_city TEXT,
  learning_format TEXT NOT NULL DEFAULT 'in_home' CHECK (learning_format IN ('in_home', 'online', 'hybrid')),
  preferred_schedule TEXT NOT NULL,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'matching', 'tutor_proposed', 'accepted', 'active', 'completed', 'cancelled')),
  decision_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX IF NOT EXISTS idx_requests_requester ON public.student_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON public.student_requests(status);

-- ==============================================================================
-- Table 4: tutor_matches
-- Administrator-controlled pairings between student requests and vetted tutors
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tutor_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES public.student_requests(id) ON DELETE CASCADE,
  tutor_id UUID NOT NULL REFERENCES public.tutor_profiles(id) ON DELETE CASCADE,
  matched_by UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'proposed' CHECK (status IN ('proposed', 'accepted', 'declined', 'active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(request_id, tutor_id)
);

CREATE INDEX IF NOT EXISTS idx_matches_request ON public.tutor_matches(request_id);
CREATE INDEX IF NOT EXISTS idx_matches_tutor ON public.tutor_matches(tutor_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON public.tutor_matches(status);

-- ==============================================================================
-- Helper Security Function: check if the requesting user is an admin
-- Using SECURITY DEFINER to bypass recursive RLS evaluations on profiles table
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- ==============================================================================
-- Trigger Function: handle_new_user
-- Automatically creates a public profile when a user signs up via Supabase Auth.
-- CRITICAL SECURITY RULE: Prevents self-escalation to 'admin'. If 'admin' is passed
-- in user_metadata, it is strictly forced to 'student'.
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  assigned_role TEXT;
  requested_role TEXT;
BEGIN
  requested_role := LOWER(COALESCE(NEW.raw_user_meta_data->>'role', 'student'));
  
  -- Prevent privilege escalation: only allow 'student', 'parent', or 'tutor'
  IF requested_role IN ('student', 'parent', 'tutor') THEN
    assigned_role := requested_role;
  ELSE
    assigned_role := 'student';
  END IF;

  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    phone,
    role,
    city,
    sub_city,
    avatar_url
  ) VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New User'),
    NEW.raw_user_meta_data->>'phone',
    assigned_role,
    COALESCE(NEW.raw_user_meta_data->>'city', 'Addis Ababa'),
    NEW.raw_user_meta_data->>'sub_city',
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    phone = COALESCE(EXCLUDED.phone, public.profiles.phone),
    updated_at = TIMEZONE('utc', NOW());

  -- If registered role is tutor, also create initial tutor_profile in 'pending' status
  IF assigned_role = 'tutor' THEN
    INSERT INTO public.tutor_profiles (
      user_id,
      full_name,
      email,
      phone,
      university,
      department,
      academic_status,
      experience_years,
      subjects,
      cities,
      sub_cities,
      bio,
      verification_status
    ) VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Tutor Applicant'),
      NEW.email,
      NEW.raw_user_meta_data->>'phone',
      COALESCE(NEW.raw_user_meta_data->>'university', 'Higher Education Institution'),
      COALESCE(NEW.raw_user_meta_data->>'department', 'General Education'),
      COALESCE(NEW.raw_user_meta_data->>'academic_status', 'Graduate'),
      COALESCE(NULLIF(NEW.raw_user_meta_data->>'experience_years', '')::INT, 1),
      CASE
        WHEN NEW.raw_user_meta_data->>'subjects' IS NOT NULL AND NEW.raw_user_meta_data->>'subjects' != ''
        THEN string_to_array(NEW.raw_user_meta_data->>'subjects', ', ')
        ELSE ARRAY['Mathematics']
      END,
      ARRAY[COALESCE(NEW.raw_user_meta_data->>'city', 'Addis Ababa')],
      ARRAY[COALESCE(NEW.raw_user_meta_data->>'sub_city', 'Bole')],
      COALESCE(NEW.raw_user_meta_data->>'bio', 'Passionate educator committed to Ethiopian students.'),
      'pending'
    )
    ON CONFLICT (user_id) DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

-- Drop trigger if already exists, then re-create
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_matches ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- RLS: public.profiles
-- ------------------------------------------------------------------------------
-- Anyone authenticated can view their own profile. Admins can view all.
CREATE POLICY "Users can view own profile or admins view all"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id OR public.is_admin()
  );

-- Users can insert only their own profile (trigger also runs as SECURITY DEFINER)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = id AND role != 'admin'
  );

-- Users can update own profile, but CANNOT change their own role to admin
CREATE POLICY "Users can update own profile without role change"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id OR public.is_admin())
  WITH CHECK (
    (auth.uid() = id AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()))
    OR public.is_admin()
  );

-- Only admins can delete profiles
CREATE POLICY "Only admins can delete profiles"
  ON public.profiles
  FOR DELETE
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: public.tutor_profiles
-- ------------------------------------------------------------------------------
-- Public (anonymous + authenticated) can view APPROVED tutors.
-- Tutors can view their own profile (even if pending). Admins can view all.
CREATE POLICY "Public can view approved tutors; tutors view own; admins view all"
  ON public.tutor_profiles
  FOR SELECT
  USING (
    verification_status = 'approved'
    OR auth.uid() = user_id
    OR public.is_admin()
  );

-- Tutors can create their own profile with 'pending' status
CREATE POLICY "Tutors can insert own profile as pending"
  ON public.tutor_profiles
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND verification_status = 'pending'
  );

-- Tutors can update their own profile details, but CANNOT approve themselves
CREATE POLICY "Tutors can update own info; only admins can approve/verify"
  ON public.tutor_profiles
  FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (
    public.is_admin()
    OR (
      auth.uid() = user_id
      AND verification_status = (SELECT t.verification_status FROM public.tutor_profiles t WHERE t.id = id)
    )
  );

-- Only admins can delete tutor profiles
CREATE POLICY "Only admins can delete tutor profiles"
  ON public.tutor_profiles
  FOR DELETE
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: public.student_requests
-- ------------------------------------------------------------------------------
-- Requesters can view their own requests. Admins can view all requests.
-- Matched tutors can view the requests paired with them.
CREATE POLICY "Requesters, matched tutors, and admins can view requests"
  ON public.student_requests
  FOR SELECT
  USING (
    auth.uid() = requester_id
    OR public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.tutor_matches tm
      JOIN public.tutor_profiles tp ON tm.tutor_id = tp.id
      WHERE tm.request_id = public.student_requests.id
        AND tp.user_id = auth.uid()
    )
  );

-- Authenticated students and parents can insert requests
CREATE POLICY "Authenticated users can submit student requests"
  ON public.student_requests
  FOR INSERT
  WITH CHECK (
    auth.uid() = requester_id OR requester_id IS NULL
  );

-- Requesters can update their pending requests (e.g. cancel); Admins have full update
CREATE POLICY "Requesters can update own requests; admins can update all"
  ON public.student_requests
  FOR UPDATE
  USING (auth.uid() = requester_id OR public.is_admin())
  WITH CHECK (auth.uid() = requester_id OR public.is_admin());

-- Requesters or admins can delete requests
CREATE POLICY "Requesters and admins can delete requests"
  ON public.student_requests
  FOR DELETE
  USING (auth.uid() = requester_id OR public.is_admin());

-- ------------------------------------------------------------------------------
-- RLS: public.tutor_matches
-- ------------------------------------------------------------------------------
-- Requesters can view proposed matches for their request.
-- Tutors can view matches assigned to their tutor profile.
-- Admins can view all matches.
CREATE POLICY "View matches for relevant parties and admins"
  ON public.tutor_matches
  FOR SELECT
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.student_requests sr
      WHERE sr.id = request_id AND sr.requester_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM public.tutor_profiles tp
      WHERE tp.id = tutor_id AND tp.user_id = auth.uid()
    )
  );

-- Only admins can insert tutor matches
CREATE POLICY "Only admins can create tutor matches"
  ON public.tutor_matches
  FOR INSERT
  WITH CHECK (public.is_admin());

-- Admins can update any match; Requesters can accept or decline a match proposed to them
CREATE POLICY "Admins or requesters can update match status"
  ON public.tutor_matches
  FOR UPDATE
  USING (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.student_requests sr
      WHERE sr.id = request_id AND sr.requester_id = auth.uid()
    )
  )
  WITH CHECK (
    public.is_admin()
    OR (
      EXISTS (
        SELECT 1 FROM public.student_requests sr
        WHERE sr.id = request_id AND sr.requester_id = auth.uid()
      )
      AND status IN ('accepted', 'declined')
    )
  );

-- Only admins can delete matches
CREATE POLICY "Only admins can delete matches"
  ON public.tutor_matches
  FOR DELETE
  USING (public.is_admin());
