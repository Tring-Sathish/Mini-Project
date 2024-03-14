CREATE TABLE "public"."check" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text, "age" integer NOT NULL DEFAULT 0, PRIMARY KEY ("id") );
CREATE EXTENSION IF NOT EXISTS pgcrypto;
