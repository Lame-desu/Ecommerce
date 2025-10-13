"use client";

import Image from "next/image";
import Link from "next/link";

function SearchItem({ item }: { item: any }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image src={item.images[0]} alt="item image" fill sizes="50" />
        </div>
        <Link
          href={`/product/${item.id}`}
          className="hover:underline text-start"
        >
          {item.title}
        </Link>
      </div>
    </div>
  );
}

export default SearchItem;
