"use client";
import { useEffect, useState } from "react";
import CircularLoading from "../server/CircularLoading";
import { HiArrowLongRight } from "react-icons/hi2";
import axios from "axios";
import SearchItem from "./SearchItem";
import Link from "next/link";

function ShowSearchResult({ query }: { query: string }) {
  const [searchResults, setSearchResults] = useState<any>();

  useEffect(() => {
    async function fetchResults() {
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${query}&limit=4`
      );
      const data = res.data;
      setSearchResults(data.products);
    }
    fetchResults();
  }, [query]);

  if (!searchResults)
    return (
      <div className="py-1">
        <CircularLoading size="20px" />
      </div>
    );

  return (
    <div>
      <div>
        {searchResults.map((item: any) => (
          <SearchItem key={item.id} item={item} />
        ))}
      </div>
      <Link
        href={`/search?q=${query}`}
        className="w-full py-2 px-6 border-t-[1px] border-t-gray-300 flex justify-between hover:bg-gray-100 rounded-b-sm"
      >
        <p>Search for "{query}"</p>
        <div>
          <HiArrowLongRight />
        </div>
      </Link>
    </div>
  );
}

export default ShowSearchResult;
