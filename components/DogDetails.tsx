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
import Link from "next/link";
import BookVisit from "@/components/BookVisit";
import WhatsAppShare from "@/components/WhatsAppShare";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Tags = ({ tags }: { tags: string[] }) => (
  <div className="mt-3 flex gap-x-2 flex justify-start overflow-x-auto">
    {tags.map((tag) => (
      <Link
        key={tag}
        href={`/search-result?q=${tag.toLowerCase()}&page=1`}
        className="suggestion-button"
      >
        {tag}
      </Link>
    ))}
  </div>
);
const handleNativeShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check this out!",
        url: window.location.href,
      });
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    // Fallback to the link method above if the browser doesn't support Web Share
    const whatsappUrl = `https://wa.me{encodeURIComponent(window.location.href)}`;
    window.open(whatsappUrl, "_blank");
  }
};

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
    _id,
  } = dog;

  const bookings = 10;

  const similarDogs: IDog[] = await getSimilarDogsBySlug(slug);
  const converteddata = JSON.parse(JSON.stringify(similarDogs));

  return (
    <section id="event">
      <div className="header">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>

      <div className="details">
        {/*    Left Side - Event Content */}
        <div className="content">
          <Image
            src={image?.[0]?.url || `/images/dog_placeholder.png`}
            alt="Event Banner"
            width={1200}
            height={1200}
            className="dogphoto"
            loading="eager"
          />

          <Tags tags={featureTag} />
        </div>

        {/*    Right Side - Booking Form */}
        <aside className="booking">
          <div className={`mb-4`}>
            <WhatsAppShare slug={slug} />
          </div>
          <div className="signup-card">
            <h2>Schedule to meet this doggie!</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Come and meet {name} before you bring him/her home!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookVisit dogId={_id} slug={slug} />
          </div>
        </aside>
      </div>
      <Tabs defaultValue="overview" className="min-w-[400px] mt-10">
        <TabsList variant="line">
          <TabsTrigger value="overview" className={"cursor-pointer"}>
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="advanced" className={"cursor-pointer"}>
            Summary
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              {/*<CardDescription>Default metrics showing</CardDescription>*/}
            </CardHeader>
            <CardContent className="text-sm">
              <section className="flex-col-gap-2">
                <p>Age: {age}</p>
                <p>Size: {size}</p>
                <p>Kennel location: {kennelLocation}</p>
                <p>Breed: {breed}</p>
                <p>Sex: {sex}</p>
              </section>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4"></div>
              <br />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              <p>
                About {name}: {description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>You might be interested in these dogs too:</h2>
        <div className="events">
          {converteddata.length == 0 ? (
            <div className="flex w-full max-w-xs flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-4">
              {converteddata.slice(0, 3).map((similarDog: IDog) => (
                <DogThumbnail key={similarDog.name} {...similarDog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default DogDetails;
