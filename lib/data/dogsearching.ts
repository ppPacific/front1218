import Dog from "@/database/dog.model";
import connectDB from "@/lib/mongodb";
export const dogsearching = async (keyword: string) => {
  try {
    await connectDB();

    const search = keyword.trim();

    if (!search) {
      return await Dog.find().lean();
    }

    const dogs = await Dog.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { featureTag: { $regex: search, $options: "i" } },
      ],
    }).lean();

    return JSON.parse(JSON.stringify(dogs));
  } catch (error) {
    console.error("searchDogs error:", error);
    return [];
  }
};
