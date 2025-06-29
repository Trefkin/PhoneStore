"use client";
import { useEffect } from "react";
import { useItemStore } from "../store/itemStore";
import PhoneCard from "../components/PhoneCard";
import { useAuthStore } from "@/store/authStore";
import StatBox from "../components/StatBox";
import { FaBox, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "./globals.css";

export default function HomePage() {
  const { phones, setPhones, removePhone } = useItemStore();
  const { user, setUser } = useAuthStore();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({ ...parsedUser, id: parsedUser._id ?? parsedUser.id });
    }
  }, [setUser]);

  useEffect(() => {
    console.log("user:", user);
  }, [user]);
// Statistikalar
  const total = phones.length;
  const active = phones.filter((p: any) => p.status === "active").length;
  const pending = phones.filter((p: any) => p.status === "pending").length;
  const inactive = phones.filter((p: any) => p.status === "inactive").length;
  const avgPrice =
    phones.length > 0
      ? Math.round(
          phones.reduce((sum: number, p: any) => sum + Number(p.price || 0), 0) / phones.length
        )
      : 0;
  // Telefonları backend-dən gətir
  useEffect(() => {
    const fetchPhones = async () => {
      const res = await fetch("http://localhost:5000/api/phones");
      const data = await res.json();
      setPhones(data);
      console.log(data);
    };
    fetchPhones();
  }, [setPhones]);

  // Telefonu sil
  const handleDelete = async (id: any) => {
    if (!confirm("Silinsin?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/phones/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      removePhone(id);
      const res = await fetch("http://localhost:5000/api/phones");
      const data = await res.json();
      setPhones(data);
    }
  };

  return (
    <div className="container mx-auto px-12 py-8">
      <h1 className="text-3xl font-bold mb-6 px-4">Telefonlar mağazası</h1>

        <div className="flex flex-wrap gap-12 mb-8 justify-center">
        <StatBox
          icon={<FaBox className="text-blue-500" />}
          label="Total Items"
          value={total}
          color="bg-blue-50"
        />
        <StatBox
          icon={<FaCheckCircle className="text-green-500" />}
          label="Active"
          value={active}
          color="bg-green-50"
        />
        <StatBox
          icon={<FaClock className="text-yellow-500" />}
          label="Pending"
          value={pending}
          color="bg-yellow-50"
        />
        <StatBox
          icon={<FaTimesCircle className="text-red-500" />}
          label="Inactive"
          value={inactive}
          color="bg-red-50"
        />
        <StatBox
          icon={<FaBox className="text-purple-500" />}
          label="Ortalama Qiymət"
          value={avgPrice + " AZN"}
          color="bg-purple-50"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {phones.length === 0 && (
          <div className="col-span-full text-gray-500">Telefon yoxdur</div>
        )}
        {phones.map((phone: any) => (
          <PhoneCard
            key={phone._id}
            {...phone}
            id={phone._id}
            canEdit={
              user &&
              user.id &&
              phone.userId._id &&
              user.id.toString() === phone.userId._id?.toString()
            }
            onDelete={
              user &&
              user.id &&
              phone.userId._id &&
              user.id.toString() === phone.userId._id?.toString()
                ? () => handleDelete(phone._id)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
