import { ReactNode } from "react";

interface StatBoxProps {
  icon: ReactNode;
  label: string;
  value: number | string;
  color?: string; // rəng üçün (məs: bg-green-100)
}

export default function StatBox({ icon, label, value, color = "bg-gray-100" }: StatBoxProps) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl shadow-sm border border-gray-100 p-5 min-w-[160px] ${color}`}>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white text-2xl shadow-sm">
          {icon}
        </span>
        <span className="text-xs text-gray-500 font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}