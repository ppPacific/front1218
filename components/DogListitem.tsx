"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";

import React from "react";
import { useWishlistContext } from "@/providers/WishlistProvider";

type WishlistDog = {
  slug: string;
  name: string;
  breed?: string;
  image?: { url?: string }[];
  onClose: () => void;
};
const DogListitem = ({ slug, name, breed, image, onClose }: WishlistDog) => {
  const { toggleBookmark } = useWishlistContext();
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(slug);
  };
  return (
    <Link onClick={onClose} href={`/dogs/${slug}`} className="block">
      <div className="flex items-center gap-3 w-full p-4">
        <div className="relative h-24 w-2/5 overflow-hidden rounded-lg bg-muted">
          {image && image.length > 0 && (
            <Image
              src={image?.[0]?.url || `/images/dog_placeholder.png`}
              alt={slug}
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              width={300}
              height={300}
              loading={`eager`}
            />
          )}
        </div>
        <div className="w-2/5 min-w-0">
          <h2 className="text-sm font-semibold tracking-wide">{name}</h2>
        </div>
        <div className={`w-1/5`}>
          <button
            type="button"
            aria-label={`Remove ${name} from wishlist`}
            onClick={handleDelete}
            className="shrink-0 rounded-full p-2 hover:bg-muted"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};
export default DogListitem;
