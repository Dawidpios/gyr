import * as z from "zod";

export const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.coerce.number().min(0.1, "Amount must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
});

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Recipe name must be at least 2 characters.",
  }),
  ingredients: z.array(ingredientSchema).min(1, {
    message: "Please add at least one ingredient.",
  }),
  desc: z.string().optional(),
  time: z.coerce.number().min(1, {
    message: "Cooking time must be at least 1 minute.",
  }),
  portion: z.coerce.number().min(1, {
    message: "Servings must be at least 1.",
  }),
  image: z.string().optional(),
});

export const UNITS = ["g", "ml", "pcs", "tablespoon", "teaspoon", "cup"];