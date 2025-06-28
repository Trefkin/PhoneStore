import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[nextauth]";

// GET: Tək telefon məlumatı
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const phone = await prisma.phone.findUnique({
    where: { id: Number(params.id) },
    include: { user: true },
  });
  if (!phone) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(phone);
}

// PUT: Telefon məlumatını yenilə (yalnız sahib user üçün)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const phone = await prisma.phone.findUnique({
    where: { id: Number(params.id) },
  });
  if (!phone) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (phone.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();
  const { name, brand, price, description, imageUrl } = data;

  const updated = await prisma.phone.update({
    where: { id: Number(params.id) },
    data: { name, brand, price, description, imageUrl },
  });

  return NextResponse.json(updated);
}

// DELETE: Telefonu sil (yalnız sahib user üçün)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const phone = await prisma.phone.findUnique({
    where: { id: Number(params.id) },
  });
  if (!phone) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (phone.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.phone.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ success: true })}