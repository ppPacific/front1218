"use client";
import React, { useState } from "react";
import { PROD_URL } from "@/lib/constants";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
const CopyLink = ({ slug }: { slug: string }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = `${PROD_URL}/dogs/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset state after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger>
        <span>
          <Copy className={`cursor-pointer`} onClick={handleCopy} />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy Link</p>
      </TooltipContent>
      {copied && toast.success("Link copied!")}
    </Tooltip>
  );
};
export default CopyLink;
