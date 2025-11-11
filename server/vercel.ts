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
console.log("Loading watch data from CSV...");
const watchData = loadWatchData();
await storage.loadWatches(watchData);
console.log(`Loaded ${watchData.length} watches into storage`);

// Register API routes
registerApiRoutes(app);

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