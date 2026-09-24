import React from "react";
import Image from "next/image";

const TopLogo = () => {
  return (
    <Image
      src={"/images/logo_bringlovehome_b.png"}
      alt={"Bring Love Home"}
      // fill
      className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      width={300}
      height={300}
    />
  );
};
export default TopLogo;
