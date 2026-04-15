"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
type WishlistContextType = {
    wishlist: string[];
    isBookmarked: (dogId: string) => boolean;
    toggleBookmark: (dogId: string) => void;
    clearWishlist: () => void;
    mounted: boolean;
    maxWishlistItems: number;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);
const MAX_WISHLIST_ITEMS = 5;
const STORAGE_KEY = "kennel:guest_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);
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

    const value = useMemo(
        () => ({
            wishlist,
            mounted,
            maxWishlistItems: MAX_WISHLIST_ITEMS,
            isBookmarked: (dogId: string) => wishlist.includes(dogId),
            toggleBookmark: (dogId: string) => {
                setWishlist((prev) => {
                        const inList = prev.includes(dogId);

                        if (prev.length >= MAX_WISHLIST_ITEMS) {
                            if (inList) return prev.filter((id) => id !== dogId);
                            toast(`Wishlist limit reached. You can save up to ${MAX_WISHLIST_ITEMS} dogs.`);
                            return prev;
                        } else {
                            if (!inList) {
                                return [...prev, dogId];
                            }
                            return prev.filter((id) => id !== dogId);
                        }

                    }
                );
            },
            clearWishlist: () => setWishlist([]),

        }),
        [wishlist, mounted]
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
