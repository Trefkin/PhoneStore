import { create } from "zustand";

export interface Phone {
  id: number;
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ItemStore {
  phones: Phone[];
  setPhones: (phones: Phone[]) => void;
  addPhone: (phone: Phone) => void;
  updatePhone: (phone: Phone) => void;
  removePhone: (id: number) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  phones: [],
  setPhones: (phones) => set({ phones }),
  addPhone: (phone) =>
    set((state) => ({ phones: [phone, ...state.phones] })),
  updatePhone: (phone) =>
    set((state) => ({
      phones: state.phones.map((p) => (p.id === phone.id ? phone : p)),
    })),
  removePhone: (id) =>
    set((state) => ({
      phones: state.phones.filter((p) => p.id !== id),
    })),
}));