CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."city_tiles" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"tile_id" text NOT NULL,
	"city_id" text NOT NULL,
	"zoom_status" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."city_tiles" ADD CONSTRAINT "city_tiles_tile_id_map_tiles_id_fk" FOREIGN KEY ("tile_id") REFERENCES "data_map_collection_schema"."map_tiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."city_tiles" ADD CONSTRAINT "city_tiles_city_id_map_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "data_map_collection_schema"."map_cities"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
