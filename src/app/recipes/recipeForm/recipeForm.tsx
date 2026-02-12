"use client";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@components/components/ui/button";
import { Card, CardContent } from "@components/components/ui/card";
import {
  Form,
  FormControl,
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
import { formSchema } from "./constans";
import IngredientsForm from "./formField/Ingredients";

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
  const {
    formState: { isSubmitting },
  } = form;
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
      currentIngredients.filter((_, i) => i !== index),
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
    value: string | number,
  ) => {
    form.setValue(field, value, { shouldValidate: true });
  };

  return (
    <>
      <Card className="border-none shadow-none w-full justify-center pl-8 sm:pl-20 pr-8">
        <CardContent className="p-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4 flex flex-col flex-wrap sm:flex-col sm:items-center"
            >
              <div className="w-full sm:w-1/2 space-y-6">
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
                <IngredientsForm
                  form={form}
                  newIngredient={newIngredient}
                  setNewIngredient={setNewIngredient}
                  addIngredient={addIngredient}
                  removeIngredient={removeIngredient}
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
                        <FormLabel className="text-xs">
                          Cooking Time (minutes)
                        </FormLabel>
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
                        <FormLabel className="text-xs">Servings</FormLabel>
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
                className={`w-full sm:w-1/2 font-bold bg-primary-accent hover:bg-primary-accent/80 hover:cursor-pointer self-center p-0 m-0 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {isSubmitting ? "Adding..." : "Add Recipe"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}

export default RecipeForm;
