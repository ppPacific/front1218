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
import { Menu, Search } from "lucide-react";
import DogSearchModal from "@/components/DogSearchModal";
import { usePathname } from "next/navigation";
import WishlistSheet from "@/components/WishlistSheet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
const NavBar = () => {
  // const user = await currentUser()
  const [open, setOpen] = useState(false);
  const [openW, setOpenW] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const isSearchResultPage = pathname === "/search-result";

  const mobileNavItemClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 text-xs transition ${
      active ? "text-primary" : "text-muted-foreground"
    }`;

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
        <Button
          variant="outline"
          size="icon"
          aria-label="Open menu"
          className="cursor-pointer"
          onClick={() => setOpenMenu(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {open && <DogSearchModal open={open} onClose={() => setOpen(false)} />}
        {openW && (
          <WishlistSheet
            wishlistOpen={openW}
            setWishlistOpen={() => setOpenW(false)}
          />
        )}
        <Sheet open={openMenu} onOpenChange={setOpenMenu}>
          <SheetContent
            side="right"
            className="w-[250px] border-l bg-background px-4 max-w-xs"
          >
            <SheetHeader className="border-b pb-4">
              <SheetTitle className={`font-light px-4`}>Menu</SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-4">
              <Link
                href={"/donation"}
                onClick={() => setOpenMenu(false)}
                className="rounded-md px-8 font-light text-base transition hover:bg-muted"
              >
                Donation
              </Link>

              {/*<Link*/}
              {/*  href={"/aboutdeveloper"}*/}
              {/*  onClick={() => setOpenMenu(false)}*/}
              {/*  className="rounded-md px-8 text-base font-light transition hover:bg-muted"*/}
              {/*>*/}
              {/*  About*/}
              {/*</Link>*/}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </Suspense>
  );
};
export default NavBar;
