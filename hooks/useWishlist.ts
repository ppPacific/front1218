"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kennel:guest_wishlist";
const MAX_WISHLIST_ITEMS = 5;

export function useWishlist() {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) {
                console.log(`hook first render already hv key`)
                setWishlist(JSON.parse(raw));
            }
        } catch (error) {
            console.error("Failed to load wishlist", error);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        try {
            console.log(`hook mounted set wish to storage ${wishlist}`)
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
        } catch (error) {
            console.error("Failed to save wishlist", error);
        }
    }, [wishlist, mounted]);

    const isBookmarked = (dogId: string) => wishlist.includes(dogId);

    const toggleBookmark = (dogId: string) => {
        setWishlist((prev) =>
            prev.includes(dogId)
                ? prev.filter((id) => id !== dogId)
                : [...prev, dogId]
        );
    };

    const clearWishlist = () => setWishlist([]);

    return {
        wishlist,
        isBookmarked,
        toggleBookmark,
        clearWishlist,
        mounted,
    };
}
