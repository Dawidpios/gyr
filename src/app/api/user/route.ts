import { NextRequest, NextResponse } from "next/server";
import prisma from "@components/lib/prisma";

export async function POST(req: NextRequest) {
  const { id } = await req.json();
  console.log("Received ID:", id);
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}
