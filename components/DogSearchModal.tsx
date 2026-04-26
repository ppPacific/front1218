"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type DogSearchModalProps = {
  open: boolean;
  onClose: () => void;
};
const DogSearchModal = ({ open, onClose }: DogSearchModalProps) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  useEffect(() => {
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
  }, [open, onClose]);

  const normalizedKeyword = useMemo(() => keyword.trim(), [keyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normalizedKeyword) return;

    router.push(`/search-result?q=${encodeURIComponent(normalizedKeyword)}`);
    onClose();
  };

  const handleTagClick = (tag: string) => {
    router.push(`/search-result?tag=${encodeURIComponent(tag)}`);
    onClose();
  };

  if (!open) return null;
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

        <div className={"modal__search-wrap"}>
          <div className={"modal__search"}>
            <div className={"modal__input-wrap"}>
              <form className={"modal__input-wrap"} onSubmit={handleSubmit}>
                <input
                  id={"dogs-search-input"}
                  className={"modal__input"}
                  placeholder={"search doggies..."}
                  value={keyword}
                  type={"text"}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button className={"modal__button"}>search</Button>
              </form>
            </div>
          </div>
        </div>
        <div className={"modal__suggestion-block"}>
          <Button className={"suggestion-button"}>puppy</Button>
          <Button className={"suggestion-button"}>senior dog</Button>
          <Button className={"suggestion-button"}>featured</Button>
          <Button className={"suggestion-button"}>calm</Button>
        </div>
      </div>
    </Suspense>
  );
};

export default DogSearchModal;
