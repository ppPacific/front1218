import DogCard from "@/components/DogCard";
import Image from "next/image";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IEvent } from "@/database";
import EventCard from "@/components/EventCard";
import { getHomePageData } from "@/lib/data/home";
import TagLoading from "@/components/TagLoading";
import AbstractCards from "@/components/AbstractCards";
import TopLogo from "@/components/TopLogo";
const Home = async () => {
  const { events, dogs } = await getHomePageData();

  return (
    <Suspense fallback={<TagLoading />}>
      <section>
        <div className="mt-[-70]">
          <TopLogo />
        </div>

        <div className="mt-[-10] space-y-7">
          <h2>Featured Events</h2>
          <ul className="events">
            {events &&
              events.length > 0 &&
              events.slice(0, 1).map((event: IEvent) => (
                <li key={event.title} className="list-none">
                  <EventCard {...event} />
                </li>
              ))}
          </ul>
        </div>
        <AbstractCards />
        <div className={"mt-30 flex mx-auto justify-center"}>
          <h2 className={`text-3xl`}>Available for Adoption</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {dogs.slice(0, 6).map((dog) => (
            <DogCard key={dog.name} {...dog} />
          ))}
        </div>
      </section>
    </Suspense>
  );
};
export default Home;
