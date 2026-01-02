import {useTranslations} from "next-intl";

const Home = async () => {
    // const t = useTranslations('home')
    //server-side fetch
    const fetchSample = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!fetchSample.ok) throw new Error("fetched API fail")

    const posts = await fetchSample.json();
    //  const response = await fetch('https://localhost:3000/api/books');
    // const books = await response.json();
     console.log('component? from server');
    return (
        <section>
            <h1 className={"text-center text-gradient font-semibold home-title"}>
                Adopt a dog<br/>Adoption saves lives.</h1>
            <div className={`min-h-screen`}>home content</div>
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

