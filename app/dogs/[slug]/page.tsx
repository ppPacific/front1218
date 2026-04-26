import React, { Suspense } from "react";

const DogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = params.then((p) => p.slug);
  return (
    <main>
      <Suspense fallback={<div>Loading..</div>}>
        testing
        {/*<DogDetails params={slug} />*/}
      </Suspense>
    </main>
  );
};

export default DogDetailPage;
