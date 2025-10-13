"use client";

import Image from "next/image";
import Link from "next/link";
import { handleLogout } from "@/lib/actions";

export default function UserInfo({
  session,
  setIsProfileOpen,
}: {
  session: any;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (!session?.user)
    return (
      <div className="p-7 border-2 border-gray-300 rounded-sm relative">
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute right-1 top-1  hover:text-shadow-2xs hover:cursor-pointer hover:transform-[scaleY(1.1)_scaleX(1.1)]"
        >
          {" "}
          ✖
        </button>
        <Link
          href={"/signin"}
          type="submit"
          className="px-4 py-1 text-lg bg-blue-500 text-white hover:bg-blue-400 rounded-sm hover:ring mt-8"
        >
          Signin
        </Link>
      </div>
    );

  return (
    <div className="py-2 px-5 rounded-sm border-2 border-gray-500 flex justify-center items-center w-fit relative">
      <button
        onClick={() => setIsProfileOpen(false)}
        className="absolute right-2 top-2  hover:text-shadow-2xs"
      >
        {" "}
        ✖
      </button>
      <div className="text-start space-y-1">
        {session?.user?.image && (
          <div className="relative w-28 h-28">
            <Image
              src={String(session?.user?.image)}
              alt="profile image"
              fill
              sizes="112px"
              className="rounded-lg"
            />
          </div>
        )}
        <h1 className="text-3xl font-extrabold">{session?.user?.name}</h1>
        <p className="text-sm font-light">{session?.user?.email}</p>

        <form action={handleLogout}>
          <button
            type="submit"
            className="px-4 py-1 text-lg bg-red-300 text-whtie hover:bg-red-400 rounded-sm hover:ring mt-8"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
