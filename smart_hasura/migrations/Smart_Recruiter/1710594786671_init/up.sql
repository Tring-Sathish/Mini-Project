SET check_function_bodies = false;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';
CREATE TABLE public.candidates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    dob text NOT NULL,
    gender text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    "zipCode" text NOT NULL,
    institute text[] NOT NULL,
    level text[] NOT NULL,
    session text[] NOT NULL,
    majors text[] NOT NULL,
    title text[] NOT NULL,
    duration integer[] NOT NULL,
    "companyName" text[] NOT NULL,
    "emailAddress" text[] NOT NULL,
    "phoneNo" text NOT NULL,
    "linkedinProfile" text NOT NULL,
    "gitHubProfile" text NOT NULL,
    "profilePic" text NOT NULL,
    "ResumeURL" text NOT NULL,
    "recruitmentCycle" text DEFAULT 'Applied'::text NOT NULL,
    "interviewDate" text NOT NULL,
    "interviewTime" text NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    interview_link text DEFAULT 'https://meet.google.com/sgy-oxkp-bfy'::text NOT NULL,
    feedback_form integer[] DEFAULT '{0}'::integer[] NOT NULL,
    withdrawn_reason text DEFAULT 'Try again!'::text NOT NULL,
    "jobID" uuid NOT NULL,
    "orgID" uuid NOT NULL
);
CREATE TABLE public.comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "CandidateID" uuid NOT NULL,
    "Applied" text,
    "Interviewing" text,
    "Reccomended" text,
    "Hired" text,
    "Rejected" text,
    "Initialized" boolean DEFAULT false NOT NULL
);
CREATE TABLE public.employees (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    org_id uuid NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    role text NOT NULL,
    skill text NOT NULL,
    performance text NOT NULL,
    experience text NOT NULL,
    education text NOT NULL
);
CREATE TABLE public.jobs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "jobPosition" text NOT NULL,
    "officeLocation" text NOT NULL,
    department text NOT NULL,
    "jobType" text NOT NULL,
    "numberOfSeats" integer DEFAULT 0 NOT NULL,
    "salaryRangeFrom" integer DEFAULT 0 NOT NULL,
    "salaryRangeUpto" integer DEFAULT 0 NOT NULL,
    job_description text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    org_name text NOT NULL,
    applicants_no integer DEFAULT 0 NOT NULL,
    job_status text DEFAULT 'Active'::text NOT NULL,
    report_status jsonb DEFAULT jsonb_build_object(),
    report_experience jsonb DEFAULT jsonb_build_object() NOT NULL,
    report_educational_level text,
    report_city text,
    report_university text,
    report_male_vs_female jsonb DEFAULT jsonb_build_object() NOT NULL,
    org_id uuid NOT NULL
);
CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username text NOT NULL,
    organization_name text NOT NULL,
    "phoneNo" text NOT NULL,
    website text NOT NULL,
    logo text,
    office_address text NOT NULL,
    office_city text NOT NULL,
    office_country text NOT NULL,
    fb_url text,
    "linkedIn_url" text,
    insta_url text,
    yt_url text,
    region text NOT NULL,
    departments text[] NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    f_name text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "isVerified" boolean DEFAULT false NOT NULL,
    "passwordResetToken" text,
    org_registered boolean DEFAULT false NOT NULL,
    org_id uuid
);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT candidates_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.candidates
    ADD CONSTRAINT candidates_pkey1 PRIMARY KEY (id);
ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);
ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_username_key UNIQUE (username);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
