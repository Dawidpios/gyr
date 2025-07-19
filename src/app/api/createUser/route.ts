import { NextRequest, NextResponse } from "next/server";
import prisma from "@components/lib/prisma";
import { hashPassword } from "./hashPassword";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, password, email } = body;

  if (!name || !password || !email) {
    return NextResponse.json(
      {
        msg: `Missing arguments name: ${name}, pass: ${password} or email: ${email}`,
      },
      { status: 400 }
    );
  }

  const userExist = await prisma.user.findUnique({ where: { email: email } });

  if (userExist) {
    return NextResponse.json(
      { message: "User already exist" },
      { status: 409 }
    );
  }
  const hashedPassword = await hashPassword(password);
  await prisma.user.create({
    data: { name, password: hashedPassword, email },
  });
  await prisma.fridge.create({
    data: { name: "My Fridge", user: { connect: { email } } },
  });
  await prisma.list.create({
    data: { name: "My Shopping List", user: { connect: { email } } },
  });
  return NextResponse.json(
    { message: "User has been created" },
    { status: 200 }
  );
}
