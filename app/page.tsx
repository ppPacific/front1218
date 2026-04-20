import {useTranslations} from "next-intl";
import EventCard from "@/components/EventCard";
import {dogs, events} from "@/lib/constants";
import DogCard from "@/components/DogCard";
import Image from "next/image";
import React from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {IEvent} from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home =  async () => {
    // const [visibleCount, setVisibleCount] = useState(4);
    // const t = useTranslations('home')
    //server-side fetch
    // const fetchSample = await fetch('https://jsonplaceholder.typicode.com/posts');
    // if (!fetchSample.ok) throw new Error("fetched API fail")
    const response = await fetch(`${BASE_URL}/api/events`);
    const {events} = await response.json();
    // const posts = await fetchSample.json();
    //  const response = await fetch('https://localhost:3000/api/books');
    // const books = await response.json();
    //console.log(posts);
    //console.log('page component? from server');
    return (
        <section>
            {/*<h1 className={"text-center text-gradient font-semibold home-title"}>*/}
            {/*    Adopt a dog<br/>Adoption saves lives.</h1>*/}
            {/*<div className={`min-h-screen`}>*/}
            {/*<div className="relative aspect-[4/5] md:aspect-auto md:h-1/2">*/}
            {/*    <Image*/}
            {/*        src={"/images/logo_bringlovehome_b.png"}*/}
            {/*        alt={"Bring Love Home"}*/}
            {/*        fill*/}
            {/*        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"*/}
            {/*        sizes="(max-width: 767px) 50vw, (max-width: 1279px) 70vw, 50vw"*/}
            {/*    />*/}
            {/*</div>*/}
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
                    <h3>Featured Events</h3>
                    <ul className="events">
                        {events && events.length > 0 && events.map((event: IEvent) => (
                            <li key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))}
                    </ul>
                    <div className={"flex mx-auto justify-center"}>
                        <Link href={"/dogs"}>
                        <Button
                            variant={'outline'}
                            className="shadow-md text-xs sm:text-sm sm:h-10 px-2 sm:px-4 cursor-pointer">
                            View More
                        </Button>
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2">
                        {dogs.slice(0,6).map((dog) => (
                            <DogCard key={dog.id} {...dog} />
                        ))}
                    </div>


                </div>
            {/*</div>*/}


        </section>
        // <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols"}>
        //     <p>test</p>
        //     <code>
        //         {JSON.stringify(books, null, 2)}
        //     </code>
        //
        //     {posts.map((post: {id:number,title:string}) =>(
        //         <div key={post.id} className={"shadow-md rounded-lg transition"}>
        //             <h3 className={""}>{post.title}</h3>
        //             <p className={""}>Post ID: {post.id}</p>
        //         </div>
        //     ))}
        // </div>
    )
}
export default Home

