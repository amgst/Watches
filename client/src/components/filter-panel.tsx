import { useState } from "react";
import { FilterState } from "@/pages/home";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, X } from "lucide-react";

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableBrands: string[];
  availableMaterials: string[];
  availableShapes: string[];
}

export function FilterPanel({
  filters,
  onFiltersChange,
  availableBrands,
  availableMaterials,
  availableShapes,
}: FilterPanelProps) {
  const [brandsOpen, setBrandsOpen] = useState(true);
  const [materialsOpen, setMaterialsOpen] = useState(true);
  const [shapesOpen, setShapesOpen] = useState(false);
  const [diameterOpen, setDiameterOpen] = useState(false);

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.materials.length > 0 ||
    filters.shapes.length > 0 ||
    filters.diameterMin !== null ||
    filters.diameterMax !== null;

  const clearFilters = () => {
    onFiltersChange({
      brands: [],
      materials: [],
      shapes: [],
      diameterMin: null,
      diameterMax: null,
    });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const toggleMaterial = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];
    onFiltersChange({ ...filters, materials: newMaterials });
  };

  const toggleShape = (shape: string) => {
    const newShapes = filters.shapes.includes(shape)
      ? filters.shapes.filter((s) => s !== shape)
      : [...filters.shapes, shape];
    onFiltersChange({ ...filters, shapes: newShapes });
  };

  return (
    <div className="space-y-6 sticky top-32">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-serif font-light">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
            data-testid="button-clear-filters"
          >
            <X className="w-3 h-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Collapsible open={brandsOpen} onOpenChange={setBrandsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium uppercase tracking-wide hover-elevate rounded px-2" data-testid="filter-brands-toggle">
          Brand
          <ChevronDown
            className={`w-4 h-4 transition-transform ${brandsOpen ? "rotate-180" : ""}`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-3">
          {availableBrands.slice(0, 10).map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
                data-testid={`checkbox-brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer flex-1"
              >
                {brand}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <div className="border-t border-border pt-6">
        <Collapsible open={materialsOpen} onOpenChange={setMaterialsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium uppercase tracking-wide hover-elevate rounded px-2" data-testid="filter-materials-toggle">
            Case Material
            <ChevronDown
              className={`w-4 h-4 transition-transform ${materialsOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            {availableMaterials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={filters.materials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                  data-testid={`checkbox-material-${material.toLowerCase().replace(/\s+/g, '-')}`}
                />
                <Label
                  htmlFor={`material-${material}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {material}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="border-t border-border pt-6">
        <Collapsible open={shapesOpen} onOpenChange={setShapesOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium uppercase tracking-wide hover-elevate rounded px-2" data-testid="filter-shapes-toggle">
            Case Shape
            <ChevronDown
              className={`w-4 h-4 transition-transform ${shapesOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            {availableShapes.map((shape) => (
              <div key={shape} className="flex items-center space-x-2">
                <Checkbox
                  id={`shape-${shape}`}
                  checked={filters.shapes.includes(shape)}
                  onCheckedChange={() => toggleShape(shape)}
                  data-testid={`checkbox-shape-${shape.toLowerCase().replace(/\s+/g, '-')}`}
                />
                <Label
                  htmlFor={`shape-${shape}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {shape}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="border-t border-border pt-6">
        <Collapsible open={diameterOpen} onOpenChange={setDiameterOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium uppercase tracking-wide hover-elevate rounded px-2" data-testid="filter-diameter-toggle">
            Diameter (mm)
            <ChevronDown
              className={`w-4 h-4 transition-transform ${diameterOpen ? "rotate-180" : ""}`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="space-y-2">
              <Label htmlFor="diameter-min" className="text-xs">
                Minimum
              </Label>
              <Input
                id="diameter-min"
                type="number"
                placeholder="e.g. 35"
                value={filters.diameterMin || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    diameterMin: e.target.value ? Number(e.target.value) : null,
                  })
                }
                data-testid="input-diameter-min"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="diameter-max" className="text-xs">
                Maximum
              </Label>
              <Input
                id="diameter-max"
                type="number"
                placeholder="e.g. 44"
                value={filters.diameterMax || ""}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    diameterMax: e.target.value ? Number(e.target.value) : null,
                  })
                }
                data-testid="input-diameter-max"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
