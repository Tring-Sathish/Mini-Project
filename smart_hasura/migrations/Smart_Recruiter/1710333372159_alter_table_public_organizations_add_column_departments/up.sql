alter table "public"."organizations" add column "departments" jsonb
 null default jsonb_build_array();
