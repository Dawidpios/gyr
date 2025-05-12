import { NextResponse } from "next/server";
import prisma from "@lib/prisma";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const product = await prisma.fridgeItem.create({
      data: {
        name: data.name,
        quantity: data.quantity,
        category: data.category,
        expiryDate: data.expiryDate || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}