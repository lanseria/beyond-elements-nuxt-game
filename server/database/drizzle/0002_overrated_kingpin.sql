DO $$ BEGIN
 CREATE TYPE "data_map_collection_schema"."status" AS ENUM('todo', 'doing', 'done');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."map_tiles" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"status" "data_map_collection_schema"."status" DEFAULT 'todo',
	"polygon" text NOT NULL,
	"type" text NOT NULL,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
