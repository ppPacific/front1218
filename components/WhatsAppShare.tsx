"use client";
import React from "react";
import { PROD_URL } from "@/lib/constants";
import { Send } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const WhatsAppShare = ({ slug }: { slug: string }) => {
  const shareToWhatsApp = (slug) => {
    // Get the current page URL
    // const currentUrl = window.location.href;
    const currentUrl = `${PROD_URL}/dogs/${slug}`;
    // Create the message and encode it for a URL
    const message = `Check out this dog: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open in a new tab
    window.open(whatsappUrl, "_blank");
    //window.location.href = whatsappUrl;
  };

  return (
    <Tooltip>
      <TooltipTrigger>
        <span>
          <Send
            className={`cursor-pointer`}
            onClick={() => shareToWhatsApp(slug)}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Share to Whatsapp</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default WhatsAppShare;
