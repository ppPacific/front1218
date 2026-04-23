'use server';

import Dog from '@/database/dog.model';
import connectDB from "@/lib/mongodb";

export const getSimilarDogsBySlug = async (slug: string) => {
    try {
        await connectDB();
        const dog = await Dog.findOne({ slug });

        return (await Dog.find({ _id: { $ne: dog._id }, featureTag: { $in: dog.featureTag } })).lean();
    } catch {
        return [];
    }
}
