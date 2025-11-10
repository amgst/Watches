import { readFileSync } from "fs";
import { join } from "path";
import { InsertWatch } from "@shared/schema";

export function parseCSVData(csvPath: string): InsertWatch[] {
  const content = readFileSync(csvPath, { encoding: "utf-8" });
  const lines = content.split("\n").filter((line) => line.trim());
  
  if (lines.length === 0) {
    return [];
  }

  const headers = lines[0].split(";");
  const watches: InsertWatch[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(";");
    
    if (values.length !== headers.length) {
      continue;
    }

    const watch: InsertWatch = {
      brand: values[0] || "",
      family: values[1] || null,
      name: values[2] || "",
      reference: values[3] || "",
      movementCaliber: values[4] || null,
      movementFunctions: values[5] || null,
      limited: values[6] || null,
      caseMaterial: values[7] || null,
      glass: values[8] || null,
      back: values[9] || null,
      shape: values[10] || null,
      diameter: values[11] || null,
      height: values[12] || null,
      waterResistance: values[13] || null,
      dialColor: values[14] || null,
      indexes: values[15] || null,
      hands: values[16] || null,
      description: values[17] || null,
    };

    watches.push(watch);
  }

  return watches;
}

export function loadWatchData(): InsertWatch[] {
  const csvPath = join(
    process.cwd(),
    "attached_assets",
    "Pasted-Brand-Family-Name-Reference-Movement-Caliber-Movement-Functions-Limited-Case-Material-Glass-Back-Sha-1762758225904_1762758225905.txt"
  );

  try {
    return parseCSVData(csvPath);
  } catch (error) {
    console.error("Error loading watch data:", error);
    return [];
  }
}
