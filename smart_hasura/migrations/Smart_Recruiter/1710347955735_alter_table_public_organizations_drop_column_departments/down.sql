alter table "public"."organizations" alter column "departments" set default jsonb_build_array();
alter table "public"."organizations" alter column "departments" drop not null;
alter table "public"."organizations" add column "departments" jsonb;
