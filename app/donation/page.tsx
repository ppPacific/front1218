import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h2>Sponsor a dog, save a life!</h2>
      </div>
    </Suspense>
  );
};
export default Page;
