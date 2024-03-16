alter table "public"."candidates"
  add constraint "candidates_recruitmentCycle_fkey"
  foreign key ("recruitmentCycle")
  references "public"."RecruitmentStatusEnum"
  ("status") on update restrict on delete restrict;
