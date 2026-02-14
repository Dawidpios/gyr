import prisma from "@components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const { recipeId, userId } = data;

  let list = await prisma.list.findUnique({ where: { userId } });

  if (!list) {
    list = await prisma.list.create({
      data: { name: "My Shopping List", user: { connect: { id: userId } } },
    });
  }

  await prisma.recipes.update({
    where: { id: recipeId },
    data: { listId: list.id },
  });

  const ingredients = await prisma.ingredient.findMany({
    where: { recipeId, listId: null },
  });

  for (const ingredient of ingredients) {
    const normalizedName = ingredient.name.trim().toLowerCase();
    const normalizedUnit = ingredient.unit?.trim().toLowerCase() || null;

    const allListIngredients = await prisma.ingredient.findMany({
      where: { listId: list.id },
    });

    const existing = allListIngredients.find(
      (item) =>
        item.name.trim().toLowerCase() === normalizedName &&
        (item.unit?.trim().toLowerCase() || null) === normalizedUnit,
    );

    if (existing) {
      await prisma.ingredient.update({
        where: { id: existing.id },
        data: { amount: (existing.amount ?? 0) + (ingredient.amount ?? 0) },
      });
    } else {
      await prisma.ingredient.create({
        data: {
          name: ingredient.name,
          amount: ingredient.amount,
          unit: ingredient.unit,
          listId: list.id,
          recipeId: recipeId,
        },
      });
    }
  }

  return NextResponse.json({
    status: 200,
    message: "Recipe added to the list",
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ status: 400, message: "Missing userId" });
  }

  const list = await prisma.list.findUnique({
    where: { userId: userId },
    include: {
      ingredients: true,
    },
  });

  if (!list) {
    return NextResponse.json({ status: 404, message: "List not found" });
  }

  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  const { height } = page.getSize();
  let yPosition = height - 50;
  
  // Tytuł
  page.drawText('Shopping List', {
    x: 50,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });
  
  yPosition -= 30;
  
  // Data
  page.drawText(new Date().toLocaleDateString(), {
    x: 50,
    y: yPosition,
    size: 10,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });
  
  yPosition -= 30;
  
  // Składniki
  list.ingredients.forEach((ing, index) => {
    if (yPosition < 50) {
      page = pdfDoc.addPage([595, 842]);
      yPosition = height - 50;
    }
    
    const text = `${index + 1}. ${ing.name} - ${ing.amount} ${ing.unit}`;
    page.drawText(text, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
    
    yPosition -= 20;
  });
  
  const pdfBytes = await pdfDoc.save();
  
  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="shopping-list.pdf"`,
    },
  });
}
