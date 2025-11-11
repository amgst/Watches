import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loadWatchData } from "./utils/csv-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  return httpServer;
}

export function registerApiRoutes(app: Express) {
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
}