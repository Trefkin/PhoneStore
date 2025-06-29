
export type Phone = {
  _id: string;
  id?: string; 
  userId: {
    _id: string;
  };
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  status?: "active" | "inactive" | "pending";
};