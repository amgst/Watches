import { Link } from "wouter";
import { Watch } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface WatchCardProps {
  watch: Watch;
}

export function WatchCard({ watch }: WatchCardProps) {
  return (
    <Link href={`/watch/${watch.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover-elevate overflow-hidden" data-testid={`card-watch-${watch.id}`}>
        <CardContent className="p-0">
          <div className="aspect-[4/5] bg-gradient-to-br from-muted/20 to-muted/5 flex items-center justify-center relative overflow-hidden">
            <Clock className="w-20 h-20 text-muted-foreground/10 group-hover:scale-110 transition-transform duration-500" />
            {watch.limited && watch.limited !== "No" && (
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 backdrop-blur-sm"
                data-testid="badge-limited-edition"
              >
                Limited
              </Badge>
            )}
          </div>
          
          <div className="p-6 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium" data-testid={`text-brand-${watch.id}`}>
              {watch.brand}
            </p>
            
            <h3 className="text-xl font-serif font-normal leading-snug line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-name-${watch.id}`}>
              {watch.name}
            </h3>
            
            <p className="text-sm text-muted-foreground" data-testid={`text-reference-${watch.id}`}>
              {watch.reference}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {watch.caseMaterial && (
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground" data-testid={`tag-material-${watch.id}`}>
                  {watch.caseMaterial}
                </span>
              )}
              {watch.diameter && (
                <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground" data-testid={`tag-diameter-${watch.id}`}>
                  {watch.diameter}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
