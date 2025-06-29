import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { hash } from "bcryptjs";
import { setCorsHeaders } from "../../../../lib/cors";
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: setCorsHeaders(),
  });
}
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log("REGISTER BODY:", email, password);
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email və şifrə tələb olunur" },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Bu email artıq istifadə olunur" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Xəta baş verdi" },
      { status: 500 }
    );
  }
}
