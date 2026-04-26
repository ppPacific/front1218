"use client";
import React, { Suspense, useState } from "react";
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
import { currentUser } from "@clerk/nextjs/server";
import { Search } from "lucide-react";
import DogSearchModal from "@/components/DogSearchModal";
import { usePathname, useRouter } from "next/navigation";
const NavBar = () => {
  // const user = await currentUser()
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchClick = () => {
    if (pathname && pathname.includes("/search-result")) {
      const existingSearchInput = document.getElementById("dogs-search-input");
      if (existingSearchInput) {
        //existingSearchInput.focus();
        existingSearchInput.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        router.push("/search-result");
      }
      return;
    }

    setOpen(true);
  };

  return (
    <Suspense fallback={null}>
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
          onClick={() => {
            setOpen(true);
            handleSearchClick;
          }}
        >
          <Search />
        </Button>

        {/*<ModeToggle />*/}
        <FolderLike />
        {open && <DogSearchModal open={open} onClose={() => setOpen(false)} />}
      </div>
    </Suspense>
  );
};
export default NavBar;
