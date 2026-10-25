-- ==============================================================================
-- HarmonyHub: Universal Human Values (UHV) & Professional Ethics
-- Production PostgreSQL Database Migration & Security Hardening
-- ==============================================================================
-- RECONCILIATION & SAFETY GUARANTEES:
-- 1. Non-Destructive Data Preservation:
--    - Never drops or truncates tables.
--    - Never deletes existing rows or silently alters user data.
--    - Diagnostic Validation: Checks for incompatible pre-existing data (NULLs,
--      duplicates, or orphaned records) and raises descriptive exceptions with
--      remediation guidance before applying constraints.
-- 2. Safe Identifier & Constraint Reconciliation:
--    - Generates unique UUIDs for missing IDs on existing progress/reflection rows.
--    - Conditionally applies Primary Keys, Foreign Keys (ON DELETE CASCADE),
--      Role CHECK constraints, and Unique constraints.
-- 3. Backfill Provisioning:
--    - Safely provisions profiles for pre-existing auth.users without profiles.
--    - Preserves existing profile names, avatars, and roles.
--    - Always defaults to 'student' role; never elevates privileges from metadata.
-- 4. Multi-Layer Privilege Defense:
--    - Zero table-level access for 'anon' (schema usage only).
--    - Authenticated users have column-level UPDATE grants only on permitted fields:
--      * profiles: (full_name, avatar_url)
--      * user_progress: (completed)
--      * reflections: (reflection_text)
-- 5. Row Level Security (RLS):
--    - Strict isolation on (SELECT auth.uid()) = user_id / id across all operations.
-- 6. Anti-Tampering & Anti-Spoofing Triggers:
--    - Immutable IDs, user ownership, module targets, and topic targets.
--    - Server-managed timestamps (created_at, updated_at, completed_at).
--    - State-verified email synchronization directly matched against auth.users.
-- 7. SECURITY DEFINER Hardening:
--    - Explicit trusted search_path: 'pg_catalog, public, pg_temp'.
--    - Execution privileges strictly revoked from PUBLIC.
-- ==============================================================================

-- Ensure pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ==============================================================================
-- SECTION 1: TABLE DEFINITIONS & COLUMN RECONCILIATION
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1A. PROFILES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- Reconcile missing columns if profiles already existed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT NOT NULL DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'student';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();

-- Ensure default expressions are active on existing columns
ALTER TABLE public.profiles ALTER COLUMN full_name SET DEFAULT '';
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'student';
ALTER TABLE public.profiles ALTER COLUMN created_at SET DEFAULT pg_catalog.now();
ALTER TABLE public.profiles ALTER COLUMN updated_at SET DEFAULT pg_catalog.now();


-- ------------------------------------------------------------------------------
-- 1B. USER PROGRESS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- Reconcile missing columns if user_progress already existed
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS module_id TEXT;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS topic_id TEXT;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS completed BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();
ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();

-- Populate missing IDs on existing rows safely and uniquely before Primary Key constraint
UPDATE public.user_progress SET id = gen_random_uuid() WHERE id IS NULL;

ALTER TABLE public.user_progress ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.user_progress ALTER COLUMN completed SET DEFAULT FALSE;
ALTER TABLE public.user_progress ALTER COLUMN created_at SET DEFAULT pg_catalog.now();
ALTER TABLE public.user_progress ALTER COLUMN updated_at SET DEFAULT pg_catalog.now();


-- ------------------------------------------------------------------------------
-- 1C. REFLECTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reflections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    reflection_text TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now()
);

-- Reconcile missing columns if reflections already existed
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS id UUID DEFAULT gen_random_uuid();
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS module_id TEXT;
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS topic_id TEXT;
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS reflection_text TEXT NOT NULL DEFAULT '';
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();
ALTER TABLE public.reflections ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT pg_catalog.now();

-- Populate missing IDs on existing rows safely and uniquely before Primary Key constraint
UPDATE public.reflections SET id = gen_random_uuid() WHERE id IS NULL;

ALTER TABLE public.reflections ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE public.reflections ALTER COLUMN reflection_text SET DEFAULT '';
ALTER TABLE public.reflections ALTER COLUMN created_at SET DEFAULT pg_catalog.now();
ALTER TABLE public.reflections ALTER COLUMN updated_at SET DEFAULT pg_catalog.now();


-- ==============================================================================
-- SECTION 2: DIAGNOSTIC DATA CHECKS & CONSTRAINT ENFORCEMENT
-- ==============================================================================
-- Verifies pre-existing data integrity before applying constraints.
-- Raises explicit, actionable diagnostic exceptions if dirty data exists.

DO $$
DECLARE
    invalid_count integer;
BEGIN
    -- --------------------------------------------------------------------------
    -- 2A. PROFILES DATA VALIDATION & CONSTRAINTS
    -- --------------------------------------------------------------------------
    -- Check for NULL id in profiles
    SELECT COUNT(*) INTO invalid_count FROM public.profiles WHERE id IS NULL;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.profiles contains % row(s) with NULL id. Every profile must be mapped to an auth.users UUID.', invalid_count;
    END IF;

    -- Check for NULL email in profiles
    SELECT COUNT(*) INTO invalid_count FROM public.profiles WHERE email IS NULL;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.profiles contains % row(s) with NULL email. Remediate missing emails before applying NOT NULL constraint.', invalid_count;
    END IF;

    -- Check for duplicate emails in profiles
    SELECT COUNT(*) INTO invalid_count FROM (
        SELECT email FROM public.profiles GROUP BY email HAVING COUNT(*) > 1
    ) sub;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.profiles contains % duplicate email address(es). Resolve duplicates before adding UNIQUE constraint.', invalid_count;
    END IF;

    -- Check for invalid roles in profiles
    SELECT COUNT(*) INTO invalid_count FROM public.profiles WHERE role NOT IN ('student', 'instructor', 'admin');
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.profiles contains % row(s) with an invalid role value. Allowed roles: student, instructor, admin.', invalid_count;
    END IF;

    -- Check for orphaned profiles not in auth.users
    SELECT COUNT(*) INTO invalid_count FROM public.profiles p
    WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = p.id);
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.profiles contains % orphan profile(s) whose id does not exist in auth.users.', invalid_count;
    END IF;

    -- Apply NOT NULL constraints on profiles
    ALTER TABLE public.profiles ALTER COLUMN id SET NOT NULL;
    ALTER TABLE public.profiles ALTER COLUMN email SET NOT NULL;
    ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;
    ALTER TABLE public.profiles ALTER COLUMN full_name SET NOT NULL;
    ALTER TABLE public.profiles ALTER COLUMN created_at SET NOT NULL;
    ALTER TABLE public.profiles ALTER COLUMN updated_at SET NOT NULL;

    -- Add Primary Key on profiles(id) if not present
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_pkey' AND conrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
    END IF;

    -- Add Foreign Key to auth.users(id) ON DELETE CASCADE
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'public.profiles'::regclass 
          AND contype = 'f' 
          AND confrelid = 'auth.users'::regclass
    ) THEN
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_id_fkey 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;

    -- Add Role Check Constraint
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_role_check' AND conrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.profiles 
        ADD CONSTRAINT profiles_role_check 
        CHECK (role IN ('student', 'instructor', 'admin'));
    END IF;

    -- Add Unique Constraint on email
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'profiles_email_key' AND conrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_email_key UNIQUE (email);
    END IF;


    -- --------------------------------------------------------------------------
    -- 2B. USER PROGRESS DATA VALIDATION & CONSTRAINTS
    -- --------------------------------------------------------------------------
    -- Check for NULL foreign keys or course targets
    SELECT COUNT(*) INTO invalid_count FROM public.user_progress WHERE user_id IS NULL OR module_id IS NULL OR topic_id IS NULL;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.user_progress contains % row(s) with NULL user_id, module_id, or topic_id.', invalid_count;
    END IF;

    -- Check for duplicate progress records per user and topic
    SELECT COUNT(*) INTO invalid_count FROM (
        SELECT user_id, topic_id FROM public.user_progress GROUP BY user_id, topic_id HAVING COUNT(*) > 1
    ) sub;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.user_progress contains % duplicate (user_id, topic_id) progress entries. Resolve duplicates before applying UNIQUE constraint.', invalid_count;
    END IF;

    -- Check for orphaned user_progress records not present in profiles
    SELECT COUNT(*) INTO invalid_count FROM public.user_progress up
    WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = up.user_id);
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.user_progress contains % orphan row(s) whose user_id is not in public.profiles.', invalid_count;
    END IF;

    ALTER TABLE public.user_progress ALTER COLUMN id SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN module_id SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN topic_id SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN completed SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN created_at SET NOT NULL;
    ALTER TABLE public.user_progress ALTER COLUMN updated_at SET NOT NULL;

    -- Add Primary Key on user_progress(id)
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_progress_pkey' AND conrelid = 'public.user_progress'::regclass
    ) THEN
        ALTER TABLE public.user_progress ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);
    END IF;

    -- Add Foreign Key to profiles(id) ON DELETE CASCADE
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'public.user_progress'::regclass 
          AND contype = 'f' 
          AND confrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.user_progress 
        ADD CONSTRAINT user_progress_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;

    -- Add Unique Constraint on (user_id, topic_id)
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'user_progress_unique_topic' AND conrelid = 'public.user_progress'::regclass
    ) THEN
        ALTER TABLE public.user_progress 
        ADD CONSTRAINT user_progress_unique_topic UNIQUE (user_id, topic_id);
    END IF;


    -- --------------------------------------------------------------------------
    -- 2C. REFLECTIONS DATA VALIDATION & CONSTRAINTS
    -- --------------------------------------------------------------------------
    SELECT COUNT(*) INTO invalid_count FROM public.reflections WHERE user_id IS NULL OR module_id IS NULL OR topic_id IS NULL;
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.reflections contains % row(s) with NULL user_id, module_id, or topic_id.', invalid_count;
    END IF;

    SELECT COUNT(*) INTO invalid_count FROM public.reflections r
    WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = r.user_id);
    IF invalid_count > 0 THEN
        RAISE EXCEPTION 'MIGRATION ABORTED: public.reflections contains % orphan row(s) whose user_id is not in public.profiles.', invalid_count;
    END IF;

    ALTER TABLE public.reflections ALTER COLUMN id SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN user_id SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN module_id SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN topic_id SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN reflection_text SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN created_at SET NOT NULL;
    ALTER TABLE public.reflections ALTER COLUMN updated_at SET NOT NULL;

    -- Add Primary Key on reflections(id)
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'reflections_pkey' AND conrelid = 'public.reflections'::regclass
    ) THEN
        ALTER TABLE public.reflections ADD CONSTRAINT reflections_pkey PRIMARY KEY (id);
    END IF;

    -- Add Foreign Key to profiles(id) ON DELETE CASCADE
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'public.reflections'::regclass 
          AND contype = 'f' 
          AND confrelid = 'public.profiles'::regclass
    ) THEN
        ALTER TABLE public.reflections 
        ADD CONSTRAINT reflections_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
    END IF;
END $$;


-- ==============================================================================
-- SECTION 3: PERFORMANCE INDEXES & ROW LEVEL SECURITY ENABLING
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_module ON public.user_progress(user_id, module_id);
CREATE INDEX IF NOT EXISTS idx_reflections_user ON public.reflections(user_id);
CREATE INDEX IF NOT EXISTS idx_reflections_topic ON public.reflections(user_id, topic_id);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;


-- ==============================================================================
-- SECTION 4: SAFE BACKFILL FOR EXISTING auth.users
-- ==============================================================================
-- Provisions student profiles for existing users who registered before migration.
-- Preserves existing profile names, avatars, and roles. Always defaults role to 'student'.
INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    avatar_url,
    created_at,
    updated_at
)
SELECT
    u.id,
    COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
    u.email,
    'student', -- Enforce student role; never trust user metadata for admin/instructor
    COALESCE(u.raw_user_meta_data->>'avatar_url', NULL),
    COALESCE(u.created_at, pg_catalog.now()),
    pg_catalog.now()
FROM auth.users u
WHERE u.email IS NOT NULL
ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = CASE 
        WHEN public.profiles.full_name IS NULL OR public.profiles.full_name = '' 
        THEN EXCLUDED.full_name 
        ELSE public.profiles.full_name 
    END,
    avatar_url = COALESCE(public.profiles.avatar_url, EXCLUDED.avatar_url),
    -- Role is intentionally omitted to preserve existing role allocations
    updated_at = pg_catalog.now();


-- ==============================================================================
-- SECTION 5: PRIVILEGE REVOCATION & COLUMN-LEVEL GRANTS (DEFENSE LAYER 1)
-- ==============================================================================
-- Cleanse inherited privileges to ensure explicit least-privilege access
REVOKE ALL ON public.profiles FROM anon, authenticated, public;
REVOKE ALL ON public.user_progress FROM anon, authenticated, public;
REVOKE ALL ON public.reflections FROM anon, authenticated, public;

-- Grant schema routing usage
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- 5A. PROFILES PERMISSIONS
-- Students may SELECT their own profile, and UPDATE only full_name and avatar_url.
-- Direct updates to id, email, role, created_at, updated_at are strictly rejected.
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (full_name, avatar_url) ON public.profiles TO authenticated;

-- 5B. USER PROGRESS PERMISSIONS
-- Students may SELECT, INSERT, DELETE, and toggle only the 'completed' boolean.
-- Direct updates to user_id, module_id, topic_id, completed_at, etc. are rejected.
GRANT SELECT, INSERT, DELETE ON public.user_progress TO authenticated;
GRANT UPDATE (completed) ON public.user_progress TO authenticated;

-- 5C. REFLECTIONS PERMISSIONS
-- Students may SELECT, INSERT, DELETE, and modify only 'reflection_text'.
GRANT SELECT, INSERT, DELETE ON public.reflections TO authenticated;
GRANT UPDATE (reflection_text) ON public.reflections TO authenticated;


-- ==============================================================================
-- SECTION 6: ROW LEVEL SECURITY POLICIES (DEFENSE LAYER 2)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 6A. PROFILES POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = id)
    WITH CHECK ((SELECT auth.uid()) = id);


-- ------------------------------------------------------------------------------
-- 6B. USER PROGRESS POLICIES
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
CREATE POLICY "Users can view their own progress"
    ON public.user_progress
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
CREATE POLICY "Users can insert their own progress"
    ON public.user_progress
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
CREATE POLICY "Users can update their own progress"
    ON public.user_progress
    FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id)
    WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own progress" ON public.user_progress;
CREATE POLICY "Users can delete their own progress"
    ON public.user_progress
    FOR DELETE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);


-- ------------------------------------------------------------------------------
-- 6C. REFLECTIONS POLICIES (Private Student Journal)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view their own reflections" ON public.reflections;
CREATE POLICY "Users can view their own reflections"
    ON public.reflections
    FOR SELECT
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can create their own reflections" ON public.reflections;
CREATE POLICY "Users can create their own reflections"
    ON public.reflections
    FOR INSERT
    TO authenticated
    WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own reflections" ON public.reflections;
CREATE POLICY "Users can update their own reflections"
    ON public.reflections
    FOR UPDATE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id)
    WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own reflections" ON public.reflections;
CREATE POLICY "Users can delete their own reflections"
    ON public.reflections
    FOR DELETE
    TO authenticated
    USING ((SELECT auth.uid()) = user_id);


-- ==============================================================================
-- SECTION 7: HARDENED FUNCTIONS & TRIGGERS (DEFENSE LAYER 3)
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 7A. PROFILE IMMUTABILITY & ROLE TAMPERING GUARD
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.protect_profile_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
DECLARE
    jwt_role text := COALESCE(auth.jwt() ->> 'role', '');
    verified_auth_email text;
BEGIN
    -- 1. Block role modifications unless caller is internal service_role
    IF NEW.role IS DISTINCT FROM OLD.role THEN
        IF jwt_role <> 'service_role' THEN
            RAISE EXCEPTION 'Access Denied: Modifying account role is strictly restricted to administrators.';
        END IF;
    END IF;

    -- 2. State-verified email validation:
    -- If email changes, verify that it matches the user's confirmed email in auth.users.
    -- This allows internal sync triggers to succeed while blocking client-forged email updates.
    IF NEW.email IS DISTINCT FROM OLD.email THEN
        SELECT u.email INTO verified_auth_email 
        FROM auth.users u 
        WHERE u.id = NEW.id;

        IF verified_auth_email IS NULL OR NEW.email IS DISTINCT FROM verified_auth_email THEN
            IF jwt_role <> 'service_role' THEN
                RAISE EXCEPTION 'Access Denied: Email address must be verified and updated through Supabase Auth.';
            END IF;
        END IF;
    END IF;

    -- 3. Block primary key modification
    IF NEW.id IS DISTINCT FROM OLD.id THEN
        RAISE EXCEPTION 'Access Denied: Profile ID cannot be modified.';
    END IF;

    -- 4. Preserve original creation timestamp
    NEW.created_at := OLD.created_at;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_profile_fields() FROM PUBLIC;

DROP TRIGGER IF EXISTS tr_protect_profile_fields ON public.profiles;
CREATE TRIGGER tr_protect_profile_fields
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.protect_profile_fields();


-- ------------------------------------------------------------------------------
-- 7B. USER PROGRESS INTEGRITY & SERVER-MANAGED TIMESTAMPS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.protect_progress_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Force server-managed creation timestamps
        NEW.created_at := pg_catalog.now();
        NEW.updated_at := pg_catalog.now();

        -- Automatically manage completed_at based on completed flag
        IF NEW.completed = TRUE THEN
            NEW.completed_at := pg_catalog.now();
        ELSE
            NEW.completed_at := NULL;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Prevent mutating record ID, ownership, module target, or topic target
        IF NEW.id IS DISTINCT FROM OLD.id OR 
           NEW.user_id IS DISTINCT FROM OLD.user_id OR
           NEW.module_id IS DISTINCT FROM OLD.module_id OR 
           NEW.topic_id IS DISTINCT FROM OLD.topic_id THEN
            RAISE EXCEPTION 'Access Denied: Progress identifiers, ownership, and target course units are immutable.';
        END IF;

        -- Automatically handle completed_at transition
        IF NEW.completed = TRUE AND (OLD.completed IS DISTINCT FROM TRUE OR OLD.completed_at IS NULL) THEN
            NEW.completed_at := pg_catalog.now();
        ELSIF NEW.completed = FALSE THEN
            NEW.completed_at := NULL;
        ELSE
            NEW.completed_at := OLD.completed_at;
        END IF;

        -- Lock created_at and advance updated_at
        NEW.created_at := OLD.created_at;
        NEW.updated_at := pg_catalog.now();
    END IF;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_progress_fields() FROM PUBLIC;

DROP TRIGGER IF EXISTS tr_protect_progress_fields ON public.user_progress;
CREATE TRIGGER tr_protect_progress_fields
    BEFORE INSERT OR UPDATE ON public.user_progress
    FOR EACH ROW
    EXECUTE FUNCTION public.protect_progress_fields();


-- ------------------------------------------------------------------------------
-- 7C. REFLECTIONS INTEGRITY & SERVER-MANAGED TIMESTAMPS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.protect_reflection_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_at := pg_catalog.now();
        NEW.updated_at := pg_catalog.now();
    ELSIF TG_OP = 'UPDATE' THEN
        -- Block mutating record ID, author, or targeted topic
        IF NEW.id IS DISTINCT FROM OLD.id OR 
           NEW.user_id IS DISTINCT FROM OLD.user_id OR
           NEW.module_id IS DISTINCT FROM OLD.module_id OR 
           NEW.topic_id IS DISTINCT FROM OLD.topic_id THEN
            RAISE EXCEPTION 'Access Denied: Reflection identifiers, authorship, and target topics are immutable.';
        END IF;

        NEW.created_at := OLD.created_at;
        NEW.updated_at := pg_catalog.now();
    END IF;

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.protect_reflection_fields() FROM PUBLIC;

DROP TRIGGER IF EXISTS tr_protect_reflection_fields ON public.reflections;
CREATE TRIGGER tr_protect_reflection_fields
    BEFORE INSERT OR UPDATE ON public.reflections
    FOR EACH ROW
    EXECUTE FUNCTION public.protect_reflection_fields();


-- ------------------------------------------------------------------------------
-- 7D. AUTOMATIC PROFILE PROVISIONING TRIGGER (auth.users -> public.profiles)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    INSERT INTO public.profiles (
        id,
        full_name,
        email,
        role,
        avatar_url,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        NEW.email,
        'student', -- Guaranteed student role. Ignores any client-supplied role metadata.
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL),
        pg_catalog.now(),
        pg_catalog.now()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = CASE 
            WHEN public.profiles.full_name = '' THEN EXCLUDED.full_name 
            ELSE public.profiles.full_name 
        END,
        updated_at = pg_catalog.now();

    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();


-- ------------------------------------------------------------------------------
-- 7E. SYNCHRONIZE VERIFIED EMAIL CHANGES (auth.users -> public.profiles)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.sync_user_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    IF NEW.email IS DISTINCT FROM OLD.email THEN
        UPDATE public.profiles
        SET email = NEW.email,
            updated_at = pg_catalog.now()
        WHERE id = NEW.id;
    END IF;
    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.sync_user_email() FROM PUBLIC;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE OF email ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_user_email();


-- ------------------------------------------------------------------------------
-- 7F. AUTOMATIC TIMESTAMP REFRESH TRIGGER FOR PROFILES
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = pg_catalog, public, pg_temp
AS $$
BEGIN
    NEW.updated_at = pg_catalog.now();
    RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.update_timestamp() FROM PUBLIC;

DROP TRIGGER IF EXISTS tr_profiles_timestamp ON public.profiles;
CREATE TRIGGER tr_profiles_timestamp
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();
