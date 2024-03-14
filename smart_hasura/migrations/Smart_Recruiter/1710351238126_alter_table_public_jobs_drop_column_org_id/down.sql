alter table "public"."jobs" alter column "org_id" drop not null;
alter table "public"."jobs" add column "org_id" text;
