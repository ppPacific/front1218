"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlistContext } from "@/providers/WishlistProvider";

interface Props {
  id: string;
  slug: string;
  name: string;
  summary: string;
  featureTag?: string[];
  image: string;
  breed: string;
}
const DogThumbnail = ({ _id, slug, name, featureTag, image }: Props) => {
  const { isBookmarked, toggleBookmark, mounted } = useWishlistContext();
  const bookmarked = mounted ? isBookmarked(slug) : false;
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl">
      <Link href={`/dogs/${slug}`} className="block">
        <div className="relative md:grid md:min-h-[180px]">
          <button
            type="button"
            aria-label={bookmarked ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark(slug);
            }}
            className={
              "absolute left-3 top-3 z-20 inline-flex " +
              "h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto"
            }
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                bookmarked ? "fill-rose-500 text-rose-500" : "text-zinc-600"
              }`}
              strokeWidth={2}
            />
          </button>
          <div className="relative md:aspect-auto md:h-full">
            {image && image.length > 0 && (
              <Image
                src={image?.[0]?.url || `/images/dog_placeholder.png`}
                alt={name}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                width={1200}
                height={1200}
                loading={`eager`}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-end p-4 ">
              {/*<div className="rounded-xl bg-black/55 px-3 py-2 backdrop-blur-sm">*/}
              <h2 className="text-[clamp(1.5rem,5vw,3rem)] font-semibold tracking-wide text-white">
                {name}
              </h2>
              {/*</div>*/}
            </div>
          </div>

          {featureTag && featureTag.length > 0 && (
            <div className="absolute right-3 top-3 z-10">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-500 shadow-lg">
                {featureTag[0]}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};
export default DogThumbnail;
