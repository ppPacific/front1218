// lib/data/home.ts
import Event from "@/database/event.model";
import Dog from "@/database/dog.model";
import connectDB from "@/lib/mongodb";

export async function getHomePageData() {
  await connectDB();

  const [events, dogs] = await Promise.all([
    Event.find().sort({ createdAt: -1 }).lean(),
    Dog.find().sort({ createdAt: -1 }).lean(),
  ]);

  return {
    events: JSON.parse(JSON.stringify(events)),
    dogs: JSON.parse(JSON.stringify(dogs)),
  };
}
