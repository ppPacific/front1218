import Dog from "@/database/dog.model";
import connectDB from "@/lib/mongodb";

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export const dogsearching = async (keyword: string, page = 1, perPage = 8) => {
  try {
    await connectDB();

    const search = escapeRegex(keyword.trim());

    if (!search) {
      return await Dog.find().lean();
    }
    const skip = (page - 1) * perPage;
    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { featureTag: { $regex: search, $options: "i" } },
      ],
    };
    const [dogs, total] = await Promise.all([
      Dog.find(query).skip(skip).limit(perPage).lean(),
      Dog.countDocuments(query),
    ]);

    return {
      dogs: JSON.parse(JSON.stringify(dogs)),
      total,
      totalPages: Math.ceil(total / perPage),
      currentPage: page,
    };
  } catch (error) {
    console.error("searchDogs error:", error);
    return {
      dogs: [],
      total: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};
