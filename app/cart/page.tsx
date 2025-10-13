"use client";

import CartItem from "@/components/client/CartItem";
import { useCart } from "@/components/client/ContextProvider";
import OrderDialog from "@/components/client/OrderDialog";
import CircularLoading from "@/components/server/CircularLoading";
import { calculateTotal } from "@/lib/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";

function page() {
  const [totalCartValue, setTotalCartValue] = useState<number>(0);
  const [calculatingTotal, setCalculatingTotal] = useState<boolean>(false);
  const { cartItems, setIsOrderOpen } = useCart();

  useEffect(() => {
    if (cartItems.length <= 0) return;
    async function getTotal() {
      setCalculatingTotal(true);
      const promises = cartItems.map(([id, qty]) => calculateTotal(id, qty));
      const resultArray = await Promise.all(promises);
      const total = resultArray.reduce((prev, curr) => prev + curr, 0);
      setCalculatingTotal(false);
      setTotalCartValue(total);
    }
    getTotal();
  }, [cartItems]);

  if (cartItems.length <= 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="space-y-16">
          <h1 className="text-4xl font-normal">Your cart is empty</h1>
          <div className="text-center">
            <Link href="/">continue shopping</Link>
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-normal">Have an account?</h2>
            <p>
              <span>
                <Link className="underline" href="">
                  Log in
                </Link>{" "}
                to checkout faster
              </span>
            </p>
          </div>
        </div>{" "}
      </div>
    );
  }

  return (
    <>
      <div>
        <OrderDialog />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[90vw] md:w-[75vw]">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl pt-5 font-medium">Your Cart</h1>
            <Link className="underline" href="/">
              Continue Shopping
            </Link>
          </div>

          <table className="w-full table-auto border-separate border-spacing-y-10 border-b-[0.5px] border-b-gray-200">
            <thead>
              <tr className="">
                <th className="font-extralight  text-gray-600 text-start text-[10px] border-b-[0.5px] border-b-gray-200 pb-3">
                  PRODUCT
                </th>
                <th className="hidden md:block font-extralight  text-gray-600 text-start text-[10px] border-b-[0.5px] border-b-gray-200 pb-3">
                  QUANTITY
                </th>
                <th className="font-extralight  text-gray-600 text-end text-[10px] border-b-[0.5px] border-b-gray-200 pb-3">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => (
                <CartItem key={item[0]} item={item} />
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end border-b-[0.5px] border-b-gray-200 py-16">
            <div className="flex flex-col gap-4 items-end">
              <div className="flex items-center gap-4">
                <h3 className="text-end"> Estimated total </h3>
                {calculatingTotal ? (
                  <CircularLoading size="20px" />
                ) : (
                  <h3 className="text-end">
                    {" "}
                    Br
                    {totalCartValue.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h3>
                )}
              </div>
              <p className="font-light text-xs">
                Taxes, discounts and shipping calculated at checkout
              </p>

              <button
                onClick={() => setIsOrderOpen(true)}
                className="flex justify-center items-center gap-2 border-2 border-gray-700 w-full  max-w-sm py-3 px-6 text-white bg-black cursor-pointer"
              >
                <BsFillBagFill />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default page;
