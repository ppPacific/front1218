"use client";
import React from "react";
import { Heart } from "lucide-react";

import { useWishlistContext } from "@/providers/WishlistProvider";
const AddToWish = ({ slug }: { slug: string }) => {
  const { isBookmarked, toggleBookmark, mounted } = useWishlistContext();
  const bookmarked = mounted ? isBookmarked(slug) : false;
  return (
    <button
      type="button"
      aria-label={bookmarked ? "Remove from wishlist" : "Add to wishlist"}
      onClick={(e) => {
        e.preventDefault();
        //e.stopPropagation();
        toggleBookmark(slug);
      }}
      className={
        "cursor-pointer z-20 inline-flex " +
        "h-6 w-6 items-center justify-center rounded-full backdrop-blur transition-all duration-200 "
      }
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          bookmarked ? "fill-rose-500 text-rose-500" : "text-zinc-800"
        }`}
        strokeWidth={3}
      />
    </button>
  );
};
export default AddToWish;
