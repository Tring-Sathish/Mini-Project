ALTER TABLE "public"."candidates" ALTER COLUMN "emailAddress" TYPE text[];
alter table "public"."candidates" alter column "emailAddress" drop not null;
