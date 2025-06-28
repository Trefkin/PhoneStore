import Link from "next/link";

interface PhoneCardProps {
  id: number;
  name: string;
  brand: string;
  price: number;
  description?: string;
  imageUrl?: string;
  canEdit?: boolean;
  onDelete?: () => void;
}

export default function PhoneCard({
  id,
  name,
  brand,
  price,
  description,
  imageUrl,
  canEdit = false,
  onDelete,
}: PhoneCardProps) {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-contain mb-3 rounded"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center mb-3 rounded text-gray-400">
          No Image
        </div>
      )}
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <div className="text-sm text-gray-600 mb-1">{brand}</div>
      <div className="text-blue-700 font-semibold mb-2">{price} AZN</div>
      {description && (
        <div className="text-gray-500 text-sm mb-2 line-clamp-2">{description}</div>
      )}
      <div className="mt-auto flex gap-2">
        <Link
          href={`/edit/${id}`}
          className={`px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600 transition ${!canEdit && "hidden"}`}
        >
          Redaktə et
        </Link>
        {canEdit && onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 rounded text-sm bg-red-500 text-white hover:bg-red-600 transition"
          >
            Sil
          </button>
        )}
      </div>
    </div>
  );
}