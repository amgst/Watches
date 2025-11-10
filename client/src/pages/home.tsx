import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Watch } from "@shared/schema";
import { Hero } from "@/components/hero";
import { SearchBar } from "@/components/search-bar";
import { WatchGrid } from "@/components/watch-grid";
import { FilterPanel } from "@/components/filter-panel";

export interface FilterState {
  brands: string[];
  materials: string[];
  shapes: string[];
  diameterMin: number | null;
  diameterMax: number | null;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    materials: [],
    shapes: [],
    diameterMin: null,
    diameterMax: null,
  });
  const [sortBy, setSortBy] = useState<"brand" | "diameter" | "name">("brand");

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","));
    if (filters.materials.length > 0) params.set("materials", filters.materials.join(","));
    if (filters.shapes.length > 0) params.set("shapes", filters.shapes.join(","));
    if (filters.diameterMin) params.set("diameterMin", filters.diameterMin.toString());
    if (filters.diameterMax) params.set("diameterMax", filters.diameterMax.toString());
    
    const queryString = params.toString();
    return queryString ? `/api/watches/search?${queryString}` : "/api/watches";
  };

  const { data: watches = [], isLoading } = useQuery<Watch[]>({
    queryKey: [buildSearchUrl()],
  });

  const sortedWatches = [...watches].sort((a, b) => {
    if (sortBy === "brand") {
      return a.brand.localeCompare(b.brand);
    } else if (sortBy === "diameter") {
      const aVal = a.diameter
        ? parseFloat(a.diameter.replace(/[^\d.]/g, ""))
        : 0;
      const bVal = b.diameter
        ? parseFloat(b.diameter.replace(/[^\d.]/g, ""))
        : 0;
      return bVal - aVal;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  const { data: allWatches = [] } = useQuery<Watch[]>({
    queryKey: ["/api/watches"],
  });

  const availableBrands = Array.from(
    new Set(allWatches.map((w) => w.brand))
  ).sort();
  const availableMaterials = Array.from(
    new Set(allWatches.map((w) => w.caseMaterial).filter(Boolean))
  ).sort() as string[];
  const availableShapes = Array.from(
    new Set(allWatches.map((w) => w.shape).filter(Boolean))
  ).sort() as string[];

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={availableBrands}
              availableMaterials={availableMaterials}
              availableShapes={availableShapes}
            />
          </aside>

          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {sortedWatches.length}{" "}
                {sortedWatches.length === 1 ? "timepiece" : "timepieces"}
              </p>
            </div>
            
            <WatchGrid watches={sortedWatches} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </div>
  );
}
