import React, { ReactNode } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CgMoreO } from "react-icons/cg";
import Link from "next/link";

interface CardDataStatsProps {
  // title: string;
  name: string;
  total: string;
  id: number;
  // levelUp?: boolean;
  // levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  // title,
  name,
  total,
  // levelUp,
  // levelDown,
  children,
  id,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default">
      <div className="h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 ">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black">{name}</h4>
          {/* <span className="text-sm font-medium">{title}</span> */}
        </div>

        <span className={`flex items-center gap-1 text-sm font-medium`}>
          {total}
        </span>
      </div>

      <div className="flex justify-between mt-5">
        <Link href={`/dashboard/vendor/foods/`}>
          <button className="text-blue-600">
            <CgMoreO size={20} />
          </button>
        </Link>
        <Link href={`/dashboard/vendor/foods/${id}`}>
          <button className="text-green-600">
            <FaEdit size={20} />
          </button>
        </Link>
        <button className="text-[#dc2626]">
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardDataStats;
