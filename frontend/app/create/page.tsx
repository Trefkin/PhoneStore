"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

export default function CreatePhonePage() {
  const router = useRouter();
  const {setUser} = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, [setUser]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Əvvəlcə daxil olun!");
      setLoading(false);
      return;
    }
    const res = await fetch("http://localhost:5000/api/phones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      setError(resData.error || "Xəta baş verdi");
      setLoading(false);
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Yeni Telefon Əlavə Et
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium">Ad</label>
          <input
            type="text"
            {...register("name", { required: "Ad tələb olunur" })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Telefon adı"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Brend</label>
          <input
            type="text"
            {...register("brand", { required: "Brend tələb olunur" })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Məsələn, Apple"
          />
          {errors.brand && <span className="text-red-500 text-xs">{errors.brand.message}</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Qiymət (AZN)</label>
          <input
            type="number"
            {...register("price", { required: "Qiymət tələb olunur", min: 1 })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Qiymət"
          />
          {errors.price && <span className="text-red-500 text-xs">{errors.price.message}</span>}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Təsvir</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Qısa təsvir (istəyə bağlı)"
            rows={2}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Şəkil linki</label>
          <input
            type="url"
            {...register("imageUrl")}
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