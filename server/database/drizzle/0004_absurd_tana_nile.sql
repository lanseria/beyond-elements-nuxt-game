CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."map_cities" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"polygon" jsonb,
	"bounds" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "data_map_collection_schema"."map_tiles";