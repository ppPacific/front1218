"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type WishlistContextType = {
    wishlist: string[];
    isBookmarked: (dogId: string) => boolean;
    toggleBookmark: (dogId: string) => void;
    clearWishlist: () => void;
    mounted: boolean;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

const STORAGE_KEY = "kennel:guest_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (raw) setWishlist(JSON.parse(raw));
            console.log(JSON.parse(raw))
            console.log(`provider first render already hv key`)
        } catch {}
    }, []);

    useEffect(() => {
        if (!mounted) return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    }, [wishlist, mounted]);

    const value = useMemo(
        () => ({
            wishlist,
            isBookmarked: (dogId: string) => wishlist.includes(dogId),
            toggleBookmark: (dogId: string) => {
                setWishlist((prev) =>
                    prev.includes(dogId)
                        ? prev.filter((id) => id !== dogId)
                        : [...prev, dogId]
                );
            },
            clearWishlist: () => setWishlist([]),
            mounted,
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
