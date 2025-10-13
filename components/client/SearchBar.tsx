"use client";
import { usePathname, useSearchParams } from "next/navigation";
import SearchComponent from "./SearchComponent";
import { useEffect } from "react";

function SearchBar({
  isSearching,
  setIsSearching,
  discountBottom,
}: {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  discountBottom: number;
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const totalPath =
    pathName + (searchParams ? `?${searchParams.toString()}` : "");

  useEffect(() => {
    setIsSearching(false);
  }, [totalPath]);

  return (
    <div
      onClick={() => setIsSearching(false)}
      className={`fixed overflow-hidden bottom-0 right-0  left-0 bg-black/50 z-[600] ${
        isSearching ? "translate-y-0" : "-translate-y-[110%] "
      }`}
      style={{ top: discountBottom }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full flex justify-center items-center gap-3 bg-white py-2 transition-transform duration-300  ${
          isSearching ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex gap-3 justify-center items-center px-4 md:px-16 w-full md:w-[900px]">
          <SearchComponent isSearching={isSearching} />
          <button
            className="cursor-pointer"
            onClick={() => setIsSearching(false)}
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
            >
              <path d="M 7.7070312 6.2929688 L 6.2929688 7.7070312 L 23.585938 25 L 6.2929688 42.292969 L 7.7070312 43.707031 L 25 26.414062 L 42.292969 43.707031 L 43.707031 42.292969 L 26.414062 25 L 43.707031 7.7070312 L 42.292969 6.2929688 L 25 23.585938 L 7.7070312 6.2929688 z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
