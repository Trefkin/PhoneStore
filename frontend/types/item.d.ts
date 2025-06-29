// types/item.ts
export type Phone = {
  _id: string;
  id?: string; // Optional frontend alias
  userId: {
    _id: string;
    // other user properties if needed
  };
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  status?: "active" | "inactive" | "pending";
};