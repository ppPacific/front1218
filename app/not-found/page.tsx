import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`flex justify-center align-middle mx-auto`}>
        <h2>
          Your requested page not found or not authorized, please go back.
        </h2>
      </div>
    </Suspense>
  );
};
export default Page;
