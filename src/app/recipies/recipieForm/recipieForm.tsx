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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";
import { Textarea } from "@components/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Recipe name must be at least 2 characters.",
  }),
  ingredients: z.string().min(5, {
    message: "Please add at least one ingredient.",
  }),
  instructions: z.string().min(10, {
    message: "Instructions must be at least 10 characters.",
  }),
  cookingTime: z.coerce.number().min(1, {
    message: "Cooking time must be at least 1 minute.",
  }),
  servings: z.coerce.number().min(1, {
    message: "Servings must be at least 1.",
  }),
  image: z.string().optional(),
});

export function RecipeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      ingredients: "",
      instructions: "",
      cookingTime: 30,
      servings: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
  });

  function onSubmit() {
    
    // onAddRecipe(recipe)
    form.reset();
  }

  return (
    <Card className="m-2 w-3/4 justify-center">
      <CardContent className="m-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
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
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="200g spaghetti
                        100g pancetta
                        2 eggs
                        50g parmesan cheese"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter each ingredient on a new line.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instructions"
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
                name="cookingTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooking Time (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RecipeForm;
