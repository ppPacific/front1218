import { dogsearching } from "@/lib/data/dogsearching";
import React from "react";
import DogThumbnail from "@/components/DogThumbnail";
import Pagination from "@/components/Pagination";

export default async function ResultDetails({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const { dogs } = await dogsearching(query, currentPage, 8);
  // ...
  console.log(`currentP ${currentPage}, query ${query}`);
  return (
    <div>
      <section>
        {dogs.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
            No dogs found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-4">
            {dogs.map((dog) => (
              <DogThumbnail key={dog._id} {...dog} />
            ))}
            {/*<div className="mt-5 flex w-full justify-center">*/}
            {/*  <Pagination totalPages={totalPages} />*/}
            {/*</div>*/}
          </div>
        )}
      </section>
    </div>
  );
}
