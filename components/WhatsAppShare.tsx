"use client";
import React from "react";
import { PROD_URL } from "@/lib/constants";

const WhatsAppShare = () => {
  const shareToWhatsApp = () => {
    // Get the current page URL
    // const currentUrl = window.location.href;
    const currentUrl = `${PROD_URL}/dogs/oscar`;
    // Create the message and encode it for a URL
    const message = `Check this out: ${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    // Open in a new tab
    window.open(whatsappUrl, "_blank");
    //window.location.href = whatsappUrl;
  };

  return <button onClick={shareToWhatsApp}>Share on WhatsApp</button>;
};
export default WhatsAppShare;
