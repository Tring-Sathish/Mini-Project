alter table "public"."organizations" alter column "departments" drop not null;
alter table "public"."organizations" add column "departments" _text;
