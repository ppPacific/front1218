import React, {Suspense} from "react";
import {Skeleton} from "@/components/ui/skeleton";
import DogDetails from "@/components/DogDetails";


const DogDetailPage = async ({ params }: { params: Promise<{ slug: string }>}) => {

    const slug = params.then((p) => p.slug);
    return (
        <main>
            <Suspense fallback={<div className="flex w-full max-w-xs flex-col gap-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>}>
                <DogDetails params={slug} />
            </Suspense>
        </main>
    )
}

export default DogDetailPage
