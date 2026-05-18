"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { useCallback } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function CheckoutForm({
  priceId,
  mode,
}: {
  priceId: string;
  mode: "payment" | "subscription";
}) {
  // We fetch the clientSecret via the Server Action
  const fetchClientSecret = useCallback(async () => {
    const { clientSecret } = await createCheckoutSession(priceId, mode);
    return clientSecret as string;
  }, [priceId, mode]);

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        key={`${mode}-${priceId}`}
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
