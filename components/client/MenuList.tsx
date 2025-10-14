"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import ShowCategoriesList from "./ShwoCategoriesList";
import { usePathname, useSearchParams } from "next/navigation";
import SelectLanguage from "./SelectLanguage";
import ProfileIcon from "./ProfileIcon";
import { IoPersonOutline } from "react-icons/io5";
import UserInfo from "./UserInfo";

export default function MenuList({ session }: { session: any }) {
  const [categories, setCategories] = useState<
    Array<{ name: string; slug: string; url: string }>
  >([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathName = usePathname();
  const route: string | undefined = pathName.split("/").at(-1);

  const searchParams = useSearchParams();
  const totalPath =
    pathName + (searchParams ? `?${searchParams.toString()}` : "");

  useEffect(() => {
    setOpen(false);
  }, [totalPath]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="text-3xl hover:transform-[scaleY(1.2)_scaleX(1.2)]">
          <RxHamburgerMenu />
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-auto">
        <SheetHeader>
          <div className="hidden">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </div>

          <div>
            <ShowCategoriesList route={route} categories={categories} />
          </div>
          <div className="bg-gray-200  mt-7">
            <div className="block md:hidden py-6 px-3 relative">
              <div>
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer flex gap-3 md:hidden text-2xl"
                >
                  <IoPersonOutline /> <span className="text-xl">Profile</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute left-0 bottom-full bg-gray-200 z-[900] rounded-sm">
                    <UserInfo
                      session={session}
                      setIsProfileOpen={setIsProfileOpen}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="block lg:hidden pb-4 px-3">
              <SelectLanguage border={true} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
