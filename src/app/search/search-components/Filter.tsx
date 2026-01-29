import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/components/ui/card";
import { Checkbox } from "@components/components/ui/checkbox";
import { Label } from "@components/components/ui/label";

export default function FilterContent({
  types,
  selectedTypes,
  onTypeChange
}: {
  types: string[];
  selectedTypes: string[];
  onTypeChange: (type: string, checked: boolean) => void;
  onClearAll: () => void;
  activeFiltersCount: number;
}) {
  return (
    <>
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
      </div>

      {/* Type Filter */}
      <Card className="bg-secondary-accent/10">
        <CardHeader className="">
          <CardTitle className="text-base italic text-primary-accent">Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {types.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onCheckedChange={(checked) =>
                  onTypeChange(type, checked as boolean)
                }
              />
              <Label htmlFor={`type-${type}`} className="text-sm font-normal">
                {type.at(0)?.toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}