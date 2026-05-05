"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = useSearchParams().get("page") || "1";

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  //console.log(`total` + totalPages);
  if (totalPages <= 1) return null;
  return (
    <div className="flex gap-4 text-sm font-semibold">
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          href={createPageURL(index + 1)}
          key={index}
          className={`${currentPage === `${index + 1}` ? "text-black" : "text-black/50"}`}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
