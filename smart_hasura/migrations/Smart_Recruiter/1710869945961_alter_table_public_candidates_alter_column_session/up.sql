ALTER TABLE "public"."candidates" ALTER COLUMN "session" TYPE text[];
alter table "public"."candidates" alter column "session" drop not null;
