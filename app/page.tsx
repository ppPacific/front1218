import {useTranslations} from "next-intl";
import EventCard from "@/components/EventCard";
import {events} from "@/lib/constants";


const Home = async () => {
    // const t = useTranslations('home')
    //server-side fetch
    const fetchSample = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!fetchSample.ok) throw new Error("fetched API fail")

    const posts = await fetchSample.json();
    //  const response = await fetch('https://localhost:3000/api/books');
    // const books = await response.json();
    console.log(posts);
    console.log('page component? from server');
    return (
        <section>
            <h1 className={"text-center text-gradient font-semibold home-title"}>
                Adopt a dog<br/>Adoption saves lives.</h1>
            {/*<div className={`min-h-screen`}>*/}
                <div className="mt-20 space-y-7">
                    <h3>Featured Events</h3>

                    <ul className="events">
                        {events && events.length > 0 && events.map((event: IEvent) => (
                            <li key={event.title} className="list-none">
                                <EventCard {...event} />
                            </li>
                        ))}
                    </ul>
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

