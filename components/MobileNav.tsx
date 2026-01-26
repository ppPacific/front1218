import React from 'react'
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/ModeToggle";
import {FolderLike} from "@/components/FolderLike";
import {SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton} from "@clerk/nextjs";
import {currentUser} from "@clerk/nextjs/server";
import {useTheme} from "next-themes";

const MobileNav = () => {

    const {isSignedIn} = useAuth()
    const {theme, setTheme} = useTheme();
    return (
        <div className={`flex items-center justify-end`}>
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
            <ModeToggle />
            <FolderLike />
        </div>
    )
}
export default NavBar
