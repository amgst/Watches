import { type Watch, type InsertWatch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface SearchFilters {
  query?: string;
  brands?: string[];
  materials?: string[];
  shapes?: string[];
  diameterMin?: number;
  diameterMax?: number;
}

export interface IStorage {
  getAllWatches(): Promise<Watch[]>;
  getWatchById(id: string): Promise<Watch | undefined>;
  createWatch(watch: InsertWatch): Promise<Watch>;
  loadWatches(watches: InsertWatch[]): Promise<void>;
  searchWatches(filters: SearchFilters): Promise<Watch[]>;
}

export class MemStorage implements IStorage {
  private watches: Map<string, Watch>;

  constructor() {
    this.watches = new Map();
  }

  async getAllWatches(): Promise<Watch[]> {
    return Array.from(this.watches.values());
  }

  async getWatchById(id: string): Promise<Watch | undefined> {
    return this.watches.get(id);
  }

  async createWatch(insertWatch: InsertWatch): Promise<Watch> {
    const id = randomUUID();
    const watch: Watch = { ...insertWatch, id };
    this.watches.set(id, watch);
    return watch;
  }

  async loadWatches(watches: InsertWatch[]): Promise<void> {
    this.watches.clear();
    for (const watchData of watches) {
      await this.createWatch(watchData);
    }
  }

  async searchWatches(filters: SearchFilters): Promise<Watch[]> {
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
}

export const storage = new MemStorage();
