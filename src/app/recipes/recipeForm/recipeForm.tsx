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
import toast, { Toaster } from "react-hot-toast";
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
    revalidate("/recipes");
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
      <Card className="border-none shadow-none w-full justify-center">
        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8 flex gap-6"
            >
              <div className="w-3/4 space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipe Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Spaghetti Carbonara" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem className="flex flex-col ">
                      <FormLabel>Ingredients</FormLabel>
                      <div className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            className="flex-1"
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
                            className="w-24"
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
                            className="w-fit rounded-md border border-input bg-background px-3 py-2"
                            value={newIngredient.unit}
                            onChange={(e) =>
                              setNewIngredient({
                                ...newIngredient,
                                unit: e.target.value,
                              })
                            }
                          >
                            <option value="">Unit of measurement</option>
                            {UNITS.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                          <Button
                            className="hover:cursor-pointer hover:bg-black/80"
                            type="button"
                            onClick={addIngredient}
                          >
                            <Plus className="h-4 w-4" />
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
                          className="min-h-[100px]"
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
                className="w-1/4 mt-4 hover:bg-black/90 hover:cursor-pointer"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Recipe
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster position="top-center" />
    </>
  );
}

export default RecipeForm;
