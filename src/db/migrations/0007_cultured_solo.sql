ALTER TABLE "account_memberships" DROP CONSTRAINT "account_memberships_account_id_accounts_id_fk";
--> statement-breakpoint
ALTER TABLE "account_memberships" ADD CONSTRAINT "account_memberships_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;