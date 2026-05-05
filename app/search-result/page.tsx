import { dogs } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ResultDetails from "@/components/SearchResults";
import Search from "@/components/Search";

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim().toLowerCase() || "";
  const currentPage = Number(params?.page) || 1;

  return (
    <div className={"px-4 flex flex-col gap-y-10"}>
      <h1 className={"text-center text-xl"}>RESULTS FOR "{q}"</h1>

      <Search placeholder={"search doggies..."} />
      <Suspense
        key={q + currentPage}
        fallback={
          <div className={`flex flex-col justify-center p-6`}>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        }
      >
        <ResultDetails currentPage={currentPage} query={q} />
      </Suspense>
    </div>
  );
}
