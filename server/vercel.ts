import express from "express";
import { registerApiRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import { loadWatchData } from "./utils/csv-parser";
import { storage } from "./storage";

const app = express();

// Add JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load watch data
async function loadData() {
  console.log("Loading watch data from CSV...");
  const watchData = loadWatchData();
  await storage.loadWatches(watchData);
  console.log(`Loaded ${watchData.length} watches into storage`);
  
  // Register API routes after data is loaded
  registerApiRoutes(app);
  
  // Serve static files in production
  serveStatic(app);
  
  // For local development
  const port = parseInt(process.env.PORT || '5000', 10);
  app.listen(port, () => {
    log(`Vercel server listening on port ${port}`);
  });
}

loadData().catch(error => {
  console.error("Failed to load data:", error);
});

// Export the app for Vercel
export default app;