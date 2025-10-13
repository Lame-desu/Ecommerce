"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import ShowSearchResult from "./ShowSearchResult";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSearch } from "./ContextProvider";
import { useRouter } from "next/navigation";

function SearchComponent({ isSearching }: { isSearching?: boolean }) {
  const { query, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPath =
    pathName + (searchParams ? `?${searchParams.toString()}` : "");

  function inputFocus() {
    inputRef?.current?.focus();
  }

  function inputBlur() {
    inputRef?.current?.blur();
  }

  useEffect(() => {
    if (!isSearching) return;
    inputFocus();
  }, [isSearching]);

  useEffect(() => {
    inputBlur();
  }, [totalPath]);

  return (
    <div className="w-full text-sm">
      <div className="w-full relative">
        <input
          onKeyDown={(e) => {
            if (!query) return;
            if (e.key === "Enter") {
              router.push(`/search?q=${query}`);
            }
          }}
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          id="search"
          placeholder=" "
          className="w-full peer rounded-sm pt-4 pb-1 pl-6 pr-20 outline-none border-[1.5px] border-black hover:ring focus:ring"
        />
        <label
          htmlFor="search"
          className="absolute left-6 top-1 text-gray-600 text-[10px] transition-all duration-300
           peer-placeholder-shown:top-1/4 peer-placeholder-shown:text-gray-700
           peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:left-6 peer-focus:text-[10px] peer-focus:text-gray-600"
        >
          Search
        </label>
        <div className="absolute right-6 top-1/4">
          <div className="flex items-center justify-center text-2xl">
            <div className="flex justify-center items-center gap-2">
              {query ? (
                <>
                  <div
                    onClick={() => {
                      setQuery("");
                      inputFocus();
                    }}
                    className="text-gray-500 hover:cursor-pointer"
                  >
                    <MdOutlineCancel />
                  </div>
                  <div className="text-gray-400 text-sm">|</div>
                </>
              ) : null}
              <Link
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
                href={`/search?q=${query}`}
                className="text-gray-700 cursor-pointer"
              >
                <CiSearch />
              </Link>
            </div>
          </div>
        </div>
        {query && (
          <div
            onMouseDown={(e) => e.preventDefault()}
            className="absolute hidden peer-focus:block z-[700] top-[103%] left-0 right-0 rounded-b-sm bg-white border-[1px] border-black border-t-0"
          >
            {/* <Suspense fallback={<CircularLoading />}>
        </Suspense> */}
            <ShowSearchResult query={String(query)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
