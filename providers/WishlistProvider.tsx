"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { PROD_URL } from "@/lib/constants";

type DogSummary = {
  slug: string;
  name: string;
  breed?: string;
  status?: string;
  age?: string;
  size?: string;
  sex?: string;
  kennelLocation?: string;
  image?: { url?: string }[];
};
type WishlistContextType = {
  wishlist: string[];
  wishlistDogs: DogSummary[];
  loadingWishlistDogs: boolean;
  isBookmarked: (dogId: string) => boolean;
  toggleBookmark: (dogId: string) => void;
  clearWishlist: () => void;
  mounted: boolean;
  maxWishlistItems: number;
};
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const WishlistContext = createContext<WishlistContextType | null>(null);
const MAX_WISHLIST_ITEMS = 5;
const STORAGE_KEY = "kennel:guest_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistDogs, setWishlistDogs] = useState<DogSummary[]>([]);
  const [loadingWishlistDogs, setLoadingWishlistDogs] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        setWishlist(parsed.slice(0, MAX_WISHLIST_ITEMS));
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to update wishlist", error);
    }
  }, [wishlist, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (wishlist.length === 0) {
      setWishlistDogs([]);
      return;
    }
    const controller = new AbortController();
    const loadWishlistDogs = async () => {
      let urlSrc = `${BASE_URL}/api/wishlist`;
      if (process.env.NODE_ENV !== "development") {
        urlSrc = `${PROD_URL}/api/wishlist`;
      }
      try {
        setLoadingWishlistDogs(true);

        const res = await fetch(urlSrc, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slugs: wishlist }),
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch wishlist dogs");
        }

        const data = await res.json();

        setWishlistDogs(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error(error);
          setWishlistDogs([]);
        }
      } finally {
        setLoadingWishlistDogs(false);
      }
    };

    loadWishlistDogs();

    return () => controller.abort();
  }, [wishlist, mounted]);

  const value = useMemo(
    () => ({
      wishlist,
      wishlistDogs,
      loadingWishlistDogs,
      mounted,
      maxWishlistItems: MAX_WISHLIST_ITEMS,
      isBookmarked: (dogId: string) => wishlist.includes(dogId),
      toggleBookmark: (dogId: string) => {
        setWishlist((prev) => {
          const inList = prev.includes(dogId);

          if (prev.length >= MAX_WISHLIST_ITEMS) {
            if (inList) return prev.filter((id) => id !== dogId);
            toast(
              `Wishlist limit reached. You can save up to ${MAX_WISHLIST_ITEMS} dogs.`,
            );
            return prev;
          } else {
            if (!inList) {
              return [...prev, dogId];
            }
            return prev.filter((id) => id !== dogId);
          }
        });
      },
      clearWishlist: () => setWishlist([]),
    }),
    [wishlist, mounted, wishlistDogs, loadingWishlistDogs],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used within WishlistProvider");
  }
  return context;
}
