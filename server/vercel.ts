import express from "express";
import { serveStatic, log } from "./vite";
import { loadWatchData } from "./utils/csv-parser";
import { storage } from "./storage";

const app = express();

// Add JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load watch data
async function loadWatches() {
  try {
    console.log("Loading watch data from CSV...");
    const watchData = loadWatchData();
    await storage.loadWatches(watchData);
    console.log(`Loaded ${watchData.length} watches into storage`);
  } catch (error) {
    console.error("Failed to load watch data:", error);
  }
}

// Load data when module is imported
loadWatches();

// Register API routes directly in this file to avoid module resolution issues
app.get("/api/watches", async (_req, res) => {
  try {
    const watches = await storage.getAllWatches();
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
    
    const watches = await storage.searchWatches(filters);
    res.json(watches);
  } catch (error) {
    console.error("Error searching watches:", error);
    res.status(500).json({ error: "Failed to search watches" });
  }
});

app.get("/api/watches/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const watch = await storage.getWatchById(id);
    
    if (!watch) {
      return res.status(404).json({ error: "Watch not found" });
    }
    
    res.json(watch);
  } catch (error) {
    console.error("Error fetching watch:", error);
    res.status(500).json({ error: "Failed to fetch watch" });
  }
});

// Serve static files in production
serveStatic(app);

// Export the app for Vercel as a serverless function
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = parseInt(process.env.PORT || '5000', 10);
  app.listen(port, () => {
    log(`Vercel server listening on port ${port}`);
  });
}