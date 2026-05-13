"use server";

import Visit from "@/database/visit.model";

import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const createVisit = async ({
  dogId,
  slug,
  email,
  chosenDate,
}: {
  dogId: string;
  slug: string;
  email: string;
  chosenDate: Date;
}) => {
  // const { userId } = await auth();
  //
  // if (!userId) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  try {
    await connectDB();

    await Visit.create({ dogId, email, chosenDate });

    return { success: true };
  } catch (e) {
    console.error("create visit failed", e);
    return {
      success: false,
      message: e?.message || "Unknown error",
      code: e?.code || null,
    };
  }
};
