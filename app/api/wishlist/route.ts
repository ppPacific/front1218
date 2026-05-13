// app/api/wishlist-dogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import Dog from "@/database/dog.model";
import connectDB from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const slugs = body?.slugs as string[];

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json([]);
    }

    const dogs = await Dog.find({ slug: { $in: slugs } })
      .select("slug name breed image status age size sex kennelLocation")
      .lean();

    const orderedDogs = slugs
      .map((slug) => dogs.find((dog) => dog.slug === slug))
      .filter(Boolean);

    return NextResponse.json(orderedDogs);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch wishlist dogs" },
      { status: 500 },
    );
  }
}
