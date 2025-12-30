"use client"

import * as React from "react"
import {FolderHeart,} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function FolderLike() {
    const { theme,setTheme } = useTheme();

    return (
        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon"
                        onClick={() => console.log('open liked')}>
                    <FolderHeart className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <span className="sr-only">Open Liked</span>
                </Button>
            // </DropdownMenuTrigger>
            // <DropdownMenuContent align="end">
            //     <DropdownMenuItem onClick={() => setTheme("light")}>
            //         Light
            //     </DropdownMenuItem>
            //     <DropdownMenuItem onClick={() => setTheme("dark")}>
            //         Dark
            //     </DropdownMenuItem>
            //     <DropdownMenuItem onClick={() => setTheme("system")}>
            //         System
            //     </DropdownMenuItem>
            // </DropdownMenuContent>
        // </DropdownMenu>
    )
}
