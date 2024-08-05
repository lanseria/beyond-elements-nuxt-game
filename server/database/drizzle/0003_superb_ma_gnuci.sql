ALTER TABLE "data_map_collection_schema"."map_tiles" ALTER COLUMN "type" DROP NOT NULL;
ALTER TABLE "data_map_collection_schema"."map_tiles" ADD COLUMN "zoom_status" boolean[];