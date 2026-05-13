"use client";

import * as React from "react";
import { FolderHeart } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function FolderLike() {
  const { theme, setTheme } = useTheme();

  return (
    <FolderHeart className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
    // <span className="sr-only">Open Liked</span>
  );
}
