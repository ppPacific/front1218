"use server";

import Booking from "@/database/booking.model";

import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import ratelimit from "@/lib/ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const createBooking = async ({
  eventId,
  slug,
  email,
}: {
  eventId: string;
  slug: string;
  email: string;
}) => {
  const { userId } = await auth();

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  console.log(`ip ${ip}`);
  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();

    await Booking.create({ eventId, slug, email });

    return { success: true };
  } catch (e) {
    console.error("create booking failed", e);
    return { success: false };
  }
};
