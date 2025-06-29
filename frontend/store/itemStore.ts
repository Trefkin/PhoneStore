import { create } from "zustand";
import { Phone } from '../types/item';

interface ItemStore {
  phones: Phone[];
  setPhones: (phones: Phone[]) => void;
  addPhone: (phone: Phone) => void;
  updatePhone: (phone: Phone) => void;
  removePhone: (id: string) => void;
}

export const useItemStore = create<ItemStore>((set) => ({
  phones: [],
  setPhones: (phones) => set({ phones }),
  addPhone: (phone) => set((state) => ({ 
    phones: [phone, ...state.phones] 
  })),
  updatePhone: (phone) => set((state) => ({
    phones: state.phones.map((p) => 
      p._id === phone._id ? phone : p
    )
  })),
  removePhone: (id) => set((state) => ({
    phones: state.phones.filter((p) => 
      p._id !== id
    )
  })),
}));