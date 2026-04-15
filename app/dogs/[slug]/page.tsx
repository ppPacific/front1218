

type WishlistContextType = {
    wishlist: string[];
    isBookmarked: (dogId: string) => boolean;
    toggleBookmark: (dogId: string) => void;
    clearWishlist: () => void;
    mounted: boolean;
    maxWishlistItems: number;
};
export default function DogDetailPage({
                                          params,
                                      }: {
    params: Promise<{ slug: string }>
}) {
    //const { slug } = await params;
    return <h1>Hello, Dog detail Page!</h1>
}
