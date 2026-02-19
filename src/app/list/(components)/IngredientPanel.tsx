"use client";
import IngredientsForm from "@app/recipes/recipeForm/formField/Ingredients";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@app/recipes/recipeForm/constans";
import { useState } from "react";
import { Form } from "@components/components/ui/form";
import addIngredient from "../helpers/addIngredient";
import revalidate from "@components/lib/revalidate";
import toast from "react-hot-toast";

const IngredientPanel = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      ingredients: [],
      time: 0,
      portion: 0,
      desc: "",
      image: "",
    },
  });

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: "",
    unit: "",
  });

  const handleAddIngredient = async () => {
    try {
      await addIngredient(newIngredient);
      setNewIngredient({ name: "", amount: "", unit: "" });
      revalidate("/list");
      toast.success("Ingredient added successfully!");
    } catch (error) {
      console.error("Error adding ingredient:", error);
      toast.error("Failed to add ingredient.");
    }
  };

  return (
    <div className=" w-full h-fit justify-center items-center ">
      <Form {...form}>
        <section className="flex flex-col gap-3 mb-4">
          <IngredientsForm
            form={form}
            newIngredient={newIngredient}
            setNewIngredient={setNewIngredient}
            addIngredient={handleAddIngredient}
          />
        </section>
      </Form>
    </div>
  );
};

export default IngredientPanel;
