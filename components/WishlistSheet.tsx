"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useWishlistContext } from "@/providers/WishlistProvider";
import DogListitem from "@/components/DogListitem";

type WishlistSheetProps = {
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
};
export default function WishlistSheet({
  wishlistOpen,
  setWishlistOpen,
}: WishlistSheetProps) {
  const { wishlistDogs, loadingWishlistDogs, toggleBookmark, mounted } =
    useWishlistContext();

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent
        side="right"
        className="flex h-full w-full max-w-sm flex-col p-0"
        // onMouseEnter={setWishlistOpen}
        // onMouseLeave={setWishlistOpen}
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
          <SheetTitle>Wishlist</SheetTitle>

          <SheetClose asChild>
            {/*<button*/}
            {/*  type="button"*/}
            {/*  className="rounded-full p-2 hover:bg-gray-100"*/}
            {/*  aria-label="Close wishlist"*/}
            {/*>*/}
            {/*  <X className="h-4 w-4" />*/}
            {/*</button>*/}
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {loadingWishlistDogs ? (
            <div className="space-y-4">
              <p>Loading...</p>
            </div>
          ) : wishlistDogs && wishlistDogs.length > 0 ? (
            <div className="space-y-4">
              {wishlistDogs.map((dog) => (
                <DogListitem
                  key={dog.slug}
                  onClick={() => setWishlistOpen(false)}
                  {...dog}
                />
              ))}
            </div>
          ) : (
            <p>You have not bookmarked any dogs yet.</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
