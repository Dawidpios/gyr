import { Checkbox } from "@components/components/ui/checkbox";
import { Label } from "@components/components/ui/label";
import { CheckedState } from "@radix-ui/react-checkbox";

const FilterPanel = ({filterIngredients} : { filterIngredients: (checked: CheckedState) => void }) => {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <Checkbox
        id="filter-ingredients"
        className="data-[state=checked]:bg-primary-accent data-[state=checked]:border-primary-accent"
        onCheckedChange={(checked) => {
          filterIngredients(checked)
        }}
      ></Checkbox>
      <Label
        htmlFor="filter-ingredients"
        className="text-sm font-medium text-primary/80 cursor-pointer hover:text-primary transition-colors"
      >
        Show items not in fridge or low on stock
      </Label>
    </div>
  );
};

export default FilterPanel;
