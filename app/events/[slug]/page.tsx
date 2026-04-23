import React, {Suspense} from "react";
import EventDetails from "@/components/EventDetails";
import {Skeleton} from "@/components/ui/skeleton";

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => {
    const slug = params.then((p) => p.slug);

    return (
        <main>
            <Suspense fallback={<div className="flex w-full max-w-xs flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>}>
                <EventDetails params={slug}  />
            </Suspense>
        </main>
    )
}
export default EventDetailsPage
