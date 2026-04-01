CREATE TYPE "public"."user_type" AS ENUM('ELECTED_OFFICIAL', 'ANONYMOUS', 'CONSTITUENT', 'INTERNAL');--> statement-breakpoint
CREATE TABLE "comment" (
	"comment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"comment_body" text NOT NULL,
	"comment_post_id" uuid NOT NULL,
	"comment_responding_to" uuid,
	"comment_respondent_id" uuid
);
--> statement-breakpoint
CREATE TABLE "district" (
	"district_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"district_name" text NOT NULL,
	"district_tag_cookie" jsonb
);
--> statement-breakpoint
CREATE TABLE "notify_interest" (
	"interest_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"zip" text NOT NULL,
	"community_board_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post" (
	"post_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"post_creator_id" uuid NOT NULL,
	"post_title" text NOT NULL,
	"post_body" text NOT NULL,
	"post_meeting_url" text
);
--> statement-breakpoint
CREATE TABLE "tag" (
	"tag_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"tag_name" text NOT NULL,
	"tag_post_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"user_name" text NOT NULL,
	"user_type" "user_type" NOT NULL,
	"user_profile_pic_url" text,
	"user_position" text,
	"user_district_id" uuid
);
--> statement-breakpoint
CREATE TABLE "verified_respondent" (
	"respondent_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"address_hash" text NOT NULL,
	"zip" text NOT NULL,
	"community_board_code" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_comment_post_id_post_post_id_fk" FOREIGN KEY ("comment_post_id") REFERENCES "public"."post"("post_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_comment_responding_to_comment_comment_id_fk" FOREIGN KEY ("comment_responding_to") REFERENCES "public"."comment"("comment_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_comment_respondent_id_verified_respondent_respondent_id_fk" FOREIGN KEY ("comment_respondent_id") REFERENCES "public"."verified_respondent"("respondent_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_post_creator_id_user_user_id_fk" FOREIGN KEY ("post_creator_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_tag_post_id_post_post_id_fk" FOREIGN KEY ("tag_post_id") REFERENCES "public"."post"("post_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_user_district_id_district_district_id_fk" FOREIGN KEY ("user_district_id") REFERENCES "public"."district"("district_id") ON DELETE no action ON UPDATE no action;