"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Search from "@/components/Search";

type DogSearchModalProps = {
  open: boolean;
  onClose: () => void;
};

const categories = ["PUPPY", "SENIOR DOG", "FEATURED", "CALM"];
const DogSearchModal = ({ open, onClose }: DogSearchModalProps) => {
  const pathname = usePathname();
  const isSearchResultPage = pathname === "/search-result";
  useEffect(() => {
    if (isSearchResultPage) return;
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, isSearchResultPage]);

  if (!open || isSearchResultPage) return null;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        className={
          "px-4 min-h-[calc(100dvh-12rem)] max-h-[calc(100dvh-4rem)] backdrop-blur-sm inset-0 text-black fixed top-0 left-0 w-full flex flex-col z-60 overflow-y-auto bg-white"
        }
      >
        <div className={"relative"}>
          <div className={"absolute right-[5%] mt-10 cursor-pointer"}>
            <span onClick={onClose}>
              <X className={"h-4 w-4 font-semibold"} />
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Image
            src={"/images/logo_bringlovehome_b.png"}
            alt={"Bring Love Home"}
            // fill
            className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            width={260}
            height={260}
          />
        </div>

        <Search placeholder={"search doggies.."} onClose={onClose} />
        <div className={"modal__suggestion-block"}>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/search-result?q=${cat.toLowerCase()}`}
              className="suggestion-button"
              onClick={onClose}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default DogSearchModal;
