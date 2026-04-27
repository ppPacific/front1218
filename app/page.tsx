import DogCard from "@/components/DogCard";
import Image from "next/image";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IEvent } from "@/database";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EventCard from "@/components/EventCard";
import { dogs, events } from "@/lib/constants";
const Home = async () => {
  //server-side fetch
  // const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //
  // const response = await fetch(`${BASE_URL}/api/events`);
  // const { events } = await response.json();
  // const dogsresponse = await fetch(`${BASE_URL}/api/dogs`);
  // const { dogs } = await dogsresponse.json();

  return (
    <Suspense fallback={<p>loading...</p>}>
      <section>
        <div className="mt-[-70]">
          <Image
            src={"/images/logo_bringlovehome_b.png"}
            alt={"Bring Love Home"}
            // fill
            className="mx-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            width={300}
            height={300}
          />
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
          <div className={"flex mx-auto justify-center"}>
            <Link href={"/dogs"}>
              <Button
                variant={"outline"}
                className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer"
              >
                View More
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {dogs.slice(0, 6).map((dog) => (
              <DogCard key={dog.name} {...dog} />
            ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
};
export default Home;
