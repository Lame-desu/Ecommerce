"use client";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import SelectLanguage from "../client/SelectLanguage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuList from "./MenuList";
import axios from "axios";

function NavBar() {
  const lastYRef = useRef(0);
  const navRef: any = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const [drawerTop, setDrawerTop] = useState(0);
  const [showDrawer, setShowDrawer] = useState(false);

  const [categories, setCategories] = useState<
    Array<{ name: string; slug: string; url: string }>
  >([]);
  console.log(categories);

  function updateDrawerTop() {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setDrawerTop(rect.bottom);
    } else {
      setDrawerTop(0);
    }
  }

  useEffect(() => {
    updateDrawerTop();

    window.addEventListener("resize", updateDrawerTop);
    window.addEventListener("scroll", updateDrawerTop, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDrawerTop);
      window.removeEventListener("scroll", updateDrawerTop);
    };
  }, []);

  useEffect(() => {
    if (showDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showDrawer]);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      // if (Math.abs(currentY - lastYRef.current) < 50) return;
      if (currentY > lastYRef.current && currentY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastYRef.current = currentY;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 nav-bar-grid items-center bg-white px-2 md:px-9 py-3 box-border border-b-[1px] border-b-[#EBEBEB] transition-transform duration-300
              ${showNav ? "translate-y-0" : "-translate-y-full"} `}
      >
        <div>
          <button
            onClick={() => {
              setShowDrawer(!showDrawer);
              updateDrawerTop();
            }}
            className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer text-3xl"
          >
            {showDrawer ? (
              <div className="font-light">X</div>
            ) : (
              <RxHamburgerMenu />
            )}
          </button>
        </div>

        <Link href="/">
          <h1 className="sm:text-3xl md:text-4xl font-semibold text-center text-nowrap ">
            Shaba Closet
          </h1>
        </Link>
        <div className="flex gap-5 items-center justify-end">
          <SelectLanguage />
          <div className="flex items-center gap-5 text-2xl font-bold">
            <button className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer">
              {" "}
              <CiSearch />
            </button>
            <button className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer hidden md:block">
              <IoPersonOutline />
            </button>
            <div>
              <button className="relative text-4xl hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer">
                <CiShoppingCart />
                <span className="text-xs font-normal absolute right-[-5px] bottom-0 bg-white px-1 rounded-full">
                  15
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MenuList
        categories={categories}
        setShowDrawer={setShowDrawer}
        drawerTop={drawerTop}
        showDrawer={showDrawer}
      />
    </>
  );
}

export default NavBar;
