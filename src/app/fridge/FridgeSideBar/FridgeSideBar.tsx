"use client";

import { Plus } from "lucide-react";
import { Button } from "@components/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/components/ui/form";
import { Input } from "@components/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import revalidate from "@components/lib/revalidate";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Quantity must be at least 1.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
});

type ProductFormValues = z.infer<typeof formSchema>;

type ProductSidebarProps = {
  categories: { value: string; label: string }[];
  id: string;
};

export function FridgeSideBar({ categories, id }: ProductSidebarProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 1,
      category: "",
    },
  });
  const { handleSubmit, formState, control, reset } = form;

  async function onSubmit(values: ProductFormValues) {
    try {
      await fetch("/api/addFridgeItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values, fridgeId: id }),
      });
      reset({
        name: "",
        quantity: 1,
        category: "",
      });
      revalidate(["/fridge", "/search"]);
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product.");
    }
  }

  return (
    <div className="bg-secondary-accent/10 w-full md:w-80 lg:w-96 p-6 lg:p-2 border-l border-gray-200 sm:h-screen">
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue
                          className="bg-white"
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full bg-primary-accent hover:bg-primary-accent/80 hover:cursor-pointer ${
                formState.isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={formState.isSubmitting}
            >
              <Plus className="mr-2 h-4 w-4" />
              {formState.isSubmitting ? "Adding..." : "Add Product"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
