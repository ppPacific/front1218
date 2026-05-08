"use client";

import React, { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

const BookVisit = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = await createBooking({ eventId, slug, email });

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked", { eventId, slug, email });
    } else {
      console.error("Booking creation failed");
      posthog.captureException("Booking creation failed");
    }
  };
  console.log(date);
  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email address"
            />
          </div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
            disabled={(date) => date < new Date()}
          />
          <SignedOut>
            <SignInButton mode={"modal"}>
              <Button
                variant={"outline"}
                className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer"
              >
                Sign In To Book
              </Button>
            </SignInButton>
            {/*<p className={"text-md"}>Sign in first to book your spot!</p>*/}
          </SignedOut>
          <SignedIn>
            <button type="submit" className="button-submit">
              Submit
            </button>
          </SignedIn>
        </form>
      )}
    </div>
  );
};
export default BookVisit;
