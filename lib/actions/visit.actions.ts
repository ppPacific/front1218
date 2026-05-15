"use server";

import Visit from "@/database/visit.model";

import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "@/lib/workflow";
import { PROD_URL } from "@/lib/constants";

const baseUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : PROD_URL;
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
  const { userId } = await auth();
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);
  if (!success) return redirect("/too-fast");
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    await Visit.create({ dogId, email, chosenDate });
    try {
      await workflowClient.trigger({
        url: `${baseUrl}/api/visitconfirm`,
        body: {
          email,
          slug: slug,
          chosenDate: chosenDate.toISOString(),
        },
      });
    } catch (emailError) {
      console.error("visit saved, confirmation email failed", emailError);
    }
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
