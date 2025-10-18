"use client";
import { CiSearch } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import SelectLanguage from "./SelectLanguage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MenuList from "./MenuList";
import { useCart } from "./ContextProvider";
import axios from "axios";
import Image from "next/image";
import { BsFillBagFill } from "react-icons/bs";
import UserInfo from "./UserInfo";

function NavBar({
  handleOpenSearch,
  session,
}: {
  handleOpenSearch: () => void;
  session: any;
}) {
  const lastYRef = useRef(0);
  const navRef: any = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const [cartItem, setCartItem] = useState<any>(null);
  const [cartQuantity, setCartQuantity] = useState<number | null>(null);
  const [totalCartItems, setTotalCartItems] = useState<number>(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // const [showDrawer, setShowDrawer] = useState(false);
  const {
    isCartDialogOpen,
    setIsCartDialogOpen,
    cartId,
    cartItems,
    setIsOrderOpen,
  } = useCart();
  useEffect(() => {
    const cartQuantity = cartId
      ? JSON.parse(String(window.localStorage.getItem("cartItems")))?.[cartId]
      : null;
    setCartQuantity(cartQuantity);
  }, [isCartDialogOpen]);

  useEffect(() => {
    if (!cartId) return;
    async function fetchItem() {
      const res = await axios.get(`https://dummyjson.com/products/${cartId}`);
      const item = res.data;
      setCartItem(item);
    }
    fetchItem();
  }, [cartId]);

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
    if (!isCartDialogOpen) return;
    function closeDialog() {
      setIsCartDialogOpen(false);
    }
    window.addEventListener("click", closeDialog);

    return () => window.removeEventListener("click", closeDialog);
  }, [isCartDialogOpen]);

  useEffect(() => {
    setTotalCartItems(cartItems.reduce((prev, curr) => prev + curr[1], 0));
  }, [cartItems]);

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 nav-bar-grid items-center bg-white px-2 md:px-9 py-3 box-border border-b-[1px] border-b-[#EBEBEB] transition-transform duration-300
              ${showNav ? "translate-y-0" : "-translate-y-full"} `}
      >
        <div>
          <MenuList session={session} />
        </div>

        <Link href="/">
          <h1 className="sm:text-3xl md:text-4xl font-semibold text-center text-nowrap ">
            Shaba Commerce
          </h1>
        </Link>
        <div className="flex gap-5 items-center justify-end">
          <div className="hidden lg:block">
            <SelectLanguage />
          </div>
          <div className="flex items-center gap-5 text-2xl font-bold">
            <button
              onClick={handleOpenSearch}
              className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer"
            >
              {" "}
              <CiSearch />
            </button>
            <div>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className="hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer hidden md:block"
              >
                <IoPersonOutline />
              </button>

              {isProfileOpen && (
                <div className="absolute right-3 top-full bg-white z-[900] rounded-sm">
                  <UserInfo
                    session={session}
                    setIsProfileOpen={setIsProfileOpen}
                  />
                </div>
              )}
            </div>
            <div>
              <Link
                href="/cart"
                className="relative text-4xl hover:transform-[scaleY(1.2)_scaleX(1.2)] hover:cursor-pointer"
              >
                <CiShoppingCart />
                <span className="text-xs font-normal absolute right-[-5px] bottom-0 bg-white px-1 rounded-full">
                  {totalCartItems}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute min-w-96 max-w-xl right-[1%] top-full px-10 py-7 border-[1px] border-black bg-white space-y-5 transition-all delay-100 duration-300 ${
            isCartDialogOpen &&
            (cartItem ? String(cartItem.id) === cartId : true)
              ? "translate-y-0 opacity-100 pointer-events-auto z-50"
              : "-translate-y-full opacity-0 pointer-events-none z-0"
          }`}
        >
          <button
            onClick={() => {
              setIsCartDialogOpen(false);
            }}
            className="absolute top-3 right-3 p-2 text-xl cursor-pointer"
          >
            ✖
          </button>
          <p className="text-sm">✓ Item added to your cart</p>
          <div className="flex gap-2">
            <div className="relative w-[70px] h-[70px] ">
              {cartItem?.images[0] ? (
                <Image
                  src={cartItem.images[0]}
                  alt="product image"
                  fill
                  sizes="70px"
                />
              ) : null}
            </div>
            <div>
              <h3>{cartItem?.title}</h3>
              <p>Quantity: {cartQuantity ? cartQuantity : ""}</p>
            </div>
          </div>
          <Link
            href="/cart"
            onClick={() => setIsCartDialogOpen(false)}
            className="w-full block text-center py-3 border-2 border-black hover:ring rounded-sm cursor-pointer"
          >
            View Cart ({totalCartItems > 0 ? totalCartItems : ""})
          </Link>
          <button
            onClick={() => {
              setIsOrderOpen(true);
              setIsCartDialogOpen(false);
            }}
            className="flex justify-center items-center gap-2  w-full py-3 text-white bg-black cursor-pointer"
          >
            <BsFillBagFill />
            <span>Order Now</span>{" "}
          </button>
          <button
            onClick={() => {
              setIsCartDialogOpen(false);
            }}
            className="underline text-center block w-full cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
