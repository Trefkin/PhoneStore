import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[nextauth]";

// GET: Bütün telefonları gətir
export async function GET() {
  const phones = await prisma.phone.findMany({ include: { user: true } });
  return NextResponse.json(phones);
}

// POST: Yeni telefon əlavə et (yalnız login olmuş user üçün)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { name, brand, price, description, imageUrl } = data;

  if (!name || !brand || !price) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const phone = await prisma.phone.create({
    data: {
      name,
      brand,
      price,
      description,
      imageUrl,
      userId: session.user.id,
    },
  });

  return NextResponse.json(phone, { status: 201 });
}