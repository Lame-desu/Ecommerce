"use client";

import { useCart } from "@/components/client/ContextProvider";
import { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import { BsPersonCircle } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegAddressBook } from "react-icons/fa";
import { calculateTotal } from "@/lib/services";
import CircularLoading from "../server/CircularLoading";

function OrderDialog() {
  const { isOrderOpen, setIsOrderOpen } = useCart();
  const [totalValue, setTotalValue] = useState<number>(0);
  const { cartItems, setCartItems } = useCart();
  const [calculatingTotal, setCalculatingTotal] = useState<boolean>(false);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  function handleOrder(e: any) {
    e.preventDefault();
    setOrderPlaced(true);
  }

  function handleCloseOrder() {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  }

  useEffect(() => {
    if (isOrderOpen) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, window.scrollY + 1);
    } else {
      document.body.style.overflow = "visible";
      window.scrollTo(0, window.scrollY - 1);
    }
  }, [isOrderOpen]);

  useEffect(() => {
    if (cartItems.length <= 0) return;
    async function getTotal() {
      setCalculatingTotal(true);
      const promises = cartItems.map(([id, qty]) => calculateTotal(id, qty));
      const resolvedArray = await Promise.all(promises);
      const totalValue = resolvedArray.reduce((prev, curr) => prev + curr);
      setCalculatingTotal(false);
      setTotalValue(totalValue);
    }
    getTotal();
  }, [cartItems]);

  if (orderPlaced) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-black/30 backdrop-blur-sm z-[100] px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center relative animate-fadeIn">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="green"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Order Placed Successfully 🎉
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for shopping with{" "}
            <span className="font-semibold">Shaba Commerce</span>!
            <br />
            Your order is being processed and will be on its way soon.
          </p>

          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-24">
              <div className="absolute bottom-0 w-8 h-8 bg-gray-800 rounded-full animate-bounce delay-100"></div>
              <div className="absolute bottom-0 left-10 w-8 h-8 bg-gray-800 rounded-full animate-bounce"></div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                window.location.href = "/";
                setIsOrderOpen(false);
                handleCloseOrder();
              }}
              className="bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (!isOrderOpen) return;

  return (
    <div
      className={`fixed min-h-screen inset-0 bg-black/30 backdrop-blur-[4px]  z-[100] overflow-scroll`}
    >
      <div className="flex justify-center items-center ">
        <div className="bg-[#f3f3f3] w-full md:w-xl px-8  m-7 relative">
          <button
            onClick={() => setIsOrderOpen(false)}
            className="absolute right-0 top-0 text-gray-600 p-5 cursor-pointer"
          >
            ✖
          </button>
          <div>
            <h1 className="border-b-[0.5px] border-b-gray-300 font-semibold py-5 text-xl">
              እባክዎን ለማዘዝ ቅጹን ይሙሉ
            </h1>
            {cartItems.map(([id, qty]) => (
              <OrderItem key={id} id={id} qty={qty} />
            ))}
          </div>
          <div className="p-3 border-[0.5px] border-gray-300 rounded-sm">
            <div className="flex items-center justify-between py-2 border-b-[0.5px] border-b-gray-300">
              <p className="text-lg font-normal">Subtotal</p>
              {calculatingTotal ? (
                <CircularLoading />
              ) : (
                <p className="text-lg font-[700]">
                  Br
                  {totalValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-lg font-[700]">Total</p>

              {calculatingTotal ? (
                <CircularLoading />
              ) : (
                <p className="text-2xl font-[700]">
                  Br
                  {totalValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              )}
            </div>
          </div>
          <form onSubmit={handleOrder}>
            <div>
              <div className="flex items-center gap-6 mt-2 ">
                <h2 className="font-extrabold min-w-28 ">
                  ስም/Name<span className="text-red-500">*</span>
                </h2>
                <div className="flex-1 flex items-center">
                  <div className="rounded-l-sm self-stretch flex items-center justify-center px-3 py-3 border-[1px] border-r-0 border-gray-400">
                    <BsPersonCircle />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="ስም/Name"
                    className="w-full px-3 py-3 rounded-r-sm outline-none border-[1px] border-gray-400 focus:shadow-[0px_0px_0_2px_#a0e4f7]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 ">
                <h2 className="font-extrabold min-w-28 ">
                  ስልክ/Phone<span className="text-red-500">*</span>
                </h2>
                <div className="flex-1 flex items-center">
                  <div className="rounded-l-sm self-stretch flex items-center justify-center px-3 py-3 border-[1px] border-r-0 border-gray-400">
                    <FaPhoneAlt />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder=" ስልክ/Phone"
                    className="w-full px-3 py-3 rounded-r-sm outline-none border-[1px] border-gray-400 focus:shadow-[0px_0px_0_2px_#a0e4f7]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 ">
                <h2 className="font-extrabold min-w-28 ">
                  ከተማ/City<span className="text-red-500 font-extrabold">*</span>
                </h2>
                <div className="flex-1 flex items-center">
                  <div className="rounded-l-sm self-stretch flex items-center justify-center px-3 py-3 border-[1px] border-r-0 border-gray-400">
                    <FaLocationDot />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="*አዲስ አበባ*"
                    className="w-full px-3 py-3 rounded-r-sm outline-none border-[1px] border-gray-400 focus:shadow-[0px_0px_0_2px_#a0e4f7]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 ">
                <h2 className="font-extrabold min-w-28 ">
                  ሰፈር/Address<span className="text-red-500">*</span>
                </h2>
                <div className="flex flex-1 items-center">
                  <div className="rounded-l-sm self-stretch flex items-center justify-center px-3 py-3 border-[1px] border-r-0 border-gray-400">
                    <FaRegAddressBook />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="*ፒያሳ*"
                    className="w-full px-3 py-3 rounded-r-sm outline-none border-[1px] border-gray-400 focus:shadow-[0px_0px_0_2px_#a0e4f7]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6 mt-4 ">
                <h2 className="font-extrabold max-w-28 ">
                  ይህንን ትእዛዛ ለማድረግ 50% ቅድመ ክፍያ ያስፈልጋል
                </h2>
                <div className="flex-1 flex items-center"></div>
              </div>
              <div className="flex items-center gap-6 mt-4 ">
                <h2 className="font-extrabold max-w-28 ">
                  የቅናሽ ኮድ/Discount Code
                </h2>
                <div className="flex flex-wrap flex-1 items-stretch gap-0.5">
                  <input
                    type="text"
                    placeholder="Discount Code"
                    className="px-3 min-w-36 w-full py-3 rounded-sm outline-none border-[1px] border-gray-400 focus:shadow-[0px_0px_0_2px_#a0e4f7]"
                  />
                  <button className="text-xs text-center py-2 px-2 bg-black text-white rounded-sm">
                    Apply
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 text-center bg-black text-white mt-3 mb-7"
              >
                ይዘዙን
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderDialog;
