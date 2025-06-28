"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreatePhonePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

   if (!session?.user || !(session.user as any).id) {
  setError("Əvvəlcə daxil olun!");
  setLoading(false);
  return;
}

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Xəta baş verdi");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Yeni Telefon Əlavə Et</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Ad</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Telefon adı"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Brend</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Məsələn, Apple"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Qiymət (AZN)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            min={1}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Qiymət"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Təsvir</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Qısa təsvir (istəyə bağlı)"
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Şəkil linki</label>
          <input
            type="url"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="https://..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Yüklənir..." : "Əlavə et"}
        </button>
      </form>
    </div>
  );
}