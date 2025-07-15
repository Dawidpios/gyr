import { NextRequest, NextResponse } from "next/server";
import prisma from "@components/lib/prisma";
import { comparePassword } from "./comparePassword";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;
  console.log("COS SIE DZIEJE?");
  if (!email || !password) {
    return NextResponse.json(
      { msg: "You need to pass email and password" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return NextResponse.json({ msg: "User not found" }, { status: 404 });
  }
  const authUser = await comparePassword(password, user.password);
  console.log("authUser", authUser);
  if (authUser) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPass } = user;
    return NextResponse.json({ ...userWithoutPass }, { status: 200 });
  } else {
    return NextResponse.json({ msg: "Authentication failed" }, { status: 401 });
  }
}
