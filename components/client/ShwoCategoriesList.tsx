"use client";

import Link from "next/link";

function ShowCategoriesList({
  categories,
  route,
}: {
  categories: Array<{ name: string; slug: string; url: string }>;
  route: string | undefined;
}) {
  const noSpaceRoute: string | undefined = route?.split("%20").join("");
  return (
    <ul className="mt-7">
      <li className="w-full">
        <Link
          className={`block py-3 px-6 hover:bg-[#EBEBEB] ${
            route === "" ? "bg-[#efefef]" : ""
          } space-y-0.5 text-lg cursor-pointer transition-transform delay-300`}
          href="/"
        >
          Home
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category.slug} className="w-full">
          <Link
            className={`block py-3 px-6 hover:bg-[#EBEBEB] ${
              noSpaceRoute === category.name.toLowerCase().split(" ").join("")
                ? "bg-[#efefef]"
                : ""
            } space-y-0.5 text-lg cursor-pointer transition-transform delay-300`}
            href={`/category/${category.name.toLowerCase()}`}
          >
            {category.name}
          </Link>
        </li>
      ))}
      <li className="w-full mt-7 border border-gray-400">
        <Link
          className={`block py-3 px-6 hover:bg-[#EBEBEB] ${
            route === "" ? "bg-[#efefef]" : ""
          } space-y-0.5 text-lg cursor-pointer transition-transform delay-300`}
          href="/privacy-policy"
        >
          Privacy policy
        </Link>
      </li>
      <li className="w-full mt-2 border border-gray-400">
        <Link
          className={`block py-3 px-6 hover:bg-[#EBEBEB] ${
            route === "" ? "bg-[#efefef]" : ""
          } space-y-0.5 text-lg cursor-pointer transition-transform delay-300`}
          href="/terms"
        >
          Terms of service
        </Link>
      </li>
    </ul>
  );
}

export default ShowCategoriesList;
