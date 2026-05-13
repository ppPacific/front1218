"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { FolderLike } from "@/components/FolderLike";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Search } from "lucide-react";
import DogSearchModal from "@/components/DogSearchModal";
import { usePathname } from "next/navigation";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import WishlistSheet from "@/components/WishlistSheet";
const NavBar = () => {
  // const user = await currentUser()
  const [open, setOpen] = useState(false);
  const [openW, setOpenW] = useState(false);

  const pathname = usePathname();
  const isSearchResultPage = pathname === "/search-result";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`flex items-center justify-end gap-x-2`}>
        <SignedOut>
          <SignInButton mode={"modal"}>
            <Button
              variant={"outline"}
              className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-gradient-to-r from-green-400 to-blue-500 text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Button
          variant={"outline"}
          aria-label={"Open Search"}
          className={`cursor-pointer`}
          onClick={() => {
            if (isSearchResultPage) return;
            setOpen(true);
          }}
        >
          <Search />
        </Button>

        {/*<ModeToggle />*/}
        <Button
          variant="outline"
          size="icon"
          className={`cursor-pointer`}
          // onMouseEnter={() => setOpenW(true)}
          onClick={() => {
            setOpenW(true);
          }}
        >
          <FolderLike />
        </Button>
        {open && <DogSearchModal open={open} onClose={() => setOpen(false)} />}
        {openW && (
          <WishlistSheet
            wishlistOpen={openW}
            setWishlistOpen={() => setOpenW(false)}
          />
        )}
      </div>
    </Suspense>
  );
};
export default NavBar;
