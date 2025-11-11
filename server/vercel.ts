import express from "express";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simple in-memory storage
interface Watch {
  id: string;
  brand: string;
  family: string | null;
  name: string;
  reference: string;
  movementCaliber: string | null;
  movementFunctions: string | null;
  limited: string | null;
  caseMaterial: string | null;
  glass: string | null;
  back: string | null;
  shape: string | null;
  diameter: string | null;
  height: string | null;
  waterResistance: string | null;
  dialColor: string | null;
  indexes: string | null;
  hands: string | null;
  description: string | null;
}

interface SearchFilters {
  query?: string;
  brands?: string[];
  materials?: string[];
  shapes?: string[];
  diameterMin?: number;
  diameterMax?: number;
}

class MemStorage {
  private watches: Map<string, Watch>;

  constructor() {
    this.watches = new Map();
    this.loadWatches();
  }

  getAllWatches(): Watch[] {
    return Array.from(this.watches.values());
  }

  getWatchById(id: string): Watch | undefined {
    return this.watches.get(id);
  }

  searchWatches(filters: SearchFilters): Watch[] {
    let watches = Array.from(this.watches.values());

    if (filters.query) {
      const query = filters.query.toLowerCase();
      watches = watches.filter(
        (watch) =>
          watch.brand.toLowerCase().includes(query) ||
          watch.name.toLowerCase().includes(query) ||
          watch.family?.toLowerCase().includes(query) ||
          watch.reference.toLowerCase().includes(query) ||
          watch.description?.toLowerCase().includes(query)
      );
    }

    if (filters.brands && filters.brands.length > 0) {
      watches = watches.filter((watch) => filters.brands!.includes(watch.brand));
    }

    if (filters.materials && filters.materials.length > 0) {
      watches = watches.filter(
        (watch) => watch.caseMaterial && filters.materials!.includes(watch.caseMaterial)
      );
    }

    if (filters.shapes && filters.shapes.length > 0) {
      watches = watches.filter(
        (watch) => watch.shape && filters.shapes!.includes(watch.shape)
      );
    }

    if (filters.diameterMin !== undefined) {
      watches = watches.filter((watch) => {
        const diameter = watch.diameter
          ? parseFloat(watch.diameter.replace(/[^\d.]/g, ""))
          : null;
        return diameter !== null && diameter >= filters.diameterMin!;
      });
    }

    if (filters.diameterMax !== undefined) {
      watches = watches.filter((watch) => {
        const diameter = watch.diameter
          ? parseFloat(watch.diameter.replace(/[^\d.]/g, ""))
          : null;
        return diameter !== null && diameter <= filters.diameterMax!;
      });
    }

    return watches;
  }

  private loadWatches() {
    try {
      console.log("Loading watch data from CSV...");
      
      // Try multiple possible paths for different environments
      const possiblePaths = [
        join(process.cwd(), "attached_assets", "Pasted-Brand-Family-Name-Reference-Movement-Caliber-Movement-Functions-Limited-Case-Material-Glass-Back-Sha-1762758225904_1762758225905.txt"),
        join(__dirname, "..", "attached_assets", "Pasted-Brand-Family-Name-Reference-Movement-Caliber-Movement-Functions-Limited-Case-Material-Glass-Back-Sha-1762758225904_1762758225905.txt"),
      ];

      let csvContent = "";
      let csvPath = "";
      
      for (const path of possiblePaths) {
        try {
          csvContent = readFileSync(path, { encoding: "utf-8" });
          csvPath = path;
          break;
        } catch (error) {
          console.warn(`Could not load CSV from ${path}`);
          continue;
        }
      }
      
      if (!csvContent) {
        console.error("Could not load CSV data from any expected location");
        return;
      }
      
      console.log(`Loaded CSV data from ${csvPath}`);
      
      const lines = csvContent.split("\n").filter((line) => line.trim());
      
      if (lines.length === 0) {
        console.log("No data in CSV file");
        return;
      }

      const headers = lines[0].split(";");
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(";");
        
        if (values.length !== headers.length) {
          continue;
        }

        const watch: Watch = {
          id: `watch-${i}`,
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

        this.watches.set(watch.id, watch);
      }
      
      console.log(`Loaded ${this.watches.size} watches into storage`);
    } catch (error) {
      console.error("Error loading watch data:", error);
    }
  }
}

const storage = new MemStorage();

const app = express();

// Add JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
app.get("/api/watches", async (_req, res) => {
  try {
    const watches = storage.getAllWatches();
    res.json(watches);
  } catch (error) {
    console.error("Error fetching watches:", error);
    res.status(500).json({ error: "Failed to fetch watches" });
  }
});

app.get("/api/watches/search", async (req, res) => {
  try {
    const { q, brands, materials, shapes, diameterMin, diameterMax } = req.query;
    
    const filters = {
      query: q && typeof q === "string" ? q : undefined,
      brands: brands && typeof brands === "string" ? brands.split(",") : undefined,
      materials: materials && typeof materials === "string" ? materials.split(",") : undefined,
      shapes: shapes && typeof shapes === "string" ? shapes.split(",") : undefined,
      diameterMin: diameterMin && typeof diameterMin === "string" ? parseFloat(diameterMin) : undefined,
      diameterMax: diameterMax && typeof diameterMax === "string" ? parseFloat(diameterMax) : undefined,
    };
    
    const watches = storage.searchWatches(filters);
    res.json(watches);
  } catch (error) {
    console.error("Error searching watches:", error);
    res.status(500).json({ error: "Failed to search watches" });
  }
});

app.get("/api/watches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const watch = storage.getWatchById(id);
    
    if (!watch) {
      return res.status(404).json({ error: "Watch not found" });
    }
    
    res.json(watch);
  } catch (error) {
    console.error("Error fetching watch:", error);
    res.status(500).json({ error: "Failed to fetch watch" });
  }
});

// Serve static files
const distPath = join(__dirname, "..", "dist", "public");
app.use(express.static(distPath));

// Fall through to index.html for client-side routing
app.use("*", (_req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

// Export the app for Vercel as a serverless function
export default app;