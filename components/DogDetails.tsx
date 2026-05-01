import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSimilarDogsBySlug } from "@/lib/actions/dog.actions";
import DogThumbnail from "@/components/DogThumbnail";
import { PROD_URL } from "@/lib/constants";
import { IDog } from "@/database/dog.model";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const DogDetails = async ({ params }: { params: Promise<string> }) => {
  const slug = await params;
  let dog;
  let urlSrc = `${BASE_URL}/api/dogs/${slug}`;
  if (process.env.NODE_ENV !== "development") {
    urlSrc = `${PROD_URL}/api/dogs/${slug}`;
  }

  try {
    const request = await fetch(urlSrc, {
      next: { revalidate: 60 },
    });

    if (!request.ok) {
      if (request.status === 404) {
        return notFound();
      }
      throw new Error(`Failed to fetch dog: ${request.statusText}`);
    }

    const response = await request.json();
    dog = response.dog;
    if (!dog) return notFound();
  } catch (error) {
    console.error("Error fetching dog:", error);
    return notFound();
  }
  const {
    description,
    image,
    name,
    age,
    size,
    kennelLocation,
    breed,
    sex,
    featureTag,
    status,
  } = dog;

  const bookings = 10;

  const similarDogs: IDog[] = await getSimilarDogsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>{name}</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/*    Left Side - Event Content */}
        <div className="content">
          <Image
            src={image?.[0]?.url || `/images/dog_placeholder.png`}
            alt="Event Banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            {/*<h2>Overview</h2>*/}
            <p>
              About {name}: {description}
            </p>
            <p>Age: {age}</p>
          </section>
          <EventTags tags={featureTag} />
        </div>

        {/*    Right Side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Schedule to meet this doggie!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            {/*    <BookEvent eventId={event._id} slug={event.slug} />*/}
          </div>
        </aside>
      </div>
      <Tabs defaultValue="overview" className="min-w-[400px]">
        <TabsList>
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="advanced">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic metrics</CardTitle>
              <CardDescription>Default metrics showing</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"></div>
              <br />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced metrics</CardTitle>
              <CardDescription>
                Track performance and user engagement metrics. Monitor trends
                and identify growth opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Page views are up 25% compared to last month.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>You might be interested in these dogs too:</h2>
        <div className="events">
          {similarDogs.length == 0 && (
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {similarDogs.length > 0 &&
            similarDogs.map((similarDog: IDog) => (
              <DogThumbnail key={similarDog.name} {...similarDog} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default DogDetails;
