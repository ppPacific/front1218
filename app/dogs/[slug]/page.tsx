import React, { Suspense } from "react";
import DogDetails from "@/components/DogDetails";

const DogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <DogDetails params={slug} />
    </Suspense>
  );
};

export default DogDetailPage;
