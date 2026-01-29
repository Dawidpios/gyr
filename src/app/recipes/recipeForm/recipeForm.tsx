"use client";
import { PlusCircle, Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@components/components/ui/button";
import { Card, CardContent } from "@components/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";
import { Textarea } from "@components/components/ui/textarea";
import addRecipe from "./add-recipe";
import { useState } from "react";
import revalidate from "@lib/revalidate";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { UNITS, formSchema } from "./constans";

export function RecipeForm() {
  const session = useSession();

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
  });

  const [timeCooking, setTimeCooking] = useState<number | "">("");
  const [portion, setPortion] = useState<number | "">("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      ingredients: [],
      image: "",
    },
  });

  const addIngredient = () => {
    if (!newIngredient.name || !newIngredient.amount || !newIngredient.unit)
      return;

    const currentIngredients = form.getValues("ingredients") || [];
    form.setValue("ingredients", [
      ...currentIngredients,
      {
        name: newIngredient.name,
        amount: parseFloat(newIngredient.amount),
        unit: newIngredient.unit,
      },
    ]);

    setNewIngredient({ name: "", amount: "", unit: "" });
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = form.getValues("ingredients");
    form.setValue(
      "ingredients",
      currentIngredients.filter((_, i) => i !== index)
    );
  };

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (session.status !== "authenticated") {
      toast.error("You must be logged in to add a recipe.");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    formData.append("authorId", session.data?.user.id || "");
    await addRecipe(formData);
    revalidate(["/recipes", "/search"]);
    form.reset();
    setTimeCooking("");
    setPortion("");
    toast.success("Recipe added successfully!");
  }

  const setInputValue = (
    field: keyof z.infer<typeof formSchema>,
    value: string | number
  ) => {
    form.setValue(field, value, { shouldValidate: true });
  };

  return (
    <>
      <Card className="border-none shadow-none w-full justify-center pl-20 pr-8">
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4 flex flex-col md:flex-col items-start"
            >
              <div className="w-full md:w-1/3 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Spaghetti Carbonara"
                          {...field}
                          className="bg-secondary-accent/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Ingredients</FormLabel>
                      <div className="space-y-4">
                        <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:items-end">
                          <Input
                            className="w-full sm:max-w-xs bg-secondary-accent/10"
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
                            className="w-full sm:max-w-[100px] bg-secondary-accent/10"
                            type="number"
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
                            className="w-full sm:max-w-fit rounded-md border border-input bg-background px-3 p-1 text-base shadow- text-s text-text-muted focus-visible:border-[var(--color-primary-accent)] focus-visible:ring-[var(--color-primary-accent)]/50 focus-visible:ring-[3px] bg-secondary-accent/10"
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
                            className="w-full sm:w-auto bg-primary-accent/50 hover:bg-primary-accent/70 text-main hover:cursor-pointer"
                            type="button"
                            onClick={addIngredient}
                          >
                            <Plus className="h-4 w-4 text-xs" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {field.value?.map((ingredient, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span className="flex-1">
                                {ingredient.amount} {ingredient.unit}{" "}
                                {ingredient.name}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="hover:cursor-pointer"
                                onClick={() => removeIngredient(index)}
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
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cook pasta. Fry pancetta. Mix eggs and cheese. Combine all ingredients."
                          className="min-h-[100px] bg-secondary-accent/10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cooking Time (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            value={timeCooking}
                            onChange={(e) => {
                              setTimeCooking(Number(e.target.value));
                              setInputValue("time", Number(e.target.value));
                            }}
                            className="bg-secondary-accent/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="portion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servings</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            value={portion}
                            onChange={(e) => {
                              setPortion(Number(e.target.value));
                              setInputValue("portion", Number(e.target.value));
                            }}
                            className="bg-secondary-accent/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full md:w-1/3 font-bold bg-primary-accent hover:bg-primary-accent/80 hover:cursor-pointer self-center md:self-start p-0 m-0"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Recipe
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default RecipeForm;
