CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."map_tiles" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"min_zoom" integer NOT NULL,
	"max_zoom" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
