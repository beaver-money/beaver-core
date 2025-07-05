ALTER TABLE "account_memberships" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "account_memberships" ALTER COLUMN "role" SET DEFAULT 'OWNER'::text;--> statement-breakpoint
DROP TYPE "public"."account_roles";--> statement-breakpoint
CREATE TYPE "public"."account_roles" AS ENUM('OWNER', 'WRITE', 'READ');--> statement-breakpoint
ALTER TABLE "account_memberships" ALTER COLUMN "role" SET DEFAULT 'OWNER'::"public"."account_roles";--> statement-breakpoint
ALTER TABLE "account_memberships" ALTER COLUMN "role" SET DATA TYPE "public"."account_roles" USING "role"::"public"."account_roles";