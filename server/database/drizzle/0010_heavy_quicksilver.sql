CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."download_failures" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"city_tile_id" text NOT NULL,
	"zoom" integer NOT NULL,
	"url" text NOT NULL,
	"failure_reason" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."download_failures" ADD CONSTRAINT "download_failures_city_tile_id_city_tiles_id_fk" FOREIGN KEY ("city_tile_id") REFERENCES "data_map_collection_schema"."city_tiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "url_idx" ON "data_map_collection_schema"."download_failures" USING btree ("url");