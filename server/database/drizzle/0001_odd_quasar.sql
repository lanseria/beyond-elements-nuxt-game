CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."areas" (
	"code" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city_code" text NOT NULL,
	"province_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."cities" (
	"code" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"province_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."provinces" (
	"code" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."streets" (
	"code" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"area_code" text NOT NULL,
	"city_code" text NOT NULL,
	"province_code" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "data_map_collection_schema"."villages" (
	"code" varchar(12) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"street_code" text NOT NULL,
	"area_code" text NOT NULL,
	"city_code" text NOT NULL,
	"province_code" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."areas" ADD CONSTRAINT "areas_city_code_cities_code_fk" FOREIGN KEY ("city_code") REFERENCES "data_map_collection_schema"."cities"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."areas" ADD CONSTRAINT "areas_province_code_provinces_code_fk" FOREIGN KEY ("province_code") REFERENCES "data_map_collection_schema"."provinces"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."cities" ADD CONSTRAINT "cities_province_code_provinces_code_fk" FOREIGN KEY ("province_code") REFERENCES "data_map_collection_schema"."provinces"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."streets" ADD CONSTRAINT "streets_area_code_areas_code_fk" FOREIGN KEY ("area_code") REFERENCES "data_map_collection_schema"."areas"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."streets" ADD CONSTRAINT "streets_city_code_cities_code_fk" FOREIGN KEY ("city_code") REFERENCES "data_map_collection_schema"."cities"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."streets" ADD CONSTRAINT "streets_province_code_provinces_code_fk" FOREIGN KEY ("province_code") REFERENCES "data_map_collection_schema"."provinces"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."villages" ADD CONSTRAINT "villages_street_code_streets_code_fk" FOREIGN KEY ("street_code") REFERENCES "data_map_collection_schema"."streets"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."villages" ADD CONSTRAINT "villages_area_code_areas_code_fk" FOREIGN KEY ("area_code") REFERENCES "data_map_collection_schema"."areas"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."villages" ADD CONSTRAINT "villages_city_code_cities_code_fk" FOREIGN KEY ("city_code") REFERENCES "data_map_collection_schema"."cities"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "data_map_collection_schema"."villages" ADD CONSTRAINT "villages_province_code_provinces_code_fk" FOREIGN KEY ("province_code") REFERENCES "data_map_collection_schema"."provinces"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
