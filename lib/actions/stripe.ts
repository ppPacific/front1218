"use server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function createCheckoutSession(
  priceId: string,
  mode: "payment" | "subscription",
) {
  const origin = (await headers()).get("origin");

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page", // This enables the 2026 Embedded UI
    line_items: [{ price: priceId, quantity: 1 }],
    mode,
    return_url: `${origin}`,
  });

  return { clientSecret: session.client_secret };
}
