"use server";
import prisma from "@components/lib/prisma";
import revalidate from "@components/lib/revalidate";

export const updateItemQuantity = async (
  itemId: string,
  itemQuantity: number
) => {
  try {
       await prisma.fridgeItem.update({
      where: { id: itemId },
      data: { quantity: { increment: itemQuantity } }
    });
    revalidate("/fridge");
  } catch (err) {
    console.log("Error updating item quantity:", err);
  }
};

export const deleteItem = async (fridgeId: string) => {
  try {
    await prisma.fridgeItem.delete({
      where: { id: fridgeId },
    });
    revalidate("/fridge");
  } catch (err) {
    console.log("Error deleting item:", err);
  }
};
