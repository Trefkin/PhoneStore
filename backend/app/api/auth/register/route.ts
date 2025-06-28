import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email və şifrə tələb olunur" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Bu email artıq istifadə olunur" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}