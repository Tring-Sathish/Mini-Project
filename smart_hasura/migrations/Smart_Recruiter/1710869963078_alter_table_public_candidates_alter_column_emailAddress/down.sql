alter table "public"."candidates" alter column "emailAddress" set not null;
ALTER TABLE "public"."candidates" ALTER COLUMN "emailAddress" TYPE ARRAY;
