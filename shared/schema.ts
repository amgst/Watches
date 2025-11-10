import { sql } from "drizzle-orm";
import { pgTable, text, varchar, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const watches = pgTable("watches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brand: text("brand").notNull(),
  family: text("family"),
  name: text("name").notNull(),
  reference: text("reference").notNull(),
  movementCaliber: text("movement_caliber"),
  movementFunctions: text("movement_functions"),
  limited: text("limited"),
  caseMaterial: text("case_material"),
  glass: text("glass"),
  back: text("back"),
  shape: text("shape"),
  diameter: text("diameter"),
  height: text("height"),
  waterResistance: text("water_resistance"),
  dialColor: text("dial_color"),
  indexes: text("indexes"),
  hands: text("hands"),
  description: text("description"),
});

export const insertWatchSchema = createInsertSchema(watches).omit({
  id: true,
});

export type InsertWatch = z.infer<typeof insertWatchSchema>;
export type Watch = typeof watches.$inferSelect;
