import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Watch } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Gauge, Droplets, Layers, Eye } from "lucide-react";

export default function WatchDetail() {
  const params = useParams();
  const watchId = params.id;

  const { data: watch, isLoading } = useQuery<Watch>({
    queryKey: ["/api/watches/detail", watchId],
    queryFn: async () => {
      if (!watchId) throw new Error("No watch ID");
      const response = await fetch(`/api/watches/${watchId}`);
      if (!response.ok) throw new Error("Failed to fetch watch");
      return response.json();
    },
    enabled: !!watchId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            <Skeleton className="aspect-[4/5] rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-light mb-4">Watch not found</h1>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const specifications = [
    { label: "Reference", value: watch.reference },
    { label: "Brand", value: watch.brand },
    { label: "Family", value: watch.family },
    { label: "Movement", value: watch.movementCaliber },
    { label: "Functions", value: watch.movementFunctions },
    { label: "Case Material", value: watch.caseMaterial },
    { label: "Glass", value: watch.glass },
    { label: "Case Back", value: watch.back },
    { label: "Shape", value: watch.shape },
    { label: "Diameter", value: watch.diameter },
    { label: "Height", value: watch.height },
    { label: "Water Resistance", value: watch.waterResistance },
    { label: "Dial Color", value: watch.dialColor },
    { label: "Indexes", value: watch.indexes },
    { label: "Hands", value: watch.hands },
  ].filter((spec) => spec.value);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Collection
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className="space-y-6" data-testid="image-watch">
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="aspect-[4/5] bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {watch.imageUrl ? (
                    <img
                      src={watch.imageUrl}
                      alt={`${watch.brand} ${watch.name}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Clock className="w-24 h-24 mx-auto mb-4 opacity-20" />
                      <p className="text-sm uppercase tracking-widest">Product Image</p>
                      <p className="text-xs mt-2">Professional photography</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3" data-testid="text-brand">
                {watch.brand}
              </p>
              <h1 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-4" data-testid="text-name">
                {watch.name}
              </h1>
              <p className="text-muted-foreground text-sm" data-testid="text-reference">
                Ref. {watch.reference}
              </p>
              {watch.limited && watch.limited !== "No" && (
                <Badge variant="secondary" className="mt-4" data-testid="badge-limited">
                  Limited Edition: {watch.limited}
                </Badge>
              )}
            </div>

            {watch.description && (
              <div className="prose prose-sm max-w-none">
                <p className="leading-relaxed text-foreground/90" data-testid="text-description">
                  {watch.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
              {watch.diameter && (
                <div className="text-center" data-testid="stat-diameter">
                  <Gauge className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-light font-serif">{watch.diameter}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Diameter</p>
                </div>
              )}
              {watch.height && (
                <div className="text-center" data-testid="stat-height">
                  <Layers className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-light font-serif">{watch.height}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Thickness</p>
                </div>
              )}
              {watch.waterResistance && (
                <div className="text-center" data-testid="stat-water-resistance">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-light font-serif">{watch.waterResistance}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Water Resistance</p>
                </div>
              )}
              {watch.glass && (
                <div className="text-center" data-testid="stat-glass">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-2xl font-light font-serif">{watch.glass}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Crystal</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-serif font-light mb-6 pb-3 border-b border-border">
                Specifications
              </h2>
              <dl className="space-y-4">
                {specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-3 gap-4 py-3 border-b border-border/50 last:border-0"
                    data-testid={`spec-${spec.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      {spec.label}
                    </dt>
                    <dd className="col-span-2 text-sm">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
