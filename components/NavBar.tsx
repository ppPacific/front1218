"use client"
import React from 'react'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ModeToggle";
import {FolderLike} from "@/components/FolderLike";
import {SignedIn, SignedOut, SignInButton, SignUpButton, UserButton} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs/server";
import { Search } from 'lucide-react';
const NavBar = () => {
    // const user = await currentUser()
    return (
        <div className={`flex items-center justify-end gap-x-2`}>
            <SignedOut>
                <SignInButton mode={"modal"}>
                    <Button
                        variant={'outline'}
                        className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer">
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
            <Search />
            <ModeToggle />
            <FolderLike />
        </div>
    )
}
export default NavBar
