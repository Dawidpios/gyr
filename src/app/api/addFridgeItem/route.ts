import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import findItem from "./findItem";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const itemExists = await findItem(data.name);
    if (itemExists) {
      await prisma.fridgeItem
        .update({
          where: {
            name: data.name,
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
