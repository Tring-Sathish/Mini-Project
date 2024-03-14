CREATE TABLE "public"."candidates" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "CandidateID" uuid NOT NULL, "Applied" text, "Interviewing" text, "Reccomended" text, "Hired" text, "Rejected" text, "Initialized" boolean NOT NULL DEFAULT false, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
