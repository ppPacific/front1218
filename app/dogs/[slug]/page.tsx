import React, { Suspense } from "react";
import DogDetails from "@/components/DogDetails";

async function DogDetailsWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <DogDetails slug={slug} />;
}
const DogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <DogDetailsWrapper params={params} />
    </Suspense>
  );
};

export default DogDetailPage;
