import React, { Suspense } from "react";
import DogDetails from "@/components/DogDetails";
import { Skeleton } from "@/components/ui/skeleton";

const DogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);
  return (
    <Suspense
      fallback={
        <div className="flex w-full max-w-lg flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      }
    >
      <DogDetails params={slug} />
    </Suspense>
  );
};

export default DogDetailPage;
