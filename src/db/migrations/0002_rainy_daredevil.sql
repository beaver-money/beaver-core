ALTER TABLE "users" ADD COLUMN "auth0_id" varchar(128);--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password_hash";