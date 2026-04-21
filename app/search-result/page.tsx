import {dogs} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import React from "react";

export default async function SearchResultPage({
                                                   searchParams,
                                               }: {
    searchParams: Promise<{ q?: string; tag?: string }>;
}) {
    const params = await searchParams;
    const q = params.q?.trim().toLowerCase() || "";
    const tag = params.tag?.trim().toLowerCase() || "";
    const filteredDogs = dogs.filter((dog) => {
        const matchesName = q ? dog.name.toLowerCase().includes(q) : true;
        const matchesTag = tag
            ? dog.featureTag?.some((t) => t.toLowerCase() === tag)
            : true;

        return matchesName && matchesTag;
    });
    return (
        <div className={"px-4 flex flex-col"}>

            <h1>Result</h1>
            {/*<div className={"modal__search-wrap"}>*/}
            {/*    <div className={"modal__search"}>*/}
            {/*        <div className={"modal__input-wrap"}>*/}
            {/*            <form className={"modal__input-wrap"} onSubmit={handleSubmit}>*/}
            {/*                <input*/}
            {/*                    className={"modal__input"}*/}
            {/*                    placeholder={"search doggies..."}*/}
            {/*                    value={keyword}*/}
            {/*                    type={"text"}*/}
            {/*                    onChange={(e) => setKeyword(e.target.value)}*/}
            {/*                />*/}
            {/*                <Button className={"modal__button"}>search</Button>*/}
            {/*            </form>*/}
            {/*        </div>*/}

            {/*    </div>*/}

            {/*</div>*/}

            {q && (
                <p className="mt-2 text-zinc-600">
                    Showing dogs matching name: <span className="font-medium">{q}</span>
                </p>
            )}

            {filteredDogs.length === 0 ? (
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 text-zinc-600">
                    No dogs found.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {filteredDogs.map((dog) => (
                        <article
                            key={dog.id}
                            className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-zinc-900">{dog.name}</h2>
                            <p className="mt-2 text-sm leading-6 text-zinc-600">{dog.summary}</p>

                            {dog.featureTag && dog.featureTag.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {dog.featureTag.map((tagItem) => (
                                        <span
                                            key={`${dog.id}-${tagItem}`}
                                            className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                                        >
                      {tagItem}
                    </span>
                                    ))}
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}
