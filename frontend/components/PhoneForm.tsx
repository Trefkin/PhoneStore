import { useState } from "react";

interface PhoneFormProps {
  initial?: {
    name?: string;
    brand?: string;
    price?: string | number;
    description?: string;
    imageUrl?: string;
  };
  onSubmit: (data: {
    name: string;
    brand: string;
    price: number;
    description?: string;
    imageUrl?: string;
  }) => void;
  loading?: boolean;
  submitText?: string;
}

export default function PhoneForm({
  initial,
  onSubmit,
  loading = false,
  submitText = "Yadda saxla",
}: PhoneFormProps) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    brand: initial?.brand || "",
    price: initial?.price?.toString() || "",
    description: initial?.description || "",
    imageUrl: initial?.imageUrl || "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.brand || !form.price) {
      setError("Ad, brend və qiymət tələb olunur");
      return;
    }

    const priceNum = Number(form.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError("Qiymət düzgün deyil");
      return;
    }

    onSubmit({
      name: form.name,
      brand: form.brand,
      price: priceNum,
      description: form.description,
      imageUrl: form.imageUrl,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
    >
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
        {loading ? "Yüklənir..." : submitText}
      </button>
    </form>
  );
}