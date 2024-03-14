CREATE TABLE "public"."employees" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "org_id" uuid, "name" text NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
