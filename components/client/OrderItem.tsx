"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./ContextProvider";
import LinearLoading from "../server/LinearLoading";

function OrderItem({ id, qty }: { id: string; qty: number }) {
  const [item, setItem] = useState<any>();
  const { setCartItems } = useCart();
  useEffect(() => {
    async function fetchItem() {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      const itemData = res.data;
      setItem(itemData);
    }
    fetchItem();
  }, []);

  function removeItem() {
    const prevCartItems = JSON.parse(String(localStorage.getItem("cartItems")));
    const { [String(id)]: _, ...updatedCartItems } = prevCartItems;
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(Object.entries(updatedCartItems));
  }

  if (!item) return <LinearLoading />;

  return (
    <div className="flex items-center justify-between gap-1 border-b-[0.5px] border-b-gray-300 py-1">
      <div className="flex items-center gap-1">
        <div className="relative w-20 h-20">
          <Image src={item.images[0]} fill sizes="60px" alt="product image" />
          <span className="absolute top-0 right-0 text-white bg-[#828282] rounded-full text-xs px-2 py-1">
            {qty}
          </span>
        </div>
        <div>
          <h2 className="text-[16px] font-[700]">{item.title}</h2>
          <h2 className="text-sm font-semibold text-gray-500">
            {item.returnPolicy}
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="text-[16px] font-[700]">
          Br
          {(item.price * qty * 100).toLocaleString("en-US", {
            maximumFractionDigits: 2,
            maximumSignificantDigits: 2,
          })}
        </h2>
        <button
          onClick={removeItem}
          className="text-sm font-bold text-gray-500 hover:text-black cursor-pointer"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
