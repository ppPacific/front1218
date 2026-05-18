"use client";
import React, { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import CheckoutForm from "@/components/CheckoutForm";

const DONATION_PRICE_IDS = {
  oneTime: {
    amount100: "price_1TYQSKDAjtdECCqPyyBR2H2P",
    amount250: "price_1TYQQDDAjtdECCqPcgirtbfH",
    amount500: "price_1TY8hsDAjtdECCqPPm9H9x0U",
  },
  monthly: {
    amount100: "price_1TYQTtDAjtdECCqPdxYAm56B",
    amount250: "price_1TYQUrDAjtdECCqPQuPJUlYK",
    amount500: "price_1TYQXjDAjtdECCqPc11B61aK",
  },
};

type DonationMode = "oneTime" | "monthly";
type DonationAmount = "amount100" | "amount250" | "amount500";
const Page = () => {
  const [mode, setMode] = useState<DonationMode>("oneTime");
  const [amount, setAmount] = useState<DonationAmount>("amount250");

  const selectedPriceId = useMemo(() => {
    return DONATION_PRICE_IDS[mode][amount];
  }, [mode, amount]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="mx-auto max-w-lg p-6">
        <div className="mt-[-70]">
          <Image
            src={"/images/logo_bringlovehome_b.png"}
            alt={"Bring Love Home"}
            // fill
            className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            width={300}
            height={300}
          />
        </div>
        <h2 className={`mx-auto text-center`}>
          Every dollar will directly help us rescue, rehabilitate and rehome
          abandoned dogs! 💖
        </h2>
        {/*<div className="mt-[-10]">*/}
        {/*  <Image*/}
        {/*    src={"/images/divider-dog.png"}*/}
        {/*    alt={"divider"}*/}
        {/*    // fill*/}
        {/*    className="mx-auto object-cover transition-transform duration-500 ease-out"*/}
        {/*    width={600}*/}
        {/*    height={300}*/}
        {/*  />*/}
        {/*</div>*/}
        <div className="my-6 flex flex-col gap-4">
          <div className="inline-flex w-fit rounded-full bg-muted p-1">
            <button
              type="button"
              onClick={() => setMode("oneTime")}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === "oneTime"
                  ? "bg-black text-white"
                  : "text-muted-foreground"
              }`}
            >
              One-time
            </button>
            <button
              type="button"
              onClick={() => setMode("monthly")}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === "monthly"
                  ? "bg-black text-white"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setAmount("amount100")}
              className={`cursor-pointer rounded-full border px-4 py-2 ${
                amount === "amount100" ? "border-black bg-black text-white" : ""
              }`}
            >
              $100
            </button>
            <button
              type="button"
              onClick={() => setAmount("amount250")}
              className={`cursor-pointer rounded-full border px-4 py-2 ${
                amount === "amount250" ? "border-black bg-black text-white" : ""
              }`}
            >
              $250
            </button>
            <button
              type="button"
              onClick={() => setAmount("amount500")}
              className={`cursor-pointer rounded-full border px-4 py-2 ${
                amount === "amount500" ? "border-black bg-black text-white" : ""
              }`}
            >
              $500
            </button>
          </div>
          <div className={`test-card-notice`}>
            <span className={`text-[0.8rem]`}>
              Use any of the{" "}
              <a
                href="https://stripe.com/docs/testing#cards"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe test cards
              </a>{" "}
              for this demo, e.g. 4242 4242 4242 4242.
            </span>
          </div>
        </div>
        <CheckoutForm
          priceId={selectedPriceId}
          mode={mode === "monthly" ? "subscription" : "payment"}
        />
      </section>
    </Suspense>
  );
};
export default Page;
