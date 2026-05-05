"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";

type DogSearchProps = {
  placeholder: string;
  onClose?: () => void;
};
export default function Search({ placeholder }: DogSearchProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const normalizedKeyword = useMemo(() => keyword.trim(), [keyword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!normalizedKeyword) return;

    router.push(
      `/search-result?q=${encodeURIComponent(normalizedKeyword)}&page=1`,
    );
  };

  return (
    <div className={"modal__search-wrap"}>
      <div className={"modal__search"}>
        <div className={"modal__input-wrap"}>
          <form className={"modal__input-wrap"} onSubmit={handleSubmit}>
            <input
              id={"dogs-search-input"}
              className={"modal__input"}
              placeholder={placeholder}
              defaultValue={searchParams.get("q")?.toString() || ""}
              type={"text"}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className={"modal__button"}>search</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
