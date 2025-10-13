"use client";

import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

function Header({ session }: { session: any }) {
  const discountRef = useRef<HTMLDivElement | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [discountBottom, setDiscountBottom] = useState(0);

  useEffect(() => {
    if (!isSearching) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isSearching]);

  function handleOpenSearch() {
    if (!discountRef.current) return;
    const btm = discountRef.current.getBoundingClientRect().bottom;
    const bottom = btm >= 0 ? btm : 0;
    setDiscountBottom(bottom);
    setIsSearching(true);
  }

  return (
    <>
      <div ref={discountRef} className="bg-black py-2 w-full">
        <p className=" text-white text-center">
          💵50% ቅድመ ክፋያ ከፈለዉ ✈️በ15 ቀናት ውስጥ እናደርሳለን.
        </p>
      </div>
      <SearchBar
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        discountBottom={discountBottom}
      />
      <NavBar session={session} handleOpenSearch={handleOpenSearch} />
    </>
  );
}

export default Header;
