import React, { Suspense } from "react";
import Image from "next/image";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <div className="mt-[-70]">
          <Image
            src={"/images/logo_bringlovehome_b.png"}
            alt={"Bring Love Home"}
            // fill
            className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            width={300}
            height={300}
          />
        </div>
        <h2>Sponsor a dog, save a life!</h2>
      </section>
    </Suspense>
  );
};
export default Page;
