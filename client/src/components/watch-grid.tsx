import { Watch } from "@shared/schema";
import { WatchCard } from "./watch-card";
import { Skeleton } from "./ui/skeleton";
import { Clock } from "lucide-react";

interface WatchGridProps {
  watches: Watch[];
  isLoading: boolean;
}

export function WatchGrid({ watches, isLoading }: WatchGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/5] rounded-lg" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (watches.length === 0) {
    return (
      <div className="text-center py-20" data-testid="empty-state">
        <Clock className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
        <h3 className="text-2xl font-serif font-light mb-2">No timepieces found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {watches.map((watch) => (
        <WatchCard key={watch.id} watch={watch} />
      ))}
    </div>
  );
}
