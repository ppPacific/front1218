"use client"

import {Fragment, useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useWishlist} from "@/hooks/useWishlist";
import { Heart } from "lucide-react";

interface Props {
    id: string;
    slug: string;
    name: string;
    summary: string;
    featureTag?: string;
    imageUrl: string;
}
const DogCard = ({id,slug,name,summary,featureTag,imageUrl}:Props) => {
    const { isBookmarked, toggleBookmark, mounted } = useWishlist();
    const bookmarked = mounted ? isBookmarked(id) : false;
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <button
                type="button"
                aria-label={bookmarked ? "Remove from wishlist" : "Add to wishlist"}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBookmark(id)
                }}
                className="absolute left-3 top-3 z-20
                  inline-flex h-11 w-11 items-center justify-center
                  rounded-full bg-white/90 shadow-md backdrop-blur
                  transition-all duration-200
                  md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100
                  md:pointer-events-none md:group-hover:pointer-events-auto md:group-focus-within:pointer-events-auto"
            >
                <Heart
                    className={`h-5 w-5 transition-colors ${
                        bookmarked
                            ? "fill-rose-500 text-rose-500"
                            : "text-zinc-600"
                    }`}
                    strokeWidth={2}
                />
            </button>

            <Link href={`/dogs/${slug}`} className="block">
                <div className="relative md:grid md:grid-cols-[7fr_3fr] md:min-h-[280px]">
                    <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 70vw, 50vw"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />

                        <div className="absolute inset-x-0 bottom-0 flex justify-end p-4 md:hidden">
                            <div className="rounded-xl bg-black/55 px-3 py-2 backdrop-blur-sm">
                                <h3 className="text-base font-semibold tracking-wide text-white">
                                    {name}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex md:flex-col md:justify-end md:bg-white md:p-6">
                        <div className="translate-y-2 space-y-3 transition-all duration-300 group-hover:translate-y-0">
                            <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                                {name}
                            </h3>
                            <p className="line-clamp-4 text-sm leading-6 text-zinc-600">
                                {summary}
                            </p>
                            <span className="inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                                View profile
                              </span>
                        </div>
                    </div>

                    {featureTag && (
                        <div className="absolute right-3 top-3 z-10">
                          <span className="inline-flex rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg">
                            {featureTag}
                          </span>
                        </div>
                    )}
                </div>
            </Link>
        </div>
        // <Link
        //     href={`/dogs/${slug}`}
        //     className="group relative block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        // >
        //     <div className="relative md:grid md:grid-cols-[7fr_3fr] md:min-h-[280px]">
        //         <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
        //             <Image
        //                 src={imageUrl}
        //                 alt={name}
        //                 fill
        //                 className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        //                 sizes="(max-width: 767px) 100vw, (max-width: 1279px) 70vw, 50vw"
        //             />
        //
        //             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100" />
        //
        //             <div className="absolute inset-x-0 bottom-0 flex justify-end p-4 md:hidden">
        //                 <div className="rounded-xl bg-black/55 px-3 py-2 backdrop-blur-sm">
        //                     <h3 className="text-base font-semibold tracking-wide text-white">
        //                         {name}
        //                     </h3>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <div className="hidden md:flex md:flex-col md:justify-end md:bg-white md:p-6">
        //             <div className="translate-y-2 space-y-3 transition-all duration-300 group-hover:translate-y-0">
        //                 <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
        //                     {name}
        //                 </h3>
        //                 <p className="line-clamp-4 text-sm leading-6 text-zinc-600">
        //                     {summary}
        //                 </p>
        //
        //                 <span className="inline-flex w-fit rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-700">
        //       View profile
        //     </span>
        //             </div>
        //         </div>
        //
        //         {featureTag && (
        //             <div className="absolute right-3 top-3 z-10">
        //     <span className="inline-flex rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg">
        //       {featureTag}
        //     </span>
        //             </div>
        //         )}
        //     </div>
        // </Link>
    )

}
export default DogCard
