alter table "public"."candidates" alter column "marks" drop not null;
alter table "public"."candidates" add column "marks" text;
