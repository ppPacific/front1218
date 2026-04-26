import React, { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import DogDetails from "@/components/DogDetails";

async function EventDetailsWrapper({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EventDetails slug={slug} />;
}
const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <EventDetailsWrapper params={params} />
      </Suspense>
    </main>
  );
};
export default EventDetailsPage;
