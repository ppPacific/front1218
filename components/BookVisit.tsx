"use client";

import React, { useState } from "react";
import posthog from "posthog-js";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignInButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { createVisit } from "@/lib/actions/visit.actions";
import { addDays, startOfDay } from "date-fns";

const BookVisit = ({ dogId, slug }: { dogId: string; slug: string }) => {
  const { user } = useUser();
  const curr = startOfDay(new Date());
  const today = addDays(curr, 1);
  const maxDate = addDays(today, 13);
  const [email, setEmail] = useState(
    user?.primaryEmailAddress?.emailAddress ?? "",
  );
  const [submitted, setSubmitted] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  const [chosenDate, setDate] = React.useState<Date>(today);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      console.error("Email is required");
      return;
    }

    if (!chosenDate) {
      console.error("Visit date is required");
      return;
    }

    try {
      setLoading(true);

      const { success } = await createVisit({
        dogId,
        slug,
        email: email.trim(),
        chosenDate,
      });

      if (success) {
        setSubmitted(true);
        posthog.capture("visit_booked", {
          dogId,
          slug,
          email: email.trim(),
          chosenDate: chosenDate.toISOString(),
        });
        setErrormsg("");
      } else {
        console.error("Visit creation failed");
        posthog.captureException("Visit creation failed");
        setErrormsg(
          "You might have booked the same date, or this email has been used for booking already. Please try another date or valid email.",
        );
      }
    } catch (error) {
      console.error("Visit creation failed", error);
      posthog.captureException(
        error instanceof Error ? error : new Error("Visit creation failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">
          Thank you for signing up! You will receive an confirmation email
          shortly. If not, please contact contact@dogslifelove.dog .
        </p>
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
            {errormsg && errormsg.length > 0 ? (
              <span className={`text-[0.8rem] text-red-500`}>{errormsg}</span>
            ) : (
              <></>
            )}
          </div>
          <SignedIn>
            <p className={`text-xs italic text-red-500`}>
              Select a day within the following two weeks to visit {slug}.
            </p>
            <Calendar
              mode="single"
              selected={chosenDate}
              onSelect={setDate}
              className="rounded-lg border"
              disabled={{
                before: today,
                after: maxDate,
              }}
            />
          </SignedIn>
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
            <button type="submit" className="button-submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </SignedIn>
        </form>
      )}
    </div>
  );
};
export default BookVisit;
