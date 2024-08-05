CREATE SCHEMA "data_map_collection_schema";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "data_map_collection_schema"."genders" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "data_map_collection_schema"."roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."dict_items" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"dict_id" text NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."dicts" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"label" text NOT NULL,
	"value" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."invite_codes" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" text,
	"code" text NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "invite_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."login_records" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"password" text,
	"password_hash" text,
	"is_login" boolean DEFAULT false,
	"ip" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text,
	"avatar" text,
	"username" text,
	"password" text NOT NULL,
	"gender" "data_map_collection_schema"."genders" DEFAULT 'male',
	"role" "data_map_collection_schema"."roles" DEFAULT 'user',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."dict_items" ADD CONSTRAINT "dict_items_dict_id_dicts_id_fk" FOREIGN KEY ("dict_id") REFERENCES "data_map_collection_schema"."dicts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
