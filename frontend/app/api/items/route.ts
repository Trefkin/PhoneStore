import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:5000/api/phones"; 
export async function GET() {
  const res = await fetch(BACKEND_URL);
  const phones = await res.json();
  return NextResponse.json(phones);
}

export async function POST(req: Request) {
  const data = await req.json();
  const res = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const newPhone = await res.json();
  return NextResponse.json(newPhone, { status: 201 });
}