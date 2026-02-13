"use client";
import { Plus, X } from "lucide-react";
import { Button } from "@components/components/ui/button";

import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";

import { UNITS, formSchema } from "../constans";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface IngredientsFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  newIngredient: {
    name: string;
    amount: string;
    unit: string;
  };
  setNewIngredient: React.Dispatch<
    React.SetStateAction<{
      name: string;
      amount: string;
      unit: string;
    }>
  >;
  addIngredient: () => void;
  removeIngredient?: (index: number) => void;
}

const IngredientsForm = ({
  form,
  newIngredient,
  setNewIngredient,
  addIngredient,
  removeIngredient,
}: IngredientsFormProps) => {
  return (
    <FormField
      control={form.control}
      name="ingredients"
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <div className="space-y-4">
            <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-end">
              <Input
                className="w-full bg-secondary-accent/10"
                placeholder="Ingredient name"
                value={newIngredient.name}
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    name: e.target.value,
                  })
                }
              />
              <Input
                className="w-full bg-secondary-accent/10"
                type="number"
                min={1}
                placeholder="Amount"
                value={newIngredient.amount}
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    amount: e.target.value,
                  })
                }
              />
              <select
                className="w-full rounded-md border border-input bg-background px-3 p-1 text-base shadow- text-s text-text-muted focus-visible:border-[var(--color-primary-accent)] focus-visible:ring-[var(--color-primary-accent)]/50 focus-visible:ring-[3px] bg-secondary-accent/10"
                value={newIngredient.unit}
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    unit: e.target.value,
                  })
                }
              >
                <option className="bg-secondary-accent/10" value="">
                  Unit
                </option>
                {UNITS.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <Button
                className="w-full bg-primary-accent/50 hover:bg-primary-accent/70 text-main hover:cursor-pointer"
                type="button"
                onClick={addIngredient}
              >
                <Plus className="h-4 w-4 text-xs" />
              </Button>
            </div>

            <div className="space-y-2">
              {field.value?.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="hover:cursor-pointer"
                    onClick={() => removeIngredient && removeIngredient(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <FormDescription>
            Add ingredients with amount and unit.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default IngredientsForm;
