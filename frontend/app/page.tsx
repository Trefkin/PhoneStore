"use client";
import { useEffect } from "react";
import { useItemStore } from "../store/itemStore";
import PhoneCard from "../components/PhoneCard";
import { useSession } from "next-auth/react";
import './globals.css';

export default function HomePage() {
  const { phones, setPhones, removePhone } = useItemStore();
  const { data: session } = useSession();

  // Telefonları backend-dən gətir
  useEffect(() => {
    const fetchPhones = async () => {
      const res = await fetch("/api/items");
      const data = await res.json();
      setPhones(data);
    };
    fetchPhones();
  }, [setPhones]);

  // Telefonu sil
  const handleDelete = async (id: number) => {
    if (!confirm("Silinsin?")) return;
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    if (res.ok) {
      removePhone(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Telefonlar mağazası</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {phones.length === 0 && (
          <div className="col-span-full text-gray-500">Telefon yoxdur</div>
        )}
        {phones.map((phone:any) => (
          <PhoneCard
            key={phone.id}
            {...phone}
            canEdit={
              "id" in (session?.user ?? {}) &&
              (session?.user as any).id === phone.userId
            }
            onDelete={
              "id" in (session?.user ?? {}) &&
              (session?.user as any).id === phone.userId
                ? () => handleDelete(phone.id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
