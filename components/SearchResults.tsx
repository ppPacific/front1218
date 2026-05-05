import { dogsearching } from "@/lib/data/dogsearching";
import React from "react";
import DogThumbnail from "@/components/DogThumbnail";

export default async function ResultDetails({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const filteredDogs = await dogsearching(query);
  const converteddata = JSON.parse(JSON.stringify(filteredDogs));
  // ...

  return (
    <div>
      <section>
        {converteddata.length === 0 ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
            No dogs found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-4">
            {converteddata.map((dog) => (
              <DogThumbnail key={dog._id} {...dog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
