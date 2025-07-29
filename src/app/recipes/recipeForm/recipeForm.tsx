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


const ingredientSchema = z.object({
  name: z.string().min(1, "Nazwa składnika jest wymagana"),
  amount: z.coerce.number().min(0.1, "Ilość musi być większa niż 0"),
  unit: z.string().min(1, "Jednostka jest wymagana"),
});

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Recipe name must be at least 2 characters.",
  }),
  ingredients: z.array(ingredientSchema).min(1, {
    message: "Please add at least one ingredient.",
  }),
  desc: z.string().min(10, {
    message: "Instructions must be at least 10 characters.",
  }),
  time: z.coerce.number().min(1, {
    message: "Cooking time must be at least 1 minute.",
  }),
  portion: z.coerce.number().min(1, {
    message: "Servings must be at least 1.",
  }),
  image: z.string().optional(),
});

const UNITS = ["g", "ml", "szt", "łyżka", "łyżeczka", "szklanka"];

export function RecipeForm() {
  const session = useSession()

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
  });
  // const fileRef = useRef<null | HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      time: 0,
      portion: 0,
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
    if(session.status !== "authenticated") return

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, JSON.stringify(value));
      }
    });
    formData.append("authorId", session.data?.user.id || "");
    await addRecipe(formData);
    revalidate("/recipes");
    form.reset();
  }
  
  // const setImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const url = await addImage(e)
  //   form.setValue("image", url as string);
  // };

  return (
    <Card className="m-2 w-3/4 justify-center">
      <CardContent className="m-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nazwa składnika"
                        value={newIngredient.name}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Ilość"
                        value={newIngredient.amount}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            amount: e.target.value,
                          })
                        }
                        className="w-24"
                      />
                      <select
                        value={newIngredient.unit}
                        onChange={(e) =>
                          setNewIngredient({
                            ...newIngredient,
                            unit: e.target.value,
                          })
                        }
                        className="w-32 rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="">Wybierz jednostkę</option>
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                      <Button type="button" onClick={addIngredient}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {field.value?.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="flex-1">
                            {ingredient.amount} {ingredient.unit}{" "}
                            {ingredient.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeIngredient(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <FormDescription>
                    Dodaj składniki z ilością i jednostką.
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
                      <Input type="number" min={1} {...field} />
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
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div style={{ display: "none" }} className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        style={{ display: "none" }}
                        type="file"
                        ref={fileRef}
                        onChange={setImage}
                        value={undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
            {/* <Button
              type="button"
              className="w-1/4"
              onClick={() => fileRef.current && fileRef.current.click()}
            >
              Add image
            </Button> */}
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
