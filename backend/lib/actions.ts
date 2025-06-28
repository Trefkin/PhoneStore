"use server";

import { prisma } from "./prisma";

// Telefonları gətir
export async function getPhones() {
  return prisma.phone.findMany({ include: { user: true } });
}

// Tək telefonu gətir
export async function getPhoneById(id: number) {
  return prisma.phone.findUnique({ where: { id }, include: { user: true } });
}

// Yeni telefon əlavə et
export async function createPhone(data: {
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  userId: string;
}) {
  return prisma.phone.create({ data });
}

// Telefonu yenilə
export async function updatePhone(id: number, data: {
  name?: string;
  brand?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}) {
  return prisma.phone.update({ where: { id }, data });
}

// Telefonu sil
export async function deletePhone(id: number) {
  return prisma.phone.delete({ where: { id }});
}