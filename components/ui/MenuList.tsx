"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ShowCategoriesList from "../client/ShwoCategoriesList";
import { Catamaran } from "next/font/google";

function MenuList({
  setShowDrawer,
  drawerTop,
  categories,
  showDrawer,
}: {
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  drawerTop: number;
  categories: Array<{ name: string; slug: string; url: string }>;
  showDrawer: boolean;
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!showDrawer) return;
    setIsClosing(false);
  }, [showDrawer]);

  function closingAnimate() {
    setTimeout(() => {
      setShowDrawer(false);
    }, 300);
  }
  return (
    <aside
      onClick={() => {
        setIsClosing(true);
        closingAnimate();
      }}
      aria-hidden={!showDrawer}
      className={`fixed left-0 right-0 bottom-0 z-40 ${
        showDrawer ? "" : "hidden"
      }`}
      style={{ top: drawerTop }}
    >
      <div
        className={`absolute inset-0 transition-opacity delay-300 ${
          !isClosing
            ? "opacity-60 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.6)" }}
      ></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 bottom-0 left-0 z-50 shadow-xl w-80 max-w-full bg-white overflow-y-auto transition-transform delay-300 ${
          !isClosing ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ShowCategoriesList categories={categories} />
      </div>
    </aside>
  );
}

export default MenuList;
