"use server";

import Dog from "@/database/dog.model";
import connectDB from "@/lib/mongodb";

export const getSimilarDogsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const dog = await Dog.findOne({ slug });

    const similar = await Dog.find({
      _id: { $ne: dog._id },
      featureTag: { $in: dog.featureTag },
    }).lean();

    return JSON.parse(JSON.stringify(similar));
  } catch {
    return [];
  }
};
