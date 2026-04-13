"use client"


import {useState} from "react";

interface Props {
    keyword: string;

}
const SearchBar = () => {
    const [query, setQuery] = useState<string>('');
    return (
        <input
            type={"text"}
            placeholder="Search dogs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            maxLength={100}>

        </input>
    )

}
export default SearchBar
