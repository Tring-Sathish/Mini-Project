alter table "public"."candidates" alter column "session" set not null;
ALTER TABLE "public"."candidates" ALTER COLUMN "session" TYPE ARRAY;
