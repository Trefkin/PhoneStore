import Link from "next/link";
import { FaMobileAlt } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiOutlineDeviceTablet, HiOutlineDevicePhoneMobile } from "react-icons/hi2";

interface PhoneCardProps {
  id: number | string;
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  canEdit?: boolean;
  onDelete?: () => void;
  status?: "active" | "inactive" | "pending";
}

const statusMap = {
  active: {
    text: "Active",
    color: "bg-green-100 text-green-700",
  },
  inactive: {
    text: "Inactive",
    color: "bg-red-100 text-red-700",
  },
  pending: {
    text: "Pending",
    color: "bg-yellow-100 text-yellow-700",
  },
};

export default function PhoneCard({
  id,
  name,
  brand,
  price,
  description,
  imageUrl,
  canEdit = false,
  onDelete,
  status = "active",
}: PhoneCardProps) {
  // İkona məhsul növünə görə dəyişmək üçün nümunə (istəyə görə dəyiş)
  const icon = <FaMobileAlt className="text-xl" />;

  const statusObj = statusMap[status] || statusMap.active;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col min-w-[260px] max-w-xs transition hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-500">
          {icon}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusObj.color}`}>
          {statusObj.text}
        </span>
      </div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-24 object-contain rounded mb-2 bg-gray-50"
        />
      ) : (
        <div className="w-full h-24 bg-gray-100 flex items-center justify-center rounded text-gray-400 mb-2">
          No Image
        </div>
      )}
      <h3 className="text-lg font-semibold mb-1">{name}</h3>
      <div className="text-xs text-gray-500 mb-1">{brand}</div>
      {description && (
        <div className="text-gray-500 text-xs mb-2 line-clamp-2">{description}</div>
      )}
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-blue-700 font-bold">{price} AZN</span>
          <span className="text-xs text-gray-400 ml-2">ID: #{id}</span>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Link
              href={`/edit/${id}`}
              className="p-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
              title="Redaktə et"
            >
              <MdEdit size={18} />
            </Link>
            <button
              onClick={onDelete}
              className="p-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
              title="Sil"
            >
              <MdDelete size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}