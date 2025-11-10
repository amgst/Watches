import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: "brand" | "diameter" | "name";
  onSortChange: (sort: "brand" | "diameter" | "name") => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by brand, model, or reference..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-14 text-base rounded-lg"
          data-testid="input-search"
        />
      </div>
      
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-full md:w-48 h-14 rounded-lg" data-testid="select-sort">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="brand" data-testid="option-sort-brand">
            Sort by Brand
          </SelectItem>
          <SelectItem value="name" data-testid="option-sort-name">
            Sort by Name
          </SelectItem>
          <SelectItem value="diameter" data-testid="option-sort-diameter">
            Sort by Diameter
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
