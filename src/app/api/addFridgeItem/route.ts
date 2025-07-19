import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import findItem from "./findItem";

export async function POST(req: Request) {
  const { values, fridgeId } = await req.json();
  const data = { ...values, fridgeId };
  if (!data.name || !data.fridgeId || !data.quantity || !data.category) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const itemExists = await findItem(data.name, data.fridgeId);
    if (itemExists) {
      await prisma.fridgeItem
        .update({
          where: {
            name_fridgeId: {
              name: data.name,
              fridgeId: data.fridgeId,
            },
          },
          data: {
            quantity: {
              increment: data.quantity,
            },
          },
        })
        .catch((err) => {
          console.error("Error updating item:", err);
        });
      return NextResponse.json({ message: "Item updated" }, { status: 200 });
    }

    const product = await prisma.fridgeItem.create({
      data: {
        fridgeId: data.fridgeId,
        name: data.name,
        quantity: data.quantity,
        category: data.category,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
